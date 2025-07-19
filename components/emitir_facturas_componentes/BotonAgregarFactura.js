'use client'

import { useMainStore } from "@/store/mainStore"

export default function BotonAgregarFactura() {

    const changeModalCrearNotificacion = useMainStore((state) => state.changeModalCrearNotificacion)

    return (
        <button
            type="button"
            className="flex items-center gap-3 bg-[#2e4760] rounded-xl px-3 py-1 hover:bg-[#3a546e] transition-colors cursor-pointer"
            onClick={() => changeModalCrearNotificacion()}
        >
            Agregar

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

        </button>
    )
}
