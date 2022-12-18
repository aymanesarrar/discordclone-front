import Image from "next/image";
import Content from "./Content";
import LeftIllustration from "./LeftIllustration";
import Navbar from "./Navbar";
import RightIllustration from "./RightIllustration";

const Header = () => {
  return (
    <header className="flex flex-col min-h-screen bg-[#404eed] relative overflow-hidden">
      <Navbar />
      <Content />
      <LeftIllustration
        initial={{ opacity: 0 }}
        animation={{ opacity: 1 }}
        className="invisible sm:visible absolute bottom-0 -left-[20rem]"
      />
      <RightIllustration
        initial={{ opacity: 0 }}
        animation={{ opacity: 1 }}
        className="absolute bottom-0 -right-[20rem]"
      />
    </header>
  );
};
export { Header as default };
