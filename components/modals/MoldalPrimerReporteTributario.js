'use client'

import { useState } from "react"
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import SmallSpinner from "../layouts/SmallSpinner"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useMainStore } from "@/store/mainStore"
import { toast } from "react-toastify"

export default function MoldalPrimerReporteTributario() {

    const changeModalPrimerReporteTributario = useMainStore((state) => state.changeModalPrimerReporteTributario)
    const modalPrimerReporteTributario = useMainStore((state) => state.modalPrimerReporteTributario)
    const dataUser = useMainStore((state) => state.dataUser)

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
            // Validar que tengamos token antes de hacer la petición
            if (!dataUser?.tokenAcceso) {
                console.warn('No hay token de acceso disponible')
                setConsulta(false)
                toast.error('No estás autenticado')
                return null
            }

            // Validar que tengamos fecha
            if (!fechaConsulta) {
                setConsulta(false)
                return null
            }

            // Corregir la URL: la ruta correcta es /facturas/api/reportes/tributario
            const mes = fechaConsulta.split("-")[1]
            const anio = fechaConsulta.split("-")[0]
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACK}/facturas/api/reportes/tributario?mes=${mes}&anio=${anio}&formato=csv`,
                {
                    headers: {
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                    }
                }
            )
            setConsulta(false)
            return data
        } catch (error) {
            console.error('Error al obtener reporte tributario:', error)
            setConsulta(false)
            const mensajeError = error?.response?.data?.mensaje || error?.response?.data?.message || 'Error al obtener el reporte tributario'
            toast.error(mensajeError)
            // Retornar null en lugar de lanzar error para que React Query lo maneje
            return null
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['primer_reporte_tributario', fechaConsulta],  // Identificador unico para cada Query, incluye fecha para invalidar cache
        queryFn: fetchData, // Funcion a consultar
        enabled: consulta && !!dataUser?.tokenAcceso && !!fechaConsulta, // Solo ejecuta cuando hay consulta activa, token y fecha
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
    })

    let objetoDatos;

    if (data) {

        const [claves, valores] = data?.split('\n');

        const arrayClaves = claves.replace(/"/g, '').split(',');
        const arrayValores = valores.split(',');

        objetoDatos = arrayClaves.reduce((obj, clave, index) => {
            // Asegúrate de que el valor sea un número
            obj[clave] = parseFloat(arrayValores[index]);
            return obj;
        }, {});
    }

    return (

        <>
            <Dialog open={modalPrimerReporteTributario} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/50">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[95%] md:w-[50%] max-w-xl md:max-w-none h-[90vh] md:h-[90%] space-y-4 px-4 md:px-8 py-4 md:py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2]">

                        <div className='flex h-full flex-col justify-between'>
                            <form
                                action={handleSubmit}
                                className='overflow-y-auto h-full barra pr-8'
                                id='form-primer-reporte-ats'
                            >

                                <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                                    Reporte Tributario
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
                                        <div className="flex flex-col gap-5 mb-5">
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Base Imponible: {objetoDatos?.baseImponible0}</p>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Segunda Base Imponible: {objetoDatos?.baseImponible12}</p>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Iva Generado: {objetoDatos?.ivaGenerado}</p>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Número de Facturas: {objetoDatos?.numeroFacturas}</p>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Relaciones IVA: {objetoDatos?.retencionesIVA}</p>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Retenciones Renta: {objetoDatos?.retencionesRenta}</p>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Toal Ventas: {objetoDatos?.totalVentas}</p>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760]">Ventas Exentas: {objetoDatos?.ventasExentas}</p>
                                        </div>
                                    </>
                                ) : null}



                            </form>

                            <form className='border-t border-t-[#486b8f] flex gap-3 items-center justify-end pt-5'>
                                <Button
                                    className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                    onClick={() => {
                                        changeModalPrimerReporteTributario()
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
