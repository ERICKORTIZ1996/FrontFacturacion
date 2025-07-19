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

                    <DialogPanel className="w-[20%] space-y-4 p-3 rounded-3xl shadow shadow-[#245e95] bg-gradient-to-b from-[#153350] to-[#1f3850] mr-20">

                        <div
                            className='flex justify-between items-center border-b border-b-[#486b8f] p-1'
                        >
                            <DialogTitle className="font-semibold text-center w-full">Notificaciones</DialogTitle>

                        </div>

                        <ul className="flex flex-col gap-2">
                            <li className="flex gap-3 items-center justify-between px-3 py-0 bg-[#2e4760] rounded-lg">
                                <div className="flex gap-3 items-center p-1 bg-[#2e4760] rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    <p>Notificacíon Uno</p>
                                </div>

                                <Button
                                    className="bg-[#d24148] rounded-full p-1 cursor-pointer hover:bg-[#d76161] transition-colors"
                                // onClick={() => changeModalNotificacionesGlobales()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </li>
                            <li className="flex gap-3 items-center justify-between px-3 py-0 bg-[#2e4760] rounded-lg">
                                <div className="flex gap-3 items-center p-1 bg-[#2e4760] rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    <p>Notificacíon Uno</p>
                                </div>

                                <Button
                                    className="bg-[#d24148] rounded-full p-1 cursor-pointer hover:bg-[#d76161] transition-colors"
                                // onClick={() => changeModalNotificacionesGlobales()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </li>
                            <li className="flex gap-3 items-center justify-between px-3 py-0 bg-[#2e4760] rounded-lg">
                                <div className="flex gap-3 items-center p-1 bg-[#2e4760] rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    <p>Notificacíon Uno</p>
                                </div>

                                <Button
                                    className="bg-[#d24148] rounded-full p-1 cursor-pointer hover:bg-[#d76161] transition-colors"
                                // onClick={() => changeModalNotificacionesGlobales()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </li>
                            <li className="flex gap-3 items-center justify-between px-3 py-0 bg-[#2e4760] rounded-lg">
                                <div className="flex gap-3 items-center p-1 bg-[#2e4760] rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    <p>Notificacíon Uno</p>
                                </div>

                                <Button
                                    className="bg-[#d24148] rounded-full p-1 cursor-pointer hover:bg-[#d76161] transition-colors"
                                // onClick={() => changeModalNotificacionesGlobales()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </li>
                            <li className="flex gap-3 items-center justify-between px-3 py-0 bg-[#2e4760] rounded-lg">
                                <div className="flex gap-3 items-center p-1 bg-[#2e4760] rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    <p>Notificacíon Uno</p>
                                </div>

                                <Button
                                    className="bg-[#d24148] rounded-full p-1 cursor-pointer hover:bg-[#d76161] transition-colors"
                                // onClick={() => changeModalNotificacionesGlobales()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </li>

                        </ul>

                        {/* 
                        <div className='flex gap-3 items-center'>

                            <Button
                                className="bg-[#d24148] rounded-full p-1 cursor-pointer hover:bg-[#d76161] transition-colors"
                                onClick={() => changeModalNotificacionesGlobales()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </Button>
                        </div> */}
                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
