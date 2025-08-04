'use client'

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { toast } from 'react-toastify';
import { productoStockSchema } from '@/schema';
import axios from 'axios'

export default function ModalCrearProducto() {

    const modalCrearProducto = useMainStore((state) => state.modalCrearProducto)
    const changeModalCrearProducto = useMainStore((state) => state.changeModalCrearProducto)

    const crearPuntoEmision = async (formData) => {

        const data = {
            codigo: formData.get('codigo-producto'),
            nombre: formData.get('nombre-producto'),
            cantidad: formData.get('cantidad-producto'),
            precioUnitario: formData.get('precio-unitario-producto'),
            descuento: formData.get('descuento-producto')
        }

        const result = productoStockSchema.safeParse(data)

        if (!result.success) {

            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        console.log(data);


        return
        try {
            const { data: dataPuntoEmision } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/puntos-emision`, {
                ruc: formData.get('ruc-empresa'),
                estab: formData.get('estab'),
                ptoEmi: formData.get('punto-emision')
            })

            toast.success(dataPuntoEmision.message.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim())
            changeModalCrearProducto()

        } catch (e) {
            toast.error(e?.response?.data?.mensaje || e?.response?.data?.message?.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim());
            console.log(e);
        }
    };

    return (
        <>
            <Dialog open={modalCrearProducto} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[100%] md:w-[30%] h-[70%] space-y-4 px-8 py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2]">

                        <div className='flex h-full flex-col justify-between'>
                            <form
                                action={crearPuntoEmision}
                                className='overflow-y-auto h-full barra pr-8'
                                id='form-crear-producto-stock'
                            >

                                <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                                    Crear Producto
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
                                        <label htmlFor="codigo-producto" className='mb-1'>Código</label>
                                        <input
                                            id='codigo-producto'
                                            type="text"
                                            name='codigo-producto'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: EDJN-ASDFA'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="nombre-producto" className='mb-1'>Nombre</label>
                                        <input
                                            id='nombre-producto'
                                            type="text"
                                            name='nombre-producto'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Pantalones Jeans Hombre XL'
                                        />
                                    </div>

                                    <div className='flex items-center gap-3 w-full'>

                                        <div className='flex flex-col'>
                                            <label htmlFor="cantidad-producto" className='mb-1'>Cantidad</label>
                                            <input
                                                id='cantidad-producto'
                                                type="text"
                                                name='cantidad-producto'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                                placeholder='Ej: 24'
                                                min={1}
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <label htmlFor="precio-unitario-producto" className='mb-1'>Precio Unitario</label>
                                            <input
                                                id='precio-unitario-producto'
                                                type="text"
                                                name='precio-unitario-producto'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                                placeholder='Ej: 22.51'
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <label htmlFor="descuento-producto" className='mb-1'>Descuento</label>
                                            <input
                                                id='descuento-producto'
                                                type="text"
                                                name='descuento-producto'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                                placeholder='5'
                                            />
                                        </div>
                                    </div>

                                </div>
                            </form>

                            <form className='border-t border-t-[#486b8f] flex gap-3 items-center justify-end pt-5'>
                                <Button
                                    className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                    onClick={() => {
                                        changeModalCrearProducto()
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
