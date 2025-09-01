"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import TablaEmitirFacturas from "../tables/TablaEmitirFacturas"
import SmallSpinner from "../layouts/SmallSpinner"
import Paginacion from "./Paginacion"
import axios from "axios"
import { getStatusBill } from "@/helpers"

export default function DataFactura() {

    const [filtroEstado, setfiltroEstado] = useState(null)

    const consultarFacturas = async (estado = null) => {

        try {

            let url;
            const baseUrl = `${process.env.NEXT_PUBLIC_URL_BACK}/facturas`; // URL para consultar todas las facturas

            switch (estado) {
                case 'ERROR':
                    url = `${baseUrl}/estado/ERROR`;
                    break;
                case 'VALIDADA':
                    url = `${baseUrl}/estado/VALIDADA`;
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
                    className={`${getStatusBill("VALIDADA")} text-sm rounded-full px-2 py-1 hover:bg-yellow-300 transition-colors cursor-pointer`}
                    onClick={() => setfiltroEstado('VALIDADA')}
                >
                    Validadas
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
                    className={`${getStatusBill("PENDIENTE")} text-sm rounded-full px-2 py-1 hover:bg-green-300 transition-colors cursor-pointer`}
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
            ) : data?.data && data?.data?.length ? (
                <>
                    <table className="w-full mt-5">
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
                                <TablaEmitirFacturas
                                    key={factura.id}
                                    factura={factura}
                                />
                            ))}
                        </tbody>
                    </table>

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
