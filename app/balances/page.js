import MainLayout from "@/components/layouts/MainLayout"
import Link from "next/link"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import GraficoFacturas from "@/components/balances_components/GraficoFacturas"
import axios from "axios"
import Image from "next/image"

async function obtenerDashboardBalances() {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/estadisticas`);
    return data
}

export default async function page() {

    const balances = await obtenerDashboardBalances()

    return (
        <ComprobarAcceso>
            <MainLayout>

                <div className="relative bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">

                    <div className="flex flex-col gap-1">

                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                                </svg>

                                <p>Balances</p>
                            </div>

                            <Link
                                href={'/inicio'}
                                className="font-semibold rounded-full px-4 py-1 mt-1 w-fit text-gray-200 hover:bg-gray-200 hover:text-gray-800 transition-colors flex items-center gap-2 border border-gray-200"
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>

                                Estadísticas
                            </Link>
                        </div>

                        <p className="mt-3">Consulta y administra los balances financieros de forma clara y detallada.</p>

                    </div>

                    <Image
                        src={'/images/banner-balances.png'}
                        width={450}
                        height={450}
                        alt="imagen-balances"
                        className="absolute -bottom-16 right-10"
                        priority
                    />

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">

                    <div className="">

                        <div className="grid grid-cols-2 mt-5 gap-5">
                            <div className="shadow-lg border-gray-400 rounded-3xl px-8 py-6 banner-productos-vendidos">

                                <h2 className="font-semibold text-gray-100 text-lg mb-5">Productos más Vendidos - mensuales</h2>

                                <div className="bg-gradient-to-t from-[#102940]/20 to-[#182a3b]/20 shadow-lg rounded-2xl px-3 py-1 flex justify-between items-center gap-3 mb-2">
                                    <div className="flex gap-3 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                        </svg>

                                        <p className="font-semibold">Camisa formal</p>
                                    </div>

                                    <p className="text-xl">30</p>

                                </div>

                                <div className="bg-gradient-to-t from-[#102940]/20 to-[#182a3b]/20 shadow-lg rounded-2xl px-3 py-1 flex justify-between items-center gap-3 mb-2">
                                    <div className="flex gap-3 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                        </svg>

                                        <p className="font-semibold">Pantalos Jeans</p>
                                    </div>

                                    <p className="text-xl">40</p>

                                </div>

                                <div className="bg-gradient-to-t from-[#102940]/20 to-[#182a3b]/20 shadow-lg rounded-2xl px-3 py-1 flex justify-between items-center gap-3 mb-2">
                                    <div className="flex gap-3 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                        </svg>

                                        <p className="font-semibold">Reloj XX-ED</p>
                                    </div>

                                    <p className="text-xl">10</p>

                                </div>

                                <div className="bg-gradient-to-t from-[#102940]/20 to-[#182a3b]/20 shadow-lg rounded-2xl px-3 py-1 flex justify-between items-center gap-3 mb-2">
                                    <div className="flex gap-3 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                        </svg>

                                        <p className="font-semibold">Zapatos deportivos FILA T. 40</p>
                                    </div>

                                    <p className="text-xl">34</p>

                                </div>

                                <div className="bg-gradient-to-t from-[#102940]/20 to-[#182a3b]/20 shadow-lg rounded-2xl px-3 py-1 flex justify-between items-center gap-3 mb-2">
                                    <div className="flex gap-3 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                        </svg>

                                        <p className="font-semibold">Zapatos deportivos OBOO T. 42</p>
                                    </div>

                                    <p className="text-xl">32</p>

                                </div>

                                <div className="bg-gradient-to-t from-[#102940]/20 to-[#182a3b]/20 shadow-lg rounded-2xl px-3 py-1 flex justify-between items-center gap-3 mb-2">
                                    <div className="flex gap-3 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                        </svg>

                                        <p className="font-semibold">Camiseta ODOO T. M - Hombre</p>
                                    </div>

                                    <p className="text-xl">67</p>

                                </div>

                            </div>

                            <div>
                                <h2 className="font-semibold text-gray-100 text-lg mb-5">Facturas</h2>

                                <div className="shadow-lg border-gray-400 rounded-3xl px-8 py-6 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50">

                                    <div className="flex justify-center">

                                        {/* "totalImporte": 12345.67, "promedioImporte": 123.45 */}
                                        <GraficoFacturas
                                            totalFacturas={balances.totalFacturas}
                                            totalImporte={balances.totalImporte}
                                        />

                                    </div>

                                    <div className="flex justify-center gap-7 -mt-5">
                                        <div className="flex flex-col items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#077eeb]">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                            </svg>

                                            <p>Total Facturas</p>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#077eeb]">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                                            </svg>
                                            <p>Total Importe</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <h2 className="font-semibold text-gray-100 text-lg my-5">Total</h2>

                        <div className="bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 flex justify-between items-center rounded-3xl p-3 mb-3">

                            <div className="flex gap-3 items-center">
                                <div className="relative w-12">
                                    <Image
                                        src={"/images/icono-total.png"}
                                        width={100}
                                        height={100}
                                        alt="icono-balances"
                                        className="rounded-2xl w-full aspect-square object-cover"
                                    />
                                </div>

                                <p className="text-[#478bb3] font-semibold">Total Importe</p>
                            </div>

                            <p className="text-xl">$ {balances?.data?.totalImporte}</p>
                        </div>

                        <div className="bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 flex justify-between items-center rounded-3xl p-3">

                            <div className="flex gap-3 items-center">
                                <div className="relative w-12">
                                    <Image
                                        src={"/images/icono-total.png"}
                                        width={100}
                                        height={100}
                                        alt="icono-balances"
                                        className="rounded-2xl w-full aspect-square object-cover"
                                    />
                                </div>
                                <p className="text-[#478bb3] font-semibold">Promedio Importe</p>
                            </div>

                            <p className="text-xl">$ {balances?.data?.promedioImporte}</p>
                        </div>

                    </div>

                    <div>

                        <h2 className="font-semibold text-gray-100 text-lg my-5">Por Estado</h2>

                        <div className="flex flex-col gap-3">

                            <div className="bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 shadow-lg rounded-3xl pl-3 pr-6 py-2 flex justify-between items-center gap-3">
                                <div className="flex gap-3 items-center">

                                    <div className="relative w-12">
                                        <Image
                                            src={"/images/icono-pendiente.png"}
                                            width={100}
                                            height={100}
                                            alt="icono-balances"
                                            className="rounded-2xl w-full aspect-square object-cover"
                                        />
                                    </div>

                                    <p className="font-semibold text-[#478bb3]">Pendientes</p>
                                </div>

                                <p className="text-xl">{balances?.data?.porEstado?.PENDIENTE ? balances?.data?.porEstado?.PENDIENTE : 0}</p>

                            </div>

                            <div className="bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 bg-opacity-60 shadow-lg border-gray-400 rounded-3xl pl-3 pr-6 py-2 flex justify-between items-center gap-3">

                                <div className="flex gap-3 items-center">

                                    <div className="relative w-12">
                                        <Image
                                            src={"/images/icono-firma.png"}
                                            width={100}
                                            height={100}
                                            alt="icono-balances"
                                            className="rounded-2xl w-full aspect-square object-cover"
                                        />
                                    </div>

                                    <p className="font-semibold text-[#478bb3]">Firmadas</p>
                                </div>

                                <p className="text-xl">{balances?.data?.porEstado?.FIRMADA ? balances?.data?.porEstado?.FIRMADA : 0}</p>


                            </div>

                            <div className="bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 bg-opacity-60 shadow-lg border-gray-400 rounded-3xl pl-3 pr-6 py-2 flex justify-between items-center gap-3">

                                <div className="flex gap-3 items-center">

                                    <div className="relative w-12">
                                        <Image
                                            src={"/images/icono-autorizacion.png"}
                                            width={100}
                                            height={100}
                                            alt="icono-balances"
                                            className="rounded-2xl w-full aspect-square object-cover"
                                        />
                                    </div>

                                    <p className="font-semibold text-[#478bb3]">Autorizadas</p>
                                </div>

                                <p className="text-xl">{balances?.data?.porEstado?.AUTORIZADA ? balances?.data?.porEstado?.AUTORIZADA : 0}</p>

                            </div>

                            <div className="bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 bg-opacity-60 shadow-lg border-gray-400 rounded-3xl pl-3 pr-6 py-2 flex justify-between items-center gap-3">
                                <div className="flex gap-3 items-center">

                                    <div className="relative w-12">
                                        <Image
                                            src={"/images/icono-rechazo.png"}
                                            width={100}
                                            height={100}
                                            alt="icono-balances"
                                            className="rounded-2xl w-full aspect-square object-cover"
                                        />
                                    </div>

                                    <p className="font-semibold text-[#478bb3]">Rechazadas</p>
                                </div>

                                <p className="text-xl">{balances?.data?.porEstado?.RECHAZADA ? balances?.data?.porEstado?.RECHAZADA : 0}</p>

                            </div>

                            <div className="bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 bg-opacity-60 shadow-lg border-gray-400 rounded-3xl pl-3 pr-6 py-2 flex justify-between items-center gap-3">
                                <div className="flex gap-3 items-center">

                                    <div className="relative w-12">
                                        <Image
                                            src={"/images/icono-validas.png"}
                                            width={100}
                                            height={100}
                                            alt="icono-balances"
                                            className="rounded-2xl w-full aspect-square object-cover"
                                        />
                                    </div>

                                    <p className="font-semibold text-[#478bb3]">Validadas</p>
                                </div>

                                <p className="text-xl">{balances?.data?.porEstado?.VALIDADA ? balances?.data?.porEstado?.VALIDADA : 0}</p>

                            </div>
                        </div>


                        <h2 className="font-semibold text-gray-100 text-lg my-5">Por Hambiente</h2>

                        <div className="shadow-lg border-gray-400 rounded-3xl px-8 py-6 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 flex justify-between items-end h-32 mb-5 banner-pruebas">

                            <div className="flex gap-3 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-[#478bb3]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                </svg>
                                <p className="font-semibold">Pruebas</p>

                            </div>

                            <p className="font-semibold text-2xl">
                                {balances?.data?.porAmbiente?.pruebas ? balances?.data?.porAmbiente?.pruebas : 0}
                            </p>
                        </div>

                        <div className="shadow-lg border-gray-400 rounded-3xl px-8 py-6 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 flex justify-between items-end h-32 banner-produccion">

                            <div className="flex gap-3 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-[#478bb3]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
                                </svg>

                                <p className="font-semibold">Producción</p>

                            </div>

                            <p className="font-semibold text-2xl">
                                {balances?.data?.porAmbiente?.produccion ? balances?.data?.porAmbiente?.produccion : 0}
                            </p>
                        </div>
                    </div>

                </div>

            </MainLayout >
        </ComprobarAcceso>
    )
}
