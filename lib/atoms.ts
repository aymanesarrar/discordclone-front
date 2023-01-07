import { atom } from "recoil";

const TokenState = atom({
  key: "JWToken",
  default: "",
});

export { TokenState };
