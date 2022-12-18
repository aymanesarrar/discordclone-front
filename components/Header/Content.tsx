import { FiDownload } from "react-icons/fi";
const Content = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 max-w-3xl gap-4 mx-auto text-center text-white ">
      <h1 className="text-5xl font-bold">IMAGINE A PLACE...</h1>
      <p>
        ...where you can belong to a school club, a gaming group, or a worldwide
        art community. Where just you and a handful of friends can spend time
        together. A place that makes it easy to talk every day and hang out more
        often.
      </p>
      <div className="flex flex-wrap gap-2">
        <button className="bg-white text-[#23272a] px-6 py-4 rounded-full text-xl flex items-center justify-center gap-1 hover:text-[#5865f2] transition-all duration-150">
          <FiDownload className="font-bold" /> Download for Linux
        </button>
        <button className="bg-[#23272a] text-white px-6 py-4 rounded-full text-xl hover:shadow-xl hover:bg-[hsl(220,7.7%,22.9%)]">
          Open Discord in your browser
        </button>
      </div>
    </div>
  );
};
export { Content as default };
