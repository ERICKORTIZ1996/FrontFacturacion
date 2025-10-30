import axios from "axios";
import Link from "next/link";
import MainLayout from "@/components/layouts/MainLayout";
import ComprobarAcceso from "@/components/others/ComprobarAcceso";
import BotonImprimirFactura from "@/components/emitir_facturas_componentes/BotonImprimirFactura";
import BotonEnviarFactura from "@/components/emitir_facturas_componentes/BotonEnviarFactura";
import VerLogsFactura from "@/components/emitir_facturas_componentes/VerLogsFactura";
import { formatearFecha, getStatusBill } from "@/helpers";
import { redirect } from "next/navigation";

async function obtenerFactura(nombreArchivo) {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/facturas/nombre/${nombreArchivo}`);
        return data
    } catch (e) {
        return null
    }

}

export default async function Factura({ params }) {

    const factura = await obtenerFactura(params.id);

    // Renderizado condicional
    if (!factura) {
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

    const totalSinIVA = factura.data.detalles.reduce((total, p) => {
        const precio = Number(p?.precioUnitario);
        const cantidad = Number(p?.cantidad);

        const subtotal = precio * cantidad;

        return total + subtotal;
    }, 0);

    const totalDescuento = factura.data.detalles.reduce((total, p) => {
        const precio = Number(p?.precioUnitario) || 0;
        const cantidad = Number(p?.cantidad) || 0;
        const descuento = Number(p?.descuento) || 0;

        const subtotal = precio * cantidad;
        const totalDescuento = (subtotal * descuento / 100);

        return total + totalDescuento;
    }, 0);

    const baseImponible = totalSinIVA - totalDescuento
    const iva = baseImponible * 0.15
    const totalFinal = baseImponible + iva

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
                        Factura: {factura?.nombreArchivo?.split('_')[4]}
                    </p>

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

                        {
                            factura.data.detalles.map(detalle => {

                                const subtotal = detalle.cantidad * detalle.precioUnitario;
                                const total = subtotal - (subtotal * detalle.descuento) / 100;

                                return (
                                    <div className='flex gap-10' key={detalle.id}>
                                        <div className='flex flex-col'>
                                            <span className='mb-1'>Descripción</span>
                                            <span
                                                className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                            >
                                                {detalle.descripcion}
                                            </span>
                                        </div>

                                        <div className='flex flex-col'>
                                            <span className='mb-1'>Cantidad</span>
                                            <span
                                                className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                            >
                                                {detalle.cantidad}
                                            </span>
                                        </div>

                                        <div className='flex flex-col'>
                                            <span className='mb-1'>Precio Unitario</span>
                                            <span
                                                className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                            >
                                                $ {detalle.precioUnitario}
                                            </span>
                                        </div>

                                        <div className='flex flex-col'>
                                            <span className='mb-1'>Descuento</span>
                                            <span
                                                className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                            >
                                                {detalle.descuento}
                                            </span>
                                        </div>

                                        <div className='flex flex-col'>
                                            <span className='mb-1'>Total</span>
                                            <span
                                                className='bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit'
                                            >
                                                $ {total}
                                            </span>
                                        </div>
                                    </div>)
                            })}
                    </div>

                    <div>

                        <div className="rounded-3xl bg-gradient-to-b from-[#153350]/60 to-[#1f3850]/60 px-6 py-4">

                            {/* Subtotal: {totalSinIVA.toFixed(2)} <br />
                                        Descuento: {totalDescuento.toFixed(2)} <br />
                                        Base imponible: {baseImponible.toFixed(2)} <br />
                                        IVA (15%): {iva.toFixed(2)} <br />
                                        Total a pagar: {totalFinal.toFixed(2)} <br /> */}

                            <span className="block">SUBTOTAL: $ {Number(factura.data.totalSinImpuestos).toFixed(2)}</span>
                            <span className="block">Descuento: $ {Number(factura.data.totalDescuento).toFixed(2)}</span>
                            <span className="block">{factura.data.impuestos[0].codigo} {factura.data.impuestos[0].codigoPorcentaje}: $ {factura.data.impuestos[0].valor.toFixed(2)}</span>

                            <div className="flex flex-col gap-3 mt-5">

                                <p className='font-semibold text-gray-800 bg-gray-100 rounded-xl px-3 py-1 w-fit'>
                                    Total a Pagar: $ {Number(factura.data.importeTotal).toFixed(2)}
                                </p>

                                <div className="flex gap-3 items-center flex-wrap">
                                    {factura.data.estado.toLowerCase() === 'firmada' && (
                                        <>
                                            <BotonImprimirFactura
                                                nombreArchivo={factura.nombreArchivo}
                                            />
                                            <BotonEnviarFactura
                                                nombreArchivo={factura.nombreArchivo}
                                                tipoArchivo="pdf"
                                            />
                                        </>
                                    )}
                                    <VerLogsFactura nombreArchivo={factura.nombreArchivo} />
                                </div>

                            </div>

                            {factura.data.estado.toLowerCase() !== 'firmada' && (
                                <>

                                    <span className={`${getStatusBill(factura.data.estado)} text-sm rounded-full px-2 py-1 inline-block mt-3`}>{factura.data.estado}</span>

                                    <div className="border border-gray-200 rounded-xl mt-3 px-3 py-1">

                                        <p>Firma tu factura <br /> para poder imprimirla</p>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>

                </div>

            </MainLayout>
        </ComprobarAcceso>
    )
}
