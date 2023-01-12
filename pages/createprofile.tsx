import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";
import { getUserIdFromJwt } from "../lib/jwt";
import Auth from "../components/Layouts/Auth";
import Input from "../components/Input/Input";
import { useForm } from "react-hook-form";
import { ProfileInputs } from "../types/auth";
import { AiOutlinePicture } from "react-icons/ai";

const CreateProfile = () => {
  const { register, handleSubmit } = useForm<ProfileInputs>();
  return (
    <Auth>
      <div className="grid  grid-cols-1 bg-[#35393E] px-4 py-10 w-full md:w-1/2 text-[#737479]">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#4c4e52] flex justify-center items-center cursor-pointer">
          <AiOutlinePicture className="text-lg text-white" />
        </div>
        <form>
          <label htmlFor="firstname" className="flex flex-col gap-2 mt-2">
            First Name
            <input
              {...register("firstname")}
              type="text"
              id="firstname"
              className="outline-none text-white bg-[#2F3338] px-4 py-2 rounded-sm focus:border-[1px] focus:border-[#748AD6]"
            />
          </label>
          <label htmlFor="lastname" className="flex flex-col gap-2 mt-2">
            Last Name
            <input
              {...register("lastname")}
              type="text"
              id="lastname"
              className="outline-none text-white bg-[#2F3338] px-4 py-2 rounded-sm focus:border-[1px] focus:border-[#748AD6]"
            />
          </label>
          <label htmlFor="bio" className="flex flex-col gap-2 mt-2">
            Bio
            <textarea
              {...register("bio")}
              id="bio"
              className="outline-none text-white bg-[#2F3338] px-4 py-2 rounded-sm focus:border-[1px] focus:border-[#748AD6]"
            />
          </label>
        </form>
      </div>
    </Auth>
  );
};
export { CreateProfile as default };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.headers.cookie?.split("=")[1];

  if (!token || !jwt.verify(token, process.env.JWTSECRET as string)) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const user = getUserIdFromJwt(token);
    if (!user)
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    return {
      props: {
        user,
      },
    };
  }
};
