import api from "./api";

const getUserProfile = async (id: string, token: string) => {
  const getData = await api.get(`/profile/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await getData.data;
};
export { getUserProfile };
