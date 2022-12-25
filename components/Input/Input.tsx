interface InputProps {
  label: string;
  type?: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, type, id }) => {
  return (
    <label htmlFor={id} className="flex flex-col gap-2 mt-2">
      {label}
      <input
        type={type}
        id={id}
        className="outline-none text-white bg-[#2F3338] px-4 py-2 rounded-sm focus:border-[1px] focus:border-[#748AD6]"
      />
    </label>
  );
};
export { Input as default };
