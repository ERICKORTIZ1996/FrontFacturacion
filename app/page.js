'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {

  const router = useRouter();

  const handleSubmitIniciarSesion = (formData) => {
    router.push('/inicio')
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden  bg-gradient-to-r from-[#293c6b] via-[#2e556b] to-[#293c6b]">

      <div className="flex justify-center items-center h-full shadow-md">

        <div className="relative w-52 h-[70%] rounded-l-3xl overflow-hidden bg-[#293c6b] z-10">
          <Image
            src="/images/bienvenida.avif"
            alt="logo-bienvenida"
            width={20}
            height={20}
            className="absolute bottom-0 z-20"
          />
        </div>

        <form
          action={handleSubmitIniciarSesion}
          className="px-10 py-16 rounded-r-3xl h-[70%] fondo w-[25%] shadow-md z-10"
        >

          <p className="font-semibold text-3xl">BIENVENIDO!</p>
          <p className="mb-10">Inicia sesión para poder administrar tu negocio.</p>

          <p className="font-semibold mb-2">Correo Electrónico</p>

          <div className="relative mb-2">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[10px] left-2 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
            </svg>

            <input
              type="text"
              placeholder="Ingresa tu correo electrónico"
              className='outline-none bg-[#102940] rounded-lg px-3 pl-9 py-2 pr-9 focus:border-blue-500 w-full'
            />
          </div>

          <p className="font-semibold mb-2">Contraseña</p>

          <div className="relative mb-7">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-[10px] left-2 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>

            <input
              type="text"
              placeholder="Ingresa tu contraseña"
              className='outline-none bg-[#102940] rounded-lg px-3 pl-9 py-2 pr-9 focus:border-blue-500 w-full'
              name="password"
            />

            <button
              type="button"
              className="absolute top-[10px] right-[10px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>

          </div>

          <input
            type="submit"
            className="py-2 bg-[#1b58fb] rounded-xl w-full text-white font-semibold hover:bg-[#386dff] cursor-pointer"
            value="Iniciar Sesión"
          />
        </form>
      </div>

      <div className="absolute bg-[#364f8e] w-52 h-96 rotate-[-25deg] right-[-150px] top-[30%] z-0"></div>
      <div className="absolute bg-[#233562] w-52 h-96 rotate-[-25deg] left-[-150px] top-[-20%] z-0"></div>
      <div className="absolute bg-[#325d76] w-52 h-96 rotate-[65deg] left-[30%] bottom-[-28%] z-0"></div>

    </div>
  );
}
