import Input from "../Input/Input";
import { useForm, SubmitHandler } from "react-hook-form";

export interface Inputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
const Form = () => {
  const { register, handleSubmit, watch } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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

        <button className="bg-[#748AD6] text-white px-4 py-2 w-full mt-4">
          register
        </button>
      </form>
    </div>
  );
};
export { Form as default };
