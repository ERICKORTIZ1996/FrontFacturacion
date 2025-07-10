import Link from "next/link"

export default async function TablaEmitirFacturas() {

    return (
        <tr className="border-b border-[#355370] last-of-type:border-none even:bg-[#2e4760]">
            <td className="p-2">001-001-000000417</td>
            <td className="p-2">$ 105.00</td>
            <td className="p-2">$ 100.65</td>
            <td className="p-2">$ 10.60</td>
            <td className="p-2">6/20/2025</td>
            <td className="p-2">
                <span className="text-green-950 text-sm bg-green-200 rounded-full px-2 py-1">Pagado</span>
            </td>
            <td>
                <Link
                    className="cursor-pointer px-3 py-1 hover:bg-gray-200 hover:text-gray-800 transition-colors rounded-xl text-nowrap block w-fit"
                    href={`/emitir-facturas/asdf`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 block text-nowrap">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                </Link>
            </td>
        </tr>
    )
}
