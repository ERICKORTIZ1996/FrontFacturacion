'use client'

import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { toast } from 'react-toastify';
import { quitarEmojing } from '@/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'

export default function ModalCrearUsuario() {

    const modalCrearUsuario = useMainStore((state) => state.modalCrearUsuario)
    const changeModalCrearUsuario = useMainStore((state) => state.changeModalCrearUsuario)

    const [viewPass, setViewPass] = useState(false)
    const [viewConfirmPass, setViewConfirmPass] = useState(false)

    const queryClient = useQueryClient();

    const handleSubmit = async (formData) => {
        mutate(formData)
    }

    const crearUsuario = async (formData) => {

        try {
            const { data: dataUsuario } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/auth/registro`, {
                nombre: formData.get('nombre-usuario'),
                email: formData.get('email-usuario'),
                contraseña: formData.get('password'),
                confirmarContraseña: formData.get('confirmar-password'),
                rol: formData.get('rol'),
                empresaId: formData.get('empresa'),
                tipoIdentificacion: formData.get('tipo-identificacion'),
                identificacion: formData.get('identificacion')
            })

            return dataUsuario

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
        mutationFn: crearUsuario, // Funcion a consultar
        onSuccess: (dataUsuario) => { // Petición exitosa

            toast.success(quitarEmojing(dataUsuario.message))
            queryClient.invalidateQueries({ queryKey: ['crear_usuario'] });
            changeModalCrearUsuario()

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
            <Dialog open={modalCrearUsuario} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[95%] md:w-[40%] max-w-md md:max-w-none h-[90vh] md:h-[90%] space-y-4 px-4 md:px-8 py-4 md:py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2]">

                        <div className='flex h-full flex-col justify-between'>
                            <form
                                action={handleSubmit}
                                className='overflow-y-auto h-full barra pr-8'
                                id='form-crear-producto-stock'
                            >

                                <DialogTitle className="font-semibold text-lg md:text-xl text-center w-full uppercase">
                                    Crear Usuario
                                </DialogTitle>

                                <h2 className='my-3 md:my-5 text-lg md:text-xl flex gap-2 items-center'>

                                    <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-gray-200 text-gray-800">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                        </svg>
                                    </span>

                                    Datos
                                </h2>

                                <div className='flex flex-col gap-5'>

                                    <div className='flex flex-col'>
                                        <label htmlFor="nombre-usuario" className='mb-1 text-sm md:text-base'>Nombre</label>
                                        <input
                                            id='nombre-usuario'
                                            type="text"
                                            name='nombre-usuario'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base'
                                            placeholder='Ej: Juan Pérez'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="email-usuario" className='mb-1 text-sm md:text-base'>Email</label>
                                        <input
                                            id='email-usuario'
                                            type="email"
                                            name='email-usuario'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base'
                                            placeholder='Ej: juan@ejemplo.com'
                                        />
                                    </div>

                                    <div className='flex flex-col md:flex-row gap-3 md:gap-5 w-full'>
                                        <div className='flex-1 flex flex-col relative'>

                                            <label htmlFor="password" className='mb-1 text-sm md:text-base'>Contraseña</label>
                                            <input
                                                id='password'
                                                type={`${viewPass ? 'text' : 'password'}`}
                                                name='password'
                                                className='outline-none bg-[#2e4760] rounded-lg pl-3 pr-10 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base w-full'
                                                placeholder='Ingresa la contraseña'
                                            />

                                            <button
                                                type="button"
                                                className="absolute top-[28px] md:top-[30px] right-[5px] cursor-pointer hover:bg-[#102940] rounded-full transition-colors p-1"
                                                onClick={() => setViewPass(!viewPass)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 md:size-5 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className='flex-1 flex flex-col relative'>

                                            <label htmlFor="confirmar-password" className='mb-1 text-sm md:text-base'>Confirmar Contraseña</label>
                                            <input
                                                id='confirmar-password'
                                                type={`${viewConfirmPass ? 'text' : 'password'}`}
                                                name='confirmar-password'
                                                className='outline-none bg-[#2e4760] rounded-lg pl-3 py-1 pr-10 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base w-full'
                                                placeholder='Confirma la contraseña'
                                            />

                                            <button
                                                type="button"
                                                className="absolute top-[28px] md:top-[30px] right-[5px] cursor-pointer hover:bg-[#102940] rounded-full transition-colors p-1"
                                                onClick={() => setViewConfirmPass(!viewConfirmPass)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 md:size-5 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex flex-col md:flex-row gap-3 md:gap-5 w-full'>
                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="rol" className='mb-1 text-sm md:text-base'>Rol</label>
                                            <select
                                                id="rol"
                                                name="rol"
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full text-sm md:text-base'
                                            >
                                                <option value="">-- Seleccionar --</option>
                                                <option value="USUARIO">Usuario</option>
                                                <option value="SUPER_ADMINISTRADOR">Super Administrador</option>
                                                <option value="ADMINISTRADOR">Administrador</option>
                                                <option value="AUDITOR">Auditor</option>
                                            </select>
                                        </div>

                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="empresa" className='mb-1 text-sm md:text-base'>Empresa</label>
                                            <select
                                                id="empresa"
                                                name="empresa"
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full text-sm md:text-base'
                                            >
                                                <option value="">-- Seleccionar --</option>
                                                <option value="5852cc6d-7139-4a9e-a300-159f28bdd4e6">DATASMART S.A.S.</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='flex flex-col md:flex-row gap-3 md:gap-5 w-full'>
                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="tipo-identificacion" className='mb-1 text-sm md:text-base'>Tipo Identificación</label>

                                            <select
                                                id="tipo-identificacion"
                                                name="tipo-identificacion"
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full text-sm md:text-base'
                                            >
                                                <option value="">-- Seleccionar --</option>
                                                <option value="CEDULA">CEDULA</option>
                                            </select>
                                        </div>

                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="identificacion" className='mb-1 text-sm md:text-base'>Identificación</label>
                                            <input
                                                id='identificacion'
                                                type="text"
                                                name='identificacion'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base w-full'
                                                placeholder='Ej: 1234567890'
                                                maxLength={10}
                                            />
                                        </div>
                                    </div>


                                </div>
                            </form>

                            <form className='border-t border-t-[#486b8f] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-end pt-3 md:pt-5'>
                                <Button
                                    className="font-semibold text-sm md:text-base text-gray-100 cursor-pointer rounded-xl transition-colors px-3 md:px-4 py-2 md:py-1 border border-gray-100 flex gap-2 items-center justify-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                    onClick={() => {
                                        changeModalCrearUsuario()
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 md:size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    Cancelar
                                </Button>

                                <Button
                                    className={`bg-gray-100 font-semibold text-sm md:text-base cursor-pointer rounded-xl px-3 md:px-4 py-2 md:py-1 border border-gray-100 text-gray-800 flex items-center justify-center`}
                                    type='submit'
                                    form='form-crear-producto-stock'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 md:size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    Crear Usuario
                                </Button>
                            </form>
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
