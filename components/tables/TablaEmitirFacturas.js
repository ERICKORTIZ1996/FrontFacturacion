import Link from "next/link"
import { getStatusBill, formatearFechaFactura } from "@/helpers"

export default function TablaEmitirFacturas({ factura }) {

    return (
        <tr className="border-b border-[#2e5274]/60 even:bg-[#23374d]/60">
            <td className="p-2">{factura.nombreArchivo.split("_")[4]}</td>
            <td className="p-2">$ {factura.importeTotal}</td>
            <td className="p-2">$ {factura.totalSinImpuestos}</td>
            <td className="p-2">{factura.totalDescuento}</td>
            <td className="p-2 text-sm">{formatearFechaFactura(factura.fechaEmision)}</td>
            <td className="p-2">
                <span
                    className={`${getStatusBill(factura?.estado)} text-sm rounded-full px-2 py-1 lowercase`}
                >
                    {factura?.estado}
                </span>
            </td>
            <td>
                <Link
                    className="cursor-pointer px-3 py-1 hover:bg-gray-200 hover:text-gray-800 transition-colors rounded-xl text-nowrap block w-fit"
                    href={`/emitir-facturas/${factura.nombreArchivo}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 block text-nowrap">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                </Link>
            </td>
        </tr>
    )
}
