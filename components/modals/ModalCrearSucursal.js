'use client'

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { toast } from 'react-toastify';
import { crearSucursalSchema } from '@/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'

export default function ModalCrearSucursal() {

    const modalCrearSucursal = useMainStore((state) => state.modalCrearSucursal)
    const changeModalCrearSucursal = useMainStore((state) => state.changeModalCrearSucursal)

    const handleSubmit = async (formData) => {
        const data = {
            ruc: formData.get('ruc-empresa'),
            estab: formData.get('estab'),
            nombre: formData.get('nombre-sucursal'),
            dirEstablecimiento: formData.get('direccion-sucursal')
        }

        const result = crearSucursalSchema.safeParse(data)

        if (!result.success) {

            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        mutate(formData)
    }

    const crearSucursal = async (formData) => {

        try {
            const { data: dataSucursal } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/sucursales`, {
                ruc: formData.get('ruc-empresa'),
                estab: formData.get('estab'),
                nombre: formData.get('nombre-sucursal'),
                dirEstablecimiento: formData.get('direccion-sucursal')
            })

            return dataSucursal

        } catch (e) {
            console.log(e);
            throw new Error(e?.response?.data?.mensaje || e?.response?.data?.message?.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim());

        }
    };

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: crearSucursal, // Funcion a consultar
        onSuccess: (dataSucursal) => { // Petición exitosa
            toast.success(dataSucursal.message.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim())
            queryClient.invalidateQueries({ queryKey: ['sucursales'] }); // Traer los datos actualizados
            changeModalCrearSucursal()
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return (
        <>
            <Dialog open={modalCrearSucursal} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[100%] md:w-[35%] h-[85%] space-y-4 px-8 py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2]">

                        <div className='flex h-full flex-col justify-between'>
                            <form
                                action={handleSubmit}
                                className='overflow-y-auto h-full barra pr-8'
                                id='form-crear-sucursal'
                            >

                                <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                                    Crear Sucursal
                                </DialogTitle>

                                <h2 className='my-5 text-xl flex gap-2 items-center'>

                                    <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-gray-200 text-gray-800">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                        </svg>
                                    </span>

                                    Datos
                                </h2>

                                <div className='flex flex-col gap-5'>

                                    <div className='flex flex-col'>
                                        <label htmlFor="ruc-empresa" className='mb-1'>Ruc</label>
                                        <input
                                            id='ruc-empresa'
                                            type="text"
                                            name='ruc-empresa'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: 1754854585001'
                                            minLength={13}
                                            maxLength={13}
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="estab" className='mb-1'>Establecimiento</label>
                                        <input
                                            id='estab'
                                            type="text"
                                            name='estab'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='001'
                                            minLength={3}
                                            maxLength={3}
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="nombre-sucursal" className='mb-1'>Nombre</label>
                                        <input
                                            id='nombre-sucursal'
                                            type="text"
                                            name='nombre-sucursal'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Sucursal Sur'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="direccion-sucursal" className='mb-1'>Dirección</label>
                                        <input
                                            id='direccion-sucursal'
                                            type="text"
                                            name='direccion-sucursal'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Av.Rio Amazonas y Naciones Unidas'
                                        />
                                    </div>

                                </div>
                            </form>

                            <form className='border-t border-t-[#486b8f] flex gap-3 items-center justify-end pt-5'>
                                <Button
                                    className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                    onClick={() => {
                                        changeModalCrearSucursal()
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    Cancelar
                                </Button>

                                <Button
                                    className={`bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 border border-gray-100 text-gray-800 flex items-center`}
                                    type='submit'
                                    form='form-crear-sucursal'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    Crear Sucursal
                                </Button>
                            </form>
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
