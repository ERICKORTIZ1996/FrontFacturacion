import MainLayout from "@/components/layouts/MainLayout"
import Paginacion from "@/components/emitir_facturas_componentes/Paginacion"
import TablaAutorizarFactura from "@/components/tables/TablaAutorizarFactura"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import Link from "next/link"
import axios from "axios"

async function consultarFacturas() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/facturas/estado/PENDIENTE`);
  return data
}

export default async function AutorizarFacturas() {

  const facturas = await consultarFacturas()

  return (
    <ComprobarAcceso>
      <MainLayout>

        <div className="flex gap-2 items-center">
          <Link
            className="font-semibold text-gray-100 cursor-pointer rounded-full transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-gray-100 hover:text-gray-800"
            href={"/emitir-facturas"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>

            Regresar
          </Link>

          <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">

              <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
            </svg>

            <p>Autorizar Facturas</p>
          </div>
        </div>

        <p className="mt-3">
          En esta sección podras editar las facturas que tengan como estado 'Pendiente'. Asegurate de ingresar la información correcta.
        </p>


        <div className="mt-5 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

          <p
            className="px-3 py-1 rounded-xl transition-colors text-yellow-950 bg-yellow-200 shadow-xl"
          >
            Facturas Pendientes
          </p>

          <div className="w-1/3 relative">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[7px] left-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

            <input
              type="text"
              placeholder="Buscar por número de factura"
              className="w-full outline-none bg-[#2e4760] rounded-xl pl-9 py-1 pr-3 focus:border-blue-500 shadow-lg"
              name="email"
            />
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">

          {facturas.data && facturas.data.length ? (
            <>
              <table className="w-full mt-5">
                <thead className="bg-[#05121f]/60">
                  <tr className="border-b-2 border-[#061727]">
                    <th className="text-start font-semibold p-2">Número de Factura</th>
                    <th className="text-start font-semibold p-2">Total</th>
                    <th className="text-start font-semibold p-2">Subtotal</th>
                    <th className="text-start font-semibold p-2">Descuento</th>
                    <th className="text-start font-semibold p-2">Fecha</th>
                    <th className="text-start font-semibold p-2">Estado</th>
                    <th className="text-start font-semibold p-2">Detalle</th>
                  </tr>
                </thead>

                <tbody>
                  {facturas.data.map(factura => (
                    <TablaAutorizarFactura
                      key={factura.id}
                      factura={factura}
                    />
                  ))}
                </tbody>
              </table>

              <Paginacion
              // data={bills}
              />
            </>
          ) : (
            <p className="text-center uppercase">Sin datos</p>
          )}

        </div>

      </MainLayout >
    </ComprobarAcceso>
  )
}
