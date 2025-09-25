'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { facturaSchema } from '@/schema'
import { toast } from 'react-toastify';
import { AgregarProducto } from '../emitir_facturas_componentes/AgregarProducto'
import { consultarFechaEcuador } from '@/helpers'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios'
import SmallSpinner from '../layouts/SmallSpinner'

export default function ModalEmitirFactura() {

    const modalEmitirFactura = useMainStore((state) => state.modalEmitirFactura)
    const changeModalEmitirFactura = useMainStore((state) => state.changeModalEmitirFactura)
    const formulariosFactura = useMainStore((state) => state.formulariosFactura)
    const crearFormProducto = useMainStore((state) => state.crearFormProducto)
    const setFormulariosFactura = useMainStore((state) => state.setFormulariosFactura)
    const productos = useMainStore((state) => state.productos)
    const setProductos = useMainStore((state) => state.setProductos)

    const [botonMas, setBotonMas] = useState(true)
    const [fechaEcuador, setFechaEcuador] = useState({})
    const [tipoIdentificacion, setTipoIdentificacion] = useState("")
    const [longitudIdentificacion, setLongitudIdentificacion] = useState(0)
    const [ventanaResultadosRuc, setVentanaResultadosRuc] = useState(false)

    const inputIdentificacion = useRef(null)
    const inputNombresCliente = useRef(null)
    const inputApellidosCliente = useRef(null)
    const inputDireccionCliente = useRef(null)
    const inputRuc = useRef(null)
    const inputRazonSocial = useRef(null)
    const inputMatriz = useRef(null)
    const inputDireccion = useRef(null)
    const inputEstab = useRef(null)
    const inputPtoEmi = useRef(null)
    const inputObligadoContabilidad = useRef(null)

    const queryClient = useQueryClient();

    const formasDePago = {
        forma1: { codigo: 1, descripcion: "Efectivo" },
        forma16: { codigo: 16, descripcion: "Tarjeta de débito" },
        forma17: { codigo: 17, descripcion: "Dinero electrónico" },
        forma19: { codigo: 19, descripcion: "Tarjeta de crédito" },
    };

    const totalSinIVA = useMemo(() => {
        if (!Array.isArray(productos)) return 0;

        return productos.reduce((total, p) => {
            const precio = Number(p?.precioUnitario) || 0;
            const cantidad = Number(p?.cantidad) || 0;

            const subtotal = precio * cantidad;

            return total + subtotal;
        }, 0);
    }, [productos]);

    const totalDescuento = useMemo(() => {
        if (!Array.isArray(productos)) return 0;

        return productos.reduce((total, p) => {
            const precio = Number(p?.precioUnitario) || 0;
            const cantidad = Number(p?.cantidad) || 0;
            const descuento = Number(p?.descuento) || 0;

            const subtotal = precio * cantidad;
            const totalDescuento = (subtotal * descuento / 100);

            return total + totalDescuento;
        }, 0);
    }, [productos]);

    const baseImponible = useMemo(() => totalSinIVA - totalDescuento, [totalSinIVA, totalDescuento]);
    const iva = useMemo(() => baseImponible * 0.15, [baseImponible]);
    const totalFinal = useMemo(() => baseImponible + iva, [baseImponible, iva]);


    const mostrarFormProducto = () => {
        crearFormProducto({ id: 'empty' })
        setBotonMas(false)
    }

    const handleSubmit = async (formData) => {

        const metodoPago = formasDePago[formData.get('forma-pago')]

        const data = {
            ambiente: "Pruebas", // Cambiado a "Pruebas" o "Produccion" según el diccionario CodigoAmbiente
            tipoEmision: "EmisionNormal", // Cambiado a un valor que coincida con las claves de TipoEmision
            razonSocial: formData.get('razon-social'),
            ruc: formData.get('ruc'),
            codDoc: "Factura", // Cambiado a un valor que coincida con las claves de CodigoTipoComprobante
            estab: formData.get('etab'),
            ptoEmi: formData.get('ptoEmi'),
            dirMatriz: formData.get('matriz'),
            dirEstablecimiento: formData.get('direccion'),
            obligadoContabilidad: formData.get('obligadoContabilidad'),
            tipoIdentificacionComprador: formData.get('tipo-identificacion'),
            razonSocialComprador: `${formData.get('nombres-cliente')}`,
            razonSocialCompradorApellidos: `${formData.get('apellidos-cliente')}`,
            identificacionComprador: formData.get('identificacion-cliente'),
            direccionComprador: formData.get('direccion-comprador'),
            formaPago: metodoPago.descripcion, // Cambiado a un valor que coincida con las claves de FormasPago
        }

        const result = facturaSchema.safeParse(data)

        if (!result.success) {

            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        mutate(formData)
    }

    const emitirFactura = async (formData) => {

        // 2. Extraigo el ID del CUERPO
        const productosFormateados = productos
            .filter(producto => producto.id !== "empty")
            .map(({ id, ...prducto }) => prducto);

        const metodoPago = formasDePago[formData.get('forma-pago')]

        try {

            // CREAR XML
            const { data: dataFactura } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/crearXML`, {
                ambiente: "Pruebas", // Cambiado a "Pruebas" o "Produccion" según el diccionario CodigoAmbiente
                tipoEmision: "EmisionNormal", // Cambiado a un valor que coincida con las claves de TipoEmision
                razonSocial: formData.get('razon-social'),
                ruc: formData.get('ruc'),
                codDoc: "Factura", // Cambiado a un valor que coincida con las claves de CodigoTipoComprobante
                estab: formData.get('etab'),
                ptoEmi: formData.get('ptoEmi'),
                dirMatriz: formData.get('matriz'),
                dirEstablecimiento: formData.get('direccion'),
                obligadoContabilidad: formData.get('obligadoContabilidad'),
                tipoIdentificacionComprador: formData.get('tipo-identificacion'), // Solo funciona con RUC. formData.get('tipo-identificacion'),
                razonSocialComprador: `${formData.get('nombres-cliente')} ${formData.get('apellidos-cliente')}`,
                identificacionComprador: formData.get('identificacion-cliente'),
                direccionComprador: formData.get('direccion-comprador'),
                totalSinImpuestos: Number(baseImponible),
                totalDescuento: totalDescuento,
                totalConImpuestos: [
                    {
                        codigo: "IVA",
                        codigoPorcentaje: "15%",
                        baseImponible: Number(baseImponible),
                        tarifa: 15,
                        valor: Number(iva),
                        valorDevolucionIva: 0.00 // -> QUEMADO
                    }
                ],
                propina: 0.00, // -> QUEMADO
                formaPago: metodoPago.descripcion,
                importeTotal: Number(totalFinal),
                moneda: "DOLAR",
                pagos: [{
                    formaPago: metodoPago.descripcion,
                    total: Number(totalFinal),
                }],
                detalles: productosFormateados
            })

            console.log(dataFactura);
            toast.success(dataFactura.data.mensaje)

            // FIRMAR XML
            const { data: dataFirma } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/firmarXML3`, {
                "nombreArchivo": dataFactura.data.nombreArchivo,
                "password": "647435Ss" // Clave de la firma de usuario
            })

            console.log(dataFirma);
            toast.success(dataFirma.data.message)

            // VALIDAR 
            const { data: dataValidar } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/validar`, {
                "nombreArchivo": dataFactura.data.nombreArchivo,
            })

            console.log(dataValidar);
            toast.success(dataValidar.data.estado)


            // VERIFICAR
            const { data: dataVerificar } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/verificarFactura`, {
                "nombreArchivo": dataFactura.data.nombreArchivo,
                "claveAccesoComprobante": dataFactura.data.claveAcceso
            })

            console.log(dataVerificar);
            toast.success(dataVerificar.data.estado)

            // AUTORIZAR
            // const xmlBody = `
            //     <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ec="http://ec.gob.sri.ws.consulta">
            //         <soapenv:Header/>
            //         <soapenv:Body>
            //             <ec:consultarComprobante>
            //                 <claveAccesoComprobante>${dataFactura.data.claveAcceso}</claveAccesoComprobante>
            //             </ec:consultarComprobante>
            //         </soapenv:Body>
            //         </soapenv:Envelope>
            // `

            // const { data: dataAutorizar } = await axios.post(
            //     'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl',
            //     xmlBody,
            //     {
            //         headers: {
            //             'Content-Type': 'text/xml;charset=UTF-8',
            //             'SOAPAction': 'http://ec.gob.sri.ws.consulta/AutorizacionComprobantesOffline/consultarComprobante'
            //         }
            //     }
            // );

            // console.log(dataAutorizar);

            return dataFactura

        } catch (e) {
            console.log(e);
            throw new Error(e?.response?.data?.mensaje || e?.response?.data?.estado || 'Error Inesperado')
        }
    };

    const { mutate } = useMutation({
        mutationFn: emitirFactura, // Funcion a consultar
        onSuccess: (dataFactura) => { // Petición exitosa

            setTipoIdentificacion("")
            setLongitudIdentificacion(0)
            setFormulariosFactura([])
            setProductos([])
            setBotonMas(true)
            setVentanaResultadosRuc(false)
            toast.success(dataFactura.message.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim())
            queryClient.invalidateQueries({ queryKey: ['emitir_facturas'] }); // Traer los datos actualizados
            changeModalEmitirFactura()
        },
        onError: (error) => {
            console.log(error);

            toast.error(error.message);
        }
    })

    const controlInputIdentificacion = (value) => {

        setTipoIdentificacion(value)

        if (inputIdentificacion.current) {
            inputIdentificacion.current.value = "";
        }

        switch (value) {
            case 'RUC':
                setLongitudIdentificacion(13)
                reiniciarInputsCliente()
                break;

            case 'CEDULA':
                setLongitudIdentificacion(10)
                reiniciarInputsCliente()
                break;

            case 'PASAPORTE':
                setLongitudIdentificacion(20)
                reiniciarInputsCliente()
                break;

            case 'CONSUMIDOR-FINAL':
                setLongitudIdentificacion(10)

                inputNombresCliente.current.value = "CONSUMIDOR FINAL"
                inputApellidosCliente.current.value = "CONSUMIDOR FINAL"
                inputDireccionCliente.current.value = "CONSUMIDOR FINAL"

                setTimeout(() => {
                    if (inputIdentificacion.current) {
                        inputIdentificacion.current.value = "0000000000"
                    }
                }, 100)

                break;

            case 'IDENTIFICACION-EXTERIOR':
                setLongitudIdentificacion(30)
                reiniciarInputsCliente()
                break;

            default:
                setLongitudIdentificacion(0)
                reiniciarInputsCliente()
                break;
        }
    }

    const reiniciarInputsCliente = () => {
        inputNombresCliente.current.value = ""
        inputApellidosCliente.current.value = ""
        inputDireccionCliente.current.value = ""
    }

    const consultarCliente = async () => {

        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/clientes/buscar/${inputIdentificacion.current.value}`)

            const nombresYApellidos = data.data.nombres.split(" ");

            setTimeout(() => {
                inputNombresCliente.current.value = nombresYApellidos.slice(0, 2).join(" ")
                inputApellidosCliente.current.value = nombresYApellidos.slice(2).join(" ")
                inputDireccionCliente.current.value = data.data.direccion
            }, 200);

            return data

        } catch (e) {
            console.log(e);
            toast.error(e.response.data.message.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim())
        }
    }

    const consultarEmpresa = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/empresas/ruc/${inputRuc.current.value}`)
            setVentanaResultadosRuc(true)
            return data.data

        } catch (e) {
            toast.error(e.response.data.message.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, ''))
            console.log(e);
        }
    }

    const { data: dataCliente, isLoading: isLoadingCliente, refetch: refetchCliente } = useQuery({
        queryKey: ['datos-cliente'], // Identificador unico para cada Query
        queryFn: consultarCliente, // Funcion a consultar 
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
        enabled: false // No ejecutar al inicio
    })

    const { data: dataEmpresa, isLoading: isLoadingEmpresa, refetch: refetchEmpresa } = useQuery({
        queryKey: ['datos-empresa'], // Identificador unico para cada Query
        queryFn: consultarEmpresa, // Funcion a consultar 
        refetchOnWindowFocus: false, // No volver a hacer fetch al cambiar de pestaña
        enabled: false // No ejecutar al inicio
    })

    const llenarInputsRuc = (ruc, razonSocial, dirMatriz, dirEstablecimiento, estab, ptoEmi, obligadoContablilidad) => {
        inputRuc.current.value = ruc
        inputRazonSocial.current.value = razonSocial
        inputMatriz.current.value = dirMatriz
        inputDireccion.current.value = dirEstablecimiento

        inputEstab.current.value = estab
        inputPtoEmi.current.value = ptoEmi
        inputObligadoContabilidad.current.value = obligadoContablilidad

        setVentanaResultadosRuc(false)
    }

    const cancelarFactura = () => {
        setTipoIdentificacion("")
        setLongitudIdentificacion(0)
        setFormulariosFactura([])
        setProductos([])
        setBotonMas(true)
        setVentanaResultadosRuc(false)
        changeModalEmitirFactura()
    }

    // console.log(productos);

    useEffect(() => {
        setFechaEcuador(consultarFechaEcuador())
        setFormulariosFactura([])
    }, [])

    return (
        <>
            <Dialog open={modalEmitirFactura} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40  modal-background">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[100%] md:w-[75%] h-[95%] space-y-4 px-8 py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2]">

                        <div className='flex h-full flex-col justify-between'>
                            <form
                                action={handleSubmit}
                                className='overflow-y-auto h-full barra pr-8'
                                id='main-form-emitir-factura'
                            >
                                <div
                                    className='flex flex-col justify-center items-center border-b border-b-[#486b8f] pb-4'
                                >
                                    <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                                        Emitir Factura
                                    </DialogTitle>
                                    <p className='text-center'>Fecha: {fechaEcuador?.formatted_time?.split(",")[0]}</p>

                                </div>

                                <h2 className='my-5 text-xl flex gap-2 items-center'>

                                    <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-gray-200 text-gray-800">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                        </svg>
                                    </span>

                                    Cabecera
                                </h2>

                                <div className='flex gap-5 relative'>

                                    <div className='flex gap-3 items-end'>
                                        <div className='flex flex-col'>
                                            <label htmlFor="ruc" className='mb-1'>Ruc</label>
                                            <input
                                                id='ruc'
                                                type="text"
                                                name='ruc'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                placeholder='Ej: 1750851956001'
                                                maxLength={13}
                                                ref={inputRuc}
                                                autoComplete="off"
                                                onFocus={() => setVentanaResultadosRuc(true)}
                                            />
                                        </div>

                                        <button
                                            type='button'
                                            onClick={() => refetchEmpresa()}
                                            className='rounded-full bg-[#2e4760] w-fit p-2 cursor-pointer hover:bg-[#3a546e] transition-colors'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="razon-social" className='mb-1'>Razón Social</label>
                                        <input
                                            id='razon-social'
                                            type="text"
                                            name='razon-social'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            ref={inputRazonSocial}
                                            placeholder='Ej: ORTIZ MENDOZA ERICK ALEXANDER'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="matriz" className='mb-1'>Matriz</label>
                                        <input
                                            id='matriz'
                                            type="text"
                                            ref={inputMatriz}
                                            name='matriz'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Quito'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="direccion" className='mb-1'>Dirección</label>
                                        <input
                                            id='direccion'
                                            type="text"
                                            ref={inputDireccion}
                                            name='direccion'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Av. Rio Amazonas'
                                        />
                                    </div>

                                    {/* INPUTS OCULATOS */}
                                    <div className='flex flex-col'>
                                        <input
                                            id='etab'
                                            type="text"
                                            ref={inputEstab}
                                            name='etab'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder=''
                                            hidden
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <input
                                            id='ptoEmi'
                                            type="text"
                                            ref={inputPtoEmi}
                                            name='ptoEmi'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder=''
                                            hidden
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <input
                                            id='obligadoContabilidad'
                                            type="text"
                                            ref={inputObligadoContabilidad}
                                            name='obligadoContabilidad'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder=''
                                            hidden
                                        />
                                    </div>
                                    {/* ================ */}

                                    {ventanaResultadosRuc && dataEmpresa?.ruc > 0 && (
                                        <div className="bg-gradient-to-t from-[#102940] to-[#182a3b] w-full h-60 absolute rounded-xl p-2 top-[110%] text-gray-200 mb-3">

                                            <div className='flex items-center justify-between px-3'>

                                                <h2 className=''>RESULTADOS:</h2>

                                                <button
                                                    type='button'
                                                    onClick={() => setVentanaResultadosRuc(false)}
                                                    className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                                >
                                                    Cerrar
                                                </button>
                                            </div>

                                            <ul className="overflow-auto barra h-[calc(11rem)] pr-3">
                                                {dataEmpresa.sucursales.map((s) => (
                                                    s.puntosEmision.map((pe) => (
                                                        <li
                                                            key={pe.id}
                                                            className="text-nowrap px-3 py-1 bg-[#1c364f] my-3 hover:bg-[#2e4760] cursor-pointer rounded-lg w-full transition-colors"
                                                            onClick={() => llenarInputsRuc(dataEmpresa.ruc, dataEmpresa.razonSocial, dataEmpresa.dirMatriz, s.dirEstablecimiento, s.estab, pe?.ptoEmi, dataEmpresa.obligadoContabilidad)}

                                                        >

                                                            {/* <p>
                                                                    <span className='font-bold'>Ruc:</span> {dataEmpresa.ruc}
                                                            </p> */}

                                                            <div className='flex gap-5'>
                                                                <div className="flex flex-col">
                                                                    <span className='font-bold text-[12px]'>Pto. Emisión</span>
                                                                    <p className="-mt-1">{pe?.ptoEmi}</p>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className='font-bold text-[12px]'>Matriz</span>
                                                                    <p className="-mt-1">{dataEmpresa.dirMatriz}</p>
                                                                </div>

                                                                <div className="flex flex-col">
                                                                    <span className='font-bold text-[12px]'>Dirección</span>
                                                                    <p className="-mt-1">{s.dirEstablecimiento}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                </div>

                                <h2 className='my-5 text-xl flex gap-2 items-center'>

                                    <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                    </span>

                                    Datos del Cliente
                                </h2>

                                <div className='grid grid-cols-1 gap-20'>

                                    <div className='flex gap-3'>
                                        <div className='flex flex-col gap-3'>

                                            <div className='flex gap-3 items-end'>

                                                <div className='flex flex-col'>
                                                    <label htmlFor="tipo-identificacion" className='mb-1'>Tipo de Identificación</label>

                                                    <select
                                                        name="tipo-identificacion"
                                                        id="tipo-identificacion"
                                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                        onChange={(e) => controlInputIdentificacion(e.target.value)}
                                                    >
                                                        <option value="">-- Seleccionar --</option>
                                                        <option value="RUC">RUC</option>
                                                        <option value="CEDULA">Cédula</option>
                                                        <option value="PASAPORTE">Pasaporte</option>
                                                        <option value="CONSUMIDOR-FINAL">Cosumidor Final</option>
                                                        <option value="IDENTIFICACION-EXTERIOR">Identificación del Exterior</option>
                                                    </select>
                                                </div>

                                                <button
                                                    type='button'
                                                    onClick={() => refetchCliente()}
                                                    className='rounded-full bg-[#2e4760] w-fit p-2 cursor-pointer hover:bg-[#3a546e] transition-colors'
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {tipoIdentificacion.length ? (
                                                <div className='flex flex-col'>
                                                    <label
                                                        htmlFor="identificacion-cliente"
                                                        className='mb-1 uppercase'
                                                    >
                                                        {tipoIdentificacion}
                                                    </label>
                                                    <input
                                                        ref={inputIdentificacion}
                                                        id='identificacion-cliente'
                                                        type="text"
                                                        name='identificacion-cliente'
                                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                        maxLength={longitudIdentificacion}
                                                    />
                                                </div>
                                            ) : null}

                                        </div>

                                        {isLoadingCliente ?
                                            <SmallSpinner />
                                            :
                                            <>
                                                <div className='flex flex-col'>
                                                    <label htmlFor="nombres-cliente" className='mb-1'>Nombres</label>
                                                    <input
                                                        ref={inputNombresCliente}
                                                        id='nombres-cliente'
                                                        type="text"
                                                        name='nombres-cliente'
                                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                        placeholder='Ej: Cristhian Lorenzo'
                                                    />
                                                </div>

                                                <div className='flex flex-col'>
                                                    <label htmlFor="apellidos-cliente" className='mb-1'>Apellidos</label>
                                                    <input
                                                        ref={inputApellidosCliente}
                                                        id='apellidos-cliente'
                                                        type="text"
                                                        name='apellidos-cliente'
                                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                        placeholder='Ej: Velez Zambrano'
                                                    />
                                                </div>

                                                <div className='flex flex-col'>
                                                    <label htmlFor="direccion-comprador" className='mb-1'>Dirección</label>
                                                    <input
                                                        ref={inputDireccionCliente}
                                                        id='direccion-comprador'
                                                        type="text"
                                                        name='direccion-comprador'
                                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                        placeholder='Ej: La Planada'
                                                    />
                                                </div>
                                            </>
                                        }

                                    </div>

                                    {/* <div className='flex flex-col gap-3'>

                                         <div className='flex flex-col'>
                                            <label htmlFor="telefono-cliente" className='mb-1'>Teléfono</label>
                                            <input
                                                id='telefono-cliente'
                                                type="text"
                                                name='telefono-cliente'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                placeholder='Ej: 0989486603'
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <label htmlFor="correo-cliente" className='mb-1'>Correo:</label>
                                            <input
                                                id='correo-cliente'
                                                type="text"
                                                name='correo-cliente'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                placeholder='Ej: cris@cris.com'
                                            />
                                        </div> 
                                    </div> */}

                                </div>

                                <h2 className='my-5 text-xl flex gap-2 items-center'>

                                    <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </span>

                                    Forma de Pago
                                </h2>

                                <div className='flex flex-col'>
                                    <label htmlFor="forma-pago" className='mb-1'>Forma de Pago</label>

                                    <select
                                        name="forma-pago"
                                        id="forma-pago"
                                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-fit'
                                    >
                                        <option value="forma1">Efectivo</option>
                                        <option value="forma16">Tarjeta de débito</option>
                                        <option value="forma17">Dinero electrónico</option>
                                        <option value="forma19">Tarjeta de crédito</option>
                                    </select>
                                </div>

                                <h2 className='my-5 text-xl flex gap-2 items-center'>

                                    <span className='bg-gray-200 rounded-full p-1 text-gray-800'>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </span>

                                    Productos / Artículos

                                    <p className='text-sm flex gap-2 items-center font-semibold'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#478bb3]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                        </svg>
                                        Separador de decimales: PUNTO
                                    </p>

                                </h2>

                                {botonMas &&
                                    <button
                                        type="button"
                                        className="bg-white text-gray-800 hover:bg-green-500 border border-gray-200 px-3 py-1 rounded-xl cursor-pointer hover:border-green-500 hover:text-gray-200 transition-colors mb-5 flex items-center"
                                        onClick={mostrarFormProducto}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>

                                        Agregar Artículo
                                    </button>
                                }

                                {
                                    Array.isArray(formulariosFactura) && formulariosFactura.length > 0 && (
                                        formulariosFactura.map(id => (
                                            <AgregarProducto key={id} id={id} />
                                        ))
                                    )
                                }
                            </form>

                            <form className='border-t border-t-[#486b8f]'>
                                <div className='flex justify-between gap-5 items-end mt-5'>

                                    <div className='font-semibold text-gray-800 text-sm bg-gray-100 rounded-xl px-3 py-1 flex gap-4'>
                                        <div>
                                            <p>Subtotal: {totalSinIVA.toFixed(2)}</p>
                                            <p>Descuento: {totalDescuento.toFixed(2)}</p>
                                            <p>Base imponible: {baseImponible.toFixed(2)}</p>
                                        </div>

                                        <div>
                                            <p>IVA (15%): {iva.toFixed(2)}</p>
                                            <p>Total a pagar: {totalFinal.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <div className='flex gap-3 items-center'>
                                        <Button
                                            className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                            onClick={() => cancelarFactura()}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                            Cancelar
                                        </Button>

                                        <Button
                                            className={`${productos.length < 2 ? 'hidden' : 'block'} bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 gap-2 border border-gray-100 text-gray-800 flex items-center`}
                                            type='submit'
                                            form='main-form-emitir-factura'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                            Ingresar Factura
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </DialogPanel>

                </div >
            </Dialog >
        </>
    )
}
