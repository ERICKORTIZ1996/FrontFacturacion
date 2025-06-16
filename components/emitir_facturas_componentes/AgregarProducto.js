import { useEffect, useState } from "react";
import { useMainStore } from "@/store/mainStore";
// import Modal from 'react-modal';
import axios from "axios";
// import Swal from 'sweetalert2'
// import Decimal from 'decimal.js';

// const customStyles = {
//     overlay: {
//         backgroundColor: 'rgba(6, 6, 6, 0.45)',
//         height: '100vh',
//         width: '100vw',
//         zIndex: '21'
//     },
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//         background: '#fff',
//         padding: '0',
//         maxWidth: '90%',
//         maxHeight: '90%',
//         overflow: 'hidden',
//         overflow: 'auto',
//     },
// };

// Modal.setAppElement('#__next');

export const AgregarProducto = ({ id }) => {

    const crearFormProducto = useMainStore((state) => state.crearFormProducto)
    const editar = useMainStore((state) => state.editar)
    const facturaState = useMainStore((state) => state.facturaState)
    const formulariosFactura = useMainStore((state) => state.formulariosFactura)
    const setFormulariosFactura = useMainStore((state) => state.setFormulariosFactura)
    const productos = useMainStore((state) => state.productos)
    const setProductos = useMainStore((state) => state.setProductos)

    const [descripcionProducto, setDescripcionProducto] = useState('')
    const [cantidadProducto, setCantidadProducto] = useState(0)
    const [descuento, setDescuento] = useState(0)
    const [total, setTotal] = useState(0)
    const [agrePro, setAgrePro] = useState(false)
    const [editarPro, setEditarPro] = useState(false)
    const [alerta, setAlerta] = useState(false);
    const [idCuerpoFactura, setIdCuerpoFactura] = useState('')
    const [idStockTemp, setIdStockTemp] = useState('')
    const [productoState, setProductoState] = useState({})
    const [cantidadProductoTemp, setCantidadProductoTemp] = useState(0)


    const [first, setFirst] = useState("")

    // const { _id: idStock, precioUnitario } = productoState

    const crearProducto = async (e) => {

        // const formData = new FormData(e.target);

        // const data = {
        //     nombreProducto: formData.get('nombre-producto')
        // }

        try {

            crearFormProducto({
                id,
                producto: first,
                totalProducto: "asdf",
                descripcionProducto: "asdf",
                cantidadProducto: "asdf",
                descuentoProducto: "asdf",
                idCuerpo: "asdf"
            })

            // setCantidadProductoTemp(cantidadProducto)
            // setIdCuerpoFactura("asdf")
            // setIdStockTemp(idStock) // OJOOOOOO
            setAgrePro(true) // Desabilita el icono de (+)

        } catch (error) { console.log(error) }
    }

    const editarProducto = async () => {

        try {


            const nuevoPro = productos.map((p) => {
                if (p.id === id) {
                    p.producto = first
                    p.descripcionProducto = "asdf"
                    p.cantidadProducto = "asdf"
                    p.descuentoProducto = "asdf"
                    p.totalProducto = "asdf"
                }

                return p;
            });

            setProductos(nuevoPro)
            // setCantidadProductoTemp(cantidadProducto)
            setAgrePro(true)
            setEditarPro(false)

        } catch (error) { console.log(error) }
    }

    const eliminarFormStock = async (idForm) => {

        const nuevoFormFact = formulariosFactura.filter(fp => fp !== idForm)
        const nuevoPro = productos.filter(p => p.id !== idForm)

        setFormulariosFactura(nuevoFormFact)
        setProductos(nuevoPro)
    }

    console.log(productos);

    // useEffect(() => {
    //     if (facturaState?._id) {
    //         productos.map(p => {
    //             if (p.id === id) {
    //                 setDescripcionProducto(p.descripcionProducto)
    //                 setCantidadProducto(p.cantidadProducto)
    //                 setCantidadProductoTemp(p.cantidadProducto)
    //                 // setIdCuerpoFactura(p.idCuerpo)
    //                 setIdStockTemp(p.producto)
    //                 setDescuento(p.cantidadProducto)
    //                 setProductoState(p.precioUnitario)
    //                 setTotal(p.totalProducto.$numberDecimal)
    //                 setAgrePro(true)
    //                 setEditarPro(false)
    //             }
    //         })

    //         return;
    //     }

    //     // setIdCuerpoFactura('')
    //     setCantidadProductoTemp(0)
    //     setDescripcionProducto('')
    //     setCantidadProducto(0)
    //     setDescuento(0)
    //     setProductoState({})
    //     setTotal(0)
    //     setAgrePro(false)
    //     setEditarPro(false)


    // }, [facturaState])

    // useEffect(() => {

    //     if (!editar) {
    //         // setIdCuerpoFactura('')
    //         setCantidadProductoTemp(0)
    //         setDescripcionProducto('')
    //         setCantidadProducto(0)
    //         setDescuento(0)
    //         setProductoState({})
    //         setTotal(0)
    //         setAgrePro(false)
    //         setEditarPro(false)
    //     }
    // }, [])


    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-10 mt-4 border-b pb-5 border-b-[#486b8f]">
            <div className='flex gap-3'>
                <div className='flex flex-col'>
                    <label htmlFor="nombre-producto" className='mb-1'>Nombre</label>
                    <input
                        id='nombre-producto'
                        type="text"
                        name='nombre-producto'
                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                        placeholder='Ej: Pantalones'
                        onChange={(e) => setFirst(e.target.value)}
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="canatidad-producto" className='mb-1'>Cantidad</label>
                    <input
                        id='canatidad-producto'
                        type="text"
                        name='canatidad-producto'
                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                        placeholder='Ej: 2'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="precio-unitario" className='mb-1'>Precio Unitario</label>
                    <input
                        id='precio-unitario'
                        type="text"
                        name='precio-unitario'
                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                        placeholder='Ej: 22.50'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="descuento" className='mb-1'>Descuento</label>
                    <input
                        id='descuento'
                        type="text"
                        name='descuento'
                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                        placeholder='Ej: 5%'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="total" className='mb-1'>Total</label>
                    <input
                        id='total'
                        type="text"
                        name='total'
                        className='outline-none bg-[#102940] rounded-lg px-3 py-1'
                        placeholder='Ej: 23.00'
                    />
                </div>
            </div>

            <div className="flex gap-2 items-center md:mt-8 lg:mt-0">

                {/* Crear  */}
                <button
                    type="button"
                    className={`bg-white text-gray-800 hover:bg-green-500 border border-gray-200 px-2 rounded-full cursor-pointer p-2 hover:border-green-500 hover:text-gray-200 transition-colors ${agrePro ? 'hidden' : 'block'} ${editarPro ? 'hidden' : ''}`}
                    onClick={crearProducto}
                >

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

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
                    className={`${agrePro ? 'block' : 'hidden'} ${editarPro ? 'hidden' : 'block'} bg-gray-200 border border-gray-200 hover:border-orange-500 transition-colors hover:bg-orange-500 px-2 rounded-full p-2 cursor-pointer text-gray-800 hover:text-gray-200`}
                    onClick={() => setEditarPro(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                </button>

                {/* Eliminar */}
                {agrePro &&
                    <button
                        type="button"
                        className="border bg-transparent border-gray-200 text-gray-200 hover:bg-red-500 hover:border-red-500 px-2 rounded-full p-2 cursor-pointer transition-colors"
                        onClick={() => eliminarFormStock(id, idCuerpoFactura, cantidadProducto)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                    </button>
                }

                {/* <Modal
                    isOpen={modalStock}
                    style={customStyles}
                >
                    <ModalMostrarStock
                        BASE_URL={BASE_URL}
                        stockFiltrado={stockFiltrado}
                        setProductoState={setProductoState}
                        setCantidadProductoTemp={setCantidadProductoTemp}
                        setBusqueda={setBusqueda}
                    />
                </Modal> */}
            </div>

        </div>
    )
}
