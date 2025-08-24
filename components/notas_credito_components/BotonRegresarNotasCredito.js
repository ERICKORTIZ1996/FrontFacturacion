"use client"

import Link from "next/link"
import { useMainStore } from "@/store/mainStore"

export default function BotonRegresarNotasCredito() {

    const setFormulariosFactura = useMainStore((state) => state.setFormulariosFactura)
    const setProductos = useMainStore((state) => state.setProductos)

    return (
        <Link
            className="font-semibold text-gray-100 cursor-pointer rounded-full transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-gray-100 hover:text-gray-800"
            href={"/notas-credito"}
            onClick={() => {
                setFormulariosFactura([])
                setProductos([])
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>

            Regresar
        </Link>
    )
}
