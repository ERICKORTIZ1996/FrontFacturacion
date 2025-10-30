"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import TablaProductos from "../tables/TablaProductos"
import SmallSpinner from "../layouts/SmallSpinner"
import Paginacion from "../emitir_facturas_componentes/Paginacion"
import axios from "axios"
import { useMainStore } from "@/store/mainStore"

export default function DataProductos({ busqueda = '' }) {

    const dataUser = useMainStore((state) => state.dataUser)

    const consultarProductos = async () => {
        try {
            // Validar que tengamos token antes de hacer la petición
            if (!dataUser?.tokenAcceso) {
                console.warn('No hay token de acceso disponible')
                return { data: [] }
            }

            // Debug: mostrar información del token (sin mostrar el token completo por seguridad)
            const tokenPreview = dataUser.tokenAcceso ? `${dataUser.tokenAcceso.substring(0, 20)}...` : 'no-token'
            console.log('Intentando consultar productos con token:', tokenPreview)

            const url = `${process.env.NEXT_PUBLIC_URL_BACK}/productos`
            console.log('URL de consulta:', url)

            const { data } = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${dataUser.tokenAcceso}`,
                    'Content-Type': 'application/json'
                }
            })
            
            console.log('Productos consultados exitosamente:', data?.data?.length || 0, 'productos')
            return data
        } catch (error) {
            console.error('Error al consultar productos:', error);
            
            // Log detallado del error
            if (error?.response) {
                console.error('Status:', error.response.status)
                console.error('Status Text:', error.response.statusText)
                console.error('Response Data:', error.response.data)
                console.error('Headers enviados:', error.config?.headers)
                
                // Si es 403, puede ser que el token esté expirado o no tenga permisos
                if (error?.response?.status === 403) {
                    const mensajeError = error?.response?.data?.message || error?.response?.data?.mensaje || 'Acceso denegado'
                    console.error(`❌ 403 Forbidden al consultar productos: ${mensajeError}`)
                    console.warn('Posibles causas:')
                    console.warn('1. El usuario no tiene permisos para ver productos')
                    console.warn('2. El token está expirado o inválido')
                    console.warn('3. El middleware del backend está rechazando la petición')
                    console.warn('Verifica en el backend:')
                    console.warn('- Permisos del rol del usuario')
                    console.warn('- Configuración del middleware de autenticación')
                    console.warn('- Validez del token JWT')
                }
                
                // Si es 401, el token está expirado o es inválido
                if (error?.response?.status === 401) {
                    console.error('❌ 401 Unauthorized: Token inválido o expirado. Puede ser necesario cerrar sesión.')
                }
            } else if (error?.request) {
                console.error('No se recibió respuesta del servidor:', error.request)
            } else {
                console.error('Error configurando la petición:', error.message)
            }
            
            // Retornar un objeto con estructura válida en lugar de lanzar error
            return { data: [] }
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['productos'], // Identificador unico para cada Query
        queryFn: consultarProductos, // Funcion a consultar
        enabled: !!dataUser?.tokenAcceso, // Solo ejecutar si hay token
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
    })

    // Filtrar productos por búsqueda si existe
    const productosFiltrados = useMemo(() => {
        if (!data?.data) return []
        
        if (!busqueda.trim()) return data.data
        
        const terminoBusqueda = busqueda.trim().toLowerCase()
        return data.data.filter(producto => {
            // Buscar por código
            const codigo = producto.codigo?.toLowerCase() || ''
            // Buscar por nombre
            const nombre = producto.nombre?.toLowerCase() || ''
            // Buscar por descripción
            const descripcion = producto.descripcion?.toLowerCase() || ''
            
            return codigo.includes(terminoBusqueda) || 
                   nombre.includes(terminoBusqueda) ||
                   descripcion.includes(terminoBusqueda)
        })
    }, [busqueda, data?.data])

    return (
        isLoading ? (
            <SmallSpinner />
        ) : productosFiltrados && productosFiltrados.length > 0 ? (
            <>
                {/* Tabla desktop */}
                <div className="hidden md:block w-full mt-5 overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#05121f]/60">
                            <tr className="border-b-2 border-[#061727]">
                                <th className="text-start font-semibold p-2">Código</th>
                                <th className="text-start font-semibold p-2">Nombre</th>
                                <th className="text-start font-semibold p-2">Stock</th>
                                <th className="text-start font-semibold p-2">Pre. Unit.</th>
                                <th className="text-start font-semibold p-2">Descuento</th>
                                <th className="text-start font-semibold p-2">Estado</th>
                                <th className="text-start font-semibold p-2">Detalle</th>
                            </tr>
                        </thead>

                        <tbody>
                            {productosFiltrados.map(producto => (
                                <TablaProductos
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cards móviles */}
                <div className="md:hidden mt-5 space-y-3">
                    {productosFiltrados.map(producto => (
                        <div key={producto.id} className="bg-[#05121f]/60 rounded-lg p-4 border border-[#061727]">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-200">{producto.nombre || producto.descripcion}</p>
                                        <p className="text-sm text-gray-400">Código: {producto.codigo || producto.codigoPrincipal}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs ${producto.activo ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {producto.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div>
                                        <p className="text-xs text-gray-400">Stock</p>
                                        <p className="text-sm font-semibold">{producto.stock || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Precio Unit.</p>
                                        <p className="text-sm font-semibold">${producto.precio || producto.precioUnitario || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Descuento</p>
                                        <p className="text-sm font-semibold">{producto.descuento || 0}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Paginacion
                // data={bills}
                />
            </>
        ) : (
            <p className="text-center uppercase">{busqueda.trim() ? 'No se encontraron resultados' : 'Sin datos'}</p>
        )
    )
}
