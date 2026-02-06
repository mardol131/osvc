import { Gift } from "lucide-react";

type Props = {};

export default function DetailedActivitiesBanner({}: Props) {
  return (
    <div className="w-full px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto relative overflow-hidden">
        {/* Dekorativní pozadí */}

        <div className="relative z-10 mb-8 border border-secondary/20 rounded-2xl p-10 md:p-12 shadow-md  transition-all duration-300">
          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            {/* Ikona */}

            <div className="flex-shrink-0 p-3 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary  transition-transform duration-300">
              <Gift className="w-11 h-11" />
            </div>

            {/* Obsah */}
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bebas text-primary">
                Pomožte i ostatním
              </h3>
              <p className="text-lg text-textP leading-relaxed max-w-2xl">
                Po zakoupení předplatného obdržíte do emailu{" "}
                <span className="text-secondary font-bebas text-xl">
                  10% slevový kód
                </span>
                , který můžete předat přátelům, rodině nebo kolegům.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
