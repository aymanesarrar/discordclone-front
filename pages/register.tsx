import { GetServerSideProps } from "next";
import Auth from "../components/Layouts/Auth";
import Form from "../components/Register/Form";
import jwt from "jsonwebtoken";
const Register = () => {
  return (
    <Auth>
      <Form />
    </Auth>
  );
};
export { Register as default };
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.headers.cookie?.split("=")[1];
  try {
    const verified = jwt.verify(
      token as string,
      process.env.JWTSECRET as string
    );
    if (verified) {
      return {
        redirect: {
          destination: "/chat",
          permanent: false,
        },
      };
    }
    else {
      return {
        props: {}
      }
    }
  } catch (error) {
    return {
      props: {}
    };
  }
};
