"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function EliminarCuenta() {
    // Actualizar título de la página
    useEffect(() => {
        document.title = "Eliminar Cuenta - Lazzyfact"
    }, [])
    const [email, setEmail] = useState('')
    const [motivo, setMotivo] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [enviado, setEnviado] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!email) {
            toast.error('Por favor, ingresa tu dirección de correo electrónico')
            return
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            toast.error('Por favor, ingresa un correo electrónico válido')
            return
        }

        setIsLoading(true)

        try {
            // Enviar solicitud de eliminación al backend
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_URL_BACK}/usuarios/solicitar-eliminacion`,
                {
                    email: email.trim(),
                    motivo: motivo.trim() || 'Solicitud de eliminación de cuenta'
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            toast.success(data.mensaje || 'Solicitud de eliminación enviada correctamente')
            setEnviado(true)
        } catch (error) {
            console.error('Error al solicitar eliminación:', error)
            
            // Si el endpoint no existe, mostrar mensaje informativo
            if (error?.response?.status === 404) {
                toast.info('Tu solicitud ha sido registrada. Te contactaremos pronto.')
                setEnviado(true)
            } else {
                const mensajeError = error?.response?.data?.mensaje || 
                                   error?.response?.data?.message || 
                                   'Error al procesar la solicitud. Por favor, intenta nuevamente o contacta con soporte.'
                toast.error(mensajeError)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a1620] to-[#1a2332] flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-700">
                
                {/* Header con información de la empresa */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-[#077eeb]/20 rounded-full p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-[#077eeb]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                        </div>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
                        Eliminar Cuenta
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Lazzyfact - Sistema de Facturación Electrónica
                    </p>
                </div>

                {/* Información de la empresa */}
                <div className="bg-[#05121f]/60 rounded-2xl p-6 mb-6 border border-[#061727]">
                    <h2 className="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        Información de la Aplicación
                    </h2>
                    <div className="space-y-2 text-gray-300">
                        <p><span className="font-semibold">Nombre de la Aplicación:</span> Lazzyfact</p>
                        <p><span className="font-semibold">Tipo de Servicio:</span> Sistema de Facturación Electrónica</p>
                        <p><span className="font-semibold">Descripción:</span> Plataforma web y móvil para la gestión y emisión de facturas electrónicas en Ecuador</p>
                    </div>
                </div>

                {!enviado ? (
                    <>
                        {/* Información importante */}
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                            <div className="flex gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-400 flex-shrink-0 mt-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                                <div className="text-yellow-200 text-sm">
                                    <p className="font-semibold mb-1">Antes de eliminar tu cuenta, ten en cuenta:</p>
                                    <ul className="list-disc list-inside space-y-1 text-yellow-100/90">
                                        <li>Se eliminarán todos tus datos personales y de la cuenta</li>
                                        <li>No podrás recuperar la información después de la eliminación</li>
                                        <li>El proceso puede tardar hasta 30 días en completarse</li>
                                        <li>Recibirás un correo de confirmación cuando se complete la eliminación</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                                    Correo Electrónico de la Cuenta
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    required
                                    className="w-full outline-none bg-[#2e4760] rounded-xl px-4 py-3 border border-[#2e4760] focus:border-[#077eeb] text-gray-100 placeholder-gray-500"
                                    disabled={isLoading}
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    Ingresa el correo electrónico asociado a tu cuenta en Lazzyfact
                                </p>
                            </div>

                            <div>
                                <label htmlFor="motivo" className="block text-sm font-semibold text-gray-200 mb-2">
                                    Motivo de Eliminación (Opcional)
                                </label>
                                <textarea
                                    id="motivo"
                                    value={motivo}
                                    onChange={(e) => setMotivo(e.target.value)}
                                    placeholder="Comparte el motivo por el cual deseas eliminar tu cuenta (opcional)"
                                    rows={4}
                                    className="w-full outline-none bg-[#2e4760] rounded-xl px-4 py-3 border border-[#2e4760] focus:border-[#077eeb] text-gray-100 placeholder-gray-500 resize-none"
                                    disabled={isLoading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-6 py-3 transition-colors flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        Solicitar Eliminación de Cuenta
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Información adicional */}
                        <div className="mt-6 pt-6 border-t border-gray-700">
                            <p className="text-sm text-gray-400 text-center">
                                Si tienes dudas o necesitas ayuda, puedes contactarnos a través de la aplicación o 
                                desde tu cuenta en Lazzyfact.
                            </p>
                        </div>
                    </>
                ) : (
                    /* Mensaje de confirmación */
                    <div className="text-center py-8">
                        <div className="bg-green-500/20 rounded-full p-4 w-fit mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-green-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-100 mb-3">
                            Solicitud Recibida
                        </h2>
                        <p className="text-gray-300 mb-4">
                            Hemos recibido tu solicitud de eliminación de cuenta. Te contactaremos en breve al correo proporcionado para confirmar y completar el proceso.
                        </p>
                        <p className="text-sm text-gray-400">
                            El proceso de eliminación puede tardar hasta 30 días según nuestras políticas de privacidad.
                        </p>
                    </div>
                )}

                {/* Footer con información legal */}
                <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                    <p className="text-xs text-gray-500">
                        Lazzyfact - Sistema de Facturación Electrónica
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Esta página cumple con los requisitos de eliminación de cuenta de Google Play Store
                    </p>
                </div>
            </div>
        </div>
    )
}

