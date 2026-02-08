"use client";

import Button from "@/app/_components/atoms/Button";
import { ActivityGroup } from "@/app/_data/businessActivities";
import { FiCheckCircle } from "react-icons/fi";

type Props = {
  activeGroups: ActivityGroup[];
};

export default function EditSubscription({ activeGroups }: Props) {
  return (
    <>
      <div className="w-full mx-auto mb-8 md:mb-10">
        <div className="bg-white rounded-xl p-5 md:p-6 border-l-4 border-secondary/30 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-primary mb-3">
                Vaše aktivní předměty podnikání na tento měsíc
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeGroups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-lg text-sm"
                  >
                    <FiCheckCircle className="text-base shrink-0" />
                    <span>{group.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <Button
                text="Spravovat předplatné"
                variant="black"
                size="sm"
                href="/administrace/sprava-predplatneho"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Email Login Modal */}
    </>
  );
}
