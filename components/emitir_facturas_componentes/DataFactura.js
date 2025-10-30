"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import TablaEmitirFacturas from "../tables/TablaEmitirFacturas"
import SmallSpinner from "../layouts/SmallSpinner"
import Paginacion from "./Paginacion"
import axios from "axios"
import { getStatusBill } from "@/helpers"
import { useMainStore } from "@/store/mainStore"

export default function DataFactura({ busqueda = '' }) {

    const [filtroEstado, setfiltroEstado] = useState(null)
    const dataUser = useMainStore((state) => state.dataUser)

    const consultarFacturas = async (estado = null) => {

        try {
            // Validar que tengamos token antes de hacer la petición
            if (!dataUser?.tokenAcceso) {
                console.warn('No hay token de acceso disponible')
                return { data: [] }
            }

            let url;
            const baseUrl = `${process.env.NEXT_PUBLIC_URL_BACK}/facturas`; // URL para consultar todas las facturas

            switch (estado) {
                case 'ERROR':
                    url = `${baseUrl}/estado/ERROR`;
                    break;
                case 'FIRMADA':
                    url = `${baseUrl}/estado/FIRMADA`;
                    break;
                case 'AUTORIZADA':
                    url = `${baseUrl}/estado/AUTORIZADA`;
                    break;
                case 'PENDIENTE':
                    url = `${baseUrl}/estado/PENDIENTE`;
                    break;
                case 'RECHAZADA':
                    url = `${baseUrl}/estado/RECHAZADA`;
                    break;
                default:
                    url = baseUrl;
                    break;
            }

            // Realiza la petición a la API usando la URL construida con autenticación
            const { data } = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${dataUser.tokenAcceso}`
                }
            });
            return data;

        } catch (error) {
            console.error('Error al consultar facturas:', error);
            // Retornar un objeto con estructura válida en lugar de lanzar error
            // Esto previene errores en React Query y permite mostrar un estado vacío
            return { data: [] }
        }
    };

    const { data, isLoading } = useQuery({
        queryKey: ['emitir_facturas', filtroEstado], // Identificador unico para cada Query
        queryFn: () => consultarFacturas(filtroEstado), // Funcion a consultar
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
        enabled: !!dataUser?.tokenAcceso // Solo ejecutar si hay token de acceso
    })

    // Filtrar facturas por búsqueda si existe
    const facturasFiltradas = useMemo(() => {
        if (!data?.data) return []
        
        if (!busqueda.trim()) return data.data
        
        const terminoBusqueda = busqueda.trim().toLowerCase()
        return data.data.filter(factura => {
            // Buscar por número de factura (última parte del nombreArchivo)
            const numeroFactura = factura.nombreArchivo.split("_").pop()?.toLowerCase() || ''
            // Buscar en el nombre del archivo completo
            const nombreArchivo = factura.nombreArchivo?.toLowerCase() || ''
            // Buscar en clave de acceso si existe
            const claveAcceso = factura.claveAcceso?.toLowerCase() || ''
            
            return numeroFactura.includes(terminoBusqueda) || 
                   nombreArchivo.includes(terminoBusqueda) ||
                   claveAcceso.includes(terminoBusqueda)
        })
    }, [busqueda, data?.data])

    return (

        <>
            <div className="flex gap-3 items-center">

                <button
                    type="button"
                    className="font-semibold text-gray-100 cursor-pointer rounded-full transition-colors px-2 py-1 border border-gray-100 flex gap-2 items-center hover:bg-gray-100 hover:text-gray-800 text-sm"
                    onClick={() => setfiltroEstado()}
                >
                    Todas
                </button>
                <button
                    type="button"
                    className={`${getStatusBill("FIRMADA")} text-sm rounded-full px-2 py-1 hover:bg-green-300 transition-colors cursor-pointer`}
                    onClick={() => setfiltroEstado('FIRMADA')}
                >
                    Firmadas
                </button>
                <button
                    type="button"
                    className={`${getStatusBill("AUTORIZADA")} text-sm rounded-full px-2 py-1 hover:bg-blue-300 transition-colors cursor-pointer`}
                    onClick={() => setfiltroEstado('AUTORIZADA')}
                >
                    Autorizadas
                </button>
                <button
                    type="button"
                    className={`${getStatusBill("PENDIENTE")} text-sm rounded-full px-2 py-1 hover:bg-yellow-300 transition-colors cursor-pointer`}
                    onClick={() => setfiltroEstado('PENDIENTE')}
                >
                    Pendientes
                </button>
                <button
                    type="button"
                    className={`${getStatusBill("RECHAZADA")} text-sm rounded-full px-2 py-1 hover:bg-purple-300 transition-colors cursor-pointer`}
                    onClick={() => setfiltroEstado('RECHAZADA')}
                >
                    Rechazadas
                </button>
                <button
                    type="button"
                    className={`${getStatusBill("ERROR")} text-sm rounded-full px-2 py-1 hover:bg-red-300 transition-colors cursor-pointer`}
                    onClick={() => setfiltroEstado('ERROR')}
                >
                    Error
                </button>

            </div>

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
                                <th className="text-start font-semibold p-2">Subtotal</th>
                                <th className="text-start font-semibold p-2">Descuento</th>
                                <th className="text-start font-semibold p-2">Fecha</th>
                                <th className="text-start font-semibold p-2">Estado</th>
                                <th className="text-start font-semibold p-2">Detalle</th>
                            </tr>
                        </thead>

                            <tbody>
                                {facturasFiltradas.map(factura => (
                                    <TablaEmitirFacturas
                                        key={factura.id}
                                        factura={factura}
                                    />
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
                                            <p className="font-semibold text-gray-200">Factura #{factura.numeroFactura || factura.numero}</p>
                                            <p className="text-sm text-gray-400">{new Date(factura.fechaEmision || factura.fecha).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs ${factura.estado === 'AUTORIZADA' ? 'bg-green-500/20 text-green-400' : factura.estado === 'PENDIENTE' ? 'bg-yellow-500/20 text-yellow-400' : factura.estado === 'RECHAZADA' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                            {factura.estado}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <div>
                                            <p className="text-xs text-gray-400">Total</p>
                                            <p className="text-sm font-semibold">${factura.importeTotal || factura.total || 0}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Subtotal</p>
                                            <p className="text-sm font-semibold">${factura.totalSinImpuestos || factura.subtotal || 0}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Descuento</p>
                                            <p className="text-sm font-semibold">${factura.totalDescuento || factura.descuento || 0}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <Link
                                            className="cursor-pointer px-3 py-1 hover:bg-gray-200 hover:text-gray-800 transition-colors rounded-xl text-nowrap block w-fit bg-[#077eeb] text-white"
                                            href={`/emitir-facturas/${factura.nombreArchivo}`}
                                        >
                                            Ver Detalle
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Paginacion
                    // data={bills}
                    />
                </>
            ) : (
                <p className="text-center uppercase">{busqueda.trim() ? 'No se encontraron resultados' : 'Sin datos'}</p>
            )}

        </>
    )
}
