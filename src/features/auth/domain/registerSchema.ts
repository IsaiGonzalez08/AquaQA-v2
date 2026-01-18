import * as z from "zod";

export const registerFormSchema = z
  .object({
    email: z.email("Por favor, ingresa un correo electrónico válido."),
    name: z.string().min(2, "Por favor, ingresa al menos 2 caracteres."),
    lastname: z.string().min(2, "Por favor, ingresa al menos 2 caracteres."),
    password: z
      .string()
      .min(8, "Por favor, ingresa al menos 8 caracteres.")
      .max(20, "La contraseña no debe tener más de 20 caracteres."),
    confirmPassword: z
      .string()
      .min(8, "Por favor, ingresa al menos 8 caracteres.")
      .max(20, "La contraseña no debe tener más de 20 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export type RegisterInput = RegisterFormData;

export type RegisterResponse = {
  user: {
    role: string;
    email: string;
  };
};
