import axios from "axios";
import Link from "next/link";
import MainLayout from "@/components/layouts/MainLayout";

// async function obtenerFactura() {
//     const { data } = await axios.get(`https://services.lockplay.org/devices/informationForDevice/COOPMEGA-4-11`);
//     return data
// }

export default async function Factura() {

    // const bills = await obtenerFactura();
    // console.log(bills);


    return (
        <MainLayout>

            <div className="flex text-gray-800 gap-2">

                <Link
                    className="font-semibold text-gray-100 cursor-pointer rounded-full transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-gray-100 hover:text-gray-800"
                    href={"/emitir-facturas"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>

                    Regresar
                </Link>

                <p className="bg-gray-100 font-semibold rounded-full px-4 py-1 border border-gray-100">Factura 001-001-000000417</p>
            </div>


        </MainLayout>
    )
}
