import Content from "./Content";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="flex flex-col min-h-screen bg-[#404eed] relative">
      <Navbar />
      <Content />
    </header>
  );
};
export { Header as default };
