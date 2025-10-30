'use client'

import { useState, useMemo } from "react"
import MainLayout from "@/components/layouts/MainLayout"
import Paginacion from "@/components/emitir_facturas_componentes/Paginacion"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import { getStatusBill, formatearFechaFactura } from "@/helpers"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import SmallSpinner from "@/components/layouts/SmallSpinner"
import { useMainStore } from "@/store/mainStore"

/**
 * Página principal de Notas de Débito
 * Muestra todas las facturas autorizadas que pueden tener notas de débito asociadas
 */
export default function NotasDebito() {

    const [busqueda, setBusqueda] = useState('')
    const dataUser = useMainStore((state) => state.dataUser)

    const consultarFacturasAutorizadas = async () => {
        try {
            if (!dataUser?.tokenAcceso) {
                console.warn('No hay token de acceso disponible')
                return { data: [] }
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/facturas/estado/AUTORIZADA`, {
                headers: {
                    'Authorization': `Bearer ${dataUser.tokenAcceso}`
                }
            })
            return data
        } catch (error) {
            console.error('Error al consultar facturas autorizadas:', error)
            return { data: [] }
        }
    }

    const { data: facturasData, isLoading } = useQuery({
        queryKey: ['facturas_autorizadas_notas_debito'],
        queryFn: consultarFacturasAutorizadas,
        enabled: !!dataUser?.tokenAcceso, // Solo ejecutar si hay token
        refetchOnWindowFocus: false,
    })

    // Filtrar facturas por búsqueda
    const facturasFiltradas = useMemo(() => {
        if (!facturasData?.data) return []
        
        if (!busqueda.trim()) return facturasData.data
        
        const terminoBusqueda = busqueda.trim().toLowerCase()
        return facturasData.data.filter(factura => {
            const numeroFactura = factura.nombreArchivo.split("_").pop()?.toLowerCase() || ''
            const nombreArchivo = factura.nombreArchivo?.toLowerCase() || ''
            const claveAcceso = factura.claveAcceso?.toLowerCase() || ''
            
            return numeroFactura.includes(terminoBusqueda) || 
                   nombreArchivo.includes(terminoBusqueda) ||
                   claveAcceso.includes(terminoBusqueda)
        })
    }, [busqueda, facturasData?.data])

    return (
        <ComprobarAcceso>
            <MainLayout>

                <div className="flex gap-2 items-center">
                    <Link
                        className="font-semibold text-gray-100 cursor-pointer rounded-full transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-gray-100 hover:text-gray-800"
                        href={"/emitir-facturas"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>

                        Regresar
                    </Link>

                    <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>

                        <p>Notas de Débito</p>
                    </div>
                </div>

                <p className="mt-3">
                    Gestiona las notas de débito para corregir o agregar información a facturas ya autorizadas.
                </p>

                <div className="mt-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                    <p
                        className={`${getStatusBill('AUTORIZADA')} px-3 py-1 rounded-xl transition-colors shadow-xl text-sm md:text-base`}
                    >
                        Facturas Autorizadas
                    </p>

                    <div className="w-full md:w-1/3 relative">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[7px] left-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                        <input
                            type="text"
                            placeholder="Buscar por número de factura"
                            className="w-full outline-none bg-[#2e4760] rounded-xl pl-9 py-1 pr-3 focus:border-blue-500 shadow-lg"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-4 md:px-8 py-4 md:py-6 mt-5">

                    {isLoading ? (
                        <SmallSpinner />
                    ) : facturasFiltradas && facturasFiltradas.length > 0 ? (
                        <>
                            {/* Tabla desktop */}
                            <div className="hidden md:block w-full mt-5 overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#05121f]/60">
                                        <tr className="border-b-2 border-[#061727]">
                                            <th className="text-start font-semibold p-2">Número de Factura</th>
                                            <th className="text-start font-semibold p-2">Total</th>
                                            <th className="text-start font-semibold p-2">Clave de Acceso</th>
                                            <th className="text-start font-semibold p-2">Fecha</th>
                                            <th className="text-start font-semibold p-2">Estado</th>
                                            <th className="text-start font-semibold p-2">Acción</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {facturasFiltradas.map(factura => (
                                            <tr key={factura.id} className="border-b border-[#2e5274]/60 even:bg-[#23374d]/60">
                                                <td className="p-2">{factura.nombreArchivo.split("_")[4]}</td>
                                                <td className="p-2">$ {factura.importeTotal}</td>
                                                <td className="p-2 text-sm">{factura.claveAcceso?.substring(0, 20)}...</td>
                                                <td className="p-2 text-sm">{formatearFechaFactura(factura.fechaEmision)}</td>
                                                <td className="p-2">
                                                    <span
                                                        className={`${getStatusBill(factura?.estado)} text-sm rounded-full px-2 py-1 lowercase`}
                                                    >
                                                        {factura?.estado}
                                                    </span>
                                                </td>
                                                <td className="p-2">
                                                    <Link
                                                        className="cursor-pointer px-3 py-1 hover:bg-gray-200 hover:text-gray-800 transition-colors rounded-xl text-nowrap block w-fit"
                                                        href={`/notas-debito/${factura.nombreArchivo}`}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Cards móviles */}
                            <div className="md:hidden mt-5 space-y-3">
                                {facturasFiltradas.map(factura => (
                                    <div key={factura.id} className="bg-[#05121f]/60 rounded-lg p-4 border border-[#061727]">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-gray-200">Factura #{factura.nombreArchivo.split("_")[4]}</p>
                                                    <p className="text-sm text-gray-400">{formatearFechaFactura(factura.fechaEmision)}</p>
                                                </div>
                                                <span className={`text-xs rounded-full px-2 py-1 lowercase bg-green-500/20 text-green-400`}>
                                                    {factura?.estado}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                <div>
                                                    <p className="text-xs text-gray-400">Total</p>
                                                    <p className="text-sm font-semibold">$ {factura.importeTotal}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400">Clave Acceso</p>
                                                    <p className="text-xs font-semibold break-all">{factura.claveAcceso?.substring(0, 15)}...</p>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <Link
                                                    className="cursor-pointer px-3 py-1 hover:bg-gray-200 hover:text-gray-800 transition-colors rounded-xl text-nowrap block w-fit bg-[#077eeb] text-white"
                                                    href={`/notas-debito/${factura.nombreArchivo}`}
                                                >
                                                    Crear Nota Débito
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Paginacion />
                        </>
                    ) : (
                        <p className="text-center uppercase">{busqueda.trim() ? 'No se encontraron resultados' : 'Sin datos'}</p>
                    )}

                </div>

            </MainLayout>
        </ComprobarAcceso>
    )
}

