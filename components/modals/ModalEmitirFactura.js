// components/Modal.tsx
'use client'

import { useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { facturaSchema } from '@/schema'
import { toast } from 'react-toastify';
import { AgregarProducto } from '../emitir_facturas_componentes/AgregarProducto'

export default function ModalEmitirFactura() {

    const modalCrearNotificacion = useMainStore((state) => state.modalCrearNotificacion)
    const changeModalCrearNotificacion = useMainStore((state) => state.changeModalCrearNotificacion)
    const formulariosFactura = useMainStore((state) => state.formulariosFactura)
    const crearFormProducto = useMainStore((state) => state.crearFormProducto)

    const [botonMas, setBotonMas] = useState(true)

    const mostrarFormProducto = () => {
        crearFormProducto({})
        setBotonMas(false)
    }

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

                    <DialogPanel className="w-[100%] md:w-[90%] h-[90%] space-y-4 px-8 py-6 rounded-3xl shadow-lg fondo">

                        <form onSubmit={handleSubmit} className='overflow-y-auto h-full barra pr-8'>
                            <div
                                className='flex justify-between items-center gap-5 border-b border-b-[#486b8f] pb-5'
                            >
                                <DialogTitle className="font-semibold text-lg text-center w-full uppercase">Emitir Factura</DialogTitle>

                            </div>


                            <h2 className='my-5 text-xl flex gap-2 items-center'>

                                <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-gray-200 text-gray-800">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                    </svg>
                                </span>

                                Cabecera
                            </h2>

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

                            <h2 className='my-5 text-xl flex gap-2 items-center'>

                                <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </span>

                                Datos del Cliente
                            </h2>

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

                            <h2 className='my-5 text-xl flex gap-2 items-center'>

                                <span className='bg-gray-200 rounded-full p-1 text-gray-800'>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </span>

                                Artículos

                            </h2>

                            {botonMas &&
                                <button
                                    type="button"
                                    className="bg-white text-gray-800 hover:bg-green-500 border border-gray-200 px-2 rounded-full cursor-pointer p-2 hover:border-green-500 hover:text-gray-200 transition-colors"
                                    onClick={mostrarFormProducto}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            }

                            {formulariosFactura.map(id => (
                                <AgregarProducto
                                    key={id}
                                    id={id}
                                />
                            ))}

                            <div className='flex justify-between gap-5 items-center mt-10'>


                                <p className='font-semibold text-xl'>Total a Pagar: $ 23.00</p>

                                <div className='flex gap-3 items-center'>

                                    <Button
                                        className="bg-[#d24148] rounded-full p-2 cursor-pointer hover:bg-[#d76161] transition-colors flex items-center gap-1 px-3 py-1"
                                        onClick={() => changeModalCrearNotificacion()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                        Cancelar
                                    </Button>

                                    <Button
                                        className="bg-[#102940] rounded-full p-1 cursor-pointer hover:bg-[#3a546e] transition-colors flex items-center gap-1 px-3 py-1"
                                        type='submit'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        Ingresar Factura
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
