"use client"

import { useMainStore } from "@/store/mainStore"
import { useMemo } from "react";

export default function TotalFactura({
    subtotal,
    descuento,
    codigoImpuesto,
    porcentajeImpuesto,
    valorImpuesto,
    total
}) {

    const productos = useMainStore((state) => state.productos)
    // console.log(productos);


    const totalSinIVA = useMemo(() => {
        const lista = Array.isArray(productos) ? productos : [];
        return lista.reduce((total, p) => total + (Number(p?.precioUnitario) || 0), 0);
    }, [productos]);

    return (
        <div className="rounded-3xl bg-gradient-to-b from-[#153350]/60 to-[#1f3850]/60 px-6 py-4">

            <span className="block">SUBTOTAL: $ {Number(subtotal).toFixed(2)}</span>
            <span className="block">DESCUENTO: $ {Number(descuento).toFixed(2)}</span>
            <span className="block">{codigoImpuesto} {porcentajeImpuesto}: $ {Number(valorImpuesto).toFixed(2)}</span>

            <div className="flex gap-3 items-center mt-5">

                <p className='font-semibold text-gray-200 border border-gray-200 rounded-xl px-3 py-1 w-fit'>
                    Total a Pagar: $ {Number(total).toFixed(2)}
                </p>
            </div>
        </div>
    )
}
