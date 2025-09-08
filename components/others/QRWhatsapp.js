'use cliente'

import axios from "axios"
import { toast } from "react-toastify"

export default function QRWhatsapp() {

    const qr = async () => {

        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/whatsapp/qr`)

        } catch (e) {
            console.log(e);
            toast.error(e.response.data.mensaje)
        }


    }

    return (
        <div>QRWhatsapp</div>
    )
}
