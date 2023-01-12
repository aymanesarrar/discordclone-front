import jwt from "jsonwebtoken";

const getUserIdFromJwt = (token: string | undefined) => {
  if (typeof token === "string") {
    const decoded = jwt.decode(token);
    return decoded;
  }
  return {};
};
export { getUserIdFromJwt };
