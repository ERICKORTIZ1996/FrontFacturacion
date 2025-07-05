import { z } from "zod/v4";

export const facturaSchema = z.object({
    nombreCliente: z.string().min(1, 'El nombre es obligatorio'),
})

export const loginSchema = z.object({
    user: z.email({ message: 'Porfavor, Ingresa un correo válido.' }),
    pass: z.string()
})