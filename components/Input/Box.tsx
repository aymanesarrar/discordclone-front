import { BsFillPencilFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { fieldToUpdate, isOpenModal } from "../../lib/atoms";
import Modal from "../Modal/Modal";
const Box = ({
  title,
  data,
  field,
}: {
  title: string;
  data: string | undefined;
  field: string;
}) => {
  const [openModal, setOpenModal] = useRecoilState(isOpenModal);
  const [UpdatedField, setUpdatedField] = useRecoilState(fieldToUpdate);
  const handleChange = () => {
    setOpenModal(true);
    setUpdatedField(field);
  };

  return (
    <div className="flex flex-col w-[60%] gap-2 text-white transition-all duration-150 hover:scale-105 md:w-1/2 md:pl-10">
      <span className="text-lg font-bold">{title}</span>
      <span className="flex items-center justify-between p-3 border-2 rounded-xl">
        {data}
        <BsFillPencilFill onClick={handleChange} className="cursor-pointer" />
      </span>
    </div>
  );
};
export { Box as default };
