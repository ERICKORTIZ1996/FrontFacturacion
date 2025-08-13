import { z } from "zod/v4";

const formasPagoEnum = z.enum([
    'Efectivo',
    'Tarjeta de débito',
    'Dinero electrónico',
    'Tarjeta de crédito'
]);

export const facturaSchema = z.object({
    razonSocial: z.string().min(1, 'RAZÓN SOCIAL: Es requerido'),
    ruc: z.string()
        .min(13, 'RUC: Mínimo 13 carácteres')
        .regex(/^\d+$/, "RUC: No permite carácteres especiales"),
    dirMatriz: z.string().min(1, 'DIRECCIÓN MATRIZ: Es requerido'),
    dirEstablecimiento: z.string().min(1, 'DIRECCIÓN ESTABLECIMIENTO: Es requerido'),
    razonSocialComprador: z.string().min(1, 'NOMBRES: Es requerido'),
    razonSocialCompradorApellidos: z.string().min(1, 'APELLIDOS: Es requerido'),
    tipoIdentificacionComprador: z.string().refine(val => val === 'RUC' || val === 'CEDULA' || val === 'PASAPORTE' || val === 'CONSUMIDOR-FINAL' || val === 'IDENTIFICACION-EXTERIOR', {
        message: 'TIPO IDENTIFICACIÓN: Seleccione uno'
    }),
    identificacionComprador: z.string().min(1, 'IDENTIFICACIÓN CLIENTE: Es requerido'),
    direccionComprador: z.string().min(1, 'DIRECCIÓN CLIENTE: Es requerido'),
    formaPago: formasPagoEnum
}).check((ctx) => {
    const { tipoIdentificacionComprador: tipo, identificacionComprador: value } = ctx.value;

    const longitudEsperada = tipo === 'RUC' ? 13
        : tipo === 'CEDULA' || tipo === 'CONSUMIDOR-FINAL' ? 10
            : null;

    const esNumerico = /^\d+$/.test(value);

    if (!esNumerico && tipo !== 'PASAPORTE' && tipo !== 'IDENTIFICACION-EXTERIOR') {
        ctx.issues.push({
            code: "custom",
            path: ['identificacionComprador'],
            message: 'IDENTIFICACIÓN CLIENTE: Solo debe contener números',
        });
    }

    if (longitudEsperada !== null && value.length !== longitudEsperada) {
        ctx.issues.push({
            code: "custom",
            path: ['identificacionComprador'],
            message: `IDENTIFICACIÓN CLIENTE: Debe tener exactamente ${longitudEsperada} dígitos`,
        });
    }
});

export const productoSchema = z.object({
    descripcion:
        z.string()
            .min(1, "DESCRIPCIÓN: No puede estar vacio"),
    cantidad: z.preprocess(
        (val) => {
            if (typeof val === "string") return val;
            if (val === undefined || val === null) return "";
            return String(val);
        },
        z.string()
            .min(1, "CANTIDAD: no puede estar vacio")
            .regex(/^\d+$/, "CANTIDAD: Cantidad inválida")
            .transform((val) => parseInt(val, 10))
            .refine((val) => val >= 1, { message: "CANTIDAD: debe ser mayor o igual a 1" })),
    precioUnitario: z.preprocess(
        (val) => {
            if (typeof val === "string") return val;
            if (val === undefined || val === null) return "";
            return String(val);
        },
        z.string()
            .min(1, "PRECIO UNITARIO: no puede estar vacio")
            .regex(/^(0|[1-9]\d*)([.,]\d+)?$/, "PRECIO UNITARIO: Cantidad inválida")
            .transform((val) => parseInt(val, 10))
            .refine((val) => val >= 0.00, { message: "PRECIO UNITARIO: debe ser mayor o igual a 1" })),
    descuento: z.preprocess(
        (val) => {
            if (typeof val === "string") return val;
            if (val === undefined || val === null) return "";
            return String(val);
        },
        z.string()
            .min(0, "DESCUENTO: no puede estar vacio")
            .regex(/^\d+$/, "DESCUENTO: Cantidad inválida")
            .transform((val) => parseInt(val, 10))
            .refine((val) => val >= 0, { message: "DESCUENTO: debe ser mayor o igual a 0" })),
})

