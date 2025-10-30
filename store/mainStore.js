import { create } from 'zustand'
import { generarId } from '@/helpers'
import CryptoJS from "crypto-js";

export const useMainStore = create((set, get) => ({

    /* ---------- state ---------- */
    modalEmitirFactura: false,
    modalCrearEmpresa: false,
    modalCrearSucursal: false,
    modalCrearPuntoEmision: false,
    modalNotificacionesGlobales: false,
    modalCrearProducto: false,
    modalCrearUsuario: false,
    modalCrearAdministrador: false,
    modalPrimerReporteATS: false,
    modalPrimerReporteTributario: false,
    modalCrearPeriodo: false,
    modalCrearCuenta: false,
    modalCrearAsiento: false,
    productos: [],
    formulariosFactura: [],
    editar: false,
    facturaState: {},
    dataUser: {},
    acceso: false,
    isLoading: true,
    editarItemNotaCredito: false,

    /* ---------- actions ---------- */
    setProductos: (producto) => set({ productos: producto }),
    setFormulariosFactura: (form) => set({ formulariosFactura: form }),
    setDataUser: (data) => set({ dataUser: data }),
    setEditar: (value) => set({ editar: value }),
    setAcceso: (value) => set({ acceso: value }),
    setIsLoading: (value) => set({ isLoading: value }),
    changeItemNotaCredito: () => set((state) => ({ editarItemNotaCredito: !state.editarItemNotaCredito })),
    changeModalEmitirFactura: () => set((state) => ({ modalEmitirFactura: !state.modalEmitirFactura })),
    changeModalCrearEmpresa: () => set((state) => ({ modalCrearEmpresa: !state.modalCrearEmpresa })),
    changeModalCrearSucursal: () => set((state) => ({ modalCrearSucursal: !state.modalCrearSucursal })),
    changeModalCrearPuntoEmision: () => set((state) => ({ modalCrearPuntoEmision: !state.modalCrearPuntoEmision })),
    changeModalNotificacionesGlobales: () => set((state) => ({ modalNotificacionesGlobales: !state.modalNotificacionesGlobales })),
    changeModalCrearProducto: () => set((state) => ({ modalCrearProducto: !state.modalCrearProducto })),
    changeModalCrearUsuario: () => set((state) => ({ modalCrearUsuario: !state.modalCrearUsuario })),
    changeModalCrearAdministrador: () => set((state) => ({ modalCrearAdministrador: !state.modalCrearAdministrador })),
    changeModalPrimerReporteATS: () => set((state) => ({ modalPrimerReporteATS: !state.modalPrimerReporteATS })),
    changeModalPrimerReporteTributario: () => set((state) => ({ modalPrimerReporteTributario: !state.modalPrimerReporteTributario })),
    changeModalCrearPeriodo: () => set((state) => ({ modalCrearPeriodo: !state.modalCrearPeriodo })),
    changeModalCrearCuenta: () => set((state) => ({ modalCrearCuenta: !state.modalCrearCuenta })),
    changeModalCrearAsiento: () => set((state) => ({ modalCrearAsiento: !state.modalCrearAsiento })),
    crearFormProducto: (producto) => set((state) => ({
        productos: [...state.productos, producto],
        formulariosFactura: [...state.formulariosFactura, generarId()]
    })),
    decryptData: (data) => {
        try {
            // Obtener clave de encriptación o usar una por defecto (debe coincidir con app/page.js)
            const encryptionKey = process.env.NEXT_PUBLIC_KEY_CRYPTO || 'clave-secreta-sistema-facturacion-2024-cambiar-en-produccion'
            
            if (!encryptionKey || !data) {
                return null;
            }
            
            const bytes = CryptoJS.AES.decrypt(data, encryptionKey);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            
            if (!decrypted) {
                return null;
            }
            
            return JSON.parse(decrypted);
        } catch (e) {
            console.error('Error al desencriptar datos:', e);
            return null;
        }
    },
    cerrarSesion: () => {
        localStorage.removeItem('dataUser');
    },

    /* ------- local storage ------- */
    dataFromLocalStorage: () => {
        const data = localStorage.getItem('dataUser');
        const user = data ? get().decryptData(data) : {};
        set({ dataUser: user });
    },
})) 