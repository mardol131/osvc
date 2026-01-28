type Props = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  marks?: { value: number; label: string }[];
};

export default function RangeInput({
  label,
  min,
  max,
  step,
  value,
  onChange,
  marks,
}: Props) {
  return (
    <div>
      <label className="block text-lg font-semibold text-primary mb-4">
        {label}
      </label>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-zinc-300 rounded-lg appearance-none cursor-pointer accent-secondary"
      />

      {marks && marks.length > 0 && (
        <div className="flex justify-between text-xs text-textP mt-2">
          {marks.map((mark, idx) => (
            <span key={idx}>{mark.label}</span>
          ))}
        </div>
      )}
    </div>
  );
}
