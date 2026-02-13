import React from "react";

type Props = {};

export default function HowToUseNotificationOnPhone({}: Props) {
  return (
    <div className="mt-4 space-y-6">
      {/* iPhone */}
      <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-100">
        <h6 className="font-semibold text-zinc-900 mb-3">iPhone (Safari)</h6>
        <p className="text-sm text-zinc-600 mb-3">
          Na iPhonu je potřeba nejdříve přidat OSVČ365 na plochu jako aplikaci:
        </p>
        <ol className="space-y-2 text-sm text-zinc-700">
          <li className="flex gap-2">
            <span className="font-semibold text-zinc-900 shrink-0">1.</span>
            <span>
              Otevřete <span className="font-medium">osvc365.cz</span> v Safari
              (jiné prohlížeče na iPhonu notifikace nepodporují).
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-zinc-900 shrink-0">2.</span>
            <span>
              Klepněte na ikonu <span className="font-medium">Sdílet</span>{" "}
              (čtverec se šipkou nahoru) ve spodní liště.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-zinc-900 shrink-0">3.</span>
            <span>
              Vyberte <span className="font-medium">Přidat na plochu</span> a
              potvrďte.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-zinc-900 shrink-0">4.</span>
            <span>Otevřete aplikaci OSVČ365 z plochy (ne ze Safari).</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-zinc-900 shrink-0">5.</span>
            <span>
              Přejděte do této sekce a klepněte na{" "}
              <span className="font-medium">Zapnout</span>.
            </span>
          </li>
        </ol>
        <p className="text-xs text-zinc-500 mt-3">
          Notifikace na iPhonu fungují pouze v aplikaci přidané na plochu.
          Vyžaduje iOS 16.4 nebo novější.
        </p>
      </div>

      {/* Android */}
      <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-100">
        <h6 className="font-semibold text-zinc-900 mb-3">Android (Chrome)</h6>
        <p className="text-sm text-zinc-600 mb-3">
          Na Androidu můžete notifikace zapnout přímo v prohlížeči, nebo si
          přidat aplikaci na plochu:
        </p>
        <ol className="space-y-2 text-sm text-zinc-700">
          <li className="flex gap-2">
            <span className="font-semibold text-zinc-900 shrink-0">1.</span>
            <span>
              Otevřete <span className="font-medium">osvc365.cz</span> v Chrome.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-zinc-900 shrink-0">2.</span>
            <span>
              Přejděte do této sekce a klepněte na{" "}
              <span className="font-medium">Zapnout</span>.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-zinc-900 shrink-0">3.</span>
            <span>
              Když se objeví dotaz na povolení notifikací, klepněte na{" "}
              <span className="font-medium">Povolit</span>.
            </span>
          </li>
        </ol>
        <p className="text-sm text-zinc-600 mt-4 mb-2">
          Pro lepší zážitek si můžete přidat aplikaci na plochu:
        </p>
        <ol className="space-y-2 text-sm text-zinc-700">
          <li className="flex gap-2">
            <span className="font-semibold text-zinc-900 shrink-0">1.</span>
            <span>Klepněte na tři tečky v pravém horním rohu Chrome.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-zinc-900 shrink-0">2.</span>
            <span>
              Vyberte <span className="font-medium">Přidat na plochu</span> nebo{" "}
              <span className="font-medium">Nainstalovat aplikaci</span>.
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}
