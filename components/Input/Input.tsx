import { InputProps } from "../../types/auth";

const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  value,
  register,
  required,
  inputLabel,
}) => {
  return (
    <label htmlFor={id} className="flex flex-col gap-2 mt-2">
      {label}
      <input
        {...register(inputLabel, { required })}
        type={type}
        id={id}
        value={value}
        className="outline-none text-white bg-[#2F3338] px-4 py-2 rounded-sm focus:border-[1px] focus:border-[#748AD6]"
      />
    </label>
  );
};
export { Input as default };
