import MainLayout from "@/components/layouts/MainLayout"
import BotonAgregarFactura from "@/components/emitir_facturas_componentes/BotonAgregarFactura"
import ModalEmitirFactura from "@/components/modals/ModalEmitirFactura"
import Paginacion from "@/components/emitir_facturas_componentes/Paginacion"
import TablaEmitirFacturas from "@/components/tables/TablaEmitirFacturas"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import axios from "axios"

// async function getBills() {
//     const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/devices/informationForDevice/COOPMEGA-4-11`);
//     return data
// }

export default async function EmitirFacturas() {

    // const bills = await getBills()

    return (
        <ComprobarAcceso>
            <MainLayout>

                <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>

                    <p>Emitir Facturas</p>
                </div>

                <p className="mt-3">Gestiona y genera facturas electrónicas de forma rápida y segura. Completa la información requerida y asegura el cumplimiento tributario en cada emisión.</p>


                <div className="mt-5 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                    <div className="flex items-center gap-3">
                        <button
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
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">

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

                        <BotonAgregarFactura />
                    </div>

                </div>

                <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">

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
                            <TablaEmitirFacturas />
                            <TablaEmitirFacturas />
                            <TablaEmitirFacturas />
                        </tbody>
                    </table>

                    <Paginacion
                    // data={bills}
                    />

                </div>

                <ModalEmitirFactura />
            </MainLayout >
        </ComprobarAcceso>
    )
}
