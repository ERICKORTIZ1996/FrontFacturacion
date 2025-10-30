'use client'

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export default function ModalCrearPeriodo({ empresaId }) {

    const modalCrearPeriodo = useMainStore((state) => state.modalCrearPeriodo)
    const changeModalCrearPeriodo = useMainStore((state) => state.changeModalCrearPeriodo)
    const dataUser = useMainStore((state) => state.dataUser)

    const crearPeriodo = async (formData) => {
        try {
            if (!dataUser?.tokenAcceso) {
                throw new Error('No estás autenticado')
            }
            if (!empresaId) {
                throw new Error('Debes seleccionar una empresa')
            }

            const fechaInicio = formData.get('fecha-inicio')
            const fechaFin = formData.get('fecha-fin')

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_URL_BACK}/contabilidad/periodos`,
                {
                    empresaId: empresaId,
                    nombre: formData.get('nombre-periodo'),
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin,
                    descripcion: formData.get('descripcion') || ''
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
            throw new Error(e?.response?.data?.mensaje || e?.response?.data?.message || 'Error al crear periodo')
        }
    }

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: crearPeriodo,
        onSuccess: (data) => {
            toast.success(data.mensaje || 'Periodo creado correctamente')
            queryClient.invalidateQueries({ queryKey: ['periodos_contables'] })
            changeModalCrearPeriodo()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleSubmit = async (formData) => {
        if (!formData.get('nombre-periodo')) {
            toast.error('El nombre del periodo es obligatorio')
            return
        }
        if (!formData.get('fecha-inicio')) {
            toast.error('La fecha de inicio es obligatoria')
            return
        }
        if (!formData.get('fecha-fin')) {
            toast.error('La fecha de fin es obligatoria')
            return
        }

        const fechaInicio = new Date(formData.get('fecha-inicio'))
        const fechaFin = new Date(formData.get('fecha-fin'))

        if (fechaFin < fechaInicio) {
            toast.error('La fecha de fin debe ser mayor o igual a la fecha de inicio')
            return
        }

        mutate(formData)
    }

    return (
        <Dialog open={modalCrearPeriodo} onClose={() => changeModalCrearPeriodo()} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">
                <DialogPanel className="w-[95%] md:w-[50%] max-w-xl md:max-w-none h-[90vh] md:h-auto space-y-4 px-4 md:px-8 py-4 md:py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2] overflow-y-auto">
                    
                    <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                        Crear Periodo Contable
                    </DialogTitle>

                    <form action={handleSubmit} className="flex flex-col gap-4 mt-5">
                        <div className="flex flex-col">
                            <label htmlFor="nombre-periodo" className="mb-1 text-gray-300">Nombre del Periodo</label>
                            <input
                                id="nombre-periodo"
                                name="nombre-periodo"
                                type="text"
                                required
                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                placeholder="Ej: 2024, Primer Trimestre 2024"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="fecha-inicio" className="mb-1 text-gray-300">Fecha de Inicio</label>
                            <input
                                id="fecha-inicio"
                                name="fecha-inicio"
                                type="date"
                                required
                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="fecha-fin" className="mb-1 text-gray-300">Fecha de Fin</label>
                            <input
                                id="fecha-fin"
                                name="fecha-fin"
                                type="date"
                                required
                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="descripcion" className="mb-1 text-gray-300">Descripción (opcional)</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                rows="3"
                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                placeholder="Descripción adicional del periodo"
                            />
                        </div>

                        <div className="flex gap-3 justify-end mt-5">
                            <Button
                                type="button"
                                className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                onClick={() => changeModalCrearPeriodo()}
                                disabled={isPending}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 border border-gray-100 text-gray-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? 'Creando...' : 'Crear Periodo'}
                            </Button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

