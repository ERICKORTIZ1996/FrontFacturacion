import { z } from "zod/v4";

export const facturaSchema = z.object({
    ruc: z.string()
        .min(13, 'RUC: Mínimo 13 carácteres')
        .max(13, 'RUC: Mínimo 13 carácteres')
        .regex(/^\d+$/, "RUC: No permite carácteres especiales"),
})

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
            .regex(/^\d+$/, "PRECIO UNITARIO: Cantidad inválida")
            .transform((val) => parseInt(val, 10))
            .refine((val) => val >= 1, { message: "PRECIO UNITARIO: debe ser mayor o igual a 1" })),
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