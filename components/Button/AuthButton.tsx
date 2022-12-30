import { FC } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IAuthButtonProps } from "../../types/Props/Button";

const AuthButton: FC<IAuthButtonProps> = ({ children, isLoading }) => {
  return (
    <button className="bg-[#748AD6] text-white px-4 py-2 w-full mt-4 hover:bg-[#6782e4]">
      {isLoading ? <ImSpinner2 className="mx-auto animate-spin" /> : children}
    </button>
  );
};
export { AuthButton as default };
