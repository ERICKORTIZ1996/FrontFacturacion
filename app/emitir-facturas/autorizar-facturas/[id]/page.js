import axios from "axios";
import MainLayout from "@/components/layouts/MainLayout";
import ComprobarAcceso from "@/components/others/ComprobarAcceso";
import { formatearFecha, getStatusBill } from "@/helpers";
import BotonReenviarFactura from "@/components/emitir_facturas_componentes/BotonReenviarFactura";
import InicializarAutorizarFactura from "@/components/emitir_facturas_componentes/InicializarAutorizarFactura";
import BotonRegresarAutorizarFactura from "@/components/emitir_facturas_componentes/BotonRegresarAutorizarFactura";

async function obtenerFactura(nombreArchivo) {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/facturas/nombre/${nombreArchivo}`);
        return data
    } catch (error) {
        return null
    }
}

export default async function FacturaPendiente({ params }) {

    const factura = await obtenerFactura(params.id);

    // Renderizado condicional
    if (!factura) {
        return (
            <ComprobarAcceso>
                <MainLayout>

                    <div className="flex items-center text-gray-800 gap-4">
                        <BotonRegresarAutorizarFactura />
                    </div>

                    <div>
                        <p className="text-2xl text-center font-semibold">Busqueda no encontrada</p>
                        <p className="text-center">Porfavor, prueba refrescando la página o comunicate con soporte técnico</p>
                    </div>
                </MainLayout>
            </ComprobarAcceso>
        );
    }

    const nombresApellidosCliente = factura.data.cliente.razonSocialComprador.split(" ")

    return (
        <ComprobarAcceso>
            <MainLayout>

                <InicializarAutorizarFactura
                    factura={factura}
                />

                <div className="flex items-center text-gray-800 gap-4">

                    <BotonRegresarAutorizarFactura />

                    <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">

                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                        </svg>

                        <p>Autorizar Factura: {factura?.nombreArchivo?.split('_')[4]}</p>

                    </div>

                    <p className="text-gray-200">Fecha: {formatearFecha(factura.data.fechaEmision)}</p>
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
                                <span htmlFor="razon-social" className='mb-1'>Ruc</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    {factura.data.sucursal.empresa.ruc}
                                </span>
                            </div>

                            <div className='flex flex-col'>
                                <span htmlFor="razon-social" className='mb-1'>Razón Social</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    {factura.data.sucursal.empresa.razonSocial}
                                </span>
                            </div>

                            <div className='flex flex-col'>
                                <span htmlFor="razon-social" className='mb-1'>Matriz</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    {factura.data.sucursal.empresa.dirMatriz}
                                </span>
                            </div>

                            <div className='flex flex-col'>
                                <span htmlFor="razon-social" className='mb-1'>Dirección</span>
                                <span
                                    className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                >
                                    {factura.data.sucursal.dirEstablecimiento}
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
                                    <span htmlFor="razon-social" className='mb-1'>Tipo de Identificación</span>
                                    <span
                                        className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                    >
                                        {factura.data.cliente.tipoIdentificacionComprador}
                                    </span>
                                </div>

                                <div className='flex flex-col'>
                                    <span htmlFor="razon-social" className='mb-1'>Identificación</span>
                                    <span
                                        className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                    >
                                        {factura.data.cliente.identificacionComprador}
                                    </span>
                                </div>

                                <div className='flex flex-col'>
                                    <span htmlFor="razon-social" className='mb-1'>Nombres</span>
                                    <span
                                        className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                    >
                                        {nombresApellidosCliente.slice(0, 2).join(" ")}
                                    </span>
                                </div>

                                <div className='flex flex-col'>
                                    <span htmlFor="razon-social" className='mb-1'>Apellidos</span>
                                    <span
                                        className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                    >
                                        {nombresApellidosCliente.slice(2).join(" ")}
                                    </span>
                                </div>

                                <div className='flex flex-col'>
                                    <span htmlFor="razon-social" className='mb-1'>Dirección</span>
                                    <span
                                        className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                    >
                                        {factura.data.cliente.direccion}
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

                        {factura.data.detalles.map(detalle => {

                            const subtotal = detalle.cantidad * detalle.precioUnitario;
                            const total = subtotal - (subtotal * detalle.descuento) / 100;

                            return (
                                <div
                                    className='flex gap-3 mt-4 border-b pb-5 border-b-[#486b8f] last-of-type:border-none'
                                    key={detalle.id}
                                >

                                    <div className='flex-1 flex flex-col'>
                                        <span className="">Descrispanción</span>
                                        <p
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 disabled:cursor-not-allowed'
                                        >
                                            {detalle.descripcion}
                                        </p>

                                    </div>

                                    <div className='flex-1 flex flex-col'>
                                        <span>Cantidad</span>
                                        <p
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 disabled:cursor-not-allowed'
                                        >
                                            {detalle.cantidad}
                                        </p>
                                    </div>

                                    <div className='flex-1 flex flex-col'>
                                        <span>Precio Unitario</span>
                                        <p
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 disabled:cursor-not-allowed'
                                        >
                                            {detalle.precioUnitario}
                                        </p>
                                    </div>

                                    <div className='flex-1 flex flex-col'>
                                        <span>Descuento</span>
                                        <p
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 disabled:cursor-not-allowed'
                                        >
                                            {detalle.descuento}
                                        </p>
                                    </div>

                                    <div className='flex-1 flex flex-col'>
                                        <span>Total - Con IVA</span>

                                        <p
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 disabled:cursor-not-allowed'
                                        >
                                            $ {total}
                                        </p>
                                    </div>
                                </div>)
                        })}

                    </div>

                    <div>

                        <div className="rounded-3xl bg-gradient-to-b from-[#153350]/60 to-[#1f3850]/60 px-6 py-4">

                            <span className="block">SUBTOTAL: $ {Number(factura.data.totalSinImpuestos).toFixed(2)}</span>
                            <span className="block">DESCUENTO: $ {Number(factura.data.totalDescuento).toFixed(2)}</span>
                            <span className="block">{factura.data.impuestos[0].codigo} {factura.data.impuestos[0].codigoPorcentaje}: $ {Number(factura.data.impuestos[0].valor).toFixed(2)}</span>

                            <div className="flex gap-3 items-center mt-5">

                                <p className='font-semibold text-gray-200 border border-gray-200 rounded-xl px-3 py-1 w-fit'>
                                    Total a Pagar: $ {Number(factura.data.importeTotal).toFixed(2)}
                                </p>
                            </div>

                            <p className={`${getStatusBill(factura.data.estado)} text-sm rounded-full px-2 py-1 inline-block mt-3`}>{factura.data.estado}</p>
                        </div>

                        <BotonReenviarFactura
                            nombreArchivo={factura.data.nombreArchivo}
                            claveAcceso={factura.data.claveAcceso}
                        />

                    </div>

                </div>

            </MainLayout>
        </ComprobarAcceso>
    )
}
