import { FaDiscord } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="min-h-screen bg-[#36393F] flex items-center justify-center">
      <FaDiscord className="text-[#7289DA] h-10 w-10 animate-ping" />
    </div>
  );
};
export { Loading as default };
