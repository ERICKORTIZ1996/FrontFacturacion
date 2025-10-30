'use client'

import { useState } from "react"
import MainLayout from "@/components/layouts/MainLayout"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import SmallSpinner from "@/components/layouts/SmallSpinner"
import { useMainStore } from "@/store/mainStore"
import { toast } from "react-toastify"
import ModalCrearCuenta from "@/components/modals/ModalCrearCuenta"
import ModalCrearPeriodo from "@/components/modals/ModalCrearPeriodo"
import ModalCrearAsiento from "@/components/modals/ModalCrearAsiento"

/**
 * Página principal del sistema contable
 * Incluye: Plan de cuentas, Periodos contables, Asientos contables y Reportes
 */
export default function Contabilidad() {

    const [ventanaActiva, setVentanaActiva] = useState('plan-cuentas')
    const dataUser = useMainStore((state) => state.dataUser)
    const changeModalCrearCuenta = useMainStore((state) => state.changeModalCrearCuenta)
    const changeModalCrearPeriodo = useMainStore((state) => state.changeModalCrearPeriodo)
    const changeModalCrearAsiento = useMainStore((state) => state.changeModalCrearAsiento)

    // Obtener empresas del usuario para usar en las peticiones de contabilidad
    const consultarEmpresas = async () => {
        try {
            if (!dataUser?.tokenAcceso) {
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
            return null
        }
    }

    const { data: empresasData } = useQuery({
        queryKey: ['empresas_contabilidad'],
        queryFn: consultarEmpresas,
        enabled: !!dataUser?.tokenAcceso,
        refetchOnWindowFocus: false,
    })

    // Obtener el primer empresaId disponible
    const empresaId = empresasData?.data?.length > 0 ? empresasData.data[0].id : null

    // Consultas para diferentes módulos
    const consultarPlanCuentas = async () => {
        try {
            if (!dataUser?.tokenAcceso) {
                return null
            }
            if (!empresaId) {
                console.warn('No hay empresaId disponible')
                return null
            }
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACK}/contabilidad/plan-cuentas?empresaId=${empresaId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                    }
                }
            )
            return data
        } catch (error) {
            console.error('Error al consultar plan de cuentas:', error)
            return null
        }
    }

    const consultarPeriodos = async () => {
        try {
            if (!dataUser?.tokenAcceso) {
                return null
            }
            if (!empresaId) {
                console.warn('No hay empresaId disponible')
                return null
            }
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACK}/contabilidad/periodos?empresaId=${empresaId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                    }
                }
            )
            return data
        } catch (error) {
            console.error('Error al consultar periodos:', error)
            return null
        }
    }

    const consultarAsientos = async () => {
        try {
            if (!dataUser?.tokenAcceso) {
                return null
            }
            if (!empresaId) {
                console.warn('No hay empresaId disponible')
                return null
            }
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACK}/contabilidad/asientos?empresaId=${empresaId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                    }
                }
            )
            return data
        } catch (error) {
            console.error('Error al consultar asientos:', error)
            return null
        }
    }

    // Consultar plan de cuentas siempre si hay empresa (se necesita para el libro mayor)
    const { data: planCuentas, isLoading: isLoadingPlan } = useQuery({
        queryKey: ['plan_cuentas', empresaId],
        queryFn: consultarPlanCuentas,
        enabled: !!dataUser?.tokenAcceso && !!empresaId, // Siempre disponible cuando hay empresa
        refetchOnWindowFocus: false,
    })

    const { data: periodos, isLoading: isLoadingPeriodos } = useQuery({
        queryKey: ['periodos_contables', empresaId],
        queryFn: consultarPeriodos,
        enabled: ventanaActiva === 'periodos' && !!dataUser?.tokenAcceso && !!empresaId,
        refetchOnWindowFocus: false,
    })

    const { data: asientos, isLoading: isLoadingAsientos } = useQuery({
        queryKey: ['asientos_contables', empresaId],
        queryFn: consultarAsientos,
        enabled: ventanaActiva === 'asientos' && !!dataUser?.tokenAcceso && !!empresaId,
        refetchOnWindowFocus: false,
    })

    return (
        <ComprobarAcceso>
            <MainLayout>

                <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>

                    <p>Sistema Contable</p>
                </div>

                <p className="mt-3">Gestiona tu contabilidad: plan de cuentas, periodos, asientos y reportes financieros.</p>

                <div className="mt-5 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">
                    <nav className="w-full rounded-xl">
                        <ul className="flex flex-wrap gap-2 md:gap-3 justify-between text-gray-800 font-semibold uppercase text-xs md:text-base">
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaActiva === 'plan-cuentas' ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => setVentanaActiva('plan-cuentas')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                    </svg>
                                    Plan de Cuentas
                                </button>
                            </li>
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaActiva === 'periodos' ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => setVentanaActiva('periodos')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                    Periodos
                                </button>
                            </li>
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaActiva === 'asientos' ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => setVentanaActiva('asientos')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                    Asientos
                                </button>
                            </li>
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaActiva === 'reportes' ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => setVentanaActiva('reportes')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0H9m-9.375 9A2.25 2.25 0 0 1 6 18.375V21M6 18.375a2.25 2.25 0 0 1-2.25-2.25V15m12 2.625A2.25 2.25 0 0 0 18.375 21H21a2.25 2.25 0 0 0 2.25-2.25v-1.5M15 18.375v1.5a2.25 2.25 0 0 0 2.25 2.25H21M9 15V9a2.25 2.25 0 0 1 2.25-2.25h4.5A2.25 2.25 0 0 1 18 9v6m-9 3v-6a2.25 2.25 0 0 1 2.25-2.25h4.5A2.25 2.25 0 0 1 18 12v6" />
                                    </svg>
                                    Reportes
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-4 md:px-8 py-4 md:py-6 mt-5">
                    {ventanaActiva === 'plan-cuentas' && (
                        <>
                            {isLoadingPlan ? (
                                <SmallSpinner />
                            ) : (() => {
                                // Manejar diferentes estructuras de respuesta
                                const cuentasData = planCuentas?.data?.cuentas || planCuentas?.data?.data?.cuentas || planCuentas?.cuentas
                                const total = planCuentas?.data?.total || planCuentas?.total || (cuentasData?.length || 0)
                                
                                return (
                                    <div className="mt-5">
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="uppercase text-gray-400">Plan de Cuentas - {total} cuentas</p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (!empresaId) {
                                                        toast.error('Debes tener una empresa asociada')
                                                        return
                                                    }
                                                    changeModalCrearCuenta()
                                                }}
                                                className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-4 py-2 flex items-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                                Crear Cuenta
                                            </button>
                                        </div>
                                        {cuentasData && cuentasData.length > 0 ? (
                                            <div className="text-center text-gray-400">
                                                {/* Aquí puedes agregar una tabla para mostrar las cuentas */}
                                                <p>Se muestran {total} cuentas en el plan</p>
                                            </div>
                                        ) : (
                                            <p className="text-center uppercase text-gray-400">No hay cuentas registradas. Crea tu primera cuenta.</p>
                                        )}
                                    </div>
                                )
                            })()}
                        </>
                    )}

                    {ventanaActiva === 'periodos' && (
                        <>
                            {isLoadingPeriodos ? (
                                <SmallSpinner />
                            ) : (
                                <div className="mt-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="uppercase text-gray-400">Periodos Contables - {periodos?.data?.length || 0} periodos</p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (!empresaId) {
                                                    toast.error('Debes tener una empresa asociada')
                                                    return
                                                }
                                                changeModalCrearPeriodo()
                                            }}
                                            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-4 py-2 flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            Crear Periodo
                                        </button>
                                    </div>
                                    {periodos?.data?.length ? (
                                        <div className="text-center text-gray-400">
                                            {/* Aquí puedes agregar una tabla para mostrar los periodos */}
                                            <p>Se muestran {periodos.data.length} periodos contables</p>
                                        </div>
                                    ) : (
                                        <p className="text-center uppercase text-gray-400">No hay periodos contables registrados. Crea tu primer periodo.</p>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {ventanaActiva === 'asientos' && (
                        <>
                            {isLoadingAsientos ? (
                                <SmallSpinner />
                            ) : (
                                <div className="mt-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="uppercase text-gray-400">Asientos Contables - {asientos?.data?.length || 0} asientos</p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (!empresaId) {
                                                    toast.error('Debes tener una empresa asociada')
                                                    return
                                                }
                                                changeModalCrearAsiento()
                                            }}
                                            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-4 py-2 flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            Crear Asiento
                                        </button>
                                    </div>
                                    {asientos?.data?.length ? (
                                        <div className="text-center text-gray-400">
                                            {/* Aquí puedes agregar una tabla para mostrar los asientos */}
                                            <p>Se muestran {asientos.data.length} asientos contables</p>
                                        </div>
                                    ) : (
                                        <p className="text-center uppercase text-gray-400">No hay asientos contables registrados. Crea tu primer asiento.</p>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {ventanaActiva === 'reportes' && (
                        <div className="mt-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                                <button
                                    className="bg-[#2e4760] rounded-xl px-4 py-3 hover:bg-[#3a546e] transition-colors cursor-pointer text-gray-200 flex flex-col items-center gap-2"
                                    onClick={async () => {
                                        try {
                                            if (!dataUser?.tokenAcceso) {
                                                toast.error('No estás autenticado')
                                                return
                                            }
                                            if (!empresaId) {
                                                toast.error('No hay empresa seleccionada')
                                                return
                                            }
                                            const fechaCorte = new Date().toISOString().split('T')[0] // Fecha actual como fecha de corte
                                            const { data } = await axios.get(
                                                `${process.env.NEXT_PUBLIC_URL_BACK}/contabilidad/reportes/balance-general?empresaId=${empresaId}&fechaCorte=${fechaCorte}`,
                                                {
                                                    responseType: 'blob',
                                                    headers: {
                                                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                                                    }
                                                }
                                            )
                                            const blob = new Blob([data], { type: 'application/pdf' })
                                            const url = URL.createObjectURL(blob)
                                            window.open(url, '_blank')
                                        } catch (e) {
                                            console.error(e)
                                            toast.error(e?.response?.data?.mensaje || 'Error al generar balance general')
                                        }
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0H9m-9.375 9A2.25 2.25 0 0 1 6 18.375V21M6 18.375a2.25 2.25 0 0 1-2.25-2.25V15m12 2.625A2.25 2.25 0 0 0 18.375 21H21a2.25 2.25 0 0 0 2.25-2.25v-1.5M15 18.375v1.5a2.25 2.25 0 0 0 2.25 2.25H21M9 15V9a2.25 2.25 0 0 1 2.25-2.25h4.5A2.25 2.25 0 0 1 18 9v6m-9 3v-6a2.25 2.25 0 0 1 2.25-2.25h4.5A2.25 2.25 0 0 1 18 12v6" />
                                    </svg>
                                    Balance General
                                </button>

                                <button
                                    className="bg-[#2e4760] rounded-xl px-4 py-3 hover:bg-[#3a546e] transition-colors cursor-pointer text-gray-200 flex flex-col items-center gap-2"
                                    onClick={async () => {
                                        try {
                                            if (!dataUser?.tokenAcceso) {
                                                toast.error('No estás autenticado')
                                                return
                                            }
                                            if (!empresaId) {
                                                toast.error('No hay empresa seleccionada')
                                                return
                                            }
                                            const fechaCorte = new Date().toISOString().split('T')[0] // Fecha actual como fecha de corte
                                            const { data } = await axios.get(
                                                `${process.env.NEXT_PUBLIC_URL_BACK}/contabilidad/reportes/estado-resultados?empresaId=${empresaId}&fechaCorte=${fechaCorte}`,
                                                {
                                                    responseType: 'blob',
                                                    headers: {
                                                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                                                    }
                                                }
                                            )
                                            const blob = new Blob([data], { type: 'application/pdf' })
                                            const url = URL.createObjectURL(blob)
                                            window.open(url, '_blank')
                                        } catch (e) {
                                            console.error(e)
                                            toast.error(e?.response?.data?.mensaje || 'Error al generar estado de resultados')
                                        }
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                    </svg>
                                    Estado de Resultados
                                </button>

                                <button
                                    className="bg-[#2e4760] rounded-xl px-4 py-3 hover:bg-[#3a546e] transition-colors cursor-pointer text-gray-200 flex flex-col items-center gap-2"
                                    onClick={async () => {
                                        try {
                                            if (!dataUser?.tokenAcceso) {
                                                toast.error('No estás autenticado')
                                                return
                                            }
                                            if (!empresaId) {
                                                toast.error('No hay empresa seleccionada')
                                                return
                                            }
                                            
                                            // Necesitamos obtener las cuentas para seleccionar una
                                            // La estructura puede ser data.cuentas o data.data.cuentas dependiendo del ResponseHelper
                                            const cuentasData = planCuentas?.data?.cuentas || planCuentas?.data?.data?.cuentas || planCuentas?.cuentas
                                            
                                            if (!cuentasData || cuentasData.length === 0) {
                                                toast.error('No hay cuentas disponibles. Consulta primero el plan de cuentas.')
                                                return
                                            }

                                            // Función recursiva para aplanar el árbol de cuentas y obtener solo las de movimiento
                                            const obtenerCuentasMovimiento = (cuentas, resultado = []) => {
                                                for (const cuenta of cuentas) {
                                                    // Verificar si es cuenta de movimiento y está activa
                                                    if (cuenta.esMovimiento && cuenta.activo !== false && !cuenta.eliminado) {
                                                        resultado.push({
                                                            id: cuenta.id,
                                                            codigo: cuenta.codigo,
                                                            nombre: cuenta.nombre,
                                                            label: `${cuenta.codigo} - ${cuenta.nombre}`
                                                        })
                                                    }
                                                    if (cuenta.hijos && cuenta.hijos.length > 0) {
                                                        obtenerCuentasMovimiento(cuenta.hijos, resultado)
                                                    }
                                                }
                                                return resultado
                                            }

                                            const cuentasDisponibles = obtenerCuentasMovimiento(cuentasData)
                                            
                                            if (cuentasDisponibles.length === 0) {
                                                toast.error('No hay cuentas de movimiento disponibles')
                                                return
                                            }

                                            // Si solo hay una cuenta, usarla automáticamente
                                            // Si hay múltiples, usar la primera (puedes mejorar esto con un modal de selección)
                                            const cuentaSeleccionada = cuentasDisponibles[0]
                                            const codigoCuenta = cuentaSeleccionada.codigo

                                            // El reporte devuelve JSON según el backend, no PDF
                                            const { data } = await axios.get(
                                                `${process.env.NEXT_PUBLIC_URL_BACK}/contabilidad/reportes/libro-mayor?empresaId=${empresaId}&codigoCuenta=${codigoCuenta}`,
                                                {
                                                    headers: {
                                                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                                                    }
                                                }
                                            )
                                            
                                            // Mostrar datos en consola o como JSON descargable
                                            console.log('Libro Mayor:', data)
                                            
                                            // Crear un archivo JSON descargable
                                            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                                            const url = URL.createObjectURL(blob)
                                            const link = document.createElement('a')
                                            link.href = url
                                            link.download = `libro-mayor-${codigoCuenta}-${new Date().toISOString().split('T')[0]}.json`
                                            link.click()
                                            URL.revokeObjectURL(url)
                                            
                                            toast.success(`Libro mayor generado para cuenta ${codigoCuenta}`)
                                        } catch (e) {
                                            console.error(e)
                                            const mensajeError = e?.response?.data?.mensaje || e?.response?.data?.message || 'Error al generar libro mayor'
                                            toast.error(mensajeError)
                                        }
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                    </svg>
                                    Libro Mayor
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <ModalCrearCuenta empresaId={empresaId} planCuentas={planCuentas} />
                <ModalCrearPeriodo empresaId={empresaId} />
                <ModalCrearAsiento empresaId={empresaId} periodos={periodos} planCuentas={planCuentas} />
            </MainLayout>
        </ComprobarAcceso>
    )
}

