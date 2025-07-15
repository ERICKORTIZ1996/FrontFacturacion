import { create } from 'zustand'
import { generarId } from '@/helpers'
import CryptoJS from "crypto-js";

export const useMainStore = create((set, get) => ({

    /* ---------- state ---------- */
    modalCrearNotificacion: false,
    modalNotificacionesGlobales: false,
    productos: [],
    formulariosFactura: [],
    editar: false,
    facturaState: {},
    dataUser: {},
    acceso: false,
    isLoading: true,

    /* ---------- actions ---------- */
    setProductos: (producto) => set({ productos: producto }),
    setFormulariosFactura: (form) => set({ formulariosFactura: form }),
    setDataUser: (data) => set({ dataUser: data }),
    setEditar: (value) => set({ editar: value }),
    setAcceso: (value) => set({ acceso: value }),
    setIsLoading: (value) => set({ isLoading: value }),
    changeModalCrearNotificacion: () => set((state) => ({ modalCrearNotificacion: !state.modalCrearNotificacion })),
    changeModalNotificacionesGlobales: () => set((state) => ({ modalNotificacionesGlobales: !state.modalNotificacionesGlobales })),
    crearFormProducto: (producto) => set((state) => ({
        productos: [...state.productos, producto],
        formulariosFactura: [...state.formulariosFactura, generarId()]
    })),
    decryptData: (data) => {
        try {
            const bytes = CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_KEY_CRYPTO);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (e) {
            return null;
        }
    },

    /* ------- local storage ------- */
    dataFromLocalStorage: () => {
        const data = localStorage.getItem('dataUser');
        const user = data ? get().decryptData(data) : {};
        set({ dataUser: user });
    },
})) 