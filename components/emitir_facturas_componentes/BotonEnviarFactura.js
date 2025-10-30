'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'

/**
 * Componente para enviar factura por diferentes medios
 * Soporta: WhatsApp, Email, Telegram (archivos y mensajes)
 */
export default function BotonEnviarFactura({ nombreArchivo, tipoArchivo = 'pdf' }) {

    const [modalAbierto, setModalAbierto] = useState(false)
    const [medioSeleccionado, setMedioSeleccionado] = useState(null)
    
    // WhatsApp
    const [numeroWhatsapp, setNumeroWhatsapp] = useState('')
    
    // Email
    const [emailDestino, setEmailDestino] = useState('')
    const [emailUsuario, setEmailUsuario] = useState('')
    const [emailContrasena, setEmailContrasena] = useState('')
    const [emailServicio, setEmailServicio] = useState('gmail')
    
    // Telegram
    const [telegramToken, setTelegramToken] = useState('')
    const [telegramChatId, setTelegramChatId] = useState('')
    const [enviarSoloMensajeTelegram, setEnviarSoloMensajeTelegram] = useState(false)
    
    // Mensaje común
    const [mensajeOpcional, setMensajeOpcional] = useState('Aquí está su factura electrónica')

    // Cargar credenciales guardadas de localStorage al montar
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const emailUser = localStorage.getItem('email_usuario')
            const emailServ = localStorage.getItem('email_servicio')
            const telegramTok = localStorage.getItem('telegram_token')
            const telegramChat = localStorage.getItem('telegram_chatId')
            
            if (emailUser) setEmailUsuario(emailUser)
            if (emailServ) setEmailServicio(emailServ)
            if (telegramTok) setTelegramToken(telegramTok)
            if (telegramChat) setTelegramChatId(telegramChat)
        }
    }, [])

    const enviarPorWhatsapp = async () => {
        if (!numeroWhatsapp.trim()) {
            toast.error('Ingresa un número de WhatsApp válido')
            return
        }

        try {
            // Formatear número (debe incluir código de país, ejemplo: 593999999999)
            const numeroFormateado = numeroWhatsapp.replace(/\D/g, '')
            const numeroCompleto = numeroFormateado.includes('593') ? numeroFormateado : `593${numeroFormateado}`
            
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/whatsapp/enviar-archivo`, {
                numero: `${numeroCompleto}@c.us`,
                nombreArchivo: `${nombreArchivo}.${tipoArchivo}`,
                tipo: tipoArchivo,
                mensaje: mensajeOpcional
            })

            toast.success(data.mensaje || 'Factura enviada por WhatsApp correctamente')
            setModalAbierto(false)
            setNumeroWhatsapp('')
        } catch (e) {
            toast.error(e?.response?.data?.mensaje || 'Error al enviar por WhatsApp')
        }
    }

    const enviarPorEmail = async () => {
        if (!emailDestino.trim() || !emailDestino.includes('@')) {
            toast.error('Ingresa un email de destino válido')
            return
        }
        if (!emailUsuario.trim() || !emailUsuario.includes('@')) {
            toast.error('Ingresa un email de origen válido (tu cuenta de email)')
            return
        }
        if (!emailContrasena.trim()) {
            toast.error('Ingresa la contraseña de tu cuenta de email')
            return
        }

        try {
            // Guardar credenciales en localStorage para próximos usos
            if (typeof window !== 'undefined') {
                localStorage.setItem('email_usuario', emailUsuario)
                localStorage.setItem('email_servicio', emailServicio)
            }

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/email/enviar`, {
                to: emailDestino,
                subject: 'Factura electrónica',
                text: mensajeOpcional,
                attachments: [
                    {
                        filename: `factura.${tipoArchivo}`,
                        path: `./${tipoArchivo.toUpperCase()}/${nombreArchivo}.${tipoArchivo}`
                    }
                ],
                service: emailServicio, // gmail o outlook
                user: emailUsuario,
                pass: emailContrasena
            })

            toast.success(data.mensaje || 'Email enviado correctamente')
            setModalAbierto(false)
            setEmailDestino('')
            // No limpiar emailUsuario ni emailServicio (quedan guardados)
        } catch (e) {
            const mensajeError = e?.response?.data?.mensaje || e?.response?.data?.error || 'Error al enviar email'
            toast.error(mensajeError)
        }
    }

    const enviarPorTelegram = async () => {
        if (!telegramToken.trim()) {
            toast.error('Ingresa el token de tu bot de Telegram')
            return
        }
        if (!telegramChatId.trim()) {
            toast.error('Ingresa el chatId de destino')
            return
        }

        try {
            // Guardar credenciales en localStorage para próximos usos
            if (typeof window !== 'undefined') {
                localStorage.setItem('telegram_token', telegramToken)
                localStorage.setItem('telegram_chatId', telegramChatId)
            }

            if (enviarSoloMensajeTelegram) {
                // Enviar solo mensaje de texto
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/telegram/enviar-mensaje`, {
                    token: telegramToken,
                    chatId: telegramChatId,
                    mensaje: mensajeOpcional
                })
                toast.success(data.mensaje || 'Mensaje enviado por Telegram correctamente')
            } else {
                // Enviar archivo con mensaje
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/telegram/enviar-archivo`, {
                    token: telegramToken,
                    chatId: telegramChatId,
                    filePath: `./${tipoArchivo.toUpperCase()}/${nombreArchivo}.${tipoArchivo}`,
                    caption: mensajeOpcional
                })
                toast.success(data.mensaje || 'Archivo enviado por Telegram correctamente')
            }
            
            setModalAbierto(false)
        } catch (e) {
            const mensajeError = e?.response?.data?.mensaje || e?.response?.data?.error || 'Error al enviar por Telegram'
            toast.error(mensajeError)
        }
    }

    return (
        <>
            <button
                type="button"
                className="text-gray-100 cursor-pointer rounded-xl transition-colors px-3 py-1 border border-gray-100 flex gap-2 items-center hover:bg-gray-100 hover:text-gray-800"
                onClick={() => setModalAbierto(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21 8.488 59.769 59.769 0 0 1 3.27 18.875L5.999 12Zm0 0h2.25M18 18v-2.25m0 2.25h-2.25m2.25 0v-2.25m0 2.25H15" />
                </svg>
                Enviar Factura
            </button>

            <Dialog open={modalAbierto} onClose={() => setModalAbierto(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">
                    <DialogPanel className="w-[100%] md:w-[50%] space-y-4 px-8 py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2]">
                        
                        <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                            Enviar Factura
                        </DialogTitle>

                        {!medioSeleccionado ? (
                            <div className="flex flex-col gap-3 mt-5">
                                <Button
                                    className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-3 border border-gray-100 text-gray-800 flex items-center justify-center gap-2 hover:bg-green-100"
                                    onClick={() => setMedioSeleccionado('whatsapp')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-6 text-green-600">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                    Enviar por WhatsApp
                                </Button>

                                <Button
                                    className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-3 border border-gray-100 text-gray-800 flex items-center justify-center gap-2 hover:bg-blue-100"
                                    onClick={() => setMedioSeleccionado('email')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                    Enviar por Email
                                </Button>

                                <Button
                                    className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-3 border border-gray-100 text-gray-800 flex items-center justify-center gap-2 hover:bg-cyan-100"
                                    onClick={() => setMedioSeleccionado('telegram')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-6 text-cyan-600">
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                                    </svg>
                                    Enviar por Telegram
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 mt-5">
                                <div className="flex flex-col">
                                    <label htmlFor="mensaje-opcional" className="mb-1 text-gray-300">Mensaje (opcional)</label>
                                    <textarea
                                        id="mensaje-opcional"
                                        value={mensajeOpcional}
                                        onChange={(e) => setMensajeOpcional(e.target.value)}
                                        className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                        rows="3"
                                        placeholder="Mensaje a incluir..."
                                    />
                                </div>

                                {medioSeleccionado === 'whatsapp' && (
                                    <div className="flex flex-col">
                                        <label htmlFor="numero-whatsapp" className="mb-1 text-gray-300">Número de WhatsApp (con código de país)</label>
                                        <input
                                            id="numero-whatsapp"
                                            type="text"
                                            value={numeroWhatsapp}
                                            onChange={(e) => setNumeroWhatsapp(e.target.value)}
                                            className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                            placeholder="593999999999"
                                        />
                                    </div>
                                )}

                                {medioSeleccionado === 'email' && (
                                    <>
                                        <div className="flex flex-col">
                                            <label htmlFor="email-destino" className="mb-1 text-gray-300">Email de destino</label>
                                            <input
                                                id="email-destino"
                                                type="email"
                                                value={emailDestino}
                                                onChange={(e) => setEmailDestino(e.target.value)}
                                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                                placeholder="cliente@ejemplo.com"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="email-usuario" className="mb-1 text-gray-300">Tu email (cuenta de envío)</label>
                                            <input
                                                id="email-usuario"
                                                type="email"
                                                value={emailUsuario}
                                                onChange={(e) => setEmailUsuario(e.target.value)}
                                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                                placeholder="tu-email@gmail.com"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="email-contrasena" className="mb-1 text-gray-300">Contraseña (o App Password para Gmail)</label>
                                            <input
                                                id="email-contrasena"
                                                type="password"
                                                value={emailContrasena}
                                                onChange={(e) => setEmailContrasena(e.target.value)}
                                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                                placeholder="Tu contraseña"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="email-servicio" className="mb-1 text-gray-300">Servicio de email</label>
                                            <select
                                                id="email-servicio"
                                                value={emailServicio}
                                                onChange={(e) => setEmailServicio(e.target.value)}
                                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                            >
                                                <option value="gmail">Gmail</option>
                                                <option value="outlook">Outlook</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {medioSeleccionado === 'telegram' && (
                                    <>
                                        <div className="flex flex-col">
                                            <label htmlFor="telegram-token" className="mb-1 text-gray-300">Token del Bot de Telegram</label>
                                            <input
                                                id="telegram-token"
                                                type="text"
                                                value={telegramToken}
                                                onChange={(e) => setTelegramToken(e.target.value)}
                                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                                placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="telegram-chatId" className="mb-1 text-gray-300">Chat ID (destino)</label>
                                            <input
                                                id="telegram-chatId"
                                                type="text"
                                                value={telegramChatId}
                                                onChange={(e) => setTelegramChatId(e.target.value)}
                                                className="outline-none bg-[#2e4760] rounded-lg px-3 py-2 border border-[#2e4760] focus:border-gray-300 text-gray-200"
                                                placeholder="123456789"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                id="telegram-solo-mensaje"
                                                type="checkbox"
                                                checked={enviarSoloMensajeTelegram}
                                                onChange={(e) => setEnviarSoloMensajeTelegram(e.target.checked)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                            <label htmlFor="telegram-solo-mensaje" className="text-gray-300 cursor-pointer">
                                                Enviar solo mensaje (sin archivo)
                                            </label>
                                        </div>
                                    </>
                                )}

                                <div className="flex gap-3 justify-end mt-5">
                                    <Button
                                        className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-gray-700"
                                        onClick={() => {
                                            setMedioSeleccionado(null)
                                            setNumeroWhatsapp('')
                                            setEmailDestino('')
                                            setEnviarSoloMensajeTelegram(false)
                                        }}
                                    >
                                        Atrás
                                    </Button>
                                    <Button
                                        className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 border border-gray-100 text-gray-800 flex items-center gap-2"
                                        onClick={() => {
                                            if (medioSeleccionado === 'whatsapp') enviarPorWhatsapp()
                                            if (medioSeleccionado === 'email') enviarPorEmail()
                                            if (medioSeleccionado === 'telegram') enviarPorTelegram()
                                        }}
                                    >
                                        Enviar
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 justify-end border-t border-[#486b8f] pt-4">
                            <Button
                                className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                onClick={() => {
                                    setModalAbierto(false)
                                    setMedioSeleccionado(null)
                                    setNumeroWhatsapp('')
                                    setEmailDestino('')
                                    setEnviarSoloMensajeTelegram(false)
                                }}
                            >
                                Cerrar
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

