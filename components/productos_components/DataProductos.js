"use client"

import { useQuery } from "@tanstack/react-query"
import TablaProductos from "../tables/TablaProductos"
import SmallSpinner from "../layouts/SmallSpinner"
import Paginacion from "../emitir_facturas_componentes/Paginacion"
import axios from "axios"

export default function DataProductos() {

    const consultarProductos = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/productos`)
            return data
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['crear_producto'], // Identificador unico para cada Query
        queryFn: consultarProductos, // Funcion a consultar
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
    })

    return (
        isLoading ? (
            <SmallSpinner />
        ) : data?.data && data?.data?.length ? (
            <>
                <table className="w-full mt-5">
                    <thead className="bg-[#05121f]/60">
                        <tr className="border-b-2 border-[#061727]">
                            <th className="text-start font-semibold p-2">Código</th>
                            <th className="text-start font-semibold p-2">Nombre</th>
                            <th className="text-start font-semibold p-2">Stock</th>
                            <th className="text-start font-semibold p-2">Pre. Unit.</th>
                            <th className="text-start font-semibold p-2">Descuento</th>
                            <th className="text-start font-semibold p-2">Estado</th>
                            <th className="text-start font-semibold p-2">Detalle</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.data.map(producto => (
                            <TablaProductos
                                key={producto.id}
                                producto={producto}
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
