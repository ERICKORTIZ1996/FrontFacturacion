'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useQuery } from "@tanstack/react-query"
import SmallSpinner from "../layouts/SmallSpinner"
import { useMainStore } from "@/store/mainStore"

export default function QRWhatsapp() {

    const modalNotificacionesGlobales = useMainStore((state) => state.modalNotificacionesGlobales)
    const changeModalNotificacionesGlobales = useMainStore((state) => state.changeModalNotificacionesGlobales)

    const obtenerQR = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/whatsapp/qr`, {
                responseType: 'blob'
            })
            
            // Crear URL para la imagen
            const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }))
            return imageUrl
        } catch (e) {
            throw new Error(e?.response?.data?.mensaje || 'Error al obtener QR')
        }
    }

    const { data: qrImage, isLoading, refetch } = useQuery({
        queryKey: ['whatsapp_qr'],
        queryFn: obtenerQR,
        enabled: modalNotificacionesGlobales,
        refetchInterval: 5000, // Refrescar cada 5 segundos para obtener nuevo QR si es necesario
        refetchOnWindowFocus: false,
    })

    return (
        <Dialog open={modalNotificacionesGlobales} onClose={() => changeModalNotificacionesGlobales()} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">
                <DialogPanel className="w-[100%] md:w-[40%] space-y-4 px-8 py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2]">
                    
                    <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                        Conectar WhatsApp
                    </DialogTitle>

                    <p className="text-center text-gray-300">
                        Escanea este código QR con tu WhatsApp para conectar el sistema
                    </p>

                    <div className="flex flex-col items-center justify-center py-5">
                        {isLoading ? (
                            <SmallSpinner />
                        ) : qrImage ? (
                            <img 
                                src={qrImage} 
                                alt="QR Code WhatsApp" 
                                className="w-64 h-64 border-2 border-gray-300 rounded-lg"
                            />
                        ) : (
                            <p className="text-gray-400">No se pudo generar el QR</p>
                        )}
                    </div>

                    <div className="flex gap-3 justify-end">
                        <Button
                            className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                            onClick={() => changeModalNotificacionesGlobales()}
                        >
                            Cerrar
                        </Button>
                        <Button
                            className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 border border-gray-100 text-gray-800 flex items-center gap-2"
                            onClick={() => refetch()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.25 18.75h4.994a2.25 2.25 0 0 0 2.25-2.25v-2.499A2.25 2.25 0 0 1 11.998 12a2.25 2.25 0 0 1 2.25 2.25V18.75M9 16.5h3.75" />
                            </svg>
                            Actualizar QR
                        </Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
