import { ActivityGroup } from "@/app/_data/businessActivities";
import { FiCheckCircle } from "react-icons/fi";

interface ActiveActivityCardProps {
  group: ActivityGroup;
}

export default function ActiveActivityCard({ group }: ActiveActivityCardProps) {
  return (
    <div className="w-full relative bg-white p-5 md:p-6 rounded-lg border-l-4 border-secondary shadow-sm hover:shadow-md transition-all duration-200">
      <div className="relative z-10">
        <div className="flex items-start gap-3 mb-3">
          <h5 className="text-primary">{group.name}</h5>
        </div>
        <p className="text-textP text-sm md:text-base leading-relaxed">
          {group.description}
        </p>
      </div>
    </div>
  );
}
