'use client'

import { useEffect, useMemo, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { facturaSchema } from '@/schema'
import { toast } from 'react-toastify';
import { AgregarProducto } from '../emitir_facturas_componentes/AgregarProducto'
import { consultarFechaEcuador } from '@/helpers'
import axios from 'axios'

export default function ModalEmitirFactura() {

    const modalCrearNotificacion = useMainStore((state) => state.modalCrearNotificacion)
    const changeModalCrearNotificacion = useMainStore((state) => state.changeModalCrearNotificacion)
    const formulariosFactura = useMainStore((state) => state.formulariosFactura)
    const crearFormProducto = useMainStore((state) => state.crearFormProducto)
    const setFormulariosFactura = useMainStore((state) => state.setFormulariosFactura)
    const productos = useMainStore((state) => state.productos)
    const setProductos = useMainStore((state) => state.setProductos)

    const [botonMas, setBotonMas] = useState(true)
    const [fechaEcuador, setFechaEcuador] = useState({})

    // infoTributaria
    const [ambiente, setAmbiente] = useState('')
    const [tipoEmision, setTipoEmision] = useState('')
    const [razonSocial, setRazonSocial] = useState('')
    const [nombreComercial, setNombreComercial] = useState('')
    const [ruc, setruc] = useState('')
    const [claveAcceso, setClaveAcceso] = useState('')
    const [codDoc, setCodDoc] = useState('')
    const [estab, setEstab] = useState('')
    const [ptoEmi, setPtoEmi] = useState('')
    const [secuencial, setSecuencial] = useState('')
    const [dirMatriz, setDirMatriz] = useState('')

    // infoFactura
    const [fechaEmision, setFechaEmision] = useState('')
    const [dirEstablecimiento, setDirEstablecimiento] = useState('')
    const [obligadoContabilidad, setObligadoContabilidad] = useState('')
    const [tipoIdentificacionComprador, setTipoIdentificacionComprador] = useState('')
    const [razonSocialComprador, setRazonSocialComprador] = useState('')
    const [identificacionComprador, setiIdentificacionComprador] = useState('')
    const [totalSinImpuestos, setTotalSinImpuestos] = useState('')
    const [totalDescuento, setTotalDescuento] = useState('')
    const [propina, setPropina] = useState('')
    const [importeTotal, setImporteTotal] = useState('')
    const [moneda, setMoneda] = useState('')
    // pagos - pago
    const [formaPago, setFormaPago] = useState('')
    const [total, setTotal] = useState('')
    const [plazo, setPlazo] = useState('')
    const [unidadTiempo, setUnidadTiempo] = useState('')

    const mostrarFormProducto = () => {
        crearFormProducto({ id: 'empty' })
        setBotonMas(false)
    }

    const emitirFactura = async (formData) => {





        // 2. Extraigo el ID del CUERPO
        const productosFormateados = productos
            .filter(producto => producto.id !== "empty")
            .map(({ id, ...prducto }) => prducto);

        // return

        const data = {
            ambiente: "Pruebas", // Cambiado a "Pruebas" o "Produccion" según el diccionario CodigoAmbiente
            tipoEmision: "EmisionNormal", // Cambiado a un valor que coincida con las claves de TipoEmision
            razonSocial: "ORTIZ MENDOZA ERICK ALEXANDER", // formData.get('razon-social')
            ruc: formData.get('ruc'),
            codDoc: "Factura", // Cambiado a un valor que coincida con las claves de CodigoTipoComprobante
            estab: "001",
            ptoEmi: "001",
            // secuencial: "000000001",
            dirMatriz: formData.get('matriz'),
            dirEstablecimiento: formData.get('direccion'),
            obligadoContabilidad: "NO",
            tipoIdentificacionComprador: "RUC", // Cambiado a un valor que coincida con las claves de TipoIdentificacion
            razonSocialComprador: `${formData.get('nombres-cliente')} ${formData.get('apellidos-cliente')}`,
            identificacionComprador: formData.get('identificacion-cliente'),
            direccionComprador: formData.get('direccion-comprador'),
            totalSinImpuestos: 0.00,
            totalDescuento: 0.00,
            totalConImpuestos: [
                {
                    codigo: "IVA", // Cambiado a un valor que coincida con las claves de ImpuestosCod
                    codigoPorcentaje: "15%", // Cambiado a un valor que coincida con las claves de TarifaIVA
                    baseImponible: 100.00,
                    tarifa: 15,
                    valor: 15.00,
                    valorDevolucionIva: 0.00
                }
            ],
            propina: 0.00,
            importeTotal: 0.00,
            moneda: "DOLAR",
            pagos: [{
                formaPago: "Efectivo", // Cambiado a un valor que coincida con las claves de FormasPago
                total: 0.00,
            }],
            detalles: productosFormateados
        }

        console.log(data);


        // const result = facturaSchema.safeParse(data)

        // if (!result.success) {

        //     result.error.issues.forEach((issue) => {
        //         toast.error(issue.message)
        //     })
        //     return
        // }

        try {
            const { data: dataFactura } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/crearXML`, {
                ambiente: "Pruebas",
                tipoEmision: "EmisionNormal", // Cambiado a un valor que coincida con las claves de TipoEmision
                razonSocial: "ORTIZ MENDOZA ERICK ALEXANDER", // formData.get('razon-social')
                ruc: formData.get('ruc'),
                codDoc: "Factura", // Cambiado a un valor que coincida con las claves de CodigoTipoComprobante
                estab: "001",
                ptoEmi: "001",
                dirMatriz: formData.get('matriz'),
                dirEstablecimiento: formData.get('direccion'),
                obligadoContabilidad: "NO",
                tipoIdentificacionComprador: "RUC", // Cambiado a un valor que coincida con las claves de TipoIdentificacion
                razonSocialComprador: `${formData.get('nombres-cliente')} ${formData.get('apellidos-cliente')}`,
                identificacionComprador: formData.get('identificacion-cliente'),
                direccionComprador: formData.get('direccion-comprador'),
                totalSinImpuestos: 100.00,
                totalDescuento: 0.00,
                totalConImpuestos: [
                    {
                        codigo: "IVA", // Cambiado a un valor que coincida con las claves de ImpuestosCod
                        codigoPorcentaje: "15%", // Cambiado a un valor que coincida con las claves de TarifaIVA
                        baseImponible: 100.00,
                        tarifa: 15,
                        valor: 15.00,
                        valorDevolucionIva: 0.00
                    }
                ],
                propina: 0.00,
                importeTotal: 115.00,
                moneda: "DOLAR",
                pagos: [{
                    formaPago: "Efectivo", // Cambiado a un valor que coincida con las claves de FormasPago
                    total: 115.00
                }],
                detalles: productosFormateados
            })

            console.log(dataFactura);
            toast.success(`${dataFactura.message}`)
            changeModalCrearNotificacion()


        } catch (e) {
            // toast.error(e.response.data.message);
            toast.error('Error')
            console.log(e);

        }
    };

    const totalFactura = useMemo(() => productos.reduce((total, p) => total + (Number(p?.precioUnitario) || Number(p?.precioUnitario) || 0), 0), [productos])

    useEffect(() => {
        setFechaEcuador(consultarFechaEcuador())
    }, [])


    return (
        <>
            <Dialog open={modalCrearNotificacion} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 main-background">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[100%] md:w-[75%] h-[95%] space-y-4 px-8 py-6 rounded-3xl bg-gradient-to-b from-[#153350]/60 to-[#1f3850]/60">

                        <div className='flex h-full flex-col justify-between'>
                            <form
                                action={emitirFactura}
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

                                <div className='flex gap-5'>

                                    <div className='flex flex-col'>
                                        <label htmlFor="razon-social" className='mb-1'>Nombre de Empresa</label>
                                        <input
                                            id='razon-social'
                                            type="text"
                                            name='razon-social'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Gran Akí'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="ruc" className='mb-1'>Ruc</label>
                                        <input
                                            id='ruc'
                                            type="text"
                                            name='ruc'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: 1750851956001'
                                            maxLength={13}
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="matriz" className='mb-1'>Matriz</label>
                                        <input
                                            id='matriz'
                                            type="text"
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
                                            name='direccion'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Av. Rio Amazonas'
                                        />
                                    </div>
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
                                        <div className='flex flex-col'>
                                            <label htmlFor="nombres-cliente" className='mb-1'>Nombres</label>
                                            <input
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
                                                id='apellidos-cliente'
                                                type="text"
                                                name='apellidos-cliente'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                placeholder='Ej: Velez Zambrano'
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <label htmlFor="identificacion-cliente" className='mb-1'>Identificación</label>
                                            <input
                                                id='identificacion-cliente'
                                                type="text"
                                                name='identificacion-cliente'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                placeholder='Ej: 1750851956'
                                                minLength={13}
                                                maxLength={13}
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <label htmlFor="direccion-comprador" className='mb-1'>Dirección</label>
                                            <input
                                                id='direccion-comprador'
                                                type="text"
                                                name='direccion-comprador'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                                placeholder='Ej: La Planada'
                                            />
                                        </div>
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
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </span>

                                    Artículos

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
                                    formulariosFactura.length ? (
                                        formulariosFactura?.map(id => (
                                            <AgregarProducto
                                                key={id}
                                                id={id}
                                            />
                                        ))
                                    ) : null
                                }
                            </form>

                            <form className='border-t border-t-[#486b8f]'>
                                <div className='flex justify-between gap-5 items-center mt-5'>

                                    <p className='font-semibold text-gray-800 text-xl bg-gray-100 rounded-xl px-3 py-1'>
                                        Total a Pagar: $ {totalFactura}
                                    </p>

                                    <div className='flex gap-3 items-center'>
                                        <Button
                                            className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                            onClick={() => {
                                                setFormulariosFactura([])
                                                setProductos([])
                                                setBotonMas(true)
                                                changeModalCrearNotificacion()
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                            Cancelar
                                        </Button>

                                        <Button
                                            className={`${productos.length < 2 ? 'hidden' : 'block'} bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 border border-gray-100 text-gray-800 flex items-center`}
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

                </div>
            </Dialog>
        </>
    )
}
