// components/Modal.tsx
'use client'

import { useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { facturaSchema } from '@/schema'
import { toast } from 'react-toastify';

export default function ModalEmitirFactura() {

    const modalCrearNotificacion = useMainStore((state) => state.modalCrearNotificacion)
    const changeModalCrearNotificacion = useMainStore((state) => state.changeModalCrearNotificacion)

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            nombreCliente: formData.get('nombre-cliente')
        }

        const result = facturaSchema.safeParse(data)

        if (!result.success) {

            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }


    };

    return (
        <>
            <Dialog open={modalCrearNotificacion} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/70">

                    <DialogPanel className="w-[100%] md:w-[90%] h-[90%] space-y-4 px-8 py-6 rounded-3xl shadow-lg fondo overflow-y-auto">

                        <form onSubmit={handleSubmit}>
                            <div
                                className='flex justify-between items-center gap-5 border-b border-b-[#486b8f] pb-5'
                            >
                                <DialogTitle className="font-semibold text-lg text-center w-full uppercase">Emitir Factura</DialogTitle>

                            </div>

                            <h2 className='my-5 text-xl'>CABECERA</h2>

                            <div className='flex gap-5'>
                                <div className='flex flex-col'>
                                    <label htmlFor="ruc" className='mb-1'>Ruc</label>
                                    <input
                                        id='ruc'
                                        type="text"
                                        name='ruc'
                                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                        placeholder='Ej: 1750851956001'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="nombre_local" className='mb-1'>Nombre del Local</label>
                                    <input
                                        id='nombre_local'
                                        type="text"
                                        name='nombre_local'
                                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                        placeholder='Ej: Etafashion'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="sucursal" className='mb-1'>Sucursal</label>
                                    <input
                                        id='sucursal'
                                        type="text"
                                        name='sucursal'
                                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                        placeholder='Ej: Quito'
                                    />
                                </div>


                                <div className='flex flex-col'>
                                    <label htmlFor="direccion" className='mb-1'>Dirección</label>
                                    <input
                                        id='direccion'
                                        type="text"
                                        name='direccion'
                                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                        placeholder='Ej: Av. Rio Amazonas'
                                    />
                                </div>
                            </div>

                            <h2 className='my-5 text-xl'>DATOS DEL CLIENTE</h2>

                            <div className='grid grid-cols-3 gap-20'>

                                <div className='flex flex-col gap-3'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="nombres-cliente" className='mb-1'>Nombres</label>
                                        <input
                                            id='nombres-cliente'
                                            type="text"
                                            name='nombres-cliente'
                                            className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                            placeholder='Ej: Cristhian Lorenzo'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="apellidos-cliente" className='mb-1'>Apellidos</label>
                                        <input
                                            id='apellidos-cliente'
                                            type="text"
                                            name='apellidos-cliente'
                                            className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                            placeholder='Ej: Velez Zambrano'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="identificacion" className='mb-1'>Identificación</label>
                                        <input
                                            id='identificacion'
                                            type="text"
                                            name='identificacion'
                                            className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                            placeholder='Ej: 1750851956'
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="direccion-cliente" className='mb-1'>Dirección</label>
                                        <input
                                            id='direccion-cliente'
                                            type="text"
                                            name='direccion-cliente'
                                            className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                            placeholder='Ej: La Planada'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="telefono-cliente" className='mb-1'>Teléfono</label>
                                        <input
                                            id='telefono-cliente'
                                            type="text"
                                            name='telefono-cliente'
                                            className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                            placeholder='Ej: 0989486603'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="correo-cliente" className='mb-1'>Correo:</label>
                                        <input
                                            id='correo-cliente'
                                            type="text"
                                            name='correo-cliente'
                                            className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                            placeholder='Ej: cris@cris.com'
                                        />
                                    </div>
                                </div>

                                <div></div>
                            </div>

                            <h2 className='my-5 text-xl'>PRODUCTOS / ARTÍCULOS</h2>

                            <div className='flex gap-3'>
                                <div className='flex flex-col'>
                                    <label htmlFor="nombres-producto" className='mb-1'>Nombre</label>
                                    <input
                                        id='nombres-producto'
                                        type="text"
                                        name='nombres-producto'
                                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                        placeholder='Ej: Pantalones'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="canatidad-producto" className='mb-1'>Cantidad</label>
                                    <input
                                        id='canatidad-producto'
                                        type="text"
                                        name='canatidad-producto'
                                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                        placeholder='Ej: 2'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="precio-unitario" className='mb-1'>Precio Unitario</label>
                                    <input
                                        id='precio-unitario'
                                        type="text"
                                        name='precio-unitario'
                                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                        placeholder='Ej: 22.50'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="descuento" className='mb-1'>Descuento</label>
                                    <input
                                        id='descuento'
                                        type="text"
                                        name='descuento'
                                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                        placeholder='Ej: 5%'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="total" className='mb-1'>Total</label>
                                    <input
                                        id='total'
                                        type="text"
                                        name='total'
                                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                                        placeholder='Ej: 23.00'
                                    />
                                </div>
                            </div>



                            <div className='flex justify-between gap-5 items-center mt-10'>


                                <p className='font-semibold text-2xl'>Total a Pagar: $ 23.00</p>

                                <div className='flex gap-3 items-center'>
                                    <Button
                                        className="bg-[#102940] rounded-full p-1 cursor-pointer hover:bg-[#d76161] transition-colors flex items-center gap-1 px-3 py-1"
                                        type='submit'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        Ingresar Factura
                                    </Button>

                                    <Button
                                        className="bg-[#d24148] rounded-full p-2 cursor-pointer hover:bg-[#d76161] transition-colors flex items-center gap-1 px-3 py-1"
                                        onClick={() => changeModalCrearNotificacion()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                        Cancelar
                                    </Button>
                                </div>
                            </div>

                        </form>
                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
