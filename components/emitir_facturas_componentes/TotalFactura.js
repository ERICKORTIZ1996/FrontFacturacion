"use client"

import { useMainStore } from "@/store/mainStore"
import { useMemo } from "react";

export default function TotalFactura() {

    const productos = useMainStore((state) => state.productos)
    console.log(productos);


    const totalSinIVA = useMemo(() => {
        const lista = Array.isArray(productos) ? productos : [];
        return lista.reduce((total, p) => total + (Number(p?.precioUnitario) || 0), 0);
    }, [productos]);

    return (
        <div className="rounded-3xl bg-gradient-to-b from-[#153350]/60 to-[#1f3850]/60 px-6 py-4">

            <span className="block">SUBTOTAL: $ </span>
            <span className="block">IVA 15%: $ 00.00</span>
            <span className="block">DESCUENTO: $ 00.00</span>

            <div className="flex gap-3 items-center mt-5">

                <p className='font-semibold text-gray-200 border border-gray-200 rounded-xl px-3 py-1 w-fit'>
                    Total a Pagar: $ {totalSinIVA}
                </p>
            </div>
        </div>
    )
}
