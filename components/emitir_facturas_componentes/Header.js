'use client'

import { useMainStore } from "@/store/mainStore"

export default function Header() {

    const changeModalNotificacionesGlobales = useMainStore((state) => state.changeModalNotificacionesGlobales)
    const dataUser = useMainStore((state) => state.dataUser)

    return (
        <div className="flex justify-between items-start">

            <div>
                <p className="text-xl">Bienvenido, <span className="font-semibold text-gray-200">{dataUser.nombre}</span></p>
                <p>Aquí esta el resumen de tu negocio</p>
            </div>

            <div className="relative flex justify-end">
                <button
                    type="button"
                    className="bg-[#102940] rounded-full p-2 cursor-pointer"
                    onClick={() => changeModalNotificacionesGlobales()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>

                </button>

                <span className="absolute top-0 right-0 w-3 h-3 bg-[#d24148] rounded-full"></span>
            </div>
        </div>
    )
}
