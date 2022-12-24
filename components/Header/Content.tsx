import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";
const Content = () => {
  return (
    <div className="flex flex-col items-start justify-start flex-1 max-w-3xl gap-4 p-2 mx-auto text-center text-white md:items-center md:justify-center">
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 2 }}
        className="text-5xl font-bold"
      >
        IMAGINE A PLACE...
      </motion.h1>
      <p className="text-left md:text-center">
        ...where you can belong to a school club, a gaming group, or a worldwide
        art community. Where just you and a handful of friends can spend time
        together. A place that makes it easy to talk every day and hang out more
        often.
      </p>
      <div className="flex flex-wrap gap-2">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="bg-white text-[#23272a] px-6 py-4 rounded-full text-xl flex items-center justify-center gap-1 hover:text-[#5865f2] transition-all duration-150"
        >
          <FiDownload className="font-bold" /> Download for Linux
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="bg-[#23272a] text-white px-6 py-4 rounded-full text-xl hover:shadow-xl hover:bg-[hsl(220,7.7%,22.9%)]"
        >
          Open Discord in your browser
        </motion.button>
      </div>
    </div>
  );
};
export { Content as default };
