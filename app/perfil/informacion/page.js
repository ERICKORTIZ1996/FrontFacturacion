'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import MainLayout from "@/components/layouts/MainLayout"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import { useMainStore } from "@/store/mainStore"
import { toast } from 'react-toastify'
import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import SmallSpinner from "@/components/layouts/SmallSpinner"

export default function PerfilInformacion() {

    const router = useRouter()
    const dataUser = useMainStore((state) => state.dataUser)
    const setDataUser = useMainStore((state) => state.setDataUser)

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [editando, setEditando] = useState(false)

    // Consultar perfil del usuario
    const consultarPerfil = async () => {
        try {
            if (!dataUser?.tokenAcceso) {
                console.warn('No hay token de acceso disponible')
                return null
            }

            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACK}/perfil/informacion`,
                {
                    headers: {
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                    }
                }
            )
            return data
        } catch (error) {
            console.error('Error al consultar perfil:', error)
            
            // Si el error es 401 (Unauthorized), el token puede estar expirado
            if (error?.response?.status === 401) {
                toast.error('Sesión expirada. Por favor, inicia sesión nuevamente')
                // Redirigir al login después de un breve delay
                setTimeout(() => {
                    router.push('/')
                }, 2000)
                return null
            }
            
            const mensajeError = error?.response?.data?.mensaje || error?.response?.data?.message || 'Error al obtener perfil'
            toast.error(mensajeError)
            return null
        }
    }

    const { data: perfilData, isLoading } = useQuery({
        queryKey: ['perfil_usuario'],
        queryFn: consultarPerfil,
        enabled: !!dataUser?.tokenAcceso,
        refetchOnWindowFocus: false,
    })

    // Actualizar campos cuando se carga el perfil
    useEffect(() => {
        if (perfilData?.data?.usuario) {
            setNombre(perfilData.data.usuario.nombre || '')
            setEmail(perfilData.data.usuario.email || '')
        }
    }, [perfilData])

    const queryClient = useQueryClient()

    // Mutación para actualizar perfil
    const actualizarPerfilMutation = useMutation({
        mutationFn: async (datos) => {
            if (!dataUser?.tokenAcceso) {
                throw new Error('No estás autenticado')
            }

            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_URL_BACK}/perfil`,
                {
                    nombre: datos.nombre,
                    email: datos.email
                },
                {
                    headers: {
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                    }
                }
            )
            return data
        },
        onSuccess: (data) => {
            toast.success(data.mensaje || 'Perfil actualizado correctamente')
            
            // Actualizar datos en el store si el email cambió
            if (email !== dataUser?.email) {
                setDataUser({
                    ...dataUser,
                    email: email,
                    nombre: nombre
                })
            } else {
                setDataUser({
                    ...dataUser,
                    nombre: nombre
                })
            }
            
            queryClient.invalidateQueries({ queryKey: ['perfil_usuario'] })
            setEditando(false)
        },
        onError: (error) => {
            const mensajeError = error?.response?.data?.mensaje || error?.response?.data?.message || error.message || 'Error al actualizar perfil'
            toast.error(mensajeError)
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!nombre.trim()) {
            toast.error('El nombre es obligatorio')
            return
        }
        if (!email.trim() || !email.includes('@')) {
            toast.error('El email debe ser válido')
            return
        }

        actualizarPerfilMutation.mutate({ nombre: nombre.trim(), email: email.trim() })
    }

    const cancelarEdicion = () => {
        // Restaurar valores originales
        if (perfilData?.data?.usuario) {
            setNombre(perfilData.data.usuario.nombre || '')
            setEmail(perfilData.data.usuario.email || '')
        }
        setEditando(false)
    }

    return (
        <ComprobarAcceso>
            <MainLayout>
                <div className="flex items-center gap-4 mb-5">
                    <Link
                        href="/inicio"
                        className="font-semibold text-gray-100 cursor-pointer rounded-full transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-gray-100 hover:text-gray-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Volver
                    </Link>

                    <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        Mi Perfil
                    </div>
                </div>

                <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">
                    {isLoading ? (
                        <SmallSpinner />
                    ) : perfilData?.data?.usuario ? (
                        <>
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-xl font-semibold">Información Personal</h2>
                                {!editando && (
                                    <button
                                        onClick={() => setEditando(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-2 flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Editar
                                    </button>
                                )}
                            </div>

                            {editando ? (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="nombre" className="mb-1 text-gray-300">Nombre</label>
                                        <input
                                            id="nombre"
                                            type="text"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            required
                                            className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="mb-1 text-gray-300">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 text-gray-300">Rol</label>
                                        <input
                                            type="text"
                                            value={perfilData.data.usuario.rol || 'N/A'}
                                            disabled
                                            className="outline-none bg-[#2e4760]/50 rounded-lg px-3 py-2 border border-[#2e4760] text-gray-400 cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 text-gray-300">Estado</label>
                                        <input
                                            type="text"
                                            value={perfilData.data.usuario.activo ? 'Activo' : 'Inactivo'}
                                            disabled
                                            className="outline-none bg-[#2e4760]/50 rounded-lg px-3 py-2 border border-[#2e4760] text-gray-400 cursor-not-allowed"
                                        />
                                    </div>

                                    {perfilData.data.usuario.empresa && (
                                        <div className="flex flex-col">
                                            <label className="mb-1 text-gray-300">Empresa</label>
                                            <input
                                                type="text"
                                                value={perfilData.data.usuario.empresa.razonSocial || 'N/A'}
                                                disabled
                                                className="outline-none bg-[#2e4760]/50 rounded-lg px-3 py-2 border border-[#2e4760] text-gray-400 cursor-not-allowed"
                                            />
                                        </div>
                                    )}

                                    <div className="flex gap-3 justify-end mt-5">
                                        <button
                                            type="button"
                                            onClick={cancelarEdicion}
                                            disabled={actualizarPerfilMutation.isPending}
                                            className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-gray-700 disabled:opacity-50"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={actualizarPerfilMutation.isPending}
                                            className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 border border-gray-100 text-gray-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {actualizarPerfilMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <label className="mb-1 text-gray-300">Nombre</label>
                                        <p className="bg-[#2e4760] rounded-lg px-3 py-2 text-gray-200">{perfilData.data.usuario.nombre || 'N/A'}</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 text-gray-300">Email</label>
                                        <p className="bg-[#2e4760] rounded-lg px-3 py-2 text-gray-200">{perfilData.data.usuario.email || 'N/A'}</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 text-gray-300">Rol</label>
                                        <p className="bg-[#2e4760] rounded-lg px-3 py-2 text-gray-200">{perfilData.data.usuario.rol || 'N/A'}</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 text-gray-300">Estado</label>
                                        <p className={`rounded-lg px-3 py-2 ${perfilData.data.usuario.activo ? 'bg-green-600/30 text-green-300' : 'bg-red-600/30 text-red-300'}`}>
                                            {perfilData.data.usuario.activo ? 'Activo' : 'Inactivo'}
                                        </p>
                                    </div>

                                    {perfilData.data.usuario.empresa && (
                                        <div className="flex flex-col">
                                            <label className="mb-1 text-gray-300">Empresa</label>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-2 text-gray-200">{perfilData.data.usuario.empresa.razonSocial || 'N/A'}</p>
                                        </div>
                                    )}

                                    {perfilData.data.usuario.fechaCreacion && (
                                        <div className="flex flex-col">
                                            <label className="mb-1 text-gray-300">Fecha de Creación</label>
                                            <p className="bg-[#2e4760] rounded-lg px-3 py-2 text-gray-200">
                                                {new Date(perfilData.data.usuario.fechaCreacion).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="text-center text-gray-400">No se pudo cargar la información del perfil</p>
                    )}
                </div>

                <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">
                    <Link
                        href="/mis-datos"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-2 inline-flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.25 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        Gestionar Firma Digital
                    </Link>
                </div>
            </MainLayout>
        </ComprobarAcceso>
    )
}

