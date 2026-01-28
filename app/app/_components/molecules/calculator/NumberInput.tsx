type Props = {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  helperText?: string;
  label?: string;
};

export default function NumberInput({
  value,
  onChange,
  placeholder,
  helperText,
  label,
}: Props) {
  const formatNumber = (num: number) => {
    return num.toLocaleString("cs-CZ");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\s/g, "");
    if (inputValue === "" || !isNaN(Number(inputValue))) {
      onChange(Number(inputValue) || 0);
    }
  };

  return (
    <div>
      {label && <p className="text-sm text-primary my-2">{label}</p>}
      <input
        type="text"
        value={formatNumber(value)}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-4 border-2 border-zinc-300 rounded-xl font-oswald text-lg focus:border-secondary focus:outline-none transition-colors"
      />{" "}
      {helperText && <p className="text-sm text-textP mt-2">{helperText}</p>}
    </div>
  );
}
