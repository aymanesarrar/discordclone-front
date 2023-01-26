import { Profile } from "../types/profile";
import api from "./api";

const getUserProfile = async (id: string, token: string) => {
  const getData = await api.get(`/profile/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = (await getData.data) as Promise<{
    type: "success";
    data: Profile;
  }>;
  return (await getData.data) as Promise<{ type: "success"; data: Profile }>;
};
const getUserData = async (id: string, token: string) => {
  const getData = await api.get(`/user/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await getData.data;
};
export { getUserProfile, getUserData };
