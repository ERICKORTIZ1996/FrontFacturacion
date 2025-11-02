'use client'

import { useMainStore } from "@/store/mainStore"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function Header() {

    const changeModalNotificacionesGlobales = useMainStore((state) => state.changeModalNotificacionesGlobales)
    const dataUser = useMainStore((state) => state.dataUser)

    // Consultar facturas pendientes para determinar si hay notificaciones sin leer
    const consultarFacturasPendientes = async () => {
        try {
            if (!dataUser?.tokenAcceso) {
                console.warn('No hay token de acceso disponible')
                return { data: [] }
            }

            // Consultar facturas con estado PENDIENTE o que necesiten atención
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/facturas/estado/PENDIENTE`, {
                headers: {
                    'Authorization': `Bearer ${dataUser.tokenAcceso}`
                }
            });
            return data
        } catch (error) {
            console.error('Error al consultar facturas pendientes:', error);
            
            // Si el error es 403 o 401, puede ser que el token esté expirado
            if (error?.response?.status === 403) {
                console.warn('Acceso denegado (403). El usuario puede no tener permisos o el token estar expirado.')
            } else if (error?.response?.status === 401) {
                console.warn('Token expirado o inválido (401). Verifica tu sesión.')
            }
            
            // Retornar estructura válida para evitar errores
            return { data: [] }
        }
    }

    const { data: facturasPendientes } = useQuery({
        queryKey: ['facturas_pendientes_header'],
        queryFn: consultarFacturasPendientes,
        enabled: !!dataUser?.tokenAcceso,
        refetchOnWindowFocus: true, // Refrescar cuando se vuelve a la pestaña
        refetchInterval: 30000, // Refrescar cada 30 segundos
    })

    // Determinar si hay notificaciones sin leer (facturas pendientes)
    const tieneNotificacionesSinLeer = facturasPendientes?.data?.length > 0

    return (
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">

            <div>
                <p className="text-lg md:text-xl">Bienvenido, <span className="font-semibold text-gray-200">{dataUser.nombre}</span></p>
                <p className="text-sm md:text-base">Aquí esta el resumen de tu negocio</p>
            </div>

            <div className="relative flex justify-end">
                <button
                    type="button"
                    className="bg-[#102940] rounded-full p-2 cursor-pointer"
                    onClick={() => changeModalNotificacionesGlobales()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>

                </button>

                {/* Solo mostrar el punto rojo si hay notificaciones sin leer */}
                {tieneNotificacionesSinLeer && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-[#d24148] rounded-full"></span>
                )}
            </div>
        </div>
    )
}
