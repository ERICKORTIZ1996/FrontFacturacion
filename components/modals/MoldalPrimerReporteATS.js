'use cliente'

import { useState } from "react"
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import SmallSpinner from "../layouts/SmallSpinner"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useMainStore } from "@/store/mainStore"
import { toast } from "react-toastify"

export default function MoldalPrimerReporteATS() {

    const changeModalPrimerReporteATS = useMainStore((state) => state.changeModalPrimerReporteATS)
    const modalPrimerReporteATS = useMainStore((state) => state.modalPrimerReporteATS)

    const [fechaConsulta, setFechaConsulta] = useState('');
    const [consulta, setConsulta] = useState(false);

    const handleSubmit = async (formData) => {

        if (formData.get('fecha-consulta') === '') {
            toast.error('Escoge una fecha')
            return
        }

        setFechaConsulta(formData.get('fecha-consulta'))
        setConsulta(true)
    }

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/api/reportes/ats?mes=${fechaConsulta.split("-")[1]}&anio=${fechaConsulta.split("-")[0]}`)
            setConsulta(false)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['primer_reporte_ats'],  // Identificador unico para cada Query
        queryFn: fetchData, // Funcion a consultar
        enabled: consulta, // Solo ejecuta cuando esta ventana esté activa
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
    })

    return (

        <>
            <Dialog open={modalPrimerReporteATS} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/50">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[100%] md:w-[50%] h-[90%] space-y-4 px-8 py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2]">

                        <div className='flex h-full flex-col justify-between'>
                            <form
                                action={handleSubmit}
                                className='overflow-y-auto h-full barra pr-8'
                                id='form-primer-reporte-ats'
                            >

                                <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                                    Reporte ATS
                                </DialogTitle>

                                <h2 className='my-5 text-xl flex gap-2 items-center'>

                                    <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-gray-200 text-gray-800">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                        </svg>
                                    </span>

                                    Datos
                                </h2>

                                <div className="flex gap-2 items-center mb-5">

                                    <input
                                        type="date"
                                        name="fecha-consulta"
                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                    />

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#478bb3]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                    </svg>

                                    <p>Escoge una fecha</p>
                                </div>

                                {isLoading ? (
                                    <SmallSpinner />
                                ) : data ? (
                                    <>
                                        <div className="flex gap-5 mb-5 border-b pb-5 border-b-[#486b8f]">
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Año: {data?.anio}</p>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Mes: {data?.mes}</p>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Número Comprobantes: {data?.numeroComprobantes}</p>
                                        </div>

                                        {data?.registros && data?.registros?.length ?
                                            (
                                                <p className="mb-5">Mostrando Registros</p>
                                            )
                                            :
                                            (
                                                <p className="mb-5 bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] w-fit">Sin registros</p>
                                            )

                                        }

                                        <div className="flex gap-5 mb-5 border-t pt-5 border-t-[#486b8f]">
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Base Imponible: {data?.totales?.baseImponible}</p>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Iva: {data?.totales?.iva}</p>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Total Impuestos: {data?.totales?.totalImpuestos}</p>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Otros Impuestos: {data?.totales?.otrosImpuestos}</p>
                                        </div>
                                    </>
                                ) : null}



                            </form>

                            <form className='border-t border-t-[#486b8f] flex gap-3 items-center justify-end pt-5'>
                                <Button
                                    className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                    onClick={() => {
                                        changeModalPrimerReporteATS()
                                        setConsulta(false)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    Cerrar
                                </Button>

                                <Button
                                    className={`bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 border border-gray-100 text-gray-800 flex items-center`}
                                    type='submit'
                                    form='form-primer-reporte-ats'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    Consultar
                                </Button>
                            </form>
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>
        </>

    )
}
