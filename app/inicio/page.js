import MainLayout from "@/components/layouts/MainLayout"
import Image from "next/image"
import ModalNotificacionesGlobales from "@/components/modals/ModalNotificacionesGlobales"
import Link from "next/link"
import Header from "@/components/emitir_facturas_componentes/Header"
import GraficoFacturas from "@/components/emitir_facturas_componentes/GraficoFacturas"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"

export default function Inicio() {

    return (
        <ComprobarAcceso>
            <MainLayout>

                <Header />

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
                    <div className="min-w-0">

                        <div className="relative bg-gradient-to-b from-[#3b46bf]/50 to-[#3f6caf]/50 rounded-3xl md:mr-5 my-5 shadow-lg flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 md:py-6">

                            <div className="flex flex-col gap-1">

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>

                                        <p>Inicio</p>
                                    </div>

                                    <Link
                                        href={'/perfil/informacion'}
                                        className="font-semibold rounded-full px-4 py-1 mt-1 w-fit text-gray-200 hover:bg-gray-200 hover:text-gray-800 transition-colors flex items-center gap-2 border border-gray-200"
                                    >

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>

                                        Mi Perfil
                                    </Link>
                                </div>

                                <h2 className="text-xl md:text-2xl font-semibold text-gray-100 mt-2">Sistema de Facturación</h2>

                                <p className="text-sm md:text-base">Gestiona y administra tu negocio. Accede a los puntos mas importantes y visualiza las estadisticas para un mayor control.</p>


                            </div>

                            <div className="relative w-full md:w-2xl mt-4 md:mt-0">
                                <Image
                                    src={'/images/banner_principal.png'}
                                    width={500}
                                    height={500}
                                    alt="imagen-bienvenida"
                                    className="absolute md:-bottom-40 md:-right-24 w-full h-auto"
                                    style={{ width: "auto", height: "auto" }}
                                    priority
                                />
                            </div>
                        </div>

                        <h2 className="font-semibold text-gray-100 text-lg mb-5">Últimas Facturas</h2>

                        <div className="overflow-x-auto whitespace-nowrap barra p-2 mb-5">
                            <div className="inline-block px-4 py-2 mr-2 w-40 md:w-52 h-40 md:h-48 rounded-3xl fondo_card">
                                <div className="relative w-full h-full flex flex-col justify-end items-center pb-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 absolute -top-5 text-[#96ccff]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <p className="text-3xl font-bold text-[#102940]">$ 00.00</p>
                                    <h2 className="text-gray-200">Ganacias del día</h2>
                                </div>
                            </div>

                            <div className="inline-block px-4 py-2 mr-2 w-40 md:w-52 h-40 md:h-48 rounded-3xl fondo_card2">
                                <div className="relative w-full h-full flex flex-col justify-end items-center pb-5">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 absolute -top-8 text-[#96ffb7]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                    </svg>

                                    <p className="text-3xl font-bold text-[#104013]">$ 00.00</p>
                                    <h2 className="text-gray-200">Ganacias del mes</h2>
                                </div>
                            </div>

                            <div className="inline-block px-4 py-2 mr-2 w-40 md:w-52 h-40 md:h-48 rounded-3xl fondo_card3">
                                <div className="relative w-full h-full flex flex-col justify-end items-center pb-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 absolute -top-5 text-[#ffad96]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>

                                    <p className="text-3xl font-bold text-[#401a10]">$ 00.00</p>
                                    <h2 className="text-gray-200">Ganacias del mes anterior</h2>
                                </div>
                            </div>

                            <div className="inline-block px-4 py-2 mr-2 w-52 h-48 rounded-3xl fondo_card">
                                <div className="relative w-full h-full flex flex-col justify-end items-center pb-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 absolute -top-5 text-[#96ccff]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                                    </svg>

                                    <p className="text-3xl font-bold text-[#102940]">$ 00.00</p>
                                    <h2 className="text-gray-200">Facturas ingresadas</h2>
                                </div>
                            </div>


                        </div>

                        <h2 className="font-semibold text-gray-100 text-lg mb-5">Balance General</h2>

                        <div className="bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 flex justify-between items-center rounded-3xl p-3">

                            <div className="relative w-12">
                                <Image
                                    src={"/images/icono-balances.png"}
                                    width={100}
                                    height={100}
                                    alt="icono-balances"
                                    className="rounded-2xl w-full aspect-square object-cover"
                                />
                            </div>

                            <div>
                                $ 00.00
                            </div>
                        </div>

                    </div>

                    <div>

                        <h2 className="font-semibold text-gray-100 text-lg my-5">Gestionar</h2>

                        <div className="flex flex-col gap-3">
                            <div className="bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 shadow-lg rounded-3xl pl-3 pr-6 py-2 flex justify-between items-center gap-3">
                                <div className="flex justify-between items-center gap-4">

                                    <div className="relative w-12">
                                        <Image
                                            src={"/images/icono-emitir.png"}
                                            width={100}
                                            height={100}
                                            alt="icono-balances"
                                            className="rounded-2xl w-full aspect-square object-cover"
                                        />
                                    </div>


                                    <div>
                                        <p className="font-semibold text-[#478bb3]">Emitir Facturas</p>
                                        <p>Gestiona y genera facturas electrónicas</p>
                                    </div>
                                </div>

                                <Link
                                    href={'/emitir-facturas'}
                                    className="hover:bg-[#2e556b] rounded-full p-1 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>

                                </Link>

                            </div>

                            <div className="bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 bg-opacity-60 shadow-lg border-gray-400 rounded-3xl pl-3 pr-6 py-2 flex justify-between items-center gap-3">
                                <div className="flex justify-between items-center gap-4">

                                    <div className="relative w-12">
                                        <Image
                                            src={"/images/icono-balances.png"}
                                            width={100}
                                            height={100}
                                            alt="icono-balances"
                                            className="rounded-2xl w-full aspect-square object-cover"
                                        />
                                    </div>


                                    <div>
                                        <p className="font-semibold text-[#478bb3]">Balances</p>
                                        <p>Consulta y administra los balances financieros</p>
                                    </div>
                                </div>

                                <Link
                                    href={'/balances'}
                                    className="hover:bg-[#2e556b] rounded-full p-1 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>

                                </Link>

                            </div>

                            <div className="bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 bg-opacity-60 shadow-lg border-gray-400 rounded-3xl pl-3 pr-6 py-2 flex justify-between items-center gap-3">
                                <div className="flex justify-between items-center gap-4">

                                    <div className="relative w-12">
                                        <Image
                                            src={"/images/icono-autorizacion.png"}
                                            width={100}
                                            height={100}
                                            alt="icono-balances"
                                            className="rounded-2xl w-full aspect-square object-cover"
                                        />
                                    </div>


                                    <div>
                                        <p className="font-semibold text-[#478bb3]">Autorizar Facturas</p>
                                        <p>Revisa y valida facturas pendientes</p>
                                    </div>
                                </div>

                                <Link
                                    href={'/emitir-facturas/autorizar-facturas'}
                                    className="hover:bg-[#2e556b] rounded-full p-1 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>

                                </Link>

                            </div>
                        </div>


                        <h2 className="font-semibold text-gray-100 text-lg my-5">Facturas</h2>

                        <div className="shadow-lg border-gray-400 rounded-3xl px-8 py-6 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50">

                            <div className="flex justify-center">
                                <GraficoFacturas />

                            </div>

                            <div className="flex justify-center gap-7 -mt-5">
                                <div className="flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#077eeb]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                    </svg>

                                    <p>Quincenal</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#077eeb]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>

                                    <p>Mensual</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#077eeb]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                                    </svg>
                                    <p>Anual</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <ModalNotificacionesGlobales />

            </MainLayout>
        </ComprobarAcceso>
    )
}
