"use client"

import { useQuery } from "@tanstack/react-query"
import TablaEmitirFacturas from "../tables/TablaEmitirFacturas"
import SmallSpinner from "../layouts/SmallSpinner"
import Paginacion from "./Paginacion"
import axios from "axios"

export default function DataFactura() {

    const consultarFacturas = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/facturas`)
            return data
        } catch (error) {
            console.log(error);
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['emitir_facturas'], // Identificador unico para cada Query
        queryFn: consultarFacturas, // Funcion a consultar
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
    })

    return (
        isLoading ? (
            <SmallSpinner />
        ) : data.data && data.data.length ? (
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
        )
    )
}
