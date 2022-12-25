import Input from "../Input/Input";

const Form = () => {
  return (
    <div className="grid  grid-cols-1 bg-[#35393E] px-4 py-10 w-full md:w-1/2 text-[#737479]">
      <h1 className="text-xl text-center text-white">Create an account</h1>
      <form>
        <Input label="E-mail" type="email" id="email" />
        <Input label="Username" type="text" id="username" />
        <Input label="Password" type="password" id="password" />
        <Input label="Confirm Password" type="password" id="confirmpassword" />

        <button className="bg-[#748AD6] text-white px-4 py-2 w-full mt-4">
          register
        </button>
      </form>
    </div>
  );
};
export { Form as default };
