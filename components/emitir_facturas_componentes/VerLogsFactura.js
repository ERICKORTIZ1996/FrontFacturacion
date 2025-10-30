'use client'

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useQuery } from "@tanstack/react-query"
import SmallSpinner from "../layouts/SmallSpinner"
import { formatearFecha } from "@/helpers"

/**
 * Componente para ver los logs de una factura
 */
export default function VerLogsFactura({ nombreArchivo }) {

    const [modalAbierto, setModalAbierto] = useState(false)

    const obtenerLogs = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/facturas/${nombreArchivo}/logs`)
            return data
        } catch (e) {
            throw new Error(e?.response?.data?.mensaje || 'Error al obtener logs')
        }
    }

    const { data: logs, isLoading } = useQuery({
        queryKey: ['logs_factura', nombreArchivo],
        queryFn: obtenerLogs,
        enabled: modalAbierto,
        refetchOnWindowFocus: false,
    })

    return (
        <>
            <button
                type="button"
                className="text-gray-100 cursor-pointer rounded-xl transition-colors px-3 py-1 border border-gray-100 flex gap-2 items-center hover:bg-gray-100 hover:text-gray-800"
                onClick={() => setModalAbierto(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Ver Logs
            </button>

            <Dialog open={modalAbierto} onClose={() => setModalAbierto(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">
                    <DialogPanel className="w-[100%] md:w-[60%] max-h-[90vh] space-y-4 px-8 py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2] overflow-auto">
                        
                        <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                            Logs de Factura
                        </DialogTitle>

                        <p className="text-center text-gray-300 text-sm">
                            Historial de operaciones de: {nombreArchivo}
                        </p>

                        {isLoading ? (
                            <div className="flex justify-center py-10">
                                <SmallSpinner />
                            </div>
                        ) : logs && logs.length > 0 ? (
                            <div className="space-y-3 mt-5">
                                {logs.map((log, index) => (
                                    <div 
                                        key={log.id || index}
                                        className="bg-[#2e4760]/60 rounded-lg p-4 border border-[#486b8f]/60"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                    log.estado === 'EXITOSO' ? 'bg-green-200 text-green-800' :
                                                    log.estado === 'ERROR' ? 'bg-red-200 text-red-800' :
                                                    'bg-yellow-200 text-yellow-800'
                                                }`}>
                                                    {log.estado}
                                                </span>
                                                <span className="text-gray-300 font-semibold">
                                                    {log.operacion}
                                                </span>
                                            </div>
                                            <span className="text-gray-400 text-sm">
                                                {formatearFecha(log.timestamp)}
                                            </span>
                                        </div>
                                        {log.mensaje && (
                                            <p className="text-gray-300 text-sm mt-2">
                                                {log.mensaje}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-400 py-10">
                                No hay logs disponibles para esta factura
                            </p>
                        )}

                        <div className="flex gap-3 justify-end border-t border-[#486b8f] pt-4">
                            <Button
                                className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                onClick={() => setModalAbierto(false)}
                            >
                                Cerrar
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

