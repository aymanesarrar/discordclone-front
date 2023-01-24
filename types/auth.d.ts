import { JwtPayload } from "jsonwebtoken";
import { UseFormRegister } from "react-hook-form";
export interface Inputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
export interface ProfileInputs {
  firstName: string;
  lastName: string;
  bio: string;
  picture: string;
}
interface InputProps {
  label: string;
  type?: string;
  id: string;
  value?: string;
  register: UseFormRegister<Inputs>;
  required?: boolean;
  inputLabel: "email" | "username" | "password" | "confirmPassword";
}
export interface AuthResponse {
  type: "success" | "error";
  message: string;
}
export interface extendedPayload extends JwtPayload {
  username: string;
  id: string;
  role: "USER" | "ADMIN";
  created_at: string;
}
