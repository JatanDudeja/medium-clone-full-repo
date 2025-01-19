interface InputValues {
  label: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  css?: string;
}

export function CustomInput({
  label,
  placeHolder,
  onChange,
  type,
  css,
}: InputValues) {
  return (
    <div className="flex flex-col justify-center gap-2">
      <p className=" font-bold">{label}</p>
      <input
        className={`border-solid p-3 border-2 rounded-lg focus:outline-none focus:border-black hover:border-gray-400 ${css}`}
        placeholder={placeHolder}
        type={type ? type : ""}
        onChange={onChange}
        required
      />
    </div>
  );
}
