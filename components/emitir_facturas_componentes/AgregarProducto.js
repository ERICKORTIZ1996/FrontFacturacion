import { useState } from "react";
import { useMainStore } from "@/store/mainStore";
import { toast } from 'react-toastify';
import { productoSchema } from "@/schema";
import Swal from 'sweetalert2';

export const AgregarProducto = ({ id }) => {

    const crearFormProducto = useMainStore((state) => state.crearFormProducto)
    const editar = useMainStore((state) => state.editar)
    const setEditar = useMainStore((state) => state.setEditar)
    const formulariosFactura = useMainStore((state) => state.formulariosFactura)
    const setFormulariosFactura = useMainStore((state) => state.setFormulariosFactura)
    const productos = useMainStore((state) => state.productos)
    const setProductos = useMainStore((state) => state.setProductos)

    const [agrePro, setAgrePro] = useState(false)
    const [editarPro, setEditarPro] = useState(false)
    const [resultadoProductos, setResultadoProductos] = useState([])
    const [ventanaResultadoProductos, setventanaResultadoProductos] = useState(false)
    const isEditable = !(editar || agrePro) || editarPro;

    const [detalle, setDetalle] = useState({
        codigoPrincipal: '',
        descripcion: '',
        cantidadProducto: 0,
        precioUnitario: 0,
        descuento: 0,
        precioTotalSinImpuesto: 0,
        codigo: 0,
        codigoPorcentaje: 0,
        tarifa: 0,
        baseImponible: 0,
        valor: 0,
    })

    const subtotal = detalle.cantidadProducto * detalle.precioUnitario;
    const total = subtotal - (subtotal * detalle.descuento) / 100;

    const construirYValidarProducto = () => {

        const data = {
            codigoPrincipal: detalle.codigoPrincipal,
            descripcion: detalle.descripcion,
            cantidad: Number(detalle.cantidadProducto),
            precioUnitario: Number(detalle.precioUnitario),
            descuento: Number(detalle.descuento),
            precioTotalSinImpuesto: Number(detalle.precioTotalSinImpuesto),
            impuestos: [{
                codigo: detalle.codigo,
                codigoPorcentaje: detalle.codigoPorcentaje,
                tarifa: detalle.tarifa,
                baseImponible: detalle.baseImponible,
                valor: detalle.valor
            }]
        }

        const result = productoSchema.safeParse(data)

        if (!result.success) {
            result.error.issues.forEach(issue => toast.error(issue.message))
            return;
        }

        return data;
    }

    const emitirProducto = async () => {

        const productoValido = construirYValidarProducto();
        if (!productoValido) return;
        crearFormProducto({ id, ...productoValido })
        setAgrePro(true) // Desabilita el icono de (+)
    }

    const editarProducto = async () => {

        const productoValido = construirYValidarProducto();
        if (!productoValido) return;

        const nuevoPro = productos.map(p => p.id === id ? { ...p, ...productoValido } : p);

        setProductos(nuevoPro);
        setAgrePro(true)
        setEditarPro(false)
        setEditar(false)
    }

    const eliminarFormStock = async (idForm) => {

        Swal.fire({
            title: '¿Estas seguro de eliminar este artículo?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            icon: "info",
            customClass: {
                confirmButton: 'mi-boton-ok',
                title: 'mi-titulo',
                denyButton: 'mi-boton-cancel',
                popup: 'mi-popup',
                icon: 'mi-icono'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {

                const nuevoFormFact = formulariosFactura.filter(fp => fp !== idForm)
                const nuevoPro = productos.filter(p => p.id !== idForm)

                setFormulariosFactura(nuevoFormFact)
                setProductos(nuevoPro)

            } else if (result.isDenied) {
                return
            }
        })

    }

    const productosExample = [
        {
            codigoPrincipal: "001",
            descripcion: "Pantalones",
            cantidad: 5,
            precioUnitario: 10.52,
            descuento: 20,
            precioTotalSinImpuesto: 10.52,
            impuestos: [{
                codigo: "IVA", // Cambiado a un valor que coincida con las claves de ImpuestosCod
                codigoPorcentaje: "15%", // Cambiado a un valor que coincida con las claves de TarifaIVA
                tarifa: 15,
                baseImponible: 10.52,
                valor: (10.52 * 0.15)
            }]
        },
        {
            codigoPrincipal: "002",
            descripcion: "Camisetas",
            cantidad: 2,
            precioUnitario: 5.52,
            descuento: 0,
            precioTotalSinImpuesto: 5.52,
            impuestos: [{
                codigo: "IVA", // Cambiado a un valor que coincida con las claves de ImpuestosCod
                codigoPorcentaje: "15%", // Cambiado a un valor que coincida con las claves de TarifaIVA
                tarifa: 15,
                baseImponible: 5.52,
                valor: (5.52 * 0.15)
            }]
        }
    ]

    const verificarProducto = (value) => {
        setResultadoProductos(productosExample.filter(p => p.descripcion.toLowerCase().includes(value)))
    }

    const llenarInputsArticulo = (articulo) => {

        setDetalle(prev => ({
            ...prev,
            codigoPrincipal: articulo.codigoPrincipal,
            descripcion: articulo.descripcion,
            // cantidadProducto -> Se maneja en otro lado
            precioUnitario: articulo.precioUnitario,
            descuento: articulo.descuento,
            precioTotalSinImpuesto: articulo.precioTotalSinImpuesto,
            codigo: articulo.impuestos[0].codigo,
            codigoPorcentaje: articulo.impuestos[0].codigoPorcentaje,
            tarifa: articulo.impuestos[0].tarifa,
            baseImponible: articulo.impuestos[0].baseImponible,
            valor: articulo.impuestos[0].valor,
        }));
    }

    return (
        <div
            className={`flex flex-col gap-3 md:flex-row md:items-end md:gap-10 mt-4 border-b pb-5 border-b-[#486b8f] last-of-type:border-none ${agrePro ? !editarPro ? 'opacity-70' : '' : ''} ${editar ? !agrePro ? 'opacity-70' : '' : ''}`}
        >
            <div className='flex gap-3 relative'>
                <div className='flex flex-col'>
                    <label htmlFor={`descripcion-producto-${id}`} className='mb-1'>Descripción</label>
                    <input
                        id={`descripcion-producto-${id}`}
                        type="text"
                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 disabled:cursor-not-allowed'
                        placeholder='Ej: Pantalones baqueros gris'
                        value={detalle.descripcion}
                        onChange={(e) => {
                            setDetalle(prev => ({ ...prev, descripcion: e.target.value }));
                            verificarProducto(e.target.value);
                        }}
                        disabled={!isEditable}
                        onFocus={() => setventanaResultadoProductos(true)}
                        onBlur={() => {
                            setTimeout(() => setventanaResultadoProductos(false), 100);
                        }}
                        autoComplete="off"
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor={`canatidad-producto-${id}`} className='mb-1'>Cantidad</label>
                    <input
                        id={`canatidad-producto-${id}`}
                        type="text"
                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-24 disabled:cursor-not-allowed'
                        placeholder='Ej: 2'
                        onChange={(e) =>
                            setDetalle(prev => ({
                                ...prev,
                                cantidadProducto: e.target.value
                            }))
                        }
                        disabled={!isEditable}
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor={`precio-unitario-${id}`} className='mb-1'>Precio Unitario - Sin IVA</label>
                    <input
                        id={`precio-unitario-${id}`}
                        type="text"
                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-24 disabled:cursor-not-allowed'
                        placeholder='Ej: 22.50'
                        value={detalle.precioUnitario}
                        disabled
                        readOnly
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor={`descuento-${id}`} className='mb-1'>Descuento</label>
                    <input
                        id={`descuento-${id}`}
                        type="text"
                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-20 disabled:cursor-not-allowed'
                        placeholder='Ej: 5%'
                        value={detalle.descuento}
                        disabled
                        readOnly
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor={`total-${id}`} className='mb-1'>Total - Con IVA</label>
                    <input
                        id={`total-${id}`}
                        type="text"
                        className='outline-none bg-[#2e4760] rounded-lg px-3 py-1 border border-[#2e4760] focus:border-gray-300 w-24 disabled:cursor-not-allowed'
                        placeholder='Ej: 23.00'
                        value={total.toString()}
                        disabled
                        readOnly
                    />
                </div>

                {ventanaResultadoProductos && resultadoProductos?.length > 0 && (
                    <div className="bg-gradient-to-t from-[#102940] to-[#182a3b] w-full h-40 absolute rounded-xl p-2 bottom-[110%] text-gray-200">
                        <ul className="overflow-auto barra h-full w-full">
                            {resultadoProductos.map((p) => (
                                <li
                                    key={p.codigoPrincipal}
                                    className="text-nowrap px-3 py-1 hover:bg-[#2e4760] cursor-pointer rounded-lg w-full transition-colors"
                                    onClick={() => llenarInputsArticulo(p)}
                                >
                                    <span className='font-bold'>ITEM:</span> {p.descripcion} - <span className='font-bold'>CÓDIGO:</span> {p.codigoPrincipal} - <span className='font-bold'>DESCUENTO:</span> {p.descuento}%
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>

            <div className="flex gap-2 items-center md:mt-8 lg:mt-0">

                {/* Crear  */}
                <button
                    type="button"
                    className={`bg-white text-gray-800 hover:bg-green-500 border border-gray-200 px-3 py-1 flex items-center rounded-full cursor-pointer p-2 hover:border-green-500 hover:text-gray-200 transition-colors disabled:cursor-not-allowed ${agrePro ? 'hidden' : 'block'} ${editarPro ? 'hidden' : ''}`}
                    onClick={emitirProducto}
                    disabled={editar}
                >

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Agregar Artículo
                </button>

                {/* Editar */}
                <button
                    type="button"
                    className={`border border-gray-200 bg-gray-200 text-gray-800 transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-gray-200 px-2 cursor-pointer rounded-full p-2 ${editarPro ? 'block' : 'hidden'}`}
                    onClick={editarProducto}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>

                </button>

                {/* Editar Icono*/}
                <button
                    type="button"
                    className={`${agrePro ? 'block' : 'hidden'} ${editarPro ? 'hidden' : 'block'} bg-gray-200 border border-gray-200 hover:border-orange-500 transition-colors hover:bg-orange-500 px-2 rounded-full p-2 cursor-pointer text-gray-800 hover:text-gray-200 disabled:cursor-not-allowed`}
                    onClick={() => {
                        setEditarPro(true)
                        setEditar(true)
                    }}
                    disabled={editar}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                </button>

                {/* Eliminar */}
                {agrePro &&
                    <button
                        type="button"
                        className="border bg-transparent border-gray-200 text-gray-200 hover:bg-red-500 hover:border-red-500 px-2 rounded-full p-2 cursor-pointer transition-colors disabled:cursor-not-allowed"
                        onClick={() => eliminarFormStock(id)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                    </button>
                }
            </div>
        </div>
    )
}
