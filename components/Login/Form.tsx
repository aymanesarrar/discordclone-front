import Input from "../Input/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthResponse, extendedPayload, Inputs } from "../../types/auth";
import { signUpSchema } from "../../lib/Schema";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiFillCheckCircle } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { notify } from "../../lib/helpers";
import AuthButton from "../Button/AuthButton";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useRecoilState } from "recoil";
import { Token } from "../../lib/atoms";

const Form = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useRecoilState(Token);

  const mutation = useMutation((newAccount: Inputs) => {
    return axios.post(`http://localhost:3001/api/v1/login`, newAccount);
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      mutation.mutate(data, {
        onSuccess: (data, variables, ctx) => {
          setLoading(false);
          notify(
            data.data.message,
            <AiFillCheckCircle className="w-6 h-6 text-green-600" />
          );
          setCookie("JWToken", data.data.token);
          setToken(data.data.token);
          router.push("/chat");
        },
        onError: (data, variables, ctx) => {
          const error: AxiosError = data as AxiosError;
          const { message } = error.response?.data as AuthResponse;
          notify(message, <VscError className="w-6 h-6 text-red-600" />);
          setLoading(false);
        },
      });
    } catch (error: any) {
      notify(
        "Something went wrong",
        <VscError className="w-6 h-6 text-red-600" />
      );
      setLoading(false);
    }
  };
  return (
    <div className="grid  grid-cols-1 bg-[#35393E] px-4 py-10 w-full md:w-1/2 text-[#737479]">
      <h1 className="text-xl text-center text-white">welcome back</h1>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          inputLabel="username"
          label="Username"
          type="text"
          id="username"
        />
        <Input
          register={register}
          inputLabel="password"
          label="Password"
          type="password"
          id="password"
        />
        <AuthButton isLoading={loading}>Login</AuthButton>
      </form>
    </div>
  );
};
export { Form as default };
