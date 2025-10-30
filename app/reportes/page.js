"use client"

import { useState } from "react"
import MainLayout from "@/components/layouts/MainLayout"
import { useMainStore } from "@/store/mainStore"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import MoldalPrimerReporteATS from "@/components/modals/MoldalPrimerReporteATS"
import MoldalPrimerReporteTributario from "@/components/modals/MoldalPrimerReporteTributario"

export default function Reportes() {

    const changeModalPrimerReporteATS = useMainStore((state) => state.changeModalPrimerReporteATS)
    const changeModalPrimerReporteTributario = useMainStore((state) => state.changeModalPrimerReporteTributario)

    const [ventanaATS, setVentanaATS] = useState(true)
    const [ventanaTributaria, setVentanaTributaria] = useState(false)
    const [ventanaOtros, setVentanaOtros] = useState(false)

    return (
        <ComprobarAcceso>
            <MainLayout>

                <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                    </svg>


                    <p>Reportes</p>
                </div>

                <p className="mt-3">Genera y exporta reportes de las diferentes secciones.</p>

                <div className="mt-5 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                    <nav className="w-full rounded-xl">
                        <ul className="flex flex-wrap gap-2 md:gap-3 justify-between text-gray-800 font-semibold uppercase text-xs md:text-base">
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaATS ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => {
                                        setVentanaATS(true)
                                        setVentanaTributaria(false)
                                        setVentanaOtros(false)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Reportes ATS
                                </button>
                            </li>
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaTributaria ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => {
                                        setVentanaATS(false)
                                        setVentanaTributaria(true)
                                        setVentanaOtros(false)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                                    </svg>
                                    Reportes Tributarios
                                </button>
                            </li>
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaOtros ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => {
                                        setVentanaATS(false)
                                        setVentanaTributaria(false)
                                        setVentanaOtros(true)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                    Otros Reportes
                                </button>
                            </li>
                        </ul>
                    </nav>

                </div>

                {ventanaATS && (

                    <div>

                        <div className="mt-5 flex flex-col md:flex-row items-start md:items-center gap-2 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3 mb-5">
                            <h2
                                className="bg-[#077eeb]/60 px-3 py-1 rounded-xl w-fit text-lg flex gap-1 font-semibold"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                                Reportes ATS
                            </h2>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#478bb3]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>

                            <p>Optimizar el flujo de trabajo financiero.</p>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                            <div className="fondoATS flex flex-col justify-between rounded-3xl px-4 md:px-8 py-4 md:py-5">

                                <div>
                                    <h2 className="font-bold text-lg mb-3">Tasa de Conversión de Presupuestos</h2>
                                    <p>
                                        El sistema podrá mostrarte los presupuestos enviados a clientes que se convierten en facturas pagadas. Esto te ayuda a saber qué tan efectivos son tus presupuestos.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2 mt-3 cursor-pointer"
                                    onClick={() => changeModalPrimerReporteATS()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                    Visualizar
                                </button>
                            </div>

                            {/* <div className="fondoATS flex flex-col justify-between rounded-3xl px-8 py-5">

                                <div>
                                    <h2 className="font-bold text-lg mb-3">Tiempo Promedio de Cobro</h2>
                                    <p>
                                        Un reporte podría indicar que, en promedio, los clientes tardan 15 días en pagar sus facturas. Esta información es vital para gestionar tu flujo de caja. Si el promedio aumenta a 30 días, sabrás que debes tomar medidas.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2 mt-3 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                    Visualizar
                                </button>

                            </div>

                            <div className="fondoATS flex flex-col justify-between rounded-3xl px-4 md:px-8 py-4 md:py-5">

                                <div>
                                    <h2 className="font-bold text-lg mb-3">Segmentación de Clientes</h2>
                                    <p>
                                        Los reportes pueden segmentar a los clientes según su comportamiento de pago. Por ejemplo, te dirían que el 10% de tus clientes siempre pagan tarde, y podrías usar esa información para enviarles recordatorios de pago automáticos antes de la fecha de vencimiento.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2 mt-3 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                    Visualizar
                                </button>

                            </div> */}

                        </div>

                    </div>
                )}


                {ventanaTributaria && (

                    <div>

                        <div className="mt-5 flex flex-col md:flex-row items-start md:items-center gap-2 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3 mb-5">
                            <h2
                                className="bg-[#077eeb]/60 px-3 py-1 rounded-xl w-fit text-lg flex gap-1 font-semibold"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                                </svg>

                                Reportes Tributarios
                            </h2>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#478bb3]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>

                            <p>Recopila la información de todas las transacciones para generar informes específicos.</p>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                            <div className="fondoTributario flex flex-col justify-between rounded-3xl px-4 md:px-8 py-4 md:py-5">

                                <div>
                                    <h2 className="font-bold text-lg mb-3">Reporte de Ventas por IVA {"("}Impuesto al Valor Agregado{")"}</h2>
                                    <p>
                                        El reporte de ventas por IVA desglosa las ventas de la empresa según la tasa de impuesto aplicada.

                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2 mt-3 cursor-pointer"
                                    onClick={() => changeModalPrimerReporteTributario()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                    Visualizar
                                </button>

                            </div>

                            {/* <div className="fondoTributario flex flex-col justify-between rounded-3xl px-8 py-5">

                                <div>
                                    <h2 className="font-bold text-lg mb-3">Reporte de Ingresos por Periodo Fiscal</h2>
                                    <p>
                                        Este reporte muestra los ingresos generados en un periodo específico (mensual, trimestral o anual), lo que te ayuda a conciliar tus cuentas y preparar tu declaración de impuestos sobre la renta.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2 mt-3 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                    Visualizar
                                </button>

                            </div> */}

                        </div>


                    </div>
                )}


                {ventanaOtros && (

                    <div>

                        <div className="mt-5 flex flex-col md:flex-row items-start md:items-center gap-2 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3 mb-5">
                            <h2
                                className="bg-[#077eeb]/60 px-3 py-1 rounded-xl w-fit text-lg flex gap-1 font-semibold"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>

                                Otros Reportes
                            </h2>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#478bb3]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>

                            <p>Genera otro tipo de reportes.</p>
                        </div>

                        {/* <button
                        type="button"
                        className="px-3 py-1 bg-red-200 rounded-xl transition-colors text-red-950 shadow-xl hover:bg-red-300 cursor-pointer"
                    >
                        Exportar en PDF
                    </button>

                    <button
                        type="button"
                        className="px-3 py-1 bg-green-200 rounded-xl transition-colors text-green-950 shadow-xl hover:bg-green-300 cursor-pointer"
                    >
                        Exportar en Excel
                    </button> */}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                            <div className="fondoOtros flex flex-col justify-between rounded-3xl px-4 md:px-8 py-4 md:py-5">

                                <div>
                                    <h2 className="font-bold text-lg mb-3">En construcción</h2>
                                    <p>
                                        En construcción...
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2 mt-3 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                    En construcción
                                </button>

                            </div>

                            {/* <div className="fondoOtros flex flex-col justify-between rounded-3xl px-8 py-5">

                                <div>
                                    <h2 className="font-bold text-lg mb-3">Ingresos obtenidos del último mes</h2>
                                    <p>
                                        Este reporte desglosa las ganancias obtenidas en el últmo mes, el cual incluye los siguientes parámetros: total importe, promedio importe, ganancias diarias, ganancias semenanles, ganancia quincenal, facturas ingresadas, etc.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2 mt-3 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                    Visualizar
                                </button>

                            </div> */}

                        </div>

                    </div>
                )}

                <MoldalPrimerReporteATS />
                <MoldalPrimerReporteTributario />
            </MainLayout >
        </ComprobarAcceso>
    )
}
