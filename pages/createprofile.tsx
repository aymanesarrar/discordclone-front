import { getCookie } from "cookies-next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import jwt from "jsonwebtoken";
import { getUserIdFromJwt } from "../lib/jwt";
import Auth from "../components/Layouts/Auth";
import Input from "../components/Input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthResponse, ProfileInputs } from "../types/auth";
import { AiFillCheckCircle, AiOutlinePicture } from "react-icons/ai";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import supabase from "../lib/supabase";
import Image from "next/image";
import AuthButton from "../components/Button/AuthButton";
import { profileSchema } from "../lib/Schema";
import { useMutation } from "react-query";
import { VscError } from "react-icons/vsc";
import { notify } from "../lib/helpers";
import axios, { AxiosError } from "axios";
import { Toaster } from "react-hot-toast";

const CreateProfile = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { register, handleSubmit } = useForm<ProfileInputs>();
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const mutation = useMutation((newProfile: ProfileInputs) => {
    return axios.post(
      `http://localhost:3001/api/v1/profile/create/${user.id}`,
      newProfile,
      {
        headers: {
          Authorization: "Bearer " + getCookie("JWToken"),
        },
      }
    );
  });
  const updateAvatar: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.files) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(
          `public/${event.target.files["0"].name}`,
          event.target.files["0"]
        );
      if (!error) {
        const url = supabase.storage
          .from("avatars")
          .getPublicUrl(`public/${event.target.files["0"].name}`);
        setImgUrl(url.data.publicUrl);
        setLoading(false);
      }
    }
  };
  const createProfile: SubmitHandler<ProfileInputs> = (data) => {
    try {
      setLoading(true);
      // profileSchema.parse(data);
      data.picture = imgUrl;
      mutation.mutate(data, {
        onSuccess: (data, variables, ctx) => {
          setLoading(false);
          notify(
            data.data.message,
            <AiFillCheckCircle className="w-6 h-6 text-green-600" />
          );
        },
        onError: (data, variables, ctx) => {
          const error: AxiosError = data as AxiosError;
          const { message } = error.response?.data as AuthResponse;
          notify(message, <VscError className="w-6 h-6 text-red-600" />);
          setLoading(false);
        },
      });
    } catch (error) {
      setLoading(false);
      notify(
        "Something went wrong",
        <VscError className="w-6 h-6 text-red-600" />
      );
    }
  };
  return (
    <Auth>
      <div className="grid  grid-cols-1 bg-[#35393E] px-4 py-10 w-full md:w-1/2 text-[#737479]">
        <Toaster />
        {imgUrl.length === 0 ? (
          <label className="w-20 h-20 mx-auto rounded-full bg-[#4c4e52] flex justify-center items-center cursor-pointer">
            <input onChange={updateAvatar} type="file" className="hidden" />
            <AiOutlinePicture className="text-lg text-white" />
          </label>
        ) : (
          <Image
            src={imgUrl}
            alt="avatar"
            className="w-20 h-20 mx-auto rounded-full"
            width={20}
            height={20}
          />
        )}
        <form onSubmit={handleSubmit(createProfile)}>
          <label htmlFor="firstname" className="flex flex-col gap-2 mt-2">
            First Name
            <input
              {...register("firstName")}
              type="text"
              id="firstname"
              className="outline-none text-white bg-[#2F3338] px-4 py-2 rounded-sm focus:border-[1px] focus:border-[#748AD6]"
            />
          </label>
          <label htmlFor="lastname" className="flex flex-col gap-2 mt-2">
            Last Name
            <input
              {...register("lastName")}
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
          <AuthButton isLoading={loading}>create profile</AuthButton>
        </form>
      </div>
    </Auth>
  );
};
export { CreateProfile as default };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.headers.cookie?.split("=")[1];

  try {
    const verified = jwt.verify(
      token as string,
      process.env.JWTSECRET as string
    );
    if (!token) {
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
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
