import MainLayout from "@/components/layouts/MainLayout"
import Paginacion from "@/components/emitir_facturas_componentes/Paginacion"
import TablaNotasCredito from "@/components/tables/TablaNotasCredito"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import { getStatusBill } from "@/helpers"
import Link from "next/link"
import axios from "axios"

async function consultarFacturasValidadas() {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/facturas/estado/AUTORIZADA`);
        return data
    } catch (error) {
        return null
    }

}

export default async function NotasCredito() {

    const facturas = await consultarFacturasValidadas()

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
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                        </svg>

                        <p>Notas de Crédito</p>
                    </div>
                </div>

                <p className="mt-3">
                    En esta sección podras editar una factura en caso de devoluciones. Asegurate de ingresar la información correcta. Solo se podran editar los productos existentes.
                </p>


                <div className="mt-5 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                    <p
                        className={`${getStatusBill('AUTORIZADA')} px-3 py-1 rounded-xl transition-colors shadow-xl`}
                    >
                        Facturas Autorizadas
                    </p>

                    <div className="w-1/3 relative">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[7px] left-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                        <input
                            type="text"
                            placeholder="Buscar por número de factura"
                            className="w-full outline-none bg-[#2e4760] rounded-xl pl-9 py-1 pr-3 focus:border-blue-500 shadow-lg"
                            name="email"
                        />
                    </div>
                </div>

                <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">

                    {facturas?.data && facturas?.data?.length ? (
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
                                    {facturas.data.map(factura => (
                                        <TablaNotasCredito
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

                </div>

            </MainLayout >
        </ComprobarAcceso>
    )
}
