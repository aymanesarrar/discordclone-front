import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { Token, userId } from "../lib/atoms";
import { getUserData } from "../lib/queries";

const useClient = () => {
  const token = useRecoilValue(Token);

  const decoded = useRecoilValue(userId);

  const {
    isLoading,
    error,
    data: user,
  } = useQuery("user", () => getUserData(decoded.id, token));

  return {
    isLoading,
    error,
    data: user,
  };
};
export default useClient;
