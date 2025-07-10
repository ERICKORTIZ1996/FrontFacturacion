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