'use client'

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const TIPOS_CUENTA = [
    { value: 'ACTIVO', label: 'Activo' },
    { value: 'PASIVO', label: 'Pasivo' },
    { value: 'PATRIMONIO', label: 'Patrimonio' },
    { value: 'INGRESO', label: 'Ingreso' },
    { value: 'GASTO', label: 'Gasto' }
]

const NATURALEZAS = [
    { value: 'DEUDORA', label: 'Deudora' },
    { value: 'ACREEDORA', label: 'Acreedora' }
]

export default function ModalCrearCuenta({ empresaId, planCuentas }) {

    const modalCrearCuenta = useMainStore((state) => state.modalCrearCuenta)
    const changeModalCrearCuenta = useMainStore((state) => state.changeModalCrearCuenta)
    const dataUser = useMainStore((state) => state.dataUser)

    // Función recursiva para obtener todas las cuentas en una lista plana
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

    const crearCuenta = async (formData) => {
        try {
            if (!dataUser?.tokenAcceso) {
                throw new Error('No estás autenticado')
            }
            if (!empresaId) {
                throw new Error('Debes seleccionar una empresa')
            }

            const codigo = formData.get('codigo-cuenta')
            if (!/^[0-9.]+$/.test(codigo)) {
                throw new Error('El código solo puede contener números y puntos')
            }

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_URL_BACK}/contabilidad/plan-cuentas`,
                {
                    empresaId: empresaId,
                    codigo: codigo,
                    nombre: formData.get('nombre-cuenta'),
                    descripcion: formData.get('descripcion') || null,
                    tipo: formData.get('tipo-cuenta'),
                    naturaleza: formData.get('naturaleza') || 'DEUDORA',
                    esMovimiento: formData.get('es-movimiento') === 'true' || formData.get('es-movimiento') === 'on',
                    requiereCentroCosto: formData.get('requiere-centro-costo') === 'true' || formData.get('requiere-centro-costo') === 'on',
                    cuentaPadreId: formData.get('cuenta-padre') || null
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
            throw new Error(e?.response?.data?.mensaje || e?.response?.data?.message || 'Error al crear cuenta')
        }
    }

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: crearCuenta,
        onSuccess: (data) => {
            toast.success(data.mensaje || 'Cuenta creada correctamente')
            queryClient.invalidateQueries({ queryKey: ['plan_cuentas'] })
            changeModalCrearCuenta()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleSubmit = async (formData) => {
        if (!formData.get('codigo-cuenta')) {
            toast.error('El código de la cuenta es obligatorio')
            return
        }
        if (!formData.get('nombre-cuenta') || formData.get('nombre-cuenta').trim().length < 3) {
            toast.error('El nombre debe tener al menos 3 caracteres')
            return
        }
        if (!formData.get('tipo-cuenta')) {
            toast.error('El tipo de cuenta es obligatorio')
            return
        }

        mutate(formData)
    }

    return (
        <Dialog open={modalCrearCuenta} onClose={() => changeModalCrearCuenta()} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">
                <DialogPanel className="w-[95%] md:w-[60%] max-w-xl md:max-w-none h-[90vh] md:h-auto max-h-[90vh] space-y-4 px-4 md:px-8 py-4 md:py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2] overflow-y-auto">
                    
                    <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                        Crear Cuenta Contable
                    </DialogTitle>

                    <form action={handleSubmit} className="flex flex-col gap-4 mt-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="codigo-cuenta" className="mb-1 text-gray-300">Código de Cuenta</label>
                                <input
                                    id="codigo-cuenta"
                                    name="codigo-cuenta"
                                    type="text"
                                    required
                                    className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                    placeholder="Ej: 1.1.1, 4.1.2"
                                />
                                <p className="text-xs text-gray-400 mt-1">Solo números y puntos (ej: 1.1.1)</p>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="nombre-cuenta" className="mb-1 text-gray-300">Nombre de la Cuenta</label>
                                <input
                                    id="nombre-cuenta"
                                    name="nombre-cuenta"
                                    type="text"
                                    required
                                    className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                    placeholder="Ej: Caja General"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="tipo-cuenta" className="mb-1 text-gray-300">Tipo de Cuenta</label>
                                <select
                                    id="tipo-cuenta"
                                    name="tipo-cuenta"
                                    required
                                    className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                >
                                    <option value="">Seleccione un tipo</option>
                                    {TIPOS_CUENTA.map(tipo => (
                                        <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="naturaleza" className="mb-1 text-gray-300">Naturaleza</label>
                                <select
                                    id="naturaleza"
                                    name="naturaleza"
                                    defaultValue="DEUDORA"
                                    className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                >
                                    {NATURALEZAS.map(nat => (
                                        <option key={nat.value} value={nat.value}>{nat.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="cuenta-padre" className="mb-1 text-gray-300">Cuenta Padre (opcional)</label>
                            <select
                                id="cuenta-padre"
                                name="cuenta-padre"
                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                            >
                                <option value="">Ninguna (cuenta raíz)</option>
                                {cuentasDisponibles.map(cuenta => (
                                    <option key={cuenta.id} value={cuenta.id}>
                                        {cuenta.codigo} - {cuenta.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="descripcion" className="mb-1 text-gray-300">Descripción (opcional)</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                rows="3"
                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                placeholder="Descripción adicional de la cuenta"
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <input
                                    id="es-movimiento"
                                    name="es-movimiento"
                                    type="checkbox"
                                    defaultChecked
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor="es-movimiento" className="text-gray-300 cursor-pointer">
                                    Es cuenta de movimiento
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    id="requiere-centro-costo"
                                    name="requiere-centro-costo"
                                    type="checkbox"
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor="requiere-centro-costo" className="text-gray-300 cursor-pointer">
                                    Requiere centro de costo
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end mt-5">
                            <Button
                                type="button"
                                className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                onClick={() => changeModalCrearCuenta()}
                                disabled={isPending}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 border border-gray-100 text-gray-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? 'Creando...' : 'Crear Cuenta'}
                            </Button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

