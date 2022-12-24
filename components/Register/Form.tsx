const Form = () => {
  return (
    <div className="grid  grid-cols-1 bg-[#35393E] px-4 py-10 w-full md:w-1/2 text-[#737479]">
      <h1 className="text-xl text-center text-white">Create an account</h1>
      <form>
        <label htmlFor="email" className="flex flex-col gap-2 mt-2">
          E-mail
          <input
            type="email"
            id="email"
            className="outline-none text-white bg-[#2F3338] px-4 py-2 rounded-sm focus:border-[1px] focus:border-[#748AD6]"
          />
        </label>
        <label htmlFor="username" className="flex flex-col gap-2 mt-2">
          Username
          <input
            type="text"
            id="username"
            className="outline-none text-white bg-[#2F3338] px-4 py-2 rounded-sm focus:border-[1px] focus:border-[#748AD6]"
          />
        </label>
        <label htmlFor="password" className="flex flex-col gap-2 mt-2">
          Password
          <input
            type="password"
            id="password"
            className="outline-none text-white bg-[#2F3338] px-4 py-2 rounded-sm focus:border-[1px] focus:border-[#748AD6]"
          />
        </label>
        <label htmlFor="confirmpassword" className="flex flex-col gap-2 mt-2">
          Confirm Password
          <input
            type="password"
            id="confirmpassword"
            className="outline-none text-white bg-[#2F3338] px-4 py-2 rounded-sm focus:border-[1px] focus:border-[#748AD6]"
          />
        </label>
        <button className="bg-[#748AD6] text-white px-4 py-2 w-full mt-4">
          register
        </button>
      </form>
    </div>
  );
};
export { Form as default };
