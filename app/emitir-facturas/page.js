import MainLayout from "@/components/layouts/MainLayout"
import BotonAgregarFactura from "@/components/emitir_facturas_componentes/BotonAgregarFactura"
import ModalEmitirFactura from "@/components/modals/ModalEmitirFactura"
import Paginacion from "@/components/emitir_facturas_componentes/Paginacion"
import axios from "axios"

// async function getBills() {
//     const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/devices/informationForDevice/COOPMEGA-4-11`);
//     return data
// }

export default async function EmitirFacturas() {

    // const bills = await getBills()

    return (
        <MainLayout>

            <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>

                <p>Emitir Facturas</p>
            </div>

            <p className="mt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime quod odit nobis.</p>


            <div className="mt-10 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="px-3 py-1 bg-red-200 rounded-xl transition-colors text-red-950 shadow-xl hover:bg-red-300"
                    >
                        Exportar en PDF
                    </button>

                    <button
                        type="button"
                        className="px-3 py-1 bg-green-200 rounded-xl transition-colors text-green-950 shadow-xl hover:bg-green-300"
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

                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#355370]">
                            <th className="text-start font-semibold p-2">Número de Factura</th>
                            <th className="text-start font-semibold p-2">Total</th>
                            <th className="text-start font-semibold p-2">Subtotal</th>
                            <th className="text-start font-semibold p-2">Descuento</th>
                            <th className="text-start font-semibold p-2">Fecha</th>
                            <th className="text-start font-semibold p-2">Estado</th>
                            <th className="text-start font-semibold p-2">Acción</th>
                        </tr>
                    </thead>

                    <tbody className="odd:bg-red-600">
                        <tr className="border-b border-[#355370] last-of-type:border-none even:bg-[#2e4760] hover:bg-[#4d5d92]">
                            <td className="p-2">001-001-000000417</td>
                            <td className="p-2">$ 105.00</td>
                            <td className="p-2">$ 100.65</td>
                            <td className="p-2">$ 10.60</td>
                            <td className="p-2">6/20/2025</td>
                            <td className="p-2">
                                <span className="text-green-950 text-sm bg-green-200 rounded-full px-2 py-1">Pagado</span>
                            </td>
                            <td>
                                <button
                                    type="button"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                </button>
                            </td>
                        </tr>
                        <tr className="border-b border-[#355370] last-of-type:border-none even:bg-[#2e4760] hover:bg-[#4d5d92]">
                            <td className="p-2">001-001-000000417</td>
                            <td className="p-2">$ 105.00</td>
                            <td className="p-2">$ 100.65</td>
                            <td className="p-2">$ 10.60</td>
                            <td className="p-2">6/20/2025</td>
                            <td className="p-2">
                                <span className="text-red-950 text-sm bg-red-200 rounded-full px-2 py-1">En Espera</span>
                            </td>
                            <td>
                                <button
                                    type="button"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                </button>
                            </td>
                        </tr>
                        <tr className="border-b border-[#355370] last-of-type:border-none even:bg-[#2e4760] hover:bg-[#4d5d92]">
                            <td className="p-2">001-001-000000417</td>
                            <td className="p-2">$ 105.00</td>
                            <td className="p-2">$ 100.65</td>
                            <td className="p-2">$ 10.60</td>
                            <td className="p-2">6/20/2025</td>
                            <td className="p-2">
                                <span className="text-red-950 text-sm bg-red-200 rounded-full px-2 py-1">En Espera</span>
                            </td>
                            <td>
                                <button
                                    type="button"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                </button>
                            </td>
                        </tr>
                        <tr className="border-b border-[#355370] last-of-type:border-none even:bg-[#2e4760] hover:bg-[#4d5d92]">
                            <td className="p-2">001-001-000000417</td>
                            <td className="p-2">$ 105.00</td>
                            <td className="p-2">$ 100.65</td>
                            <td className="p-2">$ 10.60</td>
                            <td className="p-2">6/20/2025</td>
                            <td className="p-2">
                                <span className="text-red-950 text-sm bg-red-200 rounded-full px-2 py-1">En Espera</span>
                            </td>
                            <td>
                                <button
                                    type="button"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Paginacion
                // data={bills}
                />

            </div>

            <ModalEmitirFactura />
        </MainLayout >
    )
}
