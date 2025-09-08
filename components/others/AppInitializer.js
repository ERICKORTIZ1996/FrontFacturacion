"use client"

import { useEffect } from "react"
import { useMainStore } from "@/store/mainStore"

export default function AppInitializer() {

    const dataFromLocalStorage = useMainStore((state => state.dataFromLocalStorage))
    const dataUser = useMainStore((state => state.dataUser))
    const setAcceso = useMainStore((state => state.setAcceso))
    const setIsLoading = useMainStore((state => state.setIsLoading))

    useEffect(() => {

        // const tieneAcceso = !!dataUser?.tokenAcceso && !!dataUser?.active; -> En caso de que exista el campo active (agregarlo al momento de hacer login)
        const tieneAcceso = !!dataUser?.tokenAcceso;
        setAcceso(tieneAcceso);
        setIsLoading(false);

    }, [dataUser]);

    useEffect(() => {
        dataFromLocalStorage()
    }, [])

    return null
}
