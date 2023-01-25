import { RefObject, useEffect } from "react";

const useOutsideEffect = <T extends RefObject<HTMLDivElement>>(
  ref: T,
  func: (arg?: any) => any,
  val: any
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        func(val);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, val, func]);
};
export default useOutsideEffect;
