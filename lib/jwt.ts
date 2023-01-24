import jwt from "jsonwebtoken";
import api from "./api";
import { instance } from "./axiosInstance";

const getUserIdFromJwt = (token: string | undefined) => {
  if (typeof token === "string") {
    const decoded = jwt.decode(token);
    return decoded;
  }
  return {};
};
const isCompleted = async (userId: string, token: string) => {
  try {
    const user = await api.get(`/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await user.data;
    return data;
  } catch (error: any) {
    return error.message;
  }
};
export { getUserIdFromJwt, isCompleted };
