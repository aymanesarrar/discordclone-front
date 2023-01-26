import { getCookie } from "cookies-next";
import { atom, selector } from "recoil";
import jwt from "jsonwebtoken";
import { extendedPayload } from "../types/auth";
import { getUserIdFromJwt } from "./jwt";

const Token = atom({
  key: "Token",
  default: (getCookie("JWToken") || "") as string,
});
const userId = selector({
  key: "userId",
  get: ({ get }) => {
    const token = get(Token);

    return getUserIdFromJwt(token) as extendedPayload;
  },
});
const isOpenModal = atom({
  key: "isOpenModal",
  default: false,
});
const fieldToUpdate = atom({
  key: "fieldToUpdate",
  default: "",
});
export { Token, userId, isOpenModal, fieldToUpdate };
