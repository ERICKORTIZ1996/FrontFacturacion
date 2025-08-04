'use client'

import { useQuery } from "@tanstack/react-query"
import { useMainStore } from "@/store/mainStore"
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import Link from "next/link"
import SmallSpinner from "../layouts/SmallSpinner"
import axios from "axios"

export default function ModalNotificacionesGlobales() {

    const modalNotificacionesGlobales = useMainStore((state) => state.modalNotificacionesGlobales)
    const changeModalNotificacionesGlobales = useMainStore((state) => state.changeModalNotificacionesGlobales)

    const consultarFacturasPendientes = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/facturas/estado/PENDIENTE`);
            return data
        } catch (error) {
            console.log(error);
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['facturas_pendientes_modal'], // Identificador unico para cada Query
        queryFn: consultarFacturasPendientes, // Funcion a consultar
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
        enabled: modalNotificacionesGlobales
    })

    return (
        <>
            <Dialog open={modalNotificacionesGlobales} onClose={() => { changeModalNotificacionesGlobales() }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-start justify-end p-4 bg-transparent">

                    <DialogPanel className="w-[22rem] h-80  space-y-4 p-3 rounded-3xl shadow shadow-[#245e95] bg-gradient-to-b from-[#153350] to-[#1f3850] mr-20">

                        <div
                            className='flex justify-between items-center border-b border-b-[#486b8f] p-1'
                        >
                            <DialogTitle className="font-semibold text-center w-full">Notificaciones</DialogTitle>

                        </div>

                        {isLoading ? (
                            <SmallSpinner />
                        ) : data?.data && data?.data?.length ? (
                            <ul className="flex flex-col gap-2 pr-3 overflow-y-auto h-[calc(15rem)] barra">
                                {data?.data?.map(factura => (
                                    <li
                                        key={factura.id}
                                        className="flex gap-3 items-center justify-between px-3 py-2 bg-[#2e4760] rounded-lg"
                                    >

                                        <div className="flex flex-col gap-0">
                                            <p className="font-semibold">Factura: {factura.nombreArchivo.split("_")[4]}</p>

                                            <p className="px-1 rounded-xl transition-colors text-yellow-950 bg-yellow-200 shadow-xl text-[12px] w-fit lowercase">
                                                {factura.estado}
                                            </p>

                                        </div>

                                        <Link
                                            className="bg-transparent rounded-lg p-1 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition-colors"
                                            onClick={() => changeModalNotificacionesGlobales()}
                                            href={`/emitir-facturas/autorizar-facturas/${factura.nombreArchivo}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>

                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center uppercase">Sin datos</p>
                        )}

                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
