'use client'

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { toast } from 'react-toastify';
import { crearEmpresaSchema } from '@/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'

export default function ModalCrearEmpresa() {

    const modalCrearEmpresa = useMainStore((state) => state.modalCrearEmpresa)
    const changeModalCrearEmpresa = useMainStore((state) => state.changeModalCrearEmpresa)

    const handleSubmit = async (formData) => {

        const data = {
            ruc: formData.get('ruc-empresa'),
            razonSocial: formData.get('razon-social'),
            dirMatriz: formData.get('dir-matriz'),
            obligadoContabilidad: formData.get('obligado-contabilidad'),
            sucursal: {
                estab: formData.get('estab'),
                nombre: formData.get('nombre-sucursal'),
                dirEstablecimiento: formData.get('direccion-empresa')
            },
            puntoEmision: {
                ptoEmi: formData.get('punto-emision'),
                secuencialActual: 1
            }
        }

        const result = crearEmpresaSchema.safeParse(data)

        if (!result.success) {

            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        mutate(formData)
    }

    const crearEmpresa = async (formData) => {

        try {
            const { data: dataEmpresa } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/empresas`, {
                ruc: formData.get('ruc-empresa'),
                razonSocial: formData.get('razon-social'),
                dirMatriz: formData.get('dir-matriz'),
                obligadoContabilidad: formData.get('obligado-contabilidad'),
                sucursal: {
                    estab: formData.get('estab'),
                    nombre: formData.get('nombre-sucursal'),
                    dirEstablecimiento: formData.get('direccion-empresa')
                },
                puntoEmision: {
                    ptoEmi: formData.get('punto-emision'),
                    secuencialActual: 1
                }
            })

            return dataEmpresa

        } catch (e) {
            console.log(e);
            throw new Error(e?.response?.data?.mensaje || e?.response?.data?.message?.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim());
        }
    };

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: crearEmpresa, // Funcion a consultar
        onSuccess: (dataEmpresa) => { // Petición exitosa
            toast.success(dataEmpresa.message.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim())
            queryClient.invalidateQueries({ queryKey: ['empresas'] }); // Traer los datos actualizados
            changeModalCrearEmpresa()
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return (
        <>
            <Dialog open={modalCrearEmpresa} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[95%] md:w-[65%] max-w-2xl md:max-w-none h-[90vh] md:h-[85%] space-y-4 px-4 md:px-8 py-4 md:py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2] overflow-y-auto">

                        <div className='flex h-full flex-col justify-between'>
                            <form
                                action={handleSubmit}
                                className='overflow-y-auto h-full barra pr-8'
                                id='form-crear-empresa'
                            >

                                <DialogTitle className="font-semibold text-lg md:text-xl text-center w-full uppercase">
                                    Crear Empresa
                                </DialogTitle>

                                <h2 className='my-3 md:my-5 text-lg md:text-xl flex gap-2 items-center'>

                                    <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-gray-200 text-gray-800">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                        </svg>
                                    </span>

                                    Datos Generales
                                </h2>

                                <div className='flex flex-col md:flex-row gap-3 md:gap-5'>
                                    <div className='flex flex-col flex-1'>
                                        <label htmlFor="ruc-empresa" className='mb-1 text-sm md:text-base'>Ruc</label>
                                        <input
                                            id='ruc-empresa'
                                            type="text"
                                            name='ruc-empresa'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base w-full'
                                            placeholder='Ej: 1754854585001'
                                            minLength={13}
                                            maxLength={13}
                                        />
                                    </div>

                                    <div className='flex flex-col flex-1'>
                                        <label htmlFor="razon-social" className='mb-1 text-sm md:text-base'>Razon Social</label>
                                        <input
                                            id='razon-social'
                                            type="text"
                                            name='razon-social'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base w-full'
                                            placeholder='Ej: ORTIZ MENDOZA ERICK ALEXANDER'
                                        />
                                    </div>

                                    <div className='flex flex-col flex-1'>
                                        <label htmlFor="dir-matriz" className='mb-1 text-sm md:text-base'>Dirección</label>
                                        <input
                                            id='dir-matriz'
                                            type="text"
                                            name='dir-matriz'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base w-full'
                                            placeholder='Ej: PICHINCHA / QUITO / COCHAPAMBA / N54 LT-20 Y N54A'
                                        />
                                    </div>

                                    <div className='flex flex-col flex-1'>
                                        <label htmlFor="obligado-contabilidad" className='mb-1 text-sm md:text-base'>Obligado a llevar contabilidad</label>

                                        <select
                                            name="obligado-contabilidad"
                                            id="obligado-contabilidad"
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base w-full'
                                        >
                                            <option value="">-- Seleccionar Opción --</option>
                                            <option value="SI">Si</option>
                                            <option value="NO">No</option>
                                        </select>
                                    </div>
                                </div>

                                <h2 className='my-3 md:my-5 text-lg md:text-xl flex gap-2 items-center'>

                                    <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-gray-200 text-gray-800">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                        </svg>
                                    </span>

                                    Sucursal
                                </h2>

                                <div className='flex flex-col md:flex-row gap-3 md:gap-5'>
                                    <div className='flex flex-col flex-1'>
                                        <label htmlFor="estab" className='mb-1 text-sm md:text-base'>Establecimiento</label>
                                        <input
                                            id='estab'
                                            type="text"
                                            name='estab'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base w-full'
                                            placeholder='001'
                                            minLength={3}
                                            maxLength={3}
                                        />
                                    </div>

                                    <div className='flex flex-col flex-1'>
                                        <label htmlFor="nombre-sucursal" className='mb-1 text-sm md:text-base'>Nombre</label>
                                        <input
                                            id='nombre-sucursal'
                                            type="text"
                                            name='nombre-sucursal'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base w-full'
                                            placeholder='Ej: Gran Akí'
                                        />
                                    </div>

                                    <div className='flex flex-col flex-1'>
                                        <label htmlFor="direccion-empresa" className='mb-1 text-sm md:text-base'>Dirección</label>
                                        <input
                                            id='direccion-empresa'
                                            type="text"
                                            name='direccion-empresa'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base w-full'
                                            placeholder='Ej: Av.Rio Amazonas y Naciones Unidas'
                                        />
                                    </div>
                                </div>

                                <h2 className='my-3 md:my-5 text-lg md:text-xl flex gap-2 items-center'>

                                    <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-gray-200 text-gray-800">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                        </svg>
                                    </span>

                                    Punto de Emisión
                                </h2>

                                <div className='flex flex-col md:flex-row gap-3 md:gap-5'>
                                    <div className='flex flex-col flex-1'>
                                        <label htmlFor="punto-emision" className='mb-1 text-sm md:text-base'>Punto Emisión</label>
                                        <input
                                            id='punto-emision'
                                            type="text"
                                            name='punto-emision'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base w-full'
                                            placeholder='001'
                                            minLength={3}
                                            maxLength={3}
                                        />
                                    </div>

                                    {/* <div className='flex flex-col flex-1'>
                                        <label htmlFor="secuencial-empresa" className='mb-1 text-sm md:text-base'>Secuencial</label>
                                        <input
                                            id='secuencial-empresa'
                                            type="text"
                                            name='secuencial-empresa'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base w-full'
                                            placeholder='Ej: 1'
                                        />
                                    </div> */}
                                </div>

                            </form>

                            <form className='border-t border-t-[#486b8f] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-end pt-3 md:pt-5'>
                                <Button
                                    className="font-semibold text-sm md:text-base text-gray-100 cursor-pointer rounded-xl transition-colors px-3 md:px-4 py-2 md:py-1 border border-gray-100 flex gap-2 items-center justify-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                    onClick={() => {
                                        changeModalCrearEmpresa()
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
                                    form='form-crear-empresa'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 md:size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    Crear Empresa
                                </Button>
                            </form>
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
