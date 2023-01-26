import { JwtPayload } from "jsonwebtoken";
import { getUserIdFromJwt, isCompleted } from "../../lib/jwt";
import jwt from "jsonwebtoken";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useQuery } from "react-query";
import { getUserProfile } from "../../lib/queries";
import { getCookie, removeCookies } from "cookies-next";
import { FaDiscord } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import useClient from "../../hooks/useClient";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import useOutsideEffect from "../../hooks/useOutsideEffect";
import { Profile } from "../../types/profile";
import Box from "../../components/Input/Box";
import Modal from "../../components/Modal/Modal";

const Profile = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [sidebar, setSidebar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const {
    isLoading,
    error,
    data: profile,
  } = useQuery<{ type: string; data: Profile }, any>("profile", () =>
    getUserProfile(user.id, getCookie("JWToken") as string)
  );
  const router = useRouter();
  useOutsideEffect(ref, setSidebar, false);
  if (isLoading) return <Loading />;
  const handleLogout = () => {
    removeCookies("JWToken");
    router.push("/login");
  };
  return (
    <div className="min-h-screen bg-[#36393F] flex flex-col relative">
      <Modal
        title="update profile"
        description="this will let you update your profile"
        body="are you sure you wanna update your profile ? this action is irreversible"
      />
      <header className="flex justify-between p-2 min-h-[10vh]">
        <GiHamburgerMenu
          onClick={() => setSidebar(!sidebar)}
          className="text-[#7289DA] h-10 w-10 cursor-pointer md:invisible"
        />
        <FaDiscord className="text-[#7289DA] h-10 w-10" />
      </header>
      <div
        ref={ref}
        className={`${
          !sidebar && "invisible"
        } flex items-center justify-between p-10 flex-col absolute inset-y-0 left-0 bg-[#2F3136] w-1/3 md:w-[20%] md:visible`}
      >
        <ul className="flex flex-col w-full gap-6 text-white ">
          <li className="p-2 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-xl">
            profile
          </li>
          <li className="p-2 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-xl">
            account
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="flex w-full p-2 font-bold text-red-500 hover:bg-white hover:bg-opacity-10 rounded-xl"
        >
          Logout
        </button>
      </div>
      <div className="flex items-center justify-center flex-1 ">
        <div className="bg-[#202225] w-full flex flex-col justify-center items-center gap-2 p-4">
          <Box
            field="firstName"
            title="First Name"
            data={profile?.data.firstName}
          />
          <Box
            field="lastName"
            title="Last Name"
            data={profile?.data.lastName}
          />
          <Box field="bio" title="Bio" data={profile?.data.bio} />
        </div>
      </div>
    </div>
  );
};
export { Profile as default };
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.headers.cookie?.split("=")[1];

  try {
    const verified = jwt.verify(
      token as string,
      process.env.JWTSECRET as string
    );
    if (!token) {
      throw "token doesn't exist";
    } else {
      const user = getUserIdFromJwt(token) as JwtPayload & { id: string };
      if (!user) throw new Error("invalid jwt");
      const data = await isCompleted(user.id, token);
      if (!data) throw new Error("user not found");

      return {
        props: {
          user: data.data,
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