export const loginSchema = z.object({
    user: z.email({ message: 'Porfavor, Ingresa un correo válido.' }),
    pass: z.string()
})

export const crearEmpresaSchema = z.object({
    ruc: z.string().min(13, 'RUC: Debe tener al menos 13 caracteres').regex(/^\d+$/, "RUC: No permite carácteres especiales"),
    razonSocial: z.string().min(1, 'RAZÓN SOCIALl: Es requerida'),
    dirMatriz: z.string().min(1, 'DIRECCIÓN MATRIZ: Es requerida'),
    obligadoContabilidad: z.string().refine(val => val === 'SI' || val === 'NO', {
        message: 'OBLIGADO A CONTABILIDAD: Seleccione uno'
    }),
    sucursal: z.object({
        estab: z.string().length(3, 'CÓDIGO ESTABLECIMIENTO: debe tener 3 dígitos'),
        nombre: z.string().min(1, 'NOMBRE SUCURSAL: Es requerido'),
        dirEstablecimiento: z.string().min(1, 'DIRECCIÓN ESTABLECIMIENTO: Es requerida')
    }),
    puntoEmision: z.object({
        ptoEmi: z.string().length(3, 'PUNTO EMISIÓN: Debe tener 3 dígitos'),
        secuencialActual: z.number().int().min(1, 'SECUENCIAL: Debe ser un número positivo')
    })
});

export const crearSucursalSchema = z.object({
    ruc: z.string().min(13, 'RUC: Debe tener al menos 13 caracteres').regex(/^\d+$/, "RUC: No permite carácteres especiales"),
    estab: z.string().length(3, 'CÓDIGO ESTABLECIMIENTO: debe tener 3 dígitos'),
    nombre: z.string().min(1, 'NOMBRE SUCURSAL: Es requerido'),
    dirEstablecimiento: z.string().min(1, 'DIRECCIÓN ESTABLECIMIENTO: Es requerida')
});

export const crearPuntoEmisionSchema = z.object({
    ruc: z.string().min(13, 'RUC: Debe tener al menos 13 caracteres').regex(/^\d+$/, "RUC: No permite carácteres especiales"),
    estab: z.string().length(3, 'CÓDIGO ESTABLECIMIENTO: debe tener 3 dígitos'),
    ptoEmi: z.string().length(3, 'PUNTO EMISIÓN: Debe tener 3 dígitos')
});

export const productoStockSchema = z.object({

    codigo: z.string().min(1, "CÓDIGO: Es requerido"),
    nombre: z.string().min(1, "NOMBRE: Es requerido"),
    descripcion: z.string().min(1, "DESCRIPCIÓN: Es requerido"),
    cantidad: z.preprocess(
        (val) => {
            if (typeof val === "string") return val;
            if (val === undefined || val === null) return "";
            return String(val);
        },
        z.string()
            .min(1, "CANTIDAD: no puede estar vacio")
            .regex(/^\d+$/, "CANTIDAD: Cantidad inválida")
            .transform((val) => parseInt(val, 10))
            .refine((val) => val >= 1, { message: "CANTIDAD: debe ser mayor o igual a 1" })),
    precioUnitario: z.preprocess(
        (val) => {
            if (typeof val === "string") return val;
            if (val === undefined || val === null) return "";
            return String(val);
        },
        z.string()
            .min(1, "PRECIO UNITARIO: no puede estar vacio")
            .regex(/^(0|[1-9]\d*)([.,]\d+)?$/, "PRECIO UNITARIO: Cantidad inválida")
            .transform((val) => parseInt(val, 10))
            .refine((val) => val >= 0.00, { message: "PRECIO UNITARIO: debe ser mayor o igual a 1" })),
    descuento: z.preprocess(
        (val) => {
            if (typeof val === "string") return val;
            if (val === undefined || val === null) return "";
            return String(val);
        },
        z.string()
            .regex(/^\d+$/, "DESCUENTO: debe ser un número entero válido")
            .transform((val) => parseInt(val, 10))
            .refine((val) => val >= 0 && val <= 100, {
                message: "DESCUENTO: debe estar entre 1 y 100"
            })),
})
