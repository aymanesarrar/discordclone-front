import Input from "../Input/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../../types/auth";
import { signUpSchema } from "../../lib/Schema";
import { useMutation } from "react-query";
import axios from "axios";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/router";

const Form = () => {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const mutation = useMutation((newAccount: Inputs) => {
    return axios.post(`http://localhost:3001/api/v1/register`, newAccount);
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      signUpSchema.parse(data);
      mutation.mutate(data, {
        onSuccess: (data, variables, ctx) => {
          setLoading(false);
          router.push("/login");
        },
        onError: (data, variables, ctx) => {
          console.log(data);
          setLoading(false);
        },
      });
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="grid  grid-cols-1 bg-[#35393E] px-4 py-10 w-full md:w-1/2 text-[#737479]">
      <h1 className="text-xl text-center text-white">Create an account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          inputLabel="email"
          label="E-mail"
          type="email"
          id="email"
        />
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
        <Input
          register={register}
          inputLabel="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmpassword"
        />

        <button className="bg-[#748AD6] text-white px-4 py-2 w-full mt-4 hover:bg-[#6782e4]">
          {loading ? (
            <ImSpinner2 className="mx-auto animate-spin" />
          ) : (
            "register"
          )}
        </button>
      </form>
    </div>
  );
};
export { Form as default };
