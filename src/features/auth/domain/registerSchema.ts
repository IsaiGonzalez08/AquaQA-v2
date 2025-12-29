import * as z from "zod";

export const registerFormSchema = z.object({
  email: z.string().min(5, "Escribe al menos 5 caracteres."),
  name: z.string().min(2, "Escribe al menos 2 caracteres."),
  lastname: z.string().min(2, "Escribe al menos 2 caracteres."),
  username: z.string().min(5, "Escribe al menos 5 caracteres."),
  password: z
    .string()
    .min(6, "Escribe al menos 6 caracteres.")
    .max(20, "La contraseña no debe tener más de 20 caracteres."),
  confirmPassword: z
    .string()
    .min(6, "Escribe al menos 6 caracteres.")
    .max(20, "La contraseña no debe tener más de 20 caracteres."),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export type RegisterInput = RegisterFormData;

export type RegisterResult = {
  user: {
    role: string;
    email: string;
  };
};
