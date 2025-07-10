import { create } from 'zustand'
import { generarId } from '@/helpers'

export const useMainStore = create((set) => ({

    modalCrearNotificacion: false,
    modalNotificacionesGlobales: false,
    productos: [],
    formulariosFactura: [],
    editar: false,
    facturaState: {},
    setProductos: (producto) => set({ productos: producto }),
    setFormulariosFactura: (form) => set({ formulariosFactura: form }),
    changeModalCrearNotificacion: () => set((state) => ({ modalCrearNotificacion: !state.modalCrearNotificacion })),
    changeModalNotificacionesGlobales: () => set((state) => ({ modalNotificacionesGlobales: !state.modalNotificacionesGlobales })),
    crearFormProducto: (producto) => set((state) => ({
        productos: [...state.productos, producto],
        formulariosFactura: [...state.formulariosFactura, generarId()]
    })),
    setEditar: (value) => set({ editar: value })
})) 