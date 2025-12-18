import * as z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(5, "Escribe al menos 5 caracteres."),
  password: z
    .string()
    .min(6, "Escribe al menos 6 caracteres.")
    .max(20, "La contraseña no debe tener más de 20 caracteres."),
});

export const registerFormSchema = z.object({
  email: z
    .string()
    .min(5, "Escribe al menos 5 caracteres."),
  username: z
    .string()
    .min(5, "Escribe al menos 5 caracteres."),
  phone: z
    .string()
    .min(5, "Escribe al menos 5 caracteres."),
  password: z
    .string()
    .min(6, "Escribe al menos 6 caracteres.")
    .max(20, "La contraseña no debe tener más de 20 caracteres."),
  confirmPassword: z
    .string()
    .min(6, "Escribe al menos 6 caracteres.")
    .max(20, "La contraseña no debe tener más de 20 caracteres."),
});

