import MainLayout from "@/components/layouts/MainLayout"
import BotonAgregarFactura from "@/components/emitir_facturas_componentes/BotonAgregarFactura"
import ModalEmitirFactura from "@/components/modals/ModalEmitirFactura"
import Paginacion from "@/components/emitir_facturas_componentes/Paginacion"
import TablaEmitirFacturas from "@/components/tables/TablaEmitirFacturas"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import axios from "axios"

export default function AutorizarFacturas() {
  return (
    <ComprobarAcceso>
      <MainLayout>

        <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">

            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
          </svg>

          <p>Autorizar Facturas</p>
        </div>

        <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit natus, dicta quae eligendi ab quidem consequuntur exercitationem rerum eos similique commodi, fuga perferendis optio dolore tempore autem iure placeat nulla.</p>


        <div className="mt-5 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">
          <h1>En Construcción</h1>
        </div>

        <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">

          <h1>En Construcción</h1>

        </div>

      </MainLayout >
    </ComprobarAcceso>
  )
}
