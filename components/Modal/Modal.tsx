import { useState } from "react";
import { Dialog } from "@headlessui/react";
import api from "../../lib/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { fieldToUpdate, isOpenModal, userId } from "../../lib/atoms";
import { getCookie } from "cookies-next";
import { useMutation, useQueryClient } from "react-query";
import { AiFillCheckCircle } from "react-icons/ai";
import { notify } from "../../lib/helpers";
import { Toaster } from "react-hot-toast";
import { Profile } from "../../types/profile";
import { ProfileResponse } from "../../types/response";
import { VscError } from "react-icons/vsc";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/router";

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
  const [loading, setLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: (newData: Partial<Profile>) => {
      return api.put<ProfileResponse>(`/profile/update/${Id.id}`, newData, {
        headers: {
          Authorization: "Bearer " + getCookie("JWToken"),
        },
      });
    },
  });

  const handleChangeData = async () => {
    const data: any = {};
    data[field] = input;
    setLoading(true);
    mutation.mutate(data, {
      onSuccess: (data) => {
        setLoading(false);
        notify(
          data.data.message,
          <AiFillCheckCircle className="w-6 h-6 text-green-600" />
        );
      },
      onError: () => {
        setLoading(false);
        notify(
          "could not update your profile",
          <VscError className="w-6 h-6 text-red-600" />
        );
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 "
    >
      <Toaster />
      <div className="fixed inset-0 flex items-center justify-center p-4 text-white backdrop-blur-lg">
        <Dialog.Panel className="md:w-1/2">
          <Dialog.Title className="text-2xl font-bold">{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          <input
            type="text"
            className="p-2 my-3 bg-transparent border-2 border-black rounded-lg"
            value={input}
            id={id}
            onChange={(e) => setInput(e.target.value)}
          />
          <p>{body}</p>
          {!loading ? (
            <div className="flex gap-20 pt-5 md:justify-center ">
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
          ) : (
            <ImSpinner2 className="mx-auto mt-3 text-xl font-bold text-sky-600 animate-spin" />
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export { MyDialog as default };
