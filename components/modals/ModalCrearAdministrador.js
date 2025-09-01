'use client'

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { useMainStore } from '@/store/mainStore'
import { toast } from 'react-toastify';
import { productoStockSchema } from '@/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'

export default function ModalCrearAdministrador() {

    const modalCrearAdministrador = useMainStore((state) => state.modalCrearAdministrador)
    const changeModalCrearAdministrador = useMainStore((state) => state.changeModalCrearAdministrador)

    const queryClient = useQueryClient();

    const handleSubmit = async (formData) => {

        const data = {
            codigo: formData.get('codigo-producto'),
            nombre: formData.get('nombre-producto'),
            descripcion: formData.get('descripcion-producto'),
            cantidad: Number(formData.get('cantidad-producto')),
            precioUnitario: Number(formData.get('precio-unitario-producto')),
            descuento: Number(formData.get('descuento-producto'))
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

        try {
            const { data: dataProducto } = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/productos`, {
                codigo: formData.get('codigo-producto'),
                nombre: formData.get('nombre-producto'),
                descripcion: formData.get('descripcion-producto'),
                precio: Number(formData.get('precio-unitario-producto')),
                stock: Number(formData.get('cantidad-producto')),
                descuento: Number(formData.get('descuento-producto')),
                descuentoValor: (Number(formData.get('precio-unitario-producto')) * Number(formData.get('descuento-producto'))) / 100,
                impuestos: [
                    {
                        codigo: impuesto.codigo,
                        codigoPorcentaje: tarifa.codigo,
                        tarifa: Number(tarifa.porcentaje),
                        activo: true
                    }
                ]
            })

            return dataProducto

        } catch (e) {
            console.log(e);
            throw new Error(e?.response?.data?.mensaje || e?.response?.data?.message?.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim());
        }
    };

    const { mutate } = useMutation({
        mutationFn: crearProducto, // Funcion a consultar
        onSuccess: (dataFactura) => { // Petición exitosa

            toast.success(dataFactura.message.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')?.trim())
            queryClient.invalidateQueries({ queryKey: ['crear_producto'] }); // Traer los datos actualizados
            changeModalCrearAdministrador()

        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return (
        <>
            <Dialog open={modalCrearAdministrador} onClose={() => { }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/40 modal-background">

                    {/* shadow shadow-[#245e95] */}
                    <DialogPanel className="w-[100%] md:w-[30%] h-[90%] space-y-4 px-8 py-6 rounded-3xl bg-gradient-to-b from-[#153350]/90 to-[#1f3850]/90 backdrop-blur-sm shadow shadow-[#166fc2]">

                        <div className='flex h-full flex-col justify-between'>
                            <form
                                action={handleSubmit}
                                className='overflow-y-auto h-full barra pr-8'
                                id='form-crear-producto-stock'
                            >

                                <DialogTitle className="font-semibold text-xl text-center w-full uppercase">
                                    Crear Administrador
                                </DialogTitle>

                                <h2 className='my-5 text-xl flex gap-2 items-center'>

                                    <span className='bg-gray-200 rounded-full p-1 text-gray-800'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-gray-200 text-gray-800">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                        </svg>
                                    </span>

                                    Datos
                                </h2>

                                <div className='flex flex-col gap-5'>

                                    <div className='flex flex-col'>
                                        <label htmlFor="codigo-producto" className='mb-1'>Código</label>
                                        <input
                                            id='codigo-producto'
                                            type="text"
                                            name='codigo-producto'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: EDJN-ASDFA'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="nombre-producto" className='mb-1'>Nombre</label>
                                        <input
                                            id='nombre-producto'
                                            type="text"
                                            name='nombre-producto'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Pantalones Jeans'
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="descripcion-producto" className='mb-1'>Descripción</label>
                                        <input
                                            id='descripcion-producto'
                                            type="text"
                                            name='descripcion-producto'
                                            className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300'
                                            placeholder='Ej: Pantalones Jeans para Hombre, talla XL'
                                        />
                                    </div>

                                    <div className='flex items-center gap-3 w-full'>

                                        <div className='flex flex-col'>
                                            <label htmlFor="cantidad-producto" className='mb-1'>Cantidad</label>
                                            <input
                                                id='cantidad-producto'
                                                type="text"
                                                name='cantidad-producto'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                                placeholder='Ej: 24'
                                                min={1}
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <label htmlFor="precio-unitario-producto" className='mb-1'>Precio Unitario</label>
                                            <input
                                                id='precio-unitario-producto'
                                                type="text"
                                                name='precio-unitario-producto'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                                placeholder='Ej: 22.51'
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <label htmlFor="descuento-producto" className='mb-1'>Descuento {'(%)'}</label>
                                            <input
                                                id='descuento-producto'
                                                type="text"
                                                name='descuento-producto'
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                                placeholder='5'
                                            />
                                        </div>
                                    </div>


                                    <div className='flex gap-5 w-full'>
                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="impuestos" className='mb-1'>Impuesto</label>

                                            <select
                                                id="impuestos"
                                                name="impuestos"
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
                                                defaultValue="iva1"
                                            >
                                                <option value="iva1">IVA</option>
                                                <option value="iva2">ICE</option>
                                                <option value="iva3">IRBPNR</option>
                                                <option value="iva4">IEPS</option>
                                            </select>
                                        </div>

                                        <div className='flex-1 flex flex-col'>

                                            <label htmlFor="tarifa" className='mb-1'>Tarifa</label>

                                            <select
                                                id="tarifa"
                                                name="tarifa"
                                                className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-full'
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

                            <form className='border-t border-t-[#486b8f] flex gap-3 items-center justify-end pt-5'>
                                <Button
                                    className="font-semibold text-gray-100 cursor-pointer rounded-xl transition-colors px-4 py-1 border border-gray-100 flex gap-2 items-center hover:bg-[#d24148] hover:text-gray-200 hover:border-[#d24148]"
                                    onClick={() => {
                                        changeModalCrearAdministrador()
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    Cancelar
                                </Button>

                                <Button
                                    className={`bg-gray-100 font-semibold cursor-pointer rounded-xl px-4 py-1 border border-gray-100 text-gray-800 flex items-center`}
                                    type='submit'
                                    form='form-crear-producto-stock'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    Crear Producto
                                </Button>
                            </form>
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>
        </>
    )
}
