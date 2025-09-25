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
  const router = useRouter();

  const encryptData = (data) => {

    return CryptoJS.AES.encrypt(JSON.stringify({
      tokenAcceso: data.tokenAcceso,
      tokenRenovacion: data.tokenRenovacion,
      email: data.email,
      id: data.id,
      nombre: data.nombre,
      rol: data.rol
    }), process.env.NEXT_PUBLIC_KEY_CRYPTO).toString();
  };

  const handleSubmitIniciarSesion = async (formData) => {

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/auth/login`, {
        email: formData.get('user'),
        contraseña: formData.get('pass')
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

      if (e?.response?.data?.errores?.length) {
        e.response.data.errores.map(error => toast.error(`${error.campo.toUpperCase()}: ${error.mensaje}`))
      } else {
        toast.error(quitarEmojing(e?.response?.data?.message))
      }
    }

  }

  return (
    <div className="relative w-screen h-screen overflow-hidden fondo-login">

      <div className="relative flex justify-start gap-10 items-center h-full">

        <form
          action={handleSubmitIniciarSesion}
          className="px-10 py-16 rounded-3xl h-[90%] ml-10 bg-gradient-to-t from-[#102940]/20 to-[#182a3b]/60 shadow shadow-gray-800 flex items-center"
        >

          <div>
            <p className="font-semibold text-3xl text-center">BIENVENIDO</p>
            <p className="mb-10 text-center">Inicia sesión para poder gestionar tus tareas</p>

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
              className=" px-3 py-1 bg-[#1b58fb] rounded-xl w-full m-auto text-white font-semibold hover:bg-[#386dff] cursor-pointer"
              value="Iniciar Sesión"
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
