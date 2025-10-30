'use client'

import CryptoJS from "crypto-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useMainStore } from "@/store/mainStore";
import { quitarEmojing } from "@/helpers";

export default function Home() {

  const setDataUser = useMainStore((state) => state.setDataUser);
  const dataUser = useMainStore((state) => state.dataUser)

  const [viewPass, setViewPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const encryptData = (data) => {
    // Obtener clave de encriptación o usar una por defecto (debe coincidir con store/mainStore.js)
    const encryptionKey = process.env.NEXT_PUBLIC_KEY_CRYPTO || 'clave-secreta-sistema-facturacion-2024-cambiar-en-produccion'
    
    if (!encryptionKey) {
      console.error('⚠️ NEXT_PUBLIC_KEY_CRYPTO no está configurada')
      throw new Error('Error de configuración: falta clave de encriptación')
    }

    try {
      return CryptoJS.AES.encrypt(JSON.stringify({
        tokenAcceso: data.tokenAcceso,
        tokenRenovacion: data.tokenRenovacion,
        email: data.email,
        id: data.id,
        nombre: data.nombre,
        rol: data.rol
      }), encryptionKey).toString();
    } catch (error) {
      console.error('Error al encriptar datos:', error)
      throw new Error('Error al encriptar los datos de usuario')
    }
  };

  const handleSubmitIniciarSesion = async (formData) => {

    // Prevenir múltiples envíos
    if (isLoading) {
      console.log('Login ya en proceso, ignorando click duplicado')
      return
    }

    setIsLoading(true)

    try {
      const email = formData.get('user')
      const contraseña = formData.get('pass')
      
      // Validación básica
      if (!email || !contraseña) {
        toast.error('Por favor, completa todos los campos')
        setIsLoading(false)
        return
      }

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/auth/login`, {
        email: email.trim(),
        contraseña: contraseña
      }, {
        timeout: 10000, // Timeout de 10 segundos
        headers: {
          'Content-Type': 'application/json'
        }
      })

      setDataUser({
        tokenAcceso: data.data.tokens.tokenAcceso,
        tokenRenovacion: data.data.tokens.tokenRenovacion,
        email: data.data.usuario.email,
        id: data.data.usuario.id,
        nombre: data.data.usuario.nombre,
        rol: data.data.usuario.rol
      })

      localStorage.setItem('dataUser', encryptData({
        tokenAcceso: data.data.tokens.tokenAcceso,
        tokenRenovacion: data.data.tokens.tokenRenovacion,
        email: data.data.usuario.email,
        id: data.data.usuario.id,
        nombre: data.data.usuario.nombre,
        rol: data.data.usuario.rol
      }))

      router.push('/inicio')

    } catch (e) {
      console.error('Error en login:', e)

      // Error 429 - Too Many Requests (Prioridad alta - debe ir primero)
      if (e?.response?.status === 429) {
        console.log('Error 429 detectado:', {
          data: e?.response?.data,
          headers: e?.response?.headers,
          status: e?.response?.status
        })
        
        // El backend retorna el mensaje en response.data.message según server.js línea 101-102
        const mensajeBackend = e?.response?.data?.message || e?.response?.data?.mensaje
        
        // Intentar obtener retry-after de los headers (puede venir como string o número)
        const retryAfterHeader = e?.response?.headers?.['retry-after'] || 
                                 e?.response?.headers?.['Retry-After']
        const retryAfterSegundos = retryAfterHeader ? parseInt(retryAfterHeader) : null
        
        // Calcular tiempo de espera: 15 minutos = 900 segundos según server.js línea 98
        const tiempoEsperaMinutos = retryAfterSegundos ? Math.ceil(retryAfterSegundos / 60) : 15
        
        // Mensaje final con información clara
        let mensajeFinal = ''
        if (mensajeBackend) {
          mensajeFinal = quitarEmojing(mensajeBackend)
        } else if (retryAfterSegundos) {
          mensajeFinal = `Demasiados intentos. Por favor, espera ${retryAfterSegundos} segundos (${tiempoEsperaMinutos} minutos) antes de intentar nuevamente.`
        } else {
          mensajeFinal = 'Demasiados intentos de login. Has superado el límite de 5 intentos cada 15 minutos. Por favor, espera 15 minutos antes de intentar nuevamente.'
        }
        
        // Asegurar que siempre haya un mensaje
        if (!mensajeFinal || mensajeFinal.trim() === '') {
          mensajeFinal = 'Demasiados intentos de login. Por favor, espera 15 minutos antes de intentar nuevamente.'
        }
        
        toast.error(mensajeFinal)
        setIsLoading(false)
        return
      }

      // Si hay errores de validación con array de errores
      if (e?.response?.data?.errores?.length) {
        e.response.data.errores.map(error => toast.error(`${error.campo?.toUpperCase() || 'Error'}: ${error.mensaje || 'Error desconocido'}`))
      } 
      // Si hay mensaje en response.data.message
      else if (e?.response?.data?.message) {
        const mensaje = quitarEmojing(e.response.data.message)
        toast.error(mensaje || 'Error al iniciar sesión')
      }
      // Si hay mensaje en response.data.mensaje
      else if (e?.response?.data?.mensaje) {
        const mensaje = quitarEmojing(e.response.data.mensaje)
        toast.error(mensaje || 'Error al iniciar sesión')
      }
      // Error de timeout
      else if (e?.code === 'ECONNABORTED' || e?.message?.includes('timeout')) {
        toast.error('El servidor no respondió a tiempo. Por favor, verifica tu conexión e intenta de nuevo.')
      }
      // Error de red (backend no responde)
      else if (e?.code === 'ERR_NETWORK' || e?.message?.includes('Network')) {
        toast.error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.')
      }
      // Error sin response (sin conexión)
      else if (!e?.response) {
        toast.error('Error de conexión. Verifica tu conexión a internet y que el backend esté disponible.')
      }
      // Cualquier otro error
      else {
        toast.error(`Error al iniciar sesión. ${e?.response?.status ? `Error ${e.response.status}` : ''} Por favor, intenta de nuevo.`)
      }
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className="relative w-screen h-screen overflow-hidden fondo-login">

      <div className="relative flex justify-center md:justify-start gap-4 md:gap-10 items-center h-full px-4 md:px-0">

        <form
          action={handleSubmitIniciarSesion}
          className="w-full md:w-auto px-6 md:px-10 py-8 md:py-16 rounded-2xl md:rounded-3xl md:h-[90%] md:ml-10 bg-gradient-to-t from-[#102940]/20 to-[#182a3b]/60 shadow shadow-gray-800 flex items-center"
        >

          <div className="w-full md:w-auto">
            <p className="font-semibold text-2xl md:text-3xl text-center">BIENVENIDO</p>
            <p className="mb-6 md:mb-10 text-center text-sm md:text-base">Inicia sesión para poder gestionar tus tareas</p>

            <p className="mb-2">Correo Electrónico</p>

            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Ingresa tu correo electrónico"
                className='outline-none bg-[#2e4760] rounded-xl px-3 py-1  focus:border-[#a4a4a4] border border-[#2e4760] w-full'
                name="user"
              />
            </div>

            <p className="mb-2">Contraseña</p>

            <div className="relative mb-7">

              <input
                type={`${viewPass ? 'text' : 'password'}`}
                placeholder="Ingresa tu contraseña"
                className='outline-none bg-[#2e4760] rounded-xl px-3 py-1  focus:border-[#a4a4a4] border border-[#2e4760] w-full'
                name="pass"
              />

              <button
                type="button"
                className="absolute top-[2px] right-[5px] cursor-pointer hover:bg-[#102940] rounded-full transition-colors p-1"
                onClick={() => setViewPass(!viewPass)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>

            </div>

            <input
              type="submit"
              className={`px-3 py-1 bg-[#1b58fb] rounded-xl w-full m-auto text-white font-semibold ${
                isLoading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-[#386dff] cursor-pointer'
              }`}
              value={isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              disabled={isLoading}
            />
          </div>
        </form>

        <div className="flex-1 flex flex-col justify-center items-center h-full">

          <div className="relative w-fit rounded-3xl p-5">
            <p className="text-6xl bg-gradient-to-l from-[#1bfbd6] via-[#1b58fb] to-[#1bfba9] text-transparent bg-clip-text font-bold drop-shadow-sm drop-shadow-gray-700 mt-10">
              Decisión INTELIGENTE
            </p>

            <p className='text-4xl bg-gradient-to-l from-[#1bfbd6] via-[#1b58fb] to-[#1bfba9] text-transparent bg-clip-text font-bold drop-shadow-sm drop-shadow-gray-700'>para administrar</p>

            <p className='text-6xl bg-gradient-to-l from-[#1bfbd6] via-[#1b58fb] to-[#1bfba9] text-transparent bg-clip-text font-bold drop-shadow-sm drop-shadow-gray-700'>tu NEGOCIO</p>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-44 absolute -top-28 -left-14 text-[#4afcbb]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>
          </div>

        </div>

      </div>

    </div>
  );
}
