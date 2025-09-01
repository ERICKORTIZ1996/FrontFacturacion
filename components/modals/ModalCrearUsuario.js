'use client'

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { toast } from 'react-toastify';
import { productoStockSchema } from '@/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'

export default function ModalCrearUsuario() {

    const modalCrearUsuario = useMainStore((state) => state.modalCrearUsuario)
    const changeModalCrearUsuario = useMainStore((state) => state.changeModalCrearUsuario)

    const queryClient = useQueryClient();

    const handleSubmit = async (formData) => {

        const data = {
            nombreUsuario: formData.get('nombre-usuario'),
            emailUsuario: formData.get('email-usuario'),
            password: formData.get('password'),
            confirmarPassword: formData.get('confirmar-password'),
            rol: formData.get('rol'),
            empresa: formData.get('empresa'),
            tipoIdentificacion: formData.get('tipo-identificacion'),
            identificacion: formData.get('identificacion')
        }

        // const result = productoStockSchema.safeParse(data)

        // if (!result.success) {
        //     result.error.issues.forEach((issue) => {
        //         toast.error(issue.message)
        //     })
        //     return
        // }

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
            console.log(e);
            throw new Error(e?.response?.data?.mensaje || e?.response?.data?.message?.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim());
        }
    };

    const { mutate } = useMutation({
        mutationFn: crearUsuario, // Funcion a consultar
        onSuccess: (dataUsuario) => { // Petición exitosa

            toast.success(dataUsuario.message.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim())
            // queryClient.invalidateQueries({ queryKey: ['crear_producto'] });
            // changeModalCrearUsuario()

        },
        onError: (error) => {
            toast.error(error.message);
        }
    })


    return (
        <>
            <Dialog open={modalCrearUsuario} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[100%] md:w-[40%] h-[90%] space-y-4 px-8 py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2]">

                        <div className='flex h-full flex-col justify-between'>
                            <form
                                action={handleSubmit}
                                className='overflow-y-auto h-full barra pr-8'
                                id='form-crear-producto-stock'
                            >

                                <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                                    Crear Usuario
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
                                        <label htmlFor="nombre-usuario" className='mb-1'>Nombre</label>
                                        <input
                                            id='nombre-usuario'
                                            type="text"
                                            name='nombre-usuario'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Pantalones Jeans'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="email-usuario" className='mb-1'>Email</label>
                                        <input
                                            id='email-usuario'
                                            type="text"
                                            name='email-usuario'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Pantalones Jeans para Hombre, talla XL'
                                        />
                                    </div>

                                    <div className='flex gap-5 w-full'>
                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="password" className='mb-1'>Contraseña</label>
                                            <input
                                                id='password'
                                                type="text"
                                                name='password'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                placeholder='Ej: Pantalones Jeans para Hombre, talla XL'
                                            />
                                        </div>

                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="confirmar-password" className='mb-1'>Confirmar Contraseña</label>
                                            <input
                                                id='confirmar-password'
                                                type="text"
                                                name='confirmar-password'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                placeholder='Ej: Pantalones Jeans para Hombre, talla XL'
                                            />
                                        </div>
                                    </div>

                                    <div className='flex gap-5 w-full'>
                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="rol" className='mb-1'>Rol</label>
                                            <select
                                                id="rol"
                                                name="rol"
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                                defaultValue="USUARIO"
                                            >
                                                <option value="USUARIO">USUARIO</option>
                                                <option value="iva2">ICE</option>
                                                <option value="iva3">IRBPNR</option>
                                                <option value="iva4">IEPS</option>
                                            </select>
                                        </div>

                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="empresa" className='mb-1'>Empresa</label>
                                            <select
                                                id="empresa"
                                                name="empresa"
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                                defaultValue="ffbcf58d-2043-4256-8477-68845e615972"
                                            >
                                                <option value="ffbcf58d-2043-4256-8477-68845e615972">ffbcf58d-2043-4256-8477-68845e615972</option>
                                                <option value="iva2">ICE</option>
                                                <option value="iva3">IRBPNR</option>
                                                <option value="iva4">IEPS</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='flex gap-5 w-full'>
                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="tipo-identificacion" className='mb-1'>Tipo Identificación</label>

                                            <select
                                                id="tipo-identificacion"
                                                name="tipo-identificacion"
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                                defaultValue="CEDULA"
                                            >
                                                <option value="CEDULA">CEDULA</option>
                                                <option value="iva2">ICE</option>
                                                <option value="iva3">IRBPNR</option>
                                                <option value="iva4">IEPS</option>
                                            </select>
                                        </div>

                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="identificacion" className='mb-1'>Identificación</label>
                                            <input
                                                id='identificacion'
                                                type="text"
                                                name='identificacion'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                placeholder='Ej: Pantalones Jeans para Hombre, talla XL'
                                            />
                                        </div>
                                    </div>


                                </div>
                            </form>

                            <form className='border-t border-t-[#486b8f] flex gap-3 items-center justify-end pt-5'>
                                <Button
                                    className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                    onClick={() => {
                                        changeModalCrearUsuario()
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
                                    form='form-crear-producto-stock'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    Crear Producto
                                </Button>
                            </form>
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
