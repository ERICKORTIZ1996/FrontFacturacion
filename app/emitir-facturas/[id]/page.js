import axios from "axios";
import Link from "next/link";
import MainLayout from "@/components/layouts/MainLayout";
import ComprobarAcceso from "@/components/others/ComprobarAcceso";
import BotonImprimirFactura from "@/components/emitir_facturas_componentes/BotonImprimirFactura";

// async function obtenerFactura() {
//     const { data } = await axios.get(`https://services.lockplay.org/devices/informationForDevice/COOPMEGA-4-11`);
//     return data
// }

export default async function Factura() {

    // const bills = await obtenerFactura();
    // console.log(bills);

    return (
        <ComprobarAcceso>
            <MainLayout>

                <div className="flex items-center text-gray-800 gap-4">

                    <Link
                        className="font-semibold text-gray-100 cursor-pointer rounded-full transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-gray-100 hover:text-gray-800"
                        href={"/emitir-facturas"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>

                        Regresar
                    </Link>

                    <p className="bg-gray-100 font-semibold rounded-full px-4 py-1 border border-gray-100">
                        Factura: 001-001-000000417
                    </p>

                    <p className="text-gray-200">Fecha: 14/07/2025</p>
                </div>

                <div className="flex justify-between items-start gap-5 mt-10">
                    <div className="flex-1 rounded-3xl p-3 bg-gradient-to-b from-[#153350]/60 to-[#1f3850]/60 px-10 py-8">

                        <h2 className='mb-5 text-xl flex gap-2 items-center'>

                            <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-gray-200 text-gray-800">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                </svg>
                            </span>

                            Cabecera
                        </h2>

                        <div className='flex gap-10'>

                            <div className='flex flex-col'>
                                <span htmlFor="razon-social" className='mb-1'>Nombre de Empresa</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    Pay&Play
                                </span>
                            </div>

                            <div className='flex flex-col'>
                                <span htmlFor="razon-social" className='mb-1'>Ruc</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    1750851956001
                                </span>
                            </div>

                            <div className='flex flex-col'>
                                <span htmlFor="razon-social" className='mb-1'>Matriz</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    Quito
                                </span>
                            </div>

                            <div className='flex flex-col'>
                                <span htmlFor="razon-social" className='mb-1'>Dirección</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    PICHINCHA / QUITO / COCHAPAMBA / N54 LT-20 Y N54A
                                </span>
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

                        <div className='grid grid-cols-1 gap-20'>

                            <div className='flex gap-10'>
                                <div className='flex flex-col'>
                                    <span htmlFor="razon-social" className='mb-1'>Nombres</span>
                                    <span
                                        className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                    >
                                        Cristhian Lorenzo
                                    </span>
                                </div>

                                <div className='flex flex-col'>
                                    <span htmlFor="razon-social" className='mb-1'>Apellidos</span>
                                    <span
                                        className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                    >
                                        Velez Zambrano
                                    </span>
                                </div>

                                <div className='flex flex-col'>
                                    <span htmlFor="razon-social" className='mb-1'>Identificación</span>
                                    <span
                                        className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                    >
                                        1750851956
                                    </span>
                                </div>

                                <div className='flex flex-col'>
                                    <span htmlFor="razon-social" className='mb-1'>Dirección</span>
                                    <span
                                        className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                    >
                                        La Planada
                                    </span>
                                </div>
                            </div>

                            {/* <div className='flex flex-col gap-3'>

                                         <div className='flex flex-col'>
                                            <label htmlFor="telefono-cliente" className='mb-1'>Teléfono</label>
                                            <input
                                                id='telefono-cliente'
                                                type="text"
                                                name='telefono-cliente'
                                                className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                placeholder='Ej: 0989486603'
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <label htmlFor="correo-cliente" className='mb-1'>Correo:</label>
                                            <input
                                                id='correo-cliente'
                                                type="text"
                                                name='correo-cliente'
                                                className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                placeholder='Ej: cris@cris.com'
                                            />
                                        </div> 
                                    </div> */}

                        </div>

                        <h2 className='my-5 text-xl flex gap-2 items-center'>

                            <span className='bg-gray-200 rounded-full p-1 text-gray-800'>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </span>

                            Artículos

                        </h2>

                        <div className='flex gap-10'>
                            <div className='flex flex-col'>
                                <span className='mb-1'>Descripción</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    Pantalones
                                </span>
                            </div>

                            <div className='flex flex-col'>
                                <span className='mb-1'>Cantidad</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    6
                                </span>
                            </div>


                            <div className='flex flex-col'>
                                <span className='mb-1'>Precio Unitarios</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    $ 22.52
                                </span>
                            </div>

                            <div className='flex flex-col'>
                                <span className='mb-1'>Descuento</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    0 %
                                </span>
                            </div>

                            <div className='flex flex-col'>
                                <span className='mb-1'>Descuento</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    $ 22.50
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>

                        <div className="rounded-3xl bg-gradient-to-b from-[#153350]/60 to-[#1f3850]/60 px-6 py-4">


                            <span className="block">SUBTOTAL: $ 00.00</span>
                            <span className="block">IVA 15%: $ 00.00</span>
                            <span className="block">DESCUENTO: $ 00.00</span>

                            <div className="flex gap-3 items-center mt-5">

                                <p className='font-semibold text-gray-800 bg-gray-100 rounded-xl px-3 py-1 w-fit'>
                                    Total a Pagar: $ 00.00
                                </p>

                                <BotonImprimirFactura />
                            </div>
                        </div>
                    </div>

                </div>

            </MainLayout>
        </ComprobarAcceso>
    )
}
