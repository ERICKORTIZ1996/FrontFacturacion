import { create } from 'zustand'

export const useMainStore = create((set) => ({

    modalCrearNotificacion: false,
    changeModalCrearNotificacion: () => set((state) => ({ modalCrearNotificacion: !state.modalCrearNotificacion })),

})) 