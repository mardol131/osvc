import { Check, X } from "lucide-react";

interface CostItemProps {
  label: string;
  value: string;
  negative?: boolean;
  positive?: boolean;
}

export default function CostItem({
  label,
  value,
  negative,
  positive,
}: CostItemProps) {
  return (
    <div className="flex justify-between items-start gap-3 py-3 border-b border-zinc-100 last:border-0">
      <div className="flex items-center gap-3 flex-1">
        {negative && <X className="shrink-0 text-zinc-400 w-5 h-5" />}
        {positive && <Check className="shrink-0 text-secondary w-5 h-5" />}
        <span className="text-textP text-base leading-relaxed">{label}</span>
      </div>
      <span
        className={`font-bebas shrink-0 text-base ${
          negative ? "text-textP" : positive ? "text-secondary" : "text-primary"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
