"use client"

import { useMainStore } from "@/store/mainStore"
import SinAcceso from "../layouts/SinAcceso";
import Spinner from "../layouts/Spinner";

export default function ComprobarAcceso({ children }) {

    const isLoading = useMainStore((state) => state.isLoading);
    const acceso = useMainStore((state) => state.acceso);

    // console.log(dataUser);

    if (isLoading) {
        return (
            <div className="h-screen">
                <Spinner />
            </div>
        );
    }

    if (!acceso) return <SinAcceso />

    return <>{children}</>;
}
