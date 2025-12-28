import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(5, "Escribe al menos 5 caracteres."),
  password: z
    .string()
    .min(6, "Escribe al menos 6 caracteres.")
    .max(20, "La contraseña no debe tener más de 20 caracteres."),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export type LoginInput = LoginFormData & {
  rememberMe: boolean;
};

export type LoginResult = {
  user: {
    role: string;
    email: string;
  };
};
