'use client'

import { useMainStore } from "@/store/mainStore"
import { Description, Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'

export default function ModalNotificacionesGlobales() {

    const modalNotificacionesGlobales = useMainStore((state) => state.modalNotificacionesGlobales)
    const changeModalNotificacionesGlobales = useMainStore((state) => state.changeModalNotificacionesGlobales)


    return (
        <>
            <Dialog open={modalNotificacionesGlobales} onClose={() => { changeModalNotificacionesGlobales() }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-start justify-end p-4 bg-gray-800/0">

                    <DialogPanel className="w-[20%] space-y-4 px-6 py-4 rounded-3xl shadow shadow-[#245e95] bg-gradient-to-b from-[#153350] to-[#1f3850] mr-20">

                        <div
                            className='flex justify-between items-center gap-5 border-b border-b-[#486b8f] pb-5'
                        >
                            <DialogTitle className="font-semibold text-lg text-center w-full">Notificaciones</DialogTitle>

                        </div>


                        <div className='flex gap-3 items-center'>

                            <Button
                                className="bg-[#d24148] rounded-full p-2 cursor-pointer hover:bg-[#d76161] transition-colors flex items-center gap-1 px-3 py-1"
                                onClick={() => changeModalNotificacionesGlobales()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </Button>
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
