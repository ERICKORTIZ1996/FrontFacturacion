"use client"

import Link from "next/link"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import TablaAutorizarFactura from "../tables/TablaAutorizarFactura"
import SmallSpinner from "../layouts/SmallSpinner"
import Paginacion from "../emitir_facturas_componentes/Paginacion"
import axios from "axios"
import { getStatusBill, formatearFechaFactura } from "@/helpers"

export default function DataAutorizarFactura() {

    const [filtroEstado, setfiltroEstado] = useState(null)

    const consultarFacturas = async (estado = null) => {

        try {

            let url;
            const baseUrl = `${process.env.NEXT_PUBLIC_URL_BACK}/facturas`; // URL para consultar todas las facturas

            switch (estado) {
                case 'ERROR':
                    url = `${baseUrl}/estado/ERROR`;
                    break;
                case 'AUTORIZADA':
                    url = `${baseUrl}/estado/AUTORIZADA`;
                    break;
                case 'PENDIENTE':
                    url = `${baseUrl}/estado/PENDIENTE`;
                    break;
                default:
                    url = baseUrl;
                    break;
            }

            // Realiza la petición a la API usando la URL construida
            const { data } = await axios.get(url);
            return data;

        } catch (error) {
            console.error(error);
            throw error; // Re-lanza el error para que useQuery lo maneje
        }
    };

    const { data, isLoading } = useQuery({
        queryKey: ['emitir_facturas', filtroEstado], // Identificador unico para cada Query
        queryFn: () => consultarFacturas(filtroEstado), // Funcion a consultar
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
    })

    return (
        <>

            <div className="flex gap-3 items-center flex-wrap text-xs md:text-sm">

                <button
                    type="button"
                    className="font-semibold text-gray-100 cursor-pointer rounded-full transition-colors px-2 py-1 border border-gray-100 flex gap-2 items-center hover:bg-gray-100 hover:text-gray-800 text-sm"
                    onClick={() => setfiltroEstado()}
                >
                    Todas
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
                    className={`${getStatusBill("ERROR")} text-sm rounded-full px-2 py-1 hover:bg-red-300 transition-colors cursor-pointer`}
                    onClick={() => setfiltroEstado('ERROR')}
                >
                    Error
                </button>

            </div>

            {isLoading ? (
                <SmallSpinner />
            ) : data?.data && data?.data?.length ? (
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
                                {data.data.map(factura => (
                                    <TablaAutorizarFactura
                                        key={factura.id}
                                        factura={factura}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Cards móviles */}
                    <div className="md:hidden mt-5 space-y-3">
                        {data.data.filter(factura => factura.estado !== 'FIRMADA' && factura.estado !== 'RECHAZADA').map(factura => (
                            <div key={factura.id} className="bg-[#05121f]/60 rounded-lg p-4 border border-[#061727]">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-gray-200">Factura #{factura.nombreArchivo.split("_")[4]}</p>
                                            <p className="text-sm text-gray-400">{formatearFechaFactura(factura.fechaEmision)}</p>
                                        </div>
                                        <span className={`text-xs rounded-full px-2 py-1 lowercase ${factura.estado === 'AUTORIZADA' ? 'bg-green-500/20 text-green-400' : factura.estado === 'PENDIENTE' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                            {factura?.estado}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <div>
                                            <p className="text-xs text-gray-400">Total</p>
                                            <p className="text-sm font-semibold">$ {factura.importeTotal}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Subtotal</p>
                                            <p className="text-sm font-semibold">$ {factura.totalSinImpuestos}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Descuento</p>
                                            <p className="text-sm font-semibold">$ {factura.totalDescuento}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <Link
                                            className="cursor-pointer px-3 py-1 hover:bg-gray-200 hover:text-gray-800 transition-colors rounded-xl text-nowrap block w-fit bg-[#077eeb] text-white"
                                            href={`/emitir-facturas/autorizar-facturas/${factura.nombreArchivo}`}
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
                <p className="text-center uppercase">Sin datos</p>
            )}

        </>
    )
}
