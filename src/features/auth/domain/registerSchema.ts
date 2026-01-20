import * as z from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().min(2, "Por favor, ingresa al menos 2 caracteres."),
    lastname: z.string().min(2, "Por favor, ingresa al menos 2 caracteres."),
    email: z.email("Por favor, ingresa un correo electrónico válido."),
    phone: z.string().min(10, "Por favor, ingresa al menos 10 caracteres."),
  })

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export type RegisterInput = RegisterFormData;

export type RegisterResponse = {
  user: {
    role: string;
    email: string;
  };
};
