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
            codigo: f.impuestos[0].codigo,
            codigoPorcentaje: f.impuestos[0].codigoPorcentaje,
            tarifa: f.impuestos[0].tarifa,
            baseImponible: f.impuestos[0].baseImponible,
            valor: f.impuestos[0].valor
          }]
        })
      });

      yaEjecutado.current = true;

    }

  }, [factura]);

  return null
}
