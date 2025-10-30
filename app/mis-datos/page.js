'use client'

import { useState, useCallback, useRef } from "react"
import MainLayout from "@/components/layouts/MainLayout"
import ComprobarAcceso from "@/components/others/ComprobarAcceso"
import { useMainStore } from "@/store/mainStore"
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify';
import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import SmallSpinner from "@/components/layouts/SmallSpinner"

export default function MisDatos() {

    const [archivo, setArchivo] = useState(null);
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState('')

    const dataUser = useMainStore((state) => state.dataUser)

    const passwordFirmRef = useRef(null)
    const selectEmpresaRef = useRef(null)

    // Obtener empresas para seleccionar
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
            return null
        }
    }

    const { data: empresasData } = useQuery({
        queryKey: ['empresas_mis_datos'],
        queryFn: consultarEmpresas,
        enabled: !!dataUser?.tokenAcceso, // Solo ejecutar si hay token
        refetchOnWindowFocus: false,
    })

    const queryClient = useQueryClient()

    // Consultar firmas de la empresa seleccionada
    const consultarFirmas = async () => {
        try {
            if (!dataUser?.tokenAcceso || !empresaSeleccionada) {
                return null
            }
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACK}/firmas/empresa/${empresaSeleccionada}`,
                {
                    headers: {
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                    }
                }
            )
            return data
        } catch (error) {
            console.error('Error al consultar firmas:', error)
            return { data: [], total: 0 }
        }
    }

    const { data: firmasData, isLoading: isLoadingFirmas } = useQuery({
        queryKey: ['firmas_empresa', empresaSeleccionada],
        queryFn: consultarFirmas,
        enabled: !!dataUser?.tokenAcceso && !!empresaSeleccionada,
        refetchOnWindowFocus: false,
    })


    const guardarDatos = async () => {

        return
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/`, {

        })

    }

    const restablecerPassword = async () => {

        return
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/`, {

        })

    }

    const subirFirmaDigital = async (formData) => {

        const idEmpresaSeleccionado = formData.get('empresa-firma') || empresaSeleccionada

        if (!idEmpresaSeleccionado) {
            toast.error('Debes seleccionar una empresa')
            return
        }

        if (!archivo) {
            toast.error('Debes seleccionar un archivo de firma')
            return
        }

        try {
            if (!dataUser?.tokenAcceso) {
                toast.error('Debes estar autenticado para subir firmas')
                return
            }

            const formDataToSend = new FormData()
            formDataToSend.append('password', formData.get('password-firma'))
            formDataToSend.append('idEmpresa', idEmpresaSeleccionado)
            formDataToSend.append('archivoFirma', archivo)

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/firmas`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                    },
                },
            );

            setArchivo(null)
            if (passwordFirmRef.current) passwordFirmRef.current.value = ""
            toast.success(data.mensaje);
            
            // Refrescar la lista de firmas después de subir una nueva
            queryClient.invalidateQueries({ queryKey: ['firmas_empresa', idEmpresaSeleccionado] })

        } catch (e) {
            toast.error(e?.response?.data?.mensaje || 'Error al subir la firma');
        }
    }

    // Mutación para cambiar estado de firma (activar/desactivar)
    const cambiarEstadoFirmaMutation = useMutation({
        mutationFn: async ({ firmaId, empresaId, activar }) => {
            if (!dataUser?.tokenAcceso) {
                throw new Error('No estás autenticado')
            }

            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_URL_BACK}/firmas/${firmaId}/estado`,
                { uuidEmpresa: empresaId },
                {
                    headers: {
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                    }
                }
            )
            return data
        },
        onSuccess: (data) => {
            toast.success(data.mensaje || 'Estado de firma actualizado')
            queryClient.invalidateQueries({ queryKey: ['firmas_empresa', empresaSeleccionada] })
        },
        onError: (error) => {
            const mensajeError = error?.response?.data?.mensaje || error?.response?.data?.message || error.message || 'Error al cambiar el estado de la firma'
            toast.error(mensajeError)
        }
    })

    // Mutación para eliminar firma
    const eliminarFirmaMutation = useMutation({
        mutationFn: async ({ firmaId, empresaId }) => {
            if (!dataUser?.tokenAcceso) {
                throw new Error('No estás autenticado')
            }

            const { data } = await axios.delete(
                `${process.env.NEXT_PUBLIC_URL_BACK}/firmas/${firmaId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`
                    },
                    data: { uuidEmpresa: empresaId }
                }
            )
            return data
        },
        onSuccess: (data) => {
            toast.success(data.mensaje || 'Firma eliminada correctamente')
            queryClient.invalidateQueries({ queryKey: ['firmas_empresa', empresaSeleccionada] })
        },
        onError: (error) => {
            const mensajeError = error?.response?.data?.mensaje || error?.response?.data?.message || error.message || 'Error al eliminar la firma'
            toast.error(mensajeError)
        }
    })

    const handleActivarFirma = (firma) => {
        if (!empresaSeleccionada) {
            toast.error('Debes seleccionar una empresa')
            return
        }
        cambiarEstadoFirmaMutation.mutate({
            firmaId: firma.id,
            empresaId: empresaSeleccionada,
            activar: !firma.activa
        })
    }

    const handleEliminarFirma = (firma) => {
        if (!empresaSeleccionada) {
            toast.error('Debes seleccionar una empresa')
            return
        }
        
        if (!confirm(`¿Estás seguro de eliminar la firma "${firma.nombreArchivo}"?`)) {
            return
        }
        
        eliminarFirmaMutation.mutate({
            firmaId: firma.id,
            empresaId: empresaSeleccionada
        })
    }

    const onDropRejected = () => {
        toast.error('Solo se permiten un archivo (.p12) o formato de firmas electrónicas')
    }

    const onDropAccepted = useCallback(async (acceptedFiles) => {
        setArchivo(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDropAccepted,
        onDropRejected,
        maxFiles: 1,
        accept: {
            'application/x-pkcs12': ['.p12'], // Acepta archivos .p12
            'application/pkix-cert': ['.cer', '.crt'], // Opcional: para certificados digitales
            'application/x-x509-ca-cert': ['.cer', '.crt'], // Opcional: para otros tipos de certificados
        },
    });

    return (
        <ComprobarAcceso>
            <MainLayout>

                <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>

                    <p>Mis Datos</p>
                </div>

                <p className="mt-3">Edita tus datos personales y restablece tu contraseña</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-4 md:px-8 py-4 md:py-6 mt-5 flex flex-col justify-between">

                        <div>
                            <h2 className='my-5 text-xl flex gap-2 items-center'>

                                <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-gray-200 text-gray-800">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                    </svg>
                                </span>

                                Datos Generales
                            </h2>

                            <div className='flex flex-col gap-5 relative'>

                                <div className='flex flex-col'>
                                    <label htmlFor="email" className='mb-1'>Email</label>
                                    <input
                                        id='email'
                                        type="text"
                                        name='email'
                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                        defaultValue={dataUser?.email}
                                        placeholder='********'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="nombres" className='mb-1'>Nombre</label>
                                    <input
                                        id='nombres'
                                        type="text"
                                        name='nombres'
                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                        defaultValue={dataUser?.nombre}
                                        placeholder='********'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="rol" className='mb-1'>Rol</label>
                                    <input
                                        id='rol'
                                        type="text"
                                        name='rol'
                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 disabled:cursor-not-allowed'
                                        defaultValue={dataUser?.rol}
                                        placeholder='********'
                                        disabled
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 gap-2 border border-gray-100 text-gray-800 flex items-center mt-5 justify-center"
                            onClick={() => guardarDatos()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            Guardar Cambios
                        </button>

                    </div>

                    <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-4 md:px-8 py-4 md:py-6 mt-5 flex flex-col justify-between">

                        <div>
                            <h2 className='my-5 text-xl flex gap-2 items-center'>

                                <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>

                                </span>

                                Cambiar Contraseña
                            </h2>

                            <div className='flex flex-col gap-5 relative'>
                                <div className='flex flex-col'>
                                    <label htmlFor="password" className='mb-1'>Contraseña</label>
                                    <input
                                        id='password'
                                        type="text"
                                        name='password'
                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                        // ref={inputRazonSocial}
                                        placeholder='********'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="confirm-password" className='mb-1'>Confirmar contraseña</label>
                                    <input
                                        id='confirm-password'
                                        type="text"
                                        name='confirm-password'
                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                        // ref={inputRazonSocial}
                                        placeholder='********'
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 gap-2 border border-gray-100 text-gray-800 flex items-center mt-5 justify-center"
                            onClick={() => restablecerPassword()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            Cambiar Contraseña
                        </button>

                    </div>

                    <form
                        action={subirFirmaDigital}
                        className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5 flex flex-col justify-between"
                    >

                        <div>
                            <h2 className='my-5 text-xl flex gap-2 items-center'>

                                <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a8.912 8.912 0 0 1-.318-.079c-1.585-.424-2.904-1.247-3.76-2.236-.873-1.009-1.265-2.19-.968-3.301.59-2.2 3.663-3.29 6.863-2.432A8.186 8.186 0 0 1 16.5 5.21M6.42 17.81c.857.99 2.176 1.812 3.761 2.237 3.2.858 6.274-.23 6.863-2.431.233-.868.044-1.779-.465-2.617M3.75 12h16.5" />
                                    </svg>


                                </span>

                                Firma Digital
                            </h2>

                            <div {...getRootProps({ className: 'dropzone w-full border-2 border-black border-dashed border-gray-100 py-10 mb-5 cursor-pointer rounded-3xl bg-gradient-to-t from-[#151619]/60 to-[#0c121c]/60' })} >
                                <input {...getInputProps()} className="h-100" />

                                {/* Mensaje condicional */}
                                {archivo ? (
                                    <div className="text-center py-9">
                                        <p className="text-lg text-center text-[#fed339] font-semibold uppercase">¡Archivo subido!</p>
                                        <p className="mt-2">
                                            Se ha cargado correctamente el archivo
                                        </p>
                                    </div>
                                ) : isDragActive ? (
                                    <div className="text-center bg-[#077eeb]/50 py-4 transition-colors">
                                        <p className="text-lg text-center font-semibold uppercase">Suelta el archivo</p>
                                        <button
                                            className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 gap-2 border border-gray-100 text-gray-800 mt-5"
                                            type="button"
                                        >
                                            Suelta
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-lg text-center font-semibold uppercase">Selecciona un archivo o arrástralo aquí</p>
                                        <button
                                            className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 gap-2 border border-gray-100 text-gray-800 mt-5"
                                            type="button"
                                        >
                                            Elegir archivo
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className='flex flex-col gap-5 relative'>
                                <div className='flex-1 flex flex-col'>
                                    <label htmlFor="empresa-firma" className='mb-1'>Seleccionar Empresa</label>
                                    <select
                                        id='empresa-firma'
                                        name='empresa-firma'
                                        ref={selectEmpresaRef}
                                        value={empresaSeleccionada}
                                        onChange={(e) => setEmpresaSeleccionada(e.target.value)}
                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                    >
                                        <option value="">Seleccione una empresa</option>
                                        {empresasData?.data?.map(empresa => (
                                            <option key={empresa.id} value={empresa.id}>
                                                {empresa.razonSocial} - {empresa.ruc}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <label htmlFor="password-firma" className='mb-1'>Contraseña de firma digital</label>
                                    <input
                                        id='password-firma'
                                        type="password"
                                        ref={passwordFirmRef}
                                        name='password-firma'
                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                        placeholder='********'
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 gap-2 border border-gray-100 text-gray-800 flex items-center mt-5 justify-center"
                            type="submit"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            Subir Firma Digital
                        </button>

                    </form>
                </div>

                {/* Sección para administrar firmas */}
                {empresaSeleccionada && (
                    <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-semibold flex gap-2 items-center">
                                <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                </span>
                                Firmas Digitales de la Empresa
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {empresasData?.data?.find(e => e.id === empresaSeleccionada)?.razonSocial || 'Empresa seleccionada'}
                            </p>
                        </div>

                        {isLoadingFirmas ? (
                            <SmallSpinner />
                        ) : firmasData?.data?.length > 0 ? (
                            <div className="space-y-3">
                                {firmasData.data.map((firma) => (
                                    <div
                                        key={firma.id}
                                        className={`bg-[#2e4760] rounded-xl px-4 py-3 border ${
                                            firma.activa
                                                ? 'border-green-500 bg-green-500/10'
                                                : 'border-gray-600'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <p className="font-semibold text-gray-200">
                                                        {firma.nombreArchivo}
                                                    </p>
                                                    {firma.activa && (
                                                        <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                            ACTIVA
                                                        </span>
                                                    )}
                                                    {!firma.activa && (
                                                        <span className="bg-gray-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                            INACTIVA
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-400 text-sm">
                                                    Cargada: {new Date(firma.fechaCreacion).toLocaleDateString('es-ES', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleActivarFirma(firma)}
                                                    disabled={cambiarEstadoFirmaMutation.isPending}
                                                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                                                        firma.activa
                                                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                                            : 'bg-green-600 hover:bg-green-700 text-white'
                                                    } disabled:opacity-50`}
                                                >
                                                    {firma.activa ? 'Desactivar' : 'Activar'}
                                                </button>
                                                <button
                                                    onClick={() => handleEliminarFirma(firma)}
                                                    disabled={eliminarFirmaMutation.isPending}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-400 py-5">
                                {empresaSeleccionada
                                    ? 'No hay firmas digitales registradas para esta empresa. Sube una firma usando el formulario de arriba.'
                                    : 'Selecciona una empresa para ver sus firmas digitales.'}
                            </p>
                        )}
                    </div>
                )}

                {!empresaSeleccionada && empresasData?.data?.length > 0 && (
                    <div className="bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 shadow-lg border-gray-400 rounded-3xl px-8 py-6 mt-5">
                        <p className="text-center text-gray-400 py-5">
                            Selecciona una empresa en el formulario de arriba para ver y administrar sus firmas digitales.
                        </p>
                    </div>
                )}

            </MainLayout >
        </ComprobarAcceso>
    )
}
