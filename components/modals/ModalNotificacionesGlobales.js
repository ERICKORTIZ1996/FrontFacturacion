'use client'

import { useMainStore } from "@/store/mainStore"
import { Description, Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'

export default function ModalNotificacionesGlobales() {

    const modalNotificacionesGlobales = useMainStore((state) => state.modalNotificacionesGlobales)
    const changeModalNotificacionesGlobales = useMainStore((state) => state.changeModalNotificacionesGlobales)


    return (
        <>
            <Dialog open={modalNotificacionesGlobales} onClose={() => { changeModalNotificacionesGlobales() }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-start justify-end p-4 bg-transparent">

                    <DialogPanel className="w-[22rem] space-y-4 p-3 rounded-3xl shadow shadow-[#245e95] bg-gradient-to-b from-[#153350] to-[#1f3850] mr-20">

                        <div
                            className='flex justify-between items-center border-b border-b-[#486b8f] p-1'
                        >
                            <DialogTitle className="font-semibold text-center w-full">Notificaciones</DialogTitle>

                        </div>

                        <ul className="flex flex-col gap-2">
                            <li className="flex gap-3 items-center justify-between px-3 py-2 bg-[#2e4760] rounded-lg">

                                <div className="flex flex-col gap-0">
                                    <p className="font-semibold">Factura: 001-001-000000417</p>

                                    <p className="px-1 rounded-xl transition-colors text-yellow-950 bg-yellow-200 shadow-xl text-[12px] w-fit">
                                        Pendiente
                                    </p>

                                </div>

                                <Button
                                    className="bg-transparent rounded-lg p-1 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition-colors"
                                    onClick={() => changeModalNotificacionesGlobales()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </li>
                            <li className="flex gap-3 items-center justify-between px-3 py-2 bg-[#2e4760] rounded-lg">

                                <div className="flex flex-col gap-0">
                                    <p className="font-semibold">Factura: 001-001-000000417</p>

                                    <p className="px-1 rounded-xl transition-colors text-yellow-950 bg-yellow-200 shadow-xl text-[12px] w-fit">
                                        Pendiente
                                    </p>

                                </div>

                                <Button
                                    className="bg-transparent rounded-lg p-1 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition-colors"
                                    onClick={() => changeModalNotificacionesGlobales()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </li>
                            <li className="flex gap-3 items-center justify-between px-3 py-2 bg-[#2e4760] rounded-lg">

                                <div className="flex flex-col gap-0">
                                    <p className="font-semibold">Factura: 001-001-000000417</p>

                                    <p className="px-1 rounded-xl transition-colors text-yellow-950 bg-yellow-200 shadow-xl text-[12px] w-fit">
                                        Pendiente
                                    </p>

                                </div>

                                <Button
                                    className="bg-transparent rounded-lg p-1 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition-colors"
                                    onClick={() => changeModalNotificacionesGlobales()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </li>
                            <li className="flex gap-3 items-center justify-between px-3 py-2 bg-[#2e4760] rounded-lg">

                                <div className="flex flex-col gap-0">
                                    <p className="font-semibold">Factura: 001-001-000000417</p>

                                    <p className="px-1 rounded-xl transition-colors text-yellow-950 bg-yellow-200 shadow-xl text-[12px] w-fit">
                                        Pendiente
                                    </p>

                                </div>

                                <Button
                                    className="bg-transparent rounded-lg p-1 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition-colors"
                                    onClick={() => changeModalNotificacionesGlobales()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </li>
                        </ul>
                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
