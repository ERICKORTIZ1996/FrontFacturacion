'use client'

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
                console.warn('No hay fecha seleccionada')
                setConsulta(false)
                return null
            }

            // Debug: mostrar información del token (sin mostrar el token completo por seguridad)
            const tokenPreview = dataUser.tokenAcceso ? `${dataUser.tokenAcceso.substring(0, 20)}...` : 'no-token'
            console.log('Intentando obtener reporte ATS con token:', tokenPreview)

            // Corregir la URL: la ruta correcta es /facturas/api/reportes/ats
            const mes = fechaConsulta.split("-")[1]
            const anio = fechaConsulta.split("-")[0]
            
            // Validar que mes y anio sean válidos
            if (!mes || !anio) {
                console.error('Fecha inválida:', fechaConsulta)
                setConsulta(false)
                toast.error('La fecha seleccionada no es válida')
                return null
            }

            const url = `${process.env.NEXT_PUBLIC_URL_BACK}/facturas/api/reportes/ats?mes=${mes}&anio=${anio}`
            console.log('URL de consulta:', url)
            console.log('Parámetros:', { mes, anio })

            const { data } = await axios.get(
                url,
                {
                    headers: {
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            
            console.log('Reporte ATS obtenido exitosamente:', data)
            setConsulta(false)
            
            // El backend puede devolver data.data o data directamente dependiendo de ResponseHelper
            return data?.data || data
        } catch (error) {
            console.error('Error al obtener reporte ATS:', error)
            
            // Log detallado del error
            if (error?.response) {
                console.error('Status:', error.response.status)
                console.error('Status Text:', error.response.statusText)
                console.error('Response Data:', error.response.data)
                console.error('Headers enviados:', error.config?.headers)
                
                // Si es 500, error del servidor
                if (error?.response?.status === 500) {
                    const mensajeBackend = error?.response?.data?.message || error?.response?.data?.mensaje || 'Error interno del servidor'
                    console.error(`❌ 500 Internal Server Error al obtener reporte ATS: ${mensajeBackend}`)
                    console.warn('Posibles causas:')
                    console.warn('1. Error en el procesamiento del reporte en el backend')
                    console.warn('2. Problema con la base de datos')
                    console.warn('3. Datos faltantes o inválidos para el período solicitado')
                    console.warn('4. Error en la generación del XML o procesamiento de facturas')
                    console.warn('Verifica en el backend:')
                    console.warn('- Logs del servidor para ver el error específico')
                    console.warn('- Que existan facturas para el mes/año solicitado')
                    console.warn('- Que la configuración de la empresa esté correcta')
                }
                
                // Si es 403, permisos insuficientes
                if (error?.response?.status === 403) {
                    console.error(`❌ 403 Forbidden: No tienes permisos para ver este reporte`)
                }
                
                // Si es 401, el token está expirado o es inválido
                if (error?.response?.status === 401) {
                    console.error('❌ 401 Unauthorized: Token inválido o expirado. Es necesario cerrar sesión y volver a iniciar sesión.')
                }
            } else if (error?.request) {
                console.error('No se recibió respuesta del servidor:', error.request)
            } else {
                console.error('Error configurando la petición:', error.message)
            }
            
            setConsulta(false)
            
            // Extraer mensaje de error más detallado
            let mensajeError = 'Error al obtener el reporte ATS'
            
            if (error?.response?.status === 500) {
                mensajeError = error?.response?.data?.message || error?.response?.data?.mensaje || 'Error interno del servidor al generar el reporte. Por favor, contacta al administrador o intenta con otra fecha.'
                // Limpiar emojis del mensaje
                mensajeError = mensajeError.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim()
                toast.error(mensajeError, { autoClose: 6000 })
            } else if (error?.response?.status === 403) {
                mensajeError = 'No tienes permisos para ver este reporte'
                toast.error(mensajeError)
            } else if (error?.response?.status === 401) {
                mensajeError = 'Tu sesión ha expirado. Por favor, cierra sesión e inicia sesión nuevamente.'
                toast.error(mensajeError)
            } else if (error?.response?.data) {
                mensajeError = error.response.data.mensaje || error.response.data.message || mensajeError
                mensajeError = mensajeError.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim()
                toast.error(mensajeError)
            } else {
                toast.error(mensajeError)
            }
            
            // Retornar null en lugar de lanzar error para que React Query lo maneje
            return null
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['primer_reporte_ats', fechaConsulta],  // Identificador unico para cada Query, incluye fecha para invalidar cache
        queryFn: fetchData, // Funcion a consultar
        enabled: consulta && !!dataUser?.tokenAcceso && !!fechaConsulta, // Solo ejecuta cuando hay consulta activa, token y fecha
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
    })

    return (

        <>
            <Dialog open={modalPrimerReporteATS} onClose={() => { }} className="relative z-50">
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
