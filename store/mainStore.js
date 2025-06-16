import { create } from 'zustand'
import { generarId } from '@/helpers'

export const useMainStore = create((set) => ({

    modalCrearNotificacion: false,
    productos: [],
    setProductos: (producto) => set({ productos: producto }),
    formulariosFactura: [],
    setFormulariosFactura: (form) => set({ formulariosFactura: form }),
    editar: false,
    facturaState: {},
    changeModalCrearNotificacion: () => set((state) => ({ modalCrearNotificacion: !state.modalCrearNotificacion })),
    crearFormProducto: (producto) => set((state) => ({
        productos: [...state.productos, producto],
        formulariosFactura: [...state.formulariosFactura, generarId()]
    }))

})) 