import { FiInfo } from "react-icons/fi";

interface ActivityPriceInfoProps {
  finalPriceThatWillBePaid: number | null;
  groupPrice: number;
}

export default function ActivityPriceInfo({
  finalPriceThatWillBePaid,
  groupPrice,
}: ActivityPriceInfoProps) {
  return (
    <div className="bg-linear-to-br from-emerald-50 to-emerald-100/50 border-l-4 border-emerald-500 rounded-xl p-5 md:p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <div className="shrink-0 w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
          <FiInfo className="text-white text-xl" />
        </div>
        <div className="flex-1">
          <h5 className="text-emerald-900 mb-1">Informace o platbě</h5>
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-sm text-emerald-700">K úhradě nyní:</p>
            <p className="text-3xl font-bold text-emerald-700">
              {finalPriceThatWillBePaid !== null
                ? `${finalPriceThatWillBePaid} Kč`
                : "Počítám..."}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-emerald-200">
        <p className="text-xs md:text-sm text-emerald-800 leading-relaxed">
          Cena je dopočítána podle zbývajícího období vašeho předplatného. Po
          jeho vypršení bude tento předmět podnikání účtován za{" "}
          <span className="font-semibold">{groupPrice} Kč/rok</span>. Skupina
          předmětů podnikání bude ihned dostupná pro další měsíc.
        </p>
      </div>
    </div>
  );
}
