'use client'

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { toast } from 'react-toastify';
import { productoStockSchema } from '@/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import { normalizarNumero } from '@/helpers'

export default function ModalCrearProducto() {

    const modalCrearProducto = useMainStore((state) => state.modalCrearProducto)
    const changeModalCrearProducto = useMainStore((state) => state.changeModalCrearProducto)
    const dataUser = useMainStore((state) => state.dataUser)

    const queryClient = useQueryClient();

    const ImpuestosCod = {
        iva1: { codigoUnico: "2", codigo: "IVA" },
        iva2: { codigoUnico: "3", codigo: "ICE" },
        iva3: { codigoUnico: "4", codigo: "IRBPNR" },
        iva3: { codigoUnico: "4", codigo: "IRBPNR" },
    };

    const TarifaIVA = {
        tarifa1: { codigoUnico: "0", codigo: "0%", porcentaje: 0 },
        tarifa2: { codigoUnico: "2", codigo: "12%", porcentaje: 12 },
        tarifa3: { codigoUnico: "3", codigo: "14%", porcentaje: 14 },
        tarifa4: { codigoUnico: "4", codigo: "15%", porcentaje: 15 },
        tarifa5: { codigoUnico: "5", codigo: "5%", porcentaje: 5 },
        tarifa6: { codigoUnico: "6", codigo: "NoObjetoImpuesto", porcentaje: 0 },
        tarifa7: { codigoUnico: "7", codigo: "ExentoIVA", porcentaje: 0 },
        tarifa8: { codigoUnico: "8", codigo: "IVA_Diferenciado", porcentaje: 0 },
        tarifa9: { codigoUnico: "10", codigo: "13%", porcentaje: 13 },
    };

    const handleSubmit = async (formData) => {

        const data = {
            codigo: formData.get('codigo-producto'),
            nombre: formData.get('nombre-producto'),
            descripcion: formData.get('descripcion-producto'),
            cantidad: normalizarNumero(formData.get('cantidad-producto')),
            precioUnitario: normalizarNumero(formData.get('precio-unitario-producto')),
            descuento: normalizarNumero(formData.get('descuento-producto'))
        }

        const result = productoStockSchema.safeParse(data)

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        mutate(formData)

    }

    const crearProducto = async (formData) => {

        const impuesto = ImpuestosCod[formData.get('impuestos')]
        const tarifa = TarifaIVA[formData.get('tarifa')]

        if (!impuesto || !tarifa) {
            throw new Error('Debes seleccionar un impuesto y una tarifa válidos')
        }

        // Normalizar números para aceptar tanto coma como punto, pero siempre enviar punto al backend
        const precioUnitario = normalizarNumero(formData.get('precio-unitario-producto'))
        const descuentoPorcentaje = normalizarNumero(formData.get('descuento-producto')) || 0
        const cantidad = normalizarNumero(formData.get('cantidad-producto'))

        // Validar que los números sean válidos
        if (isNaN(precioUnitario) || precioUnitario <= 0) {
            throw new Error('El precio unitario debe ser un número mayor a cero')
        }
        if (isNaN(cantidad) || cantidad <= 0) {
            throw new Error('La cantidad debe ser un número mayor a cero')
        }
        if (isNaN(descuentoPorcentaje) || descuentoPorcentaje < 0 || descuentoPorcentaje > 100) {
            throw new Error('El descuento debe ser un número entre 0 y 100')
        }

        // Calcular valores del producto
        const descuentoValor = (precioUnitario * descuentoPorcentaje) / 100
        const precioTotalSinImpuesto = precioUnitario - descuentoValor
        const baseImponible = precioTotalSinImpuesto
        const valorImpuesto = (baseImponible * tarifa.porcentaje) / 100

        try {
            if (!dataUser?.tokenAcceso) {
                throw new Error('Debes estar autenticado para crear productos. Por favor, inicia sesión nuevamente.')
            }

            // Debug: mostrar información del token (sin mostrar el token completo por seguridad)
            const tokenPreview = dataUser.tokenAcceso ? `${dataUser.tokenAcceso.substring(0, 20)}...` : 'no-token'
            console.log('Intentando crear producto con token:', tokenPreview)
            console.log('Usuario:', dataUser?.email || dataUser?.nombre || 'desconocido')

            // Validar código de impuesto y código de porcentaje según el esquema del backend
            const codigoImpuesto = impuesto.codigoUnico || '2' // Default a IVA si no está definido
            const codigoPorcentaje = tarifa.codigoUnico || '2' // Default si no está definido

            // Validar que los códigos sean válidos según el esquema Zod del backend
            const codigosImpuestoValidos = ['2', '3', '4']
            const codigosPorcentajeValidos = ['0', '2', '3', '4', '5', '6', '7', '8', '10']
            
            if (!codigosImpuestoValidos.includes(codigoImpuesto)) {
                throw new Error(`Código de impuesto inválido: ${codigoImpuesto}. Debe ser 2 (IVA), 3 (ICE) o 4 (IRBPNR)`)
            }
            
            if (!codigosPorcentajeValidos.includes(codigoPorcentaje)) {
                throw new Error(`Código de porcentaje inválido: ${codigoPorcentaje}`)
            }

            const payload = {
                codigoPrincipal: formData.get('codigo-producto'),
                descripcion: formData.get('descripcion-producto') || formData.get('nombre-producto'),
                cantidad: cantidad,
                precioUnitario: precioUnitario,
                descuento: descuentoPorcentaje,
                precioTotalSinImpuesto: precioTotalSinImpuesto,
                impuestos: [
                    {
                        codigo: codigoImpuesto,
                        codigoPorcentaje: codigoPorcentaje,
                        tarifa: Number(tarifa.porcentaje),
                        baseImponible: baseImponible,
                        valor: valorImpuesto
                    }
                ]
            }

            console.log('Payload a enviar:', { ...payload, impuestos: payload.impuestos })

            const url = `${process.env.NEXT_PUBLIC_URL_BACK}/productos/completo`
            console.log('URL:', url)

            // Usar el endpoint completo que calcula automáticamente los valores
            const { data: dataProducto } = await axios.post(
                url,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${dataUser.tokenAcceso}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            console.log('Producto creado exitosamente:', dataProducto)
            return dataProducto

        } catch (e) {
            console.error('Error al crear producto:', e);
            
            // Log detallado del error
            if (e?.response) {
                console.error('Status:', e.response.status)
                console.error('Status Text:', e.response.statusText)
                console.error('Response Data:', e.response.data)
                console.error('Headers enviados:', e.config?.headers)
                
                // Si es 403, puede ser que el usuario no tenga permisos o el token esté expirado
                if (e?.response?.status === 403) {
                    const mensajeBackend = e?.response?.data?.message || e?.response?.data?.mensaje || 'Acceso denegado'
                    console.error(`❌ 403 Forbidden al crear producto: ${mensajeBackend}`)
                    console.warn('Posibles causas:')
                    console.warn('1. El usuario no tiene permisos para crear productos')
                    console.warn('2. El token está expirado o inválido')
                    console.warn('3. El rol del usuario no permite crear productos')
                    console.warn('Verifica en el backend:')
                    console.warn('- Permisos del rol del usuario')
                    console.warn('- Configuración del middleware de autenticación')
                    console.warn('- Validez del token JWT')
                }
                
                // Si es 401, el token está expirado o es inválido
                if (e?.response?.status === 401) {
                    console.error('❌ 401 Unauthorized: Token inválido o expirado. Es necesario cerrar sesión y volver a iniciar sesión.')
                }
            } else if (e?.request) {
                console.error('No se recibió respuesta del servidor:', e.request)
            } else {
                console.error('Error configurando la petición:', e.message)
            }
            
            // Extraer mensaje de error más detallado
            let mensajeError = 'Error al crear el producto'
            
            if (e?.response?.status === 403) {
                mensajeError = e?.response?.data?.message || e?.response?.data?.mensaje || 'No tienes permisos para crear productos. Verifica tus permisos con el administrador.'
                // Limpiar emojis del mensaje
                mensajeError = mensajeError.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim()
            } else if (e?.response?.status === 401) {
                mensajeError = 'Tu sesión ha expirado. Por favor, cierra sesión e inicia sesión nuevamente.'
            } else if (e?.response?.data) {
                // Si hay errores de validación del backend (Zod)
                if (e.response.data.errors) {
                    const errores = Object.entries(e.response.data.errors)
                        .map(([campo, mensaje]) => `${campo}: ${Array.isArray(mensaje) ? mensaje[0] : mensaje}`)
                        .join(', ')
                    mensajeError = `Error de validación: ${errores}`
                } else if (e.response.data.mensaje) {
                    mensajeError = e.response.data.mensaje.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim()
                } else if (e.response.data.message) {
                    mensajeError = e.response.data.message.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim()
                } else if (e.response.data.error) {
                    mensajeError = String(e.response.data.error)
                }
            } else if (e.message) {
                mensajeError = e.message
            }
            
            throw new Error(mensajeError);
        }
    };

    const { mutate } = useMutation({
        mutationFn: crearProducto, // Funcion a consultar
        onSuccess: (dataFactura) => { // Petición exitosa

            toast.success(dataFactura.message.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim() || dataFactura.mensaje || 'Producto creado correctamente')
            queryClient.invalidateQueries({ queryKey: ['productos'] }); // Traer los datos actualizados
            queryClient.invalidateQueries({ queryKey: ['crear_producto'] }); // Mantener compatibilidad
            changeModalCrearProducto()

        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return (
        <>
            <Dialog open={modalCrearProducto} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[95%] md:w-[30%] max-w-md md:max-w-none h-[85vh] md:h-[90%] max-h-[90vh] space-y-2 md:space-y-4 px-3 md:px-8 py-3 md:py-6 rounded-2xl md:rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2]">

                        <div className='flex h-full flex-col justify-between gap-2 md:gap-0'>
                            <form
                                action={handleSubmit}
                                className='overflow-y-auto h-full barra pr-2 md:pr-8 flex-1'
                                id='form-crear-producto-stock'
                            >

                                <DialogTitle className="font-semibold text-base md:text-xl text-center w-full uppercase mb-2 md:mb-0">
                                    Crear Producto
                                </DialogTitle>

                                <h2 className='my-2 md:my-5 text-base md:text-xl flex gap-2 items-center'>

                                    <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-gray-200 text-gray-800">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                        </svg>
                                    </span>

                                    Datos
                                </h2>

                                <div className='flex flex-col gap-3 md:gap-5'>

                                    <div className='flex flex-col'>
                                        <label htmlFor="codigo-producto" className='mb-1 text-xs md:text-base'>Código</label>
                                        <input
                                            id='codigo-producto'
                                            type="text"
                                            name='codigo-producto'
                                            className='outline-none bg-[#2e4760] rounded-lg px-2 md:px-3 py-1.5 md:py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base'
                                            placeholder='Ej: EDJN-ASDFA'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="nombre-producto" className='mb-1 text-xs md:text-base'>Nombre</label>
                                        <input
                                            id='nombre-producto'
                                            type="text"
                                            name='nombre-producto'
                                            className='outline-none bg-[#2e4760] rounded-lg px-2 md:px-3 py-1.5 md:py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base'
                                            placeholder='Ej: Pantalones Jeans'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="descripcion-producto" className='mb-1 text-xs md:text-base'>Descripción</label>
                                        <input
                                            id='descripcion-producto'
                                            type="text"
                                            name='descripcion-producto'
                                            className='outline-none bg-[#2e4760] rounded-lg px-2 md:px-3 py-1.5 md:py-1 border border-[#2e4760] focus:border-gray-300 text-sm md:text-base'
                                            placeholder='Ej: Pantalones Jeans para Hombre, talla XL'
                                        />
                                    </div>

                                    <div className='flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3 w-full'>

                                        <div className='flex flex-col flex-1'>
                                            <label htmlFor="cantidad-producto" className='mb-1 text-xs md:text-base'>Cantidad</label>
                                            <input
                                                id='cantidad-producto'
                                                type="text"
                                                name='cantidad-producto'
                                                className='outline-none bg-[#2e4760] rounded-lg px-2 md:px-3 py-1.5 md:py-1 border border-[#2e4760] focus:border-gray-300 w-full text-sm md:text-base'
                                                placeholder='Ej: 24'
                                                min={1}
                                            />
                                        </div>

                                        <div className='flex flex-col flex-1'>
                                            <label htmlFor="precio-unitario-producto" className='mb-1 text-xs md:text-base'>Precio Unit.</label>
                                            <input
                                                id='precio-unitario-producto'
                                                type="text"
                                                name='precio-unitario-producto'
                                                className='outline-none bg-[#2e4760] rounded-lg px-2 md:px-3 py-1.5 md:py-1 border border-[#2e4760] focus:border-gray-300 w-full text-sm md:text-base'
                                                placeholder='Ej: 22.51'
                                            />
                                        </div>

                                        <div className='flex flex-col flex-1'>
                                            <label htmlFor="descuento-producto" className='mb-1 text-xs md:text-base'>Descuento {'(%)'}</label>
                                            <input
                                                id='descuento-producto'
                                                type="text"
                                                name='descuento-producto'
                                                className='outline-none bg-[#2e4760] rounded-lg px-2 md:px-3 py-1.5 md:py-1 border border-[#2e4760] focus:border-gray-300 w-full text-sm md:text-base'
                                                placeholder='5'
                                            />
                                        </div>
                                    </div>


                                    <div className='flex flex-col md:flex-row gap-2 md:gap-5 w-full'>
                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="impuestos" className='mb-1 text-xs md:text-base'>Impuesto</label>

                                            <select
                                                id="impuestos"
                                                name="impuestos"
                                                className='outline-none bg-[#2e4760] rounded-lg px-2 md:px-3 py-1.5 md:py-1 border border-[#2e4760] focus:border-gray-300 w-full text-sm md:text-base'
                                                defaultValue="iva1"
                                            >
                                                <option value="iva1">IVA</option>
                                                <option value="iva2">ICE</option>
                                                <option value="iva3">IRBPNR</option>
                                                <option value="iva4">IEPS</option>
                                            </select>
                                        </div>

                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="tarifa" className='mb-1 text-xs md:text-base'>Tarifa</label>

                                            <select
                                                id="tarifa"
                                                name="tarifa"
                                                className='outline-none bg-[#2e4760] rounded-lg px-2 md:px-3 py-1.5 md:py-1 border border-[#2e4760] focus:border-gray-300 w-full text-sm md:text-base'
                                                defaultValue="tarifa4"
                                            >
                                                <option value="tarifa1">0%</option>
                                                <option value="tarifa2">12%</option>
                                                <option value="tarifa3">14%</option>
                                                <option value="tarifa4">15%</option>
                                                <option value="tarifa5">5%</option>
                                                <option value="tarifa6">0%</option>
                                                <option value="tarifa7">No Objeto Impuesto</option>
                                                <option value="tarifa8">Exento IVA</option>
                                                <option value="tarifa9">13%</option>
                                            </select>
                                        </div>
                                    </div>


                                </div>
                            </form>

                            <div className='border-t border-t-[#486b8f] flex flex-col md:flex-row gap-2 md:gap-3 items-stretch md:items-center justify-end md:justify-end pt-2 md:pt-5 mt-auto'>
                                <Button
                                    className="w-full md:w-auto min-w-[120px] md:min-w-0 font-semibold text-sm md:text-base text-gray-100 cursor-pointer rounded-lg md:rounded-xl transition-colors px-4 py-3 md:py-1.5 border border-gray-100 flex flex-row gap-2 items-center justify-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                    onClick={() => {
                                        changeModalCrearProducto()
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 md:size-5 flex-shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    <span>Cancelar</span>
                                </Button>

                                <Button
                                    className="w-full md:w-auto min-w-[120px] md:min-w-0 bg-gray-100 font-semibold text-sm md:text-base cursor-pointer rounded-lg md:rounded-xl px-4 py-3 md:py-1.5 border border-gray-100 text-gray-800 flex flex-row items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                                    type='submit'
                                    form='form-crear-producto-stock'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 md:size-5 flex-shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    <span className="text-center">Crear Producto</span>
                                </Button>
                            </div>
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
