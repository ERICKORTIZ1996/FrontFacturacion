"use client"

import axios from "axios";

export default function BotonReenviarFactura({ idFctura }) {


    const reenviarFactura = async () => {
        try {
            console.log(idFctura);

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <button
            className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 gap-2 border border-gray-100 text-gray-800 flex items-center justify-center mt-5 w-full"
            onClick={() => reenviarFactura()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
            </svg>

            <span>Reenviar</span>
        </button>
    )
}
