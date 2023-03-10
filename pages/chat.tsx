import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getUserIdFromJwt, isCompleted } from "../lib/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";

const Chat = ({ user }: InferGetServerSidePropsType<GetServerSideProps>) => {
  console.log(user);
  return <div>{user.username}</div>;
};
export { Chat as default };

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
