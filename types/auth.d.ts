import { UseFormRegister } from "react-hook-form";
export interface Inputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
export interface ProfileInputs {
  firstname: string;
  lastname: string;
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
