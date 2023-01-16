import { JwtPayload } from "jsonwebtoken";
import { getUserIdFromJwt, isCompleted } from "../../lib/jwt";
import jwt from "jsonwebtoken";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useQuery } from "react-query";
import { getUserProfile } from "../../lib/queries";
import { getCookie } from "cookies-next";

const Profile = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    isLoading,
    error,
    data: profile,
  } = useQuery("profile", () =>
    getUserProfile(user.id, getCookie("JWToken") as string)
  );
  console.log(profile);
  return <div className="min-h-screen bg-[#36393F]"></div>;
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
      if (!user) throw "invalid jwt";
      const data = await isCompleted(user.id, token);
      if (!data) throw "user not found";
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
