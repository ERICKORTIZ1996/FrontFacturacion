'use client'

import { useState } from "react"
import MainLayout from "@/components/layouts/MainLayout"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import BotonAgregarUsuario from "@/components/gestion_usuarios_components/BotonAgregarUsuario"
import BotonAgregarAdministrador from "@/components/gestion_usuarios_components/BotonAgregarAdmin"
import ModalCrearUsuario from "@/components/modals/ModalCrearUsuario"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import ModalCrearAdministrador from "@/components/modals/ModalCrearAdministrador"
import SmallSpinner from "@/components/layouts/SmallSpinner"
import Paginacion from "@/components/emitir_facturas_componentes/Paginacion"
import TablaUsuarios from "@/components/tables/TablaUsuarios"
import TablaAdmins from "@/components/tables/TablaAdmins"

export default function Admins() {

    const [ventanaUsuarios, setVentanaUsuarios] = useState(true)
    const [ventanaAdmins, setVentanaAdmins] = useState(false)

    const consultarUsuarios = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/sucursales`)
            return data
        } catch (error) {
            return null
        }
    }

    const consultarAdmins = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/puntos-emision`)
            return data
        } catch (error) {
            return null
        }
    }

    const { data: dataUsuarios, isLoading: isLoadingUsuarios } = useQuery({
        queryKey: ['crear_usuario'], // Identificador unico para cada Query
        queryFn: consultarUsuarios, // Funcion a consultar
        enabled: ventanaUsuarios, // Solo ejecuta cuando esta ventana esté activa
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
    })

    const { data: dataAdmins, isLoading: isLoadingAdmins } = useQuery({
        queryKey: ['crear_administrador'], // Identificador unico para cada Query
        queryFn: consultarAdmins, // Funcion a consultar 
        enabled: ventanaAdmins, // Solo ejecuta cuando esta ventana esté activa
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
    })

    return (
        <ComprobarAcceso>
            <MainLayout>
                <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>

                    <p>Gestión de Usuarios</p>
                </div>

                <p className="mt-3">Administra y gestiona tus usuarios empresariales y administradores</p>

                <div className="mt-5 flex items-center justify-between bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3">

                    <nav className="w-full rounded-xl">
                        <ul className="flex gap-3 justify-between text-gray-800 font-semibold uppercase">
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaUsuarios ? 'bg-[#077eeb]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#077eeb]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => {
                                        setVentanaUsuarios(true)
                                        setVentanaAdmins(false)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>

                                    Usuarios
                                </button>
                            </li>
                            <li className="flex-1">
                                <button
                                    type="button"
                                    className={`${ventanaAdmins ? 'bg-[#07eba7]/60' : ''} text-center text-gray-300 rounded-xl hover:bg-[#07eba7]/60 px-3 py-2 transition-colors cursor-pointer flex flex-col justify-center gap-1 items-center w-full`}
                                    onClick={() => {
                                        setVentanaUsuarios(false)
                                        setVentanaAdmins(true)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>

                                    Administradores
                                </button>
                            </li>
                        </ul>
                    </nav>

                </div>

                {ventanaUsuarios && (

                    <div>

                        <div className="mt-5 flex items-center justify-end gap-2 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3 mb-5">

                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[7px] left-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>

                                <input
                                    type="text"
                                    placeholder="Buscar por email"
                                    className="wf-full outline-none bg-[#2e4760] rounded-xl pl-9 py-1 pr-3 focus:border-blue-500 shadow-lg"
                                    name="email"
                                />
                            </div>

                            <BotonAgregarUsuario />
                        </div>


                        <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">

                            {isLoadingUsuarios ? (
                                <SmallSpinner />
                            ) : dataUsuarios.data && dataUsuarios.data.length ? (
                                <>
                                    <table className="w-full mt-5">
                                        <thead className="bg-[#05121f]/60">
                                            <tr className="border-b-2 border-[#061727]">
                                                <th className="text-start font-semibold p-2">Nombre</th>
                                                <th className="text-start font-semibold p-2">Email</th>
                                                <th className="text-start font-semibold p-2">Rol</th>
                                                <th className="text-start font-semibold p-2">Detalle</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {dataUsuarios.data.map(usuario => (
                                                <TablaUsuarios
                                                    key={usuario.id}
                                                    usuario={usuario}
                                                />
                                            ))}
                                        </tbody>
                                    </table>

                                    <Paginacion />
                                </>
                            ) : (
                                <p className="text-center uppercase">Sin datos</p>
                            )}

                        </div>

                    </div>
                )}

                {ventanaAdmins && (

                    <div>

                        <div className="mt-5 flex items-center justify-end gap-2 bg-gradient-to-t from-[#102940]/50 to-[#182a3b]/50 rounded-2xl p-3 mb-5">

                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[7px] left-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>

                                <input
                                    type="text"
                                    placeholder="Buscar por email"
                                    className="wf-full outline-none bg-[#2e4760] rounded-xl pl-9 py-1 pr-3 focus:border-blue-500 shadow-lg"
                                    name="email"
                                />
                            </div>

                            <BotonAgregarAdministrador />
                        </div>


                        <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">

                            {isLoadingAdmins ? (
                                <SmallSpinner />
                            ) : dataAdmins.data && dataAdmins.data.length ? (
                                <>
                                    <table className="w-full mt-5">
                                        <thead className="bg-[#05121f]/60">
                                            <tr className="border-b-2 border-[#061727]">
                                                <th className="text-start font-semibold p-2">Nombre</th>
                                                <th className="text-start font-semibold p-2">Email</th>
                                                <th className="text-start font-semibold p-2">Rol</th>
                                                <th className="text-start font-semibold p-2">Detalle</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {dataAdmins.data.map(admin => (
                                                <TablaAdmins
                                                    key={admin.id}
                                                    admin={admin}
                                                />
                                            ))}
                                        </tbody>
                                    </table>

                                    <Paginacion />
                                </>
                            ) : (
                                <p className="text-center uppercase">Sin datos</p>
                            )}

                        </div>

                    </div>
                )}

                <ModalCrearUsuario />
                <ModalCrearAdministrador />

            </MainLayout >
        </ComprobarAcceso>
    )
}
