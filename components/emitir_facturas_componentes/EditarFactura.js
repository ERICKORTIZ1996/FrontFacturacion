"use client"

import { useMainStore } from "@/store/mainStore"
import { EditarProducto } from "../autorizar_facturas_components/EditarProducto"

export default function EditarFactura() {

    const productos = useMainStore((state) => state.productos)

    return (
        <>
            {
                productos.map(detalle => (
                    <EditarProducto
                        key={detalle.id}
                        detalle={detalle}
                    />
                ))
            }
        </>
    )
}
