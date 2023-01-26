import { useState } from "react";
import { Dialog } from "@headlessui/react";
import api from "../../lib/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { fieldToUpdate, isOpenModal, userId } from "../../lib/atoms";
import { getCookie } from "cookies-next";
import { useMutation } from "react-query";

function MyDialog({
  title,
  description,
  body,
  updatedField,
  id,
}: {
  title?: string;
  description?: string;
  body?: string;
  updatedField?: string;
  id?: string;
}) {
  const [isOpen, setIsOpen] = useRecoilState(isOpenModal);
  const Id = useRecoilValue(userId);
  const [input, setInput] = useState("");
  const field = useRecoilValue(fieldToUpdate);
  const mutation = useMutation({
    mutationFn: (newData) => {
      return api.put(`/profile/update/${Id.id}`, newData, {
        headers: {
          Authorization: "Bearer " + getCookie("JWToken"),
        },
      });
    },
  });

  const handleChangeData = async () => {
    const data: any = {};
    data[field] = input;
    mutation.mutate(data);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 "
    >
      <div className="fixed inset-0 flex items-center justify-center p-4 text-white backdrop-blur-lg">
        <Dialog.Panel className="md:w-1/2">
          <Dialog.Title className="text-2xl font-bold md:text-center">
            {title}
          </Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          <input
            type="text"
            className="p-2 my-3 bg-transparent border-2 border-black rounded-lg"
            value={input}
            id={id}
            onChange={(e) => setInput(e.target.value)}
          />
          <p>{body}</p>
          <div className="flex gap-20 pt-5 md:justify-center">
            <button
              className="px-10 py-2 bg-sky-600 rounded-2xl"
              onClick={handleChangeData}
            >
              Change
            </button>
            <button
              className="px-10 py-2 bg-red-600 rounded-2xl"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export { MyDialog as default };
