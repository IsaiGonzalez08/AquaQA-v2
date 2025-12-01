import * as z from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .min(5, "Escribe al menos 5 caracteres."),
  password: z
    .string()
    .min(20, "Escribe al menos 20 caracteres.")
    .max(30, "La contraseña no debe tener más de 30 caracteres."),
});
