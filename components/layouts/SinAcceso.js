'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from 'react';

export default function SinAcceso() {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'} h-screen bg-[#e2fbff] flex flex-col items-center justify-center gap-5 main-background`}
        >

            <div className="bg-gradient-to-t from-[#102940]/20 to-[#182a3b]/60 shadow shadow-gray-800 px-10 py-16 rounded-3xl w-[70%] flex flex-col items-center justify-center">
                <Image
                    src={"/images/404.png"}
                    alt="error404"
                    width={300}
                    height={300}
                />

                <div
                    className="flex flex-col items-center justify-center "
                >

                    <h1 className="font-bold text-3xl text-center lg:text-start md:text-6xl uppercase">Sin Acceso</h1>
                    <p className="mt-1 mb-6 text-center text-sm md:text-lg">Estas intentando acceder a una página <br />que no tienes acceso.</p>

                    <Link
                        href={'/'}
                        className="px-10 py-1 bg-[#1b58fb] rounded-xl m-auto text-white font-semibold hover:bg-[#386dff] cursor-pointer text-center"
                    >
                        VOLVER AL INICIO
                    </Link>
                </div>
            </div>

        </div>
    )
}
