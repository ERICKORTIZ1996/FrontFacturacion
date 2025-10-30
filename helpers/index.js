export const generarId = () => {
    const random = Math.random().toString(32).substring(2);
    const fecha = Date.now().toString(32);

    return random + fecha;
}

export const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);

    const opcionesFecha = { day: '2-digit', month: 'long', year: 'numeric' };
    const opcionesHora = { hour: 'numeric', minute: '2-digit', hour12: true };

    return `${fechaNueva.toLocaleDateString('es-ES', opcionesFecha).replace('de', '/').replace('de', '/').toUpperCase()} - ${fechaNueva.toLocaleTimeString('en-US', opcionesHora)}`;
};

export const formatearFechaFactura = (fecha) => {
    const fechaNueva = new Date(fecha);

    const opcionesFecha = { day: '2-digit', month: 'long', year: 'numeric' };

    return fechaNueva.toLocaleDateString('es-ES', opcionesFecha).replace('de', '/').replace('de', '/').toUpperCase()
};

export const consultarFechaEcuador = () => {

    const ecuadorTime = new Date();
    ecuadorTime.setHours(ecuadorTime.getHours() - 5);

    return {
        time: ecuadorTime.toISOString(),
        timezone: 'America/Guayaquil',
        utc_offset: '-05:00',
        formatted_time: ecuadorTime.toLocaleString('en-US', {
            timeZone: 'America/Guayaquil',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        })
    }
}

export const getStatusBill = (status) => {

    switch (status) {
        case "FIRMADA":
            return "text-green-950 bg-green-200"
        case "AUTORIZADA":
            return "text-blue-950 bg-blue-200"
        case "PENDIENTE":
            return "text-yellow-950 bg-yellow-200"
        case "RECHAZADA":
            return "text-purple-950 bg-purple-200"
        case "ERROR":
            return "text-red-950 bg-red-200"
        default:
            return "text-green-950 bg-green-200"
    }

}

export const quitarEmojing = (texto) => {
    // Validar que texto exista y sea un string
    if (!texto || typeof texto !== 'string') {
        return ''
    }
    return texto.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim()
}

/**
 * Normaliza un valor numérico que puede tener coma o punto como separador decimal
 * Convierte comas a puntos para uso estándar de JavaScript
 * @param {string|number} valor - El valor a normalizar
 * @returns {number} - El número normalizado, o NaN si no es un número válido
 */
export const normalizarNumero = (valor) => {
    if (valor === null || valor === undefined || valor === '') {
        return NaN
    }
    
    // Si ya es un número, retornarlo directamente
    if (typeof valor === 'number') {
        return valor
    }
    
    // Convertir a string y normalizar
    const valorString = String(valor).trim()
    
    // Reemplazar coma por punto para aceptar ambos formatos
    const valorNormalizado = valorString.replace(',', '.')
    
    // Convertir a número
    const numero = parseFloat(valorNormalizado)
    
    return isNaN(numero) ? NaN : numero
}