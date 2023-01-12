import axios from "axios";
import { getCookie } from "cookies-next";
const instance = axios.create({
  baseURL: "http://localhost:3001/api/v1/",
  timeout: 2000,
  headers: { JWToken: getCookie("JWToken") },
});
export { instance };
