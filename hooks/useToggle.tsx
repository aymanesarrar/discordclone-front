import { useState } from "react";
const useToggle = (state: boolean) => {
  const [open, setOpen] = useState<boolean>(state);

  const toggle = () => {
    setOpen(true);
  };
  const unsetToggle = () => {
    setOpen(false);
  };
  return {
    open,
    toggle,
    unsetToggle,
  };
};
export { useToggle as default };
