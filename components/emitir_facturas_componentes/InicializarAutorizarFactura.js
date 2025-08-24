"use client"

import { useMainStore } from "@/store/mainStore"
import { useEffect, useRef } from "react";

export default function InicializarAutorizarFactura({ factura }) {

  const crearFormProducto = useMainStore((state) => state.crearFormProducto)
  const setFormulariosFactura = useMainStore((state) => state.setFormulariosFactura)
  const setProductos = useMainStore((state) => state.setProductos)
  const yaEjecutado = useRef(false);

  useEffect(() => {

    if (factura?.data?.detalles && !yaEjecutado.current) {

      setFormulariosFactura([])
      setProductos([])

      factura.data.detalles.map(f => {

        crearFormProducto({
          id: f.id,
          codigoPrincipal: f.codigoPrincipal,
          descripcion: f.descripcion,
          cantidad: f.cantidad,
          precioUnitario: f.precioUnitario,
          descuento: f.descuento,
          precioTotalSinImpuesto: f.precioUnitario,
          impuestos: [{
            codigo: "IVA", // Cambiado a un valor que coincida con las claves de ImpuestosCod
            codigoPorcentaje: "15%", // Cambiado a un valor que coincida con las claves de TarifaIVA
            tarifa: 15,
            baseImponible: 100.00,
            valor: 15.00
          }]
        })
      });

      yaEjecutado.current = true;

    }

  }, [factura]);

  return null
}
