"use client"

import axios from "axios";

export default function BotonReenviarFactura({ nombreArchivo, claveAcceso }) {

    const reenviarFactura = async () => {

        // FIRMAR XML
        const { data: dataFirma } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/firmarXML3`, {
            "nombreArchivo": nombreArchivo,
            "password": "647435Ss" // Clave de la firma de usuario
        })

        console.log(dataFirma);

        // VALIDAR 
        const { data: dataValidar } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/validar`, {
            "nombreArchivo": nombreArchivo,
        })

        console.log(dataValidar);

        return

        // VERIFICAR
        // const { data: dataVerificar } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/verificarFactura`, {
        //     "nombreArchivo": nombreArchivo,
        //    "claveAccesoComprobante": claveAcceso
        // })

        // AUTORIZAR
        // const xmlBody = `
        //     <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ec="http://ec.gob.sri.ws.consulta">
        //         <soapenv:Header/>
        //         <soapenv:Body>
        //             <ec:consultarComprobante>
        //                 <claveAccesoComprobante>${claveAcceso}</claveAccesoComprobante>
        //             </ec:consultarComprobante>
        //         </soapenv:Body>
        //         </soapenv:Envelope>
        // `

        // const { data: autorizar } = await axios.post(
        //     'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl',
        //     xmlBody,
        //     {
        //         headers: {
        //             'Content-Type': 'text/xml;charset=UTF-8',
        //             'SOAPAction': 'http://ec.gob.sri.ws.consulta/AutorizacionComprobantesOffline/consultarComprobante'
        //         }
        //     }
        // );

        // console.log(dataFactura);
    }

    return (
        <button
            className="bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 gap-2 border border-gray-100 text-gray-800 flex items-center justify-center mt-5 w-full"
            onClick={() => reenviarFactura()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
            </svg>

            <span>Autorizar</span>
        </button>
    )
}
