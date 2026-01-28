import { Lightbulb } from "lucide-react";

type Props = {
  text: string;
};

export default function TipBox({ text }: Props) {
  return (
    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
      <div className="flex items-start gap-2">
        <Lightbulb size={20} className="text-amber-900 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">{text}</p>
      </div>
    </div>
  );
}
