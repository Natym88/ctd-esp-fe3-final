import * as yup from "yup";

export const personalSchema = yup.object({
    name: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    lastName: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    email: yup
        .string()
        .required("Este campo es requerido")
        .email("Correo inválido")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email valido"),
})

export const addressSchema = yup.object({
    address: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "Mímimo 3 caracteres"),
    apt: yup
        .string(),
    city: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "Mínimo 3 caracteres"),
    provincia: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "Mínimo 3 caracteres"),
    zip: yup
        .string()
        .required("Este campo es requerido")
        .min(4, "Código postal inválido"),
})

export const paymentSchema = yup.object({
    cardNumber: yup
        .string()
        .required("Este campo es requerido")
        .min(15, "Ingrese una tarjeta válida")
        .max(16, "Ingrese una tarjeta válida"),
    cardName: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    expDate: yup
        .string()
        .required("Este campo es requerido")
        .min(4, "")
        .max(4, ""),
    cvv: yup
        .string()
        .required("Este campo es requerido")
        .min(3, "")
        .max(4, ""),
})