export type AuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  role: "user" | "admin";
};
