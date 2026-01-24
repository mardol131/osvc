import { ActivityGroup } from "@/app/_data/businessActivities";
import Button from "@/app/_components/atoms/Button";

interface InactiveActivityCardProps {
  group: ActivityGroup;
  onAddClick: (group: ActivityGroup) => void;
}

export default function InactiveActivityCard({
  group,
  onAddClick,
}: InactiveActivityCardProps) {
  return (
    <div className="w-full relative bg-white p-5 md:p-6 rounded-lg border-l-4 border-secondary/30 shadow-sm hover:shadow-md transition-all duration-200 hover:border-secondary">
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h5 className="text-primary mb-2">{group.name}</h5>
            <p className="text-textP text-sm md:text-base leading-relaxed mb-3">
              {group.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="text-left">
              <p className="text-xs text-textP">ročně</p>
              <p className="text-xl md:text-2xl font-semibold text-secondary">
                {group.price} Kč
              </p>
            </div>
            <Button
              text="Dokoupit"
              onClick={() => onAddClick(group)}
              variant="gold"
              size="sm"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
