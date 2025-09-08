'use client'

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { toast } from 'react-toastify';
import { quitarEmojing } from '@/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'

export default function ModalCrearAdministrador() {

    const modalCrearAdministrador = useMainStore((state) => state.modalCrearAdministrador)
    const changeModalCrearAdministrador = useMainStore((state) => state.changeModalCrearAdministrador)

    const queryClient = useQueryClient();

    const handleSubmit = async (formData) => {
        mutate(formData)
    }

    const crearProducto = async (formData) => {

        try {
            const { data: dataAdmin } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/usuarios`, {
                nombre: formData.get('nombre-admin'),
                email: formData.get('email-admin'),
                rol: formData.get('rol'),
            })

            return dataAdmin

        } catch (e) {
            if (e?.response?.data?.errores) {
                const errorConArray = new Error();
                errorConArray.message = e.response.data.errores;
                throw errorConArray;
            } else {
                throw new Error(quitarEmojing(e?.response?.data?.message));
            }
        }
    };

    const { mutate } = useMutation({
        mutationFn: crearProducto, // Funcion a consultar
        onSuccess: (dataFactura) => { // Petición exitosa

            toast.success(quitarEmojing(dataFactura.message))
            queryClient.invalidateQueries({ queryKey: ['crear_administrador'] });
            changeModalCrearAdministrador()

        },
        onError: (error) => {
            if (Array.isArray(error.message)) {
                error.message.forEach(e => toast.error(`${e.campo.toUpperCase()}: ${e.mensaje}`))
            } else {
                toast.error(error.message)
            }
        }
    })

    return (
        <>
            <Dialog open={modalCrearAdministrador} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[100%] md:w-[35%] h-[70%] space-y-4 px-8 py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2]">

                        <div className='flex h-full flex-col justify-between'>
                            <form
                                action={handleSubmit}
                                className='overflow-y-auto h-full barra pr-8'
                                id='form-crear-producto-stock'
                            >

                                <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                                    Crear Administrador
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
                                        <label htmlFor="nombre-admin" className='mb-1'>Nombre</label>
                                        <input
                                            id='nombre-admin'
                                            type="text"
                                            name='nombre-admin'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Pantalones Jeans'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="email-admin" className='mb-1'>Email</label>
                                        <input
                                            id='email-admin'
                                            type="email"
                                            name='email-admin'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Pantalones Jeans para Hombre, talla XL'
                                        />
                                    </div>

                                    <div className='flex-1 flex flex-col'>

                                        <label htmlFor="rol" className='mb-1'>Rol</label>
                                        <select
                                            id="rol"
                                            name="rol"
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                        >
                                            <option value="">-- Seleccionar --</option>
                                            <option value="USUARIO">Usuario</option>
                                            <option value="SUPER_ADMINISTRADOR">Super Administrador</option>
                                            <option value="ADMINISTRADOR">Administrador</option>
                                            <option value="AUDITOR">Auditor</option>
                                        </select>
                                    </div>
                                </div>
                            </form>

                            <form className='border-t border-t-[#486b8f] flex gap-3 items-center justify-end pt-5'>
                                <Button
                                    className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                    onClick={() => {
                                        changeModalCrearAdministrador()
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    Cancelar
                                </Button>

                                <Button
                                    className={`bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 border border-gray-100 text-gray-800 flex items-center text-nowrap`}
                                    type='submit'
                                    form='form-crear-producto-stock'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    Crear Administrador
                                </Button>
                            </form>
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
