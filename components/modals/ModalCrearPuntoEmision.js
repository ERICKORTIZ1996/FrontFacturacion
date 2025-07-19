'use client'

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { toast } from 'react-toastify';
import { crearPuntoEmisionSchema } from '@/schema';
import axios from 'axios'

export default function ModalCrearPuntoEmision() {

    const modalCrearPuntoEmision = useMainStore((state) => state.modalCrearPuntoEmision)
    const changeModalCrearPuntoEmision = useMainStore((state) => state.changeModalCrearPuntoEmision)

    const crearPuntoEmision = async (formData) => {

        const data = {
            ruc: formData.get('ruc-empresa'),
            estab: formData.get('estab'),
            ptoEmi: formData.get('punto-emision')
        }

        const result = crearPuntoEmisionSchema.safeParse(data)

        if (!result.success) {

            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        try {
            const { data: dataPuntoEmision } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/puntos-emision`, {
                ruc: formData.get('ruc-empresa'),
                estab: formData.get('estab'),
                ptoEmi: formData.get('punto-emision')
            })

            toast.success(dataPuntoEmision.message.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim())
            changeModalCrearPuntoEmision()

        } catch (e) {
            toast.error(e?.response?.data?.mensaje || e?.response?.data?.message?.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim());
            console.log(e);
        }
    };

    return (
        <>
            <Dialog open={modalCrearPuntoEmision} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 main-background">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[100%] md:w-[30%] h-[70%] space-y-4 px-8 py-6 rounded-3xl bg-gradient-to-b from-[#153350]/60 to-[#1f3850]/60">

                        <div className='flex h-full flex-col justify-between'>
                            <form
                                action={crearPuntoEmision}
                                className='overflow-y-auto h-full barra pr-8'
                                id='form-crear-punto-emision'
                            >

                                <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                                    Crear Punto de Emisión
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
                                        <label htmlFor="punto-emision" className='mb-1'>Punto Emisión</label>
                                        <input
                                            id='punto-emision'
                                            type="text"
                                            name='punto-emision'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='001'
                                            minLength={3}
                                            maxLength={3}
                                        />
                                    </div>

                                </div>
                            </form>

                            <form className='border-t border-t-[#486b8f] flex gap-3 items-center justify-end pt-5'>
                                <Button
                                    className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                    onClick={() => {
                                        changeModalCrearPuntoEmision()
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
                                    form='form-crear-punto-emision'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    Crear Punto de Emisión
                                </Button>
                            </form>
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
