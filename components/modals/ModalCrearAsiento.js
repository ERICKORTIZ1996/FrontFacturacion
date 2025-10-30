'use client'

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { normalizarNumero } from '@/helpers'

const ORIGENES_ASIENTO = [
    { value: 'MANUAL', label: 'Manual' },
    { value: 'AUTOMATICO', label: 'Automático' },
    { value: 'IMPORTACION', label: 'Importación' }
]

export default function ModalCrearAsiento({ empresaId, periodos, planCuentas }) {

    const modalCrearAsiento = useMainStore((state) => state.modalCrearAsiento)
    const changeModalCrearAsiento = useMainStore((state) => state.changeModalCrearAsiento)
    const dataUser = useMainStore((state) => state.dataUser)

    const [lineas, setLineas] = useState([
        { cuentaId: '', codigoCuenta: '', descripcion: '', debe: '', haber: '', referenciaDocumento: '' },
        { cuentaId: '', codigoCuenta: '', descripcion: '', debe: '', haber: '', referenciaDocumento: '' }
    ])

    // Obtener todas las cuentas en lista plana
    const obtenerCuentasPlanas = (cuentas, resultado = []) => {
        for (const cuenta of cuentas) {
            resultado.push({ id: cuenta.id, codigo: cuenta.codigo, nombre: cuenta.nombre })
            if (cuenta.hijos && cuenta.hijos.length > 0) {
                obtenerCuentasPlanas(cuenta.hijos, resultado)
            }
        }
        return resultado
    }

    const cuentasDisponibles = planCuentas ? obtenerCuentasPlanas(planCuentas.data?.cuentas || planCuentas.data?.data?.cuentas || planCuentas.cuentas || []) : []
    const periodosDisponibles = periodos?.data || periodos?.data?.data || []

    const agregarLinea = () => {
        setLineas([...lineas, { cuentaId: '', codigoCuenta: '', descripcion: '', debe: '', haber: '', referenciaDocumento: '' }])
    }

    const eliminarLinea = (index) => {
        if (lineas.length <= 2) {
            toast.error('Un asiento debe tener al menos 2 líneas')
            return
        }
        setLineas(lineas.filter((_, i) => i !== index))
    }

    const actualizarLinea = (index, campo, valor) => {
        const nuevasLineas = [...lineas]
        nuevasLineas[index] = { ...nuevasLineas[index], [campo]: valor }
        setLineas(nuevasLineas)
    }

    const crearAsiento = async (formData) => {
        try {
            if (!dataUser?.tokenAcceso) {
                throw new Error('No estás autenticado')
            }
            if (!empresaId) {
                throw new Error('Debes seleccionar una empresa')
            }

            // Validar líneas
            if (lineas.length < 2) {
                throw new Error('Un asiento debe tener al menos 2 líneas')
            }

            // Procesar líneas y validar
            const lineasProcesadas = lineas.map((linea, index) => {
                if (!linea.cuentaId && !linea.codigoCuenta) {
                    throw new Error(`Línea ${index + 1}: Debes seleccionar una cuenta o ingresar un código`)
                }
                // Normalizar números para aceptar tanto coma como punto, pero siempre enviar punto al backend
                const debe = normalizarNumero(linea.debe) || 0
                const haber = normalizarNumero(linea.haber) || 0

                if (debe > 0 && haber > 0) {
                    throw new Error(`Línea ${index + 1}: No puede tener valores en debe y haber simultáneamente`)
                }
                if (debe === 0 && haber === 0) {
                    throw new Error(`Línea ${index + 1}: Debe tener al menos un valor en debe o haber`)
                }

                return {
                    cuentaId: linea.cuentaId || undefined,
                    codigoCuenta: linea.codigoCuenta || undefined,
                    descripcion: linea.descripcion || undefined,
                    referenciaDocumento: linea.referenciaDocumento || undefined,
                    debe: debe,
                    haber: haber
                }
            })

            // Validar que el asiento esté balanceado (suma de debe = suma de haber)
            const totalDebe = lineasProcesadas.reduce((sum, l) => sum + l.debe, 0)
            const totalHaber = lineasProcesadas.reduce((sum, l) => sum + l.haber, 0)

            if (Math.abs(totalDebe - totalHaber) > 0.01) {
                throw new Error(`El asiento no está balanceado. Debe: ${totalDebe.toFixed(2)}, Haber: ${totalHaber.toFixed(2)}`)
            }

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_URL_BACK}/contabilidad/asientos`,
                {
                    empresaId: empresaId,
                    periodoId: formData.get('periodo-id') || undefined,
                    fecha: formData.get('fecha-asiento'),
                    descripcion: formData.get('descripcion-asiento'),
                    referencia: formData.get('referencia') || undefined,
                    origen: formData.get('origen') || 'MANUAL',
                    lineas: lineasProcesadas
                },
                {
                    headers: {
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                    }
                }
            )

            return data
        } catch (e) {
            console.error(e)
            throw new Error(e?.response?.data?.mensaje || e?.response?.data?.message || e.message || 'Error al crear asiento')
        }
    }

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: crearAsiento,
        onSuccess: (data) => {
            toast.success(data.mensaje || 'Asiento creado correctamente')
            queryClient.invalidateQueries({ queryKey: ['asientos_contables'] })
            changeModalCrearAsiento()
            // Resetear líneas
            setLineas([
                { cuentaId: '', codigoCuenta: '', descripcion: '', debe: '', haber: '', referenciaDocumento: '' },
                { cuentaId: '', codigoCuenta: '', descripcion: '', debe: '', haber: '', referenciaDocumento: '' }
            ])
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleSubmit = async (formData) => {
        if (!formData.get('descripcion-asiento') || formData.get('descripcion-asiento').trim().length < 5) {
            toast.error('La descripción debe tener al menos 5 caracteres')
            return
        }
        if (!formData.get('fecha-asiento')) {
            toast.error('La fecha del asiento es obligatoria')
            return
        }

        mutate(formData)
    }

    // Calcular totales (normalizando números)
    const totalDebe = lineas.reduce((sum, l) => sum + (normalizarNumero(l.debe) || 0), 0)
    const totalHaber = lineas.reduce((sum, l) => sum + (normalizarNumero(l.haber) || 0), 0)
    const diferencia = Math.abs(totalDebe - totalHaber)

    return (
        <Dialog open={modalCrearAsiento} onClose={() => changeModalCrearAsiento()} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">
                <DialogPanel className="w-[95%] md:w-[90%] max-w-6xl h-[90vh] md:h-auto max-h-[90vh] space-y-4 px-4 md:px-8 py-4 md:py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2] overflow-y-auto">
                    
                    <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                        Crear Asiento Contable
                    </DialogTitle>

                    <form action={handleSubmit} className="flex flex-col gap-4 mt-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="fecha-asiento" className="mb-1 text-gray-300">Fecha del Asiento</label>
                                <input
                                    id="fecha-asiento"
                                    name="fecha-asiento"
                                    type="date"
                                    required
                                    defaultValue={new Date().toISOString().split('T')[0]}
                                    className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="periodo-id" className="mb-1 text-gray-300">Periodo Contable (opcional)</label>
                                <select
                                    id="periodo-id"
                                    name="periodo-id"
                                    className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                >
                                    <option value="">Seleccione un periodo</option>
                                    {periodosDisponibles.map(periodo => (
                                        <option key={periodo.id} value={periodo.id}>
                                            {periodo.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="origen" className="mb-1 text-gray-300">Origen</label>
                                <select
                                    id="origen"
                                    name="origen"
                                    defaultValue="MANUAL"
                                    className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                >
                                    {ORIGENES_ASIENTO.map(origen => (
                                        <option key={origen.value} value={origen.value}>{origen.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="descripcion-asiento" className="mb-1 text-gray-300">Descripción del Asiento</label>
                            <input
                                id="descripcion-asiento"
                                name="descripcion-asiento"
                                type="text"
                                required
                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                placeholder="Ej: Asiento de apertura del mes"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="referencia" className="mb-1 text-gray-300">Referencia (opcional)</label>
                            <input
                                id="referencia"
                                name="referencia"
                                type="text"
                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                placeholder="Ej: DOC-001"
                            />
                        </div>

                        <div className="border-t border-[#486b8f] pt-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">Líneas del Asiento</h3>
                                <Button
                                    type="button"
                                    onClick={agregarLinea}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-3 py-1 text-sm"
                                >
                                    + Agregar Línea
                                </Button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-[#05121f]/60">
                                        <tr>
                                            <th className="text-start p-2">Cuenta</th>
                                            <th className="text-start p-2">Descripción</th>
                                            <th className="text-start p-2">Referencia Doc.</th>
                                            <th className="text-start p-2">Debe</th>
                                            <th className="text-start p-2">Haber</th>
                                            <th className="text-start p-2">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lineas.map((linea, index) => (
                                            <tr key={index} className="border-b border-[#2e5274]/60">
                                                <td className="p-2">
                                                    <select
                                                        value={linea.cuentaId}
                                                        onChange={(e) => {
                                                            actualizarLinea(index, 'cuentaId', e.target.value)
                                                            actualizarLinea(index, 'codigoCuenta', '')
                                                        }}
                                                        className="outline-none bg-[#2e4760] rounded px-2 py-1 border border-[#2e4760] focus:border-gray-300 text-gray-200 w-full text-xs"
                                                    >
                                                        <option value="">Seleccione cuenta</option>
                                                        {cuentasDisponibles.map(cuenta => (
                                                            <option key={cuenta.id} value={cuenta.id}>
                                                                {cuenta.codigo} - {cuenta.nombre}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <input
                                                        type="text"
                                                        value={linea.codigoCuenta}
                                                        onChange={(e) => {
                                                            actualizarLinea(index, 'codigoCuenta', e.target.value)
                                                            actualizarLinea(index, 'cuentaId', '')
                                                        }}
                                                        placeholder="O código (ej: 1.1.1)"
                                                        className="outline-none bg-[#2e4760] rounded px-2 py-1 border border-[#2e4760] focus:border-gray-300 text-gray-200 w-full mt-1 text-xs"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="text"
                                                        value={linea.descripcion}
                                                        onChange={(e) => actualizarLinea(index, 'descripcion', e.target.value)}
                                                        placeholder="Descripción línea"
                                                        className="outline-none bg-[#2e4760] rounded px-2 py-1 border border-[#2e4760] focus:border-gray-300 text-gray-200 w-full text-xs"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="text"
                                                        value={linea.referenciaDocumento}
                                                        onChange={(e) => actualizarLinea(index, 'referenciaDocumento', e.target.value)}
                                                        placeholder="Ref. Doc."
                                                        className="outline-none bg-[#2e4760] rounded px-2 py-1 border border-[#2e4760] focus:border-gray-300 text-gray-200 w-full text-xs"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={linea.debe}
                                                        onChange={(e) => {
                                                            actualizarLinea(index, 'debe', e.target.value)
                                                            if (e.target.value > 0) {
                                                                actualizarLinea(index, 'haber', '')
                                                            }
                                                        }}
                                                        placeholder="0.00"
                                                        className="outline-none bg-[#2e4760] rounded px-2 py-1 border border-[#2e4760] focus:border-gray-300 text-gray-200 w-24 text-xs"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={linea.haber}
                                                        onChange={(e) => {
                                                            actualizarLinea(index, 'haber', e.target.value)
                                                            if (e.target.value > 0) {
                                                                actualizarLinea(index, 'debe', '')
                                                            }
                                                        }}
                                                        placeholder="0.00"
                                                        className="outline-none bg-[#2e4760] rounded px-2 py-1 border border-[#2e4760] focus:border-gray-300 text-gray-200 w-24 text-xs"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    {lineas.length > 2 && (
                                                        <Button
                                                            type="button"
                                                            onClick={() => eliminarLinea(index)}
                                                            className="text-red-400 hover:text-red-500 text-xs"
                                                        >
                                                            Eliminar
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-[#05121f]/60">
                                        <tr>
                                            <td colSpan="3" className="text-right p-2 font-semibold">TOTALES:</td>
                                            <td className="p-2 font-semibold">${totalDebe.toFixed(2)}</td>
                                            <td className="p-2 font-semibold">${totalHaber.toFixed(2)}</td>
                                            <td className="p-2">
                                                {diferencia > 0.01 ? (
                                                    <span className="text-red-400 text-xs">Desbalanceado</span>
                                                ) : (
                                                    <span className="text-green-400 text-xs">Balanceado</span>
                                                )}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end mt-5">
                            <Button
                                type="button"
                                className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                onClick={() => changeModalCrearAsiento()}
                                disabled={isPending}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending || diferencia > 0.01}
                                className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 border border-gray-100 text-gray-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? 'Creando...' : 'Crear Asiento'}
                            </Button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

