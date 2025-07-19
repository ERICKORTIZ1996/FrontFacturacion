"use client"

import { useState } from "react"
import MainLayout from "@/components/layouts/MainLayout"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import TablaEmpresas from "@/components/tables/TablaEmpresas"
import TablaSucursales from "@/components/tables/TablaSucursales"
import TablaPuntoEmision from "@/components/tables/TablaPuntoEmision"
import ModalCrearEmpresa from "@/components/modals/ModalCrearEmpresa"
import ModalCrearSucursal from "@/components/modals/ModalCrearSucursal"
import ModalCrearPuntoEmision from "@/components/modals/ModalCrearPuntoEmision"
import Paginacion from "@/components/emitir_facturas_componentes/Paginacion"
import { useMainStore } from "@/store/mainStore"

export default function MiEmpresa() {

    const changeModalCrearEmpresa = useMainStore((state) => state.changeModalCrearEmpresa)
    const changeModalCrearSucursal = useMainStore((state) => state.changeModalCrearSucursal)
    const changeModalCrearPuntoEmision = useMainStore((state) => state.changeModalCrearPuntoEmision)


    const [ventanaEmpresa, setVentanaEmpresa] = useState(true)
    const [ventanaSucursal, setVentanaSucursal] = useState(false)
    const [ventanaPuntoEmision, setVentanaPuntoEmision] = useState(false)

    return (
        <ComprobarAcceso>
            <MainLayout>

                <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>

                    <p>Mi Empresa</p>
                </div>

                <p className="mt-3">Gestiona y administra las diferentes partes de tu empresa.</p>

                <div className="mt-5 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                    <nav className="w-full rounded-xl">
                        <ul className="flex gap-3 justify-between text-gray-800 font-semibold uppercase">
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaEmpresa ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => {
                                        setVentanaEmpresa(true)
                                        setVentanaSucursal(false)
                                        setVentanaPuntoEmision(false)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                                    </svg>



                                    Empresas
                                </button>
                            </li>
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaSucursal ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => {
                                        setVentanaEmpresa(false)
                                        setVentanaSucursal(true)
                                        setVentanaPuntoEmision(false)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                                    </svg>


                                    Sucursales
                                </button>
                            </li>
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaPuntoEmision ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => {
                                        setVentanaEmpresa(false)
                                        setVentanaSucursal(false)
                                        setVentanaPuntoEmision(true)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>


                                    Punto de Emisión
                                </button>
                            </li>
                        </ul>
                    </nav>

                </div>

                {ventanaEmpresa && (
                    <>
                        <div className="mt-5 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                            <div className="flex gap-2 items-center">
                                <h2
                                    className="bg-[#077eeb]/60 px-3 py-1 rounded-xl w-fit text-lg flex gap-1 font-semibold"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                                    </svg>

                                    Empresas
                                </h2>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#478bb3]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>


                                <p>Administra de manera eficiente la información de las empresas registradas en el sistema.</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[7px] left-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>

                                    <input
                                        type="text"
                                        placeholder="Buscar por ruc"
                                        className="w-full outline-none bg-[#2e4760] rounded-xl pl-9 py-1 pr-3 focus:border-blue-500 shadow-lg"
                                        name="email"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center gap-3 bg-[#2e4760] rounded-xl px-3 py-1 hover:bg-[#3a546e] transition-colors cursor-pointer"
                                    onClick={() => changeModalCrearEmpresa()}
                                >
                                    Agregar

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>

                                </button>
                            </div>

                        </div>

                        <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">
                            <table className="w-full mt-5">
                                <thead className="bg-[#05121f]/60">
                                    <tr className="border-b-2 border-[#061727]">
                                        <th className="text-start font-semibold p-2">Ruc</th>
                                        <th className="text-start font-semibold p-2">Razon Social</th>
                                        <th className="text-start font-semibold p-2">Matriz</th>
                                        <th className="text-start font-semibold p-2">Detalle</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <TablaEmpresas />
                                    <TablaEmpresas />
                                    <TablaEmpresas />
                                    <TablaEmpresas />
                                </tbody>
                            </table>

                            < Paginacion />
                        </div>
                    </>
                )}

                {ventanaSucursal && (
                    <>
                        <div className="mt-5 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                            <div className="flex gap-2 items-center">
                                <h2
                                    className="bg-[#077eeb]/60 px-3 py-1 rounded-xl w-fit text-lg flex gap-1 font-semibold"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                                    </svg>

                                    Sucursales
                                </h2>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#478bb3]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>

                                <p>Gestiona de forma ordenada y eficiente todas las sucursales asociadas a cada empresa.</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[7px] left-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>

                                    <input
                                        type="text"
                                        placeholder="Buscar por ruc"
                                        className="w-full outline-none bg-[#2e4760] rounded-xl pl-9 py-1 pr-3 focus:border-blue-500 shadow-lg"
                                        name="email"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center gap-3 bg-[#2e4760] rounded-xl px-3 py-1 hover:bg-[#3a546e] transition-colors cursor-pointer"
                                    onClick={() => changeModalCrearSucursal()}
                                >
                                    Agregar

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>

                                </button>
                            </div>

                        </div>

                        <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">
                            <table className="w-full mt-5">
                                <thead className="bg-[#05121f]/60">
                                    <tr className="border-b-2 border-[#061727]">
                                        <th className="text-start font-semibold p-2">Ruc</th>
                                        <th className="text-start font-semibold p-2">Establecimiento</th>
                                        <th className="text-start font-semibold p-2">Nombre</th>
                                        <th className="text-start font-semibold p-2">Dirección</th>
                                        <th className="text-start font-semibold p-2">Detalle</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <TablaSucursales />
                                    <TablaSucursales />
                                    <TablaSucursales />
                                    <TablaSucursales />
                                </tbody>
                            </table>

                            < Paginacion />
                        </div>
                    </>
                )}

                {ventanaPuntoEmision && (
                    <>
                        <div className="mt-5 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                            <div className="flex gap-2 items-center">
                                <h2
                                    className="bg-[#077eeb]/60 px-3 py-1 rounded-xl w-fit text-lg flex gap-1 font-semibold"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>

                                    Punto de Emisión
                                </h2>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#478bb3]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>

                                <p>Administra los puntos de emisión autorizados para la generación de comprobantes electrónicos.</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[7px] left-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>

                                    <input
                                        type="text"
                                        placeholder="Buscar por ruc"
                                        className="w-full outline-none bg-[#2e4760] rounded-xl pl-9 py-1 pr-3 focus:border-blue-500 shadow-lg"
                                        name="email"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center gap-3 bg-[#2e4760] rounded-xl px-3 py-1 hover:bg-[#3a546e] transition-colors cursor-pointer"
                                    onClick={() => changeModalCrearPuntoEmision()}
                                >
                                    Agregar

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>

                                </button>
                            </div>

                        </div>

                        <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">
                            <table className="w-full mt-5">
                                <thead className="bg-[#05121f]/60">
                                    <tr className="border-b-2 border-[#061727]">
                                        <th className="text-start font-semibold p-2">Ruc</th>
                                        <th className="text-start font-semibold p-2">Establecimiento</th>
                                        <th className="text-start font-semibold p-2">Punto de Emisión</th>
                                        <th className="text-start font-semibold p-2">Detalle</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <TablaPuntoEmision />
                                    <TablaPuntoEmision />
                                    <TablaPuntoEmision />
                                    <TablaPuntoEmision />
                                </tbody>
                            </table>

                            < Paginacion />
                        </div>
                    </>
                )}

                <ModalCrearEmpresa />
                <ModalCrearSucursal />
                <ModalCrearPuntoEmision />

            </MainLayout >
        </ComprobarAcceso>
    )
}
