import toast, { Renderable } from "react-hot-toast";

const notify = (message: string, icon: Renderable) =>
  toast(message, { position: "top-right", icon });
export { notify };
