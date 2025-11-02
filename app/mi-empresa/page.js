"use client"

import { useState } from "react"
import MainLayout from "@/components/layouts/MainLayout"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import TablaEmpresas from "@/components/tables/TablaEmpresas"
import TablaSucursales from "@/components/tables/TablaSucursales"
import TablaPuntoEmision from "@/components/tables/TablaPuntoEmision"
import ModalCrearEmpresa from "@/components/modals/ModalCrearEmpresa"
import ModalCrearSucursal from "@/components/modals/ModalCrearSucursal"
import ModalCrearPuntoEmision from "@/components/modals/ModalCrearPuntoEmision"
import { useQuery } from "@tanstack/react-query"
import Paginacion from "@/components/emitir_facturas_componentes/Paginacion"
import axios from "axios"
import { useMainStore } from "@/store/mainStore"
import SmallSpinner from "@/components/layouts/SmallSpinner"
import { useRouter } from "next/navigation"

export default function MiEmpresa() {

    const changeModalCrearEmpresa = useMainStore((state) => state.changeModalCrearEmpresa)
    const changeModalCrearSucursal = useMainStore((state) => state.changeModalCrearSucursal)
    const changeModalCrearPuntoEmision = useMainStore((state) => state.changeModalCrearPuntoEmision)

    const router = useRouter()

    const [ventanaEmpresa, setVentanaEmpresa] = useState(true)
    const [ventanaSucursal, setVentanaSucursal] = useState(false)
    const [ventanaPuntoEmision, setVentanaPuntoEmision] = useState(false)


    const dataUser = useMainStore((state) => state.dataUser)

    const consultarEmpresas = async () => {
        try {
            if (!dataUser?.tokenAcceso) {
                console.warn('No hay token de acceso disponible')
                return null
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/empresas`, {
                headers: {
                    'Authorization': `Bearer ${dataUser.tokenAcceso}`
                }
            })
            return data
        } catch (error) {
            console.error('Error al consultar empresas:', error)
            
            // Si el error es 401, el token expiró - redirigir al login
            if (error?.response?.status === 401) {
                console.warn('Token expirado. Redirigiendo al login...')
                const cerrarSesion = useMainStore.getState().cerrarSesion
                cerrarSesion()
                setTimeout(() => {
                    router.push('/')
                }, 1000)
            } else if (error?.response?.status === 403) {
                console.warn('Acceso denegado (403). El usuario puede no tener permisos.')
            }
            
            return null
        }
    }

    const consultarSucursales = async () => {
        try {
            if (!dataUser?.tokenAcceso) {
                console.warn('❌ No hay token de acceso disponible en dataUser')
                console.warn('dataUser completo:', dataUser)
                return null
            }
            
            // Debug detallado del token
            const token = dataUser.tokenAcceso.trim() // Eliminar espacios
            const tokenPreview = token ? `${token.substring(0, 30)}...` : 'no-token'
            const tokenLength = token?.length || 0
            
            console.log('🔍 Debug - Consultar Sucursales:', {
                tieneToken: !!token,
                tokenLength: tokenLength,
                tokenPreview: tokenPreview,
                url: `${process.env.NEXT_PUBLIC_URL_BACK}/sucursales`,
                headerFormat: `Bearer ${token.substring(0, 20)}...`
            })
            
            // Verificar que el token no esté vacío o tenga solo espacios
            if (!token || tokenLength === 0) {
                console.error('❌ El token está vacío o solo contiene espacios')
                return null
            }
            
            // Construir el header exacto que se enviará
            const authHeader = `Bearer ${token}`
            console.log('📤 Headers que se enviarán:', {
                Authorization: authHeader.substring(0, 40) + '...',
                'Content-Type': 'application/json'
            })
            
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/sucursales`, {
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                }
            })
            
            console.log('✅ Sucursales obtenidas exitosamente')
            return data
        } catch (error) {
            console.error('❌ Error al consultar sucursales:', error)
            
            // Debug completo del error
            if (error?.response) {
                const headersEnviados = error.config?.headers
                console.error('📋 Detalles completos del error:', {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    mensaje: error.response.data?.mensaje || error.response.data?.message || 'Sin mensaje',
                    datos: error.response.data,
                    url: error.config?.url,
                    metodo: error.config?.method?.toUpperCase(),
                    headerAuthorizationEnviado: headersEnviados?.Authorization ? 
                        `${headersEnviados.Authorization.substring(0, 40)}...` : 'NO ENVIADO',
                    todosLosHeaders: Object.keys(headersEnviados || {})
                })
                
                // Verificar si el header se envió correctamente
                if (headersEnviados?.Authorization) {
                    const authSent = headersEnviados.Authorization
                    const tieneBearer = authSent.startsWith('Bearer ')
                    const tokenEnviado = authSent.replace('Bearer ', '')
                    console.log('🔍 Análisis del header Authorization:', {
                        tieneBearer: tieneBearer,
                        longitudToken: tokenEnviado.length,
                        formatoCorrecto: tieneBearer && tokenEnviado.length > 0
                    })
                } else {
                    console.error('❌ El header Authorization NO se envió en la petición')
                }
            }
            
            // Si el error es 401, el token expiró o es inválido - redirigir al login
            if (error?.response?.status === 401) {
                console.warn('❌ Token expirado o inválido (401)')
                console.warn('💡 Posibles causas:')
                console.warn('   1. El token expiró (verifica duración en backend)')
                console.warn('   2. El token no es válido (formato incorrecto)')
                console.warn('   3. El backend rechaza el token (verifica middleware de auth)')
                console.warn('   4. El formato del header Authorization no es el esperado')
                console.warn('')
                console.warn('Redirigiendo al login en 2 segundos...')
                
                const cerrarSesion = useMainStore.getState().cerrarSesion
                cerrarSesion()
                setTimeout(() => {
                    router.push('/')
                }, 2000)
            } else if (error?.response?.status === 403) {
                console.warn('⚠️ Acceso denegado (403). El usuario puede no tener permisos para esta acción.')
                console.warn('Mensaje del servidor:', error.response?.data?.mensaje || error.response?.data?.message)
            }
            
            return null
        }
    }

    const consultarPuntosEmision = async () => {
        try {
            if (!dataUser?.tokenAcceso) {
                console.warn('No hay token de acceso disponible')
                return null
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/puntos-emision`, {
                headers: {
                    'Authorization': `Bearer ${dataUser.tokenAcceso}`
                }
            })
            return data
        } catch (error) {
            console.error('Error al consultar puntos de emisión:', error)
            
            // Si el error es 401, el token expiró - redirigir al login
            if (error?.response?.status === 401) {
                console.warn('Token expirado. Redirigiendo al login...')
                const cerrarSesion = useMainStore.getState().cerrarSesion
                cerrarSesion()
                setTimeout(() => {
                    router.push('/')
                }, 1000)
            } else if (error?.response?.status === 403) {
                console.warn('Acceso denegado (403). Verifica tus permisos.')
            }
            
            return null
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['empresas'], // Identificador unico para cada Query
        queryFn: consultarEmpresas, // Funcion a consultar
        enabled: ventanaEmpresa && !!dataUser?.tokenAcceso, // Solo ejecuta cuando esta ventana esté activa y hay token
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
    })

    const { data: dataSucursales, isLoading: isLoadingSucursales } = useQuery({
        queryKey: ['sucursales'], // Identificador unico para cada Query
        queryFn: consultarSucursales, // Funcion a consultar 
        enabled: ventanaSucursal && !!dataUser?.tokenAcceso, // Solo ejecuta cuando esta ventana esté activa y hay token
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
    })

    const { data: dataPuntosEmision, isLoading: isLoadingPuntosEmision } = useQuery({
        queryKey: ['puntos_emision'], // Identificador unico para cada Query
        queryFn: consultarPuntosEmision, // Funcion a consultar
        enabled: ventanaPuntoEmision && !!dataUser?.tokenAcceso, // Solo ejecuta cuando esta ventana esté activa y hay token
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
    })



    return (
        <ComprobarAcceso>
            <MainLayout>

                <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>

                    <p>Mi Empresa</p>
                </div>

                <p className="mt-3">Gestiona y administra las diferentes partes de tu empresa.</p>

                <div className="mt-5 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                    <nav className="w-full rounded-xl">
                        <ul className="flex gap-3 justify-between text-gray-800 font-semibold uppercase">
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaEmpresa ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => {
                                        setVentanaEmpresa(true)
                                        setVentanaSucursal(false)
                                        setVentanaPuntoEmision(false)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                                    </svg>
                                    Empresas
                                </button>
                            </li>
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaSucursal ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => {
                                        setVentanaEmpresa(false)
                                        setVentanaSucursal(true)
                                        setVentanaPuntoEmision(false)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                                    </svg>
                                    Sucursales
                                </button>
                            </li>
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaPuntoEmision ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => {
                                        setVentanaEmpresa(false)
                                        setVentanaSucursal(false)
                                        setVentanaPuntoEmision(true)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    Punto de Emisión
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                {ventanaEmpresa && (
                    <>
                        <div className="mt-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                            <div className="flex gap-2 items-center flex-wrap">
                                <h2
                                    className="bg-[#077eeb]/60 px-3 py-1 rounded-xl w-fit text-base md:text-lg flex gap-1 font-semibold"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                                    </svg>

                                    Empresas
                                </h2>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#478bb3]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>


                                <p>Administra de manera eficiente la información de las empresas registradas en el sistema.</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[7px] left-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>

                                    <input
                                        type="text"
                                        placeholder="Buscar por ruc"
                                        className="w-full outline-none bg-[#2e4760] rounded-xl pl-9 py-1 pr-3 focus:border-blue-500 shadow-lg"
                                        name="email"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center gap-3 bg-[#2e4760] rounded-xl px-3 py-1 hover:bg-[#3a546e] transition-colors cursor-pointer"
                                    onClick={() => changeModalCrearEmpresa()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Agregar
                                </button>
                            </div>

                        </div>

                        <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-4 md:px-8 py-4 md:py-6 mt-5">

                            {isLoading ? (
                                <SmallSpinner />
                            ) : data?.data && data?.data?.length ? (
                                <>
                                    {/* Tabla desktop */}
                                    <div className="hidden md:block w-full mt-5 overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-[#05121f]/60">
                                                <tr className="border-b-2 border-[#061727]">
                                                    <th className="text-start font-semibold p-2">Ruc</th>
                                                    <th className="text-start font-semibold p-2">Razon Social</th>
                                                    <th className="text-start font-semibold p-2">Matriz</th>
                                                    <th className="text-start font-semibold p-2">Sucursales</th>
                                                    <th className="text-start font-semibold p-2">Detalle</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {data.data.map(empresa => (
                                                    <TablaEmpresas
                                                        key={empresa.id}
                                                        empresa={empresa}
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Cards móviles */}
                                    <div className="md:hidden mt-5 space-y-3">
                                        {data.data.map(empresa => (
                                            <div key={empresa.id} className="bg-[#05121f]/60 rounded-lg p-4 border border-[#061727]">
                                                <div className="flex flex-col gap-2">
                                                    <div>
                                                        <p className="font-semibold text-gray-200">{empresa.razonSocial || 'N/A'}</p>
                                                        <p className="text-sm text-gray-400">RUC: {empresa.ruc || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400">Matriz</p>
                                                        <p className="text-sm">{empresa.matriz || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Paginacion />
                                </>
                            ) : (
                                <p className="text-center uppercase">Sin datos</p>
                            )}

                        </div>
                    </>
                )}

                {ventanaSucursal && (
                    <>
                        <div className="mt-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                            <div className="flex gap-2 items-center flex-wrap">
                                <h2
                                    className="bg-[#077eeb]/60 px-3 py-1 rounded-xl w-fit text-base md:text-lg flex gap-1 font-semibold"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                                    </svg>

                                    Sucursales
                                </h2>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#478bb3]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>

                                <p>Gestiona de forma ordenada y eficiente todas las sucursales asociadas a cada empresa.</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[7px] left-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>

                                    <input
                                        type="text"
                                        placeholder="Buscar por ruc"
                                        className="w-full outline-none bg-[#2e4760] rounded-xl pl-9 py-1 pr-3 focus:border-blue-500 shadow-lg"
                                        name="email"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center gap-3 bg-[#2e4760] rounded-xl px-3 py-1 hover:bg-[#3a546e] transition-colors cursor-pointer"
                                    onClick={() => changeModalCrearSucursal()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Agregar
                                </button>
                            </div>

                        </div>

                        <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-4 md:px-8 py-4 md:py-6 mt-5">

                            {isLoadingSucursales ? (
                                <SmallSpinner />
                            ) : dataSucursales?.data && dataSucursales?.data?.length ? (
                                <>
                                    {/* Tabla desktop */}
                                    <div className="hidden md:block w-full mt-5 overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-[#05121f]/60">
                                                <tr className="border-b-2 border-[#061727]">
                                                    <th className="text-start font-semibold p-2">Ruc</th>
                                                    <th className="text-start font-semibold p-2">Establecimiento</th>
                                                    <th className="text-start font-semibold p-2">Nombre</th>
                                                    <th className="text-start font-semibold p-2">Dirección</th>
                                                    <th className="text-start font-semibold p-2">Detalle</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {dataSucursales.data.map(sucursal => (
                                                    <TablaSucursales
                                                        key={sucursal.id}
                                                        sucursal={sucursal}
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Cards móviles */}
                                    <div className="md:hidden mt-5 space-y-3">
                                        {dataSucursales.data.map(sucursal => (
                                            <div key={sucursal.id} className="bg-[#05121f]/60 rounded-lg p-4 border border-[#061727]">
                                                <div className="flex flex-col gap-2">
                                                    <div>
                                                        <p className="font-semibold text-gray-200">{sucursal.nombre || 'N/A'}</p>
                                                        <p className="text-sm text-gray-400">Establecimiento: {sucursal.establecimiento || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400">Dirección</p>
                                                        <p className="text-sm">{sucursal.direccion || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Paginacion />
                                </>
                            ) : (
                                <p className="text-center uppercase">Sin datos</p>
                            )}

                        </div>
                    </>
                )}

                {ventanaPuntoEmision && (
                    <>
                        <div className="mt-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                            <div className="flex gap-2 items-center flex-wrap">
                                <h2
                                    className="bg-[#077eeb]/60 px-3 py-1 rounded-xl w-fit text-base md:text-lg flex gap-1 font-semibold"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>

                                    Punto de Emisión
                                </h2>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#478bb3]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>

                                <p>Administra los puntos de emisión autorizados para la generación de comprobantes electrónicos.</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[7px] left-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>

                                    <input
                                        type="text"
                                        placeholder="Buscar por ruc"
                                        className="w-full outline-none bg-[#2e4760] rounded-xl pl-9 py-1 pr-3 focus:border-blue-500 shadow-lg"
                                        name="email"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center gap-3 bg-[#2e4760] rounded-xl px-3 py-1 hover:bg-[#3a546e] transition-colors cursor-pointer"
                                    onClick={() => changeModalCrearPuntoEmision()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Agregar
                                </button>
                            </div>

                        </div>

                        <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-4 md:px-8 py-4 md:py-6 mt-5">


                            {isLoadingPuntosEmision ? (
                                <SmallSpinner />
                            ) : dataPuntosEmision?.data && dataPuntosEmision?.data?.length ? (
                                <>
                                    {/* Tabla desktop */}
                                    <div className="hidden md:block w-full mt-5 overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-[#05121f]/60">
                                                <tr className="border-b-2 border-[#061727]">
                                                    <th className="text-start font-semibold p-2">Ruc</th>
                                                    <th className="text-start font-semibold p-2">Establecimiento</th>
                                                    <th className="text-start font-semibold p-2">Punto de Emisión</th>
                                                    <th className="text-start font-semibold p-2">Detalle</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {dataPuntosEmision.data.map(puntoEmision => (
                                                    <TablaPuntoEmision
                                                        key={puntoEmision.id}
                                                        puntoEmision={puntoEmision}
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Cards móviles */}
                                    <div className="md:hidden mt-5 space-y-3">
                                        {dataPuntosEmision.data.map(puntoEmision => (
                                            <div key={puntoEmision.id} className="bg-[#05121f]/60 rounded-lg p-4 border border-[#061727]">
                                                <div className="flex flex-col gap-2">
                                                    <div>
                                                        <p className="font-semibold text-gray-200">Establecimiento: {puntoEmision.establecimiento || 'N/A'}</p>
                                                        <p className="text-sm text-gray-400">Punto Emisión: {puntoEmision.puntoEmision || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Paginacion />
                                </>
                            ) : (
                                <p className="text-center uppercase">Sin datos</p>
                            )}


                        </div>
                    </>
                )}

                <ModalCrearEmpresa />
                <ModalCrearSucursal />
                <ModalCrearPuntoEmision />

            </MainLayout >
        </ComprobarAcceso >
    )
}
