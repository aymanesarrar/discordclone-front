import useToggle from "../../hooks/useToggle";
import Discord from "./Discord";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
const Navbar = () => {
  const { open, toggle, unsetToggle } = useToggle(false);
  return (
    <nav className="flex items-center justify-between p-4 font-bold text-white">
      <Discord fill="white" className="flex-[0.5] logo-3oeRIY" />
      <ul
        className={`${
          !open && "invisible"
        } md:visible absolute inset-y-0 right-0 p-16 text-black bg-white md:bg-transparent md:flex md:relative md:flex-row md:p-0 md:flex-1 md:text-white md:mx-auto md:justify-between flex-col flex gap-4`}
      >
        {open && (
          <GrClose
            className="absolute cursor-pointer top-3 right-10"
            onClick={unsetToggle}
          />
        )}
        <li className="md:transition-all md:duration-150 hover:cursor-pointer md:hover:-translate-y-1 hover:underline">
          Download
        </li>
        <li className="md:transition-all md:duration-150 hover:cursor-pointer md:hover:-translate-y-1 hover:underline">
          Nitro
        </li>
        <li className="md:transition-all md:duration-150 hover:cursor-pointer md:hover:-translate-y-1 hover:underline">
          Discover
        </li>
        <li className="md:transition-all md:duration-150 hover:cursor-pointer md:hover:-translate-y-1 hover:underline">
          Safety
        </li>
        <li className="md:transition-all md:duration-150 hover:cursor-pointer md:hover:-translate-y-1 hover:underline">
          Support
        </li>
        <li className="md:transition-all md:duration-150 hover:cursor-pointer md:hover:-translate-y-1 hover:underline">
          Blog
        </li>
        <li className="md:transition-all md:duration-150 hover:cursor-pointer md:hover:-translate-y-1 hover:underline">
          Careers
        </li>
      </ul>
      <div className="flex items-center justify-around flex-[0.5] md:justify-center">
        <button className="px-4 py-2 hover:text-[#5865f2] font-normal text-black bg-white rounded-3xl shadow-lg transition-all duration-150">
          Open Discorda
        </button>
        {!open && (
          <GiHamburgerMenu
            className="md:invisible hover:cursor-pointer"
            onClick={toggle}
          />
        )}
      </div>
    </nav>
  );
};
export { Navbar as default };
