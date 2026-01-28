"use client";

import React, { useState, useMemo, useEffect } from "react";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import Button from "@/app/_components/atoms/Button";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import OneStringInputCta from "@/app/_components/blocks/OneStringInputCta";
import RangeInput from "@/app/_components/molecules/calculator/RangeInput";
import NumberInput from "@/app/_components/molecules/calculator/NumberInput";
import CurrencyDisplay from "@/app/_components/molecules/calculator/CurrencyDisplay";
import InfoCard from "@/app/_components/molecules/calculator/InfoCard";
import CalculationBreakdown from "@/app/_components/molecules/calculator/CalculationBreakdown";
import TipBox from "@/app/_components/molecules/calculator/TipBox";
import RadioGroup, {
  type RadioOption,
} from "@/app/_components/molecules/calculator/RadioGroup";
import { TrendingUp, DollarSign, AlertCircle, Check, User } from "lucide-react";
import CheckboxToggle from "@/app/_components/molecules/calculator/CheckboxToggle";
import Select from "@/app/_components/molecules/calculator/Select";
import BuyButton from "@/app/_components/atoms/BuyButton";

// Paušální daň - sazby pro 2026
const FLAT_TAX_BAND1_MONTHLY = 9984; // Do 1 mil. Kč
const FLAT_TAX_BAND2_MONTHLY = 16745; // 1 - 1,5 mil. Kč
const FLAT_TAX_BAND3_MONTHLY = 27139; // 1,5 - 2 mil. Kč
const FLAT_TAX_LIMIT = 2000000; // Max limit pro paušální daň

// Paušální výdaje - procenta podle typu činnosti
const COST_PERCENT_40 = 0.4; // 40% paušál - IT, poradenství
const COST_PERCENT_60 = 0.6; // 60% paušál - obchod, služby
const COST_PERCENT_80 = 0.8; // 80% paušál - zemědělství, lesnictví

// Daňová sazba
const INCOME_TAX_RATE = 0.15; // 15% sazba daně z příjmů

// Sociální a zdravotní pojištění (paušální výdaje)
// Minimální měsíční zálohy (použito pro odhad, vychází z aktuálních hodnot)
const MIN_HEALTH_MONTHLY_MAIN = 3306;
const MIN_SOCIAL_MONTHLY_MAIN = 5720;

// Sazby pojištění (použijeme pro výpočet z vyměřovacího základu)
const HEALTH_RATE = 0.135; // 13.5% zdravotní
const SOCIAL_RATE = 0.095; // 9.5% sociální (6.5% + 3%)

// Slevy na dani

const SLEVA_NA_POPLATNIKA = 30840; // ročně
const SLEVA_NA_DITE = 15168; // ročně na 1 dítě

const costOptions: RadioOption[] = [
  {
    value: COST_PERCENT_40,
    label: "40% paušál",
    description: "IT služby, poradenství, konzultace",
  },
  {
    value: COST_PERCENT_60,
    label: "60% paušál",
    description: "Obchod, prodej, služby",
  },
  {
    value: COST_PERCENT_80,
    label: "80% paušál",
    description: "Zemědělství, lesnictví",
  },
];

const bandOptions: RadioOption[] = [
  {
    value: "band1",
    label: "Pásmo 1",
    description: "do 1 mil. Kč — 8 239 Kč/měs.",
  },
  {
    value: "band2",
    label: "Pásmo 2",
    description: "1–1,5 mil. Kč — 16 745 Kč/měs.",
  },
  {
    value: "band3",
    label: "Pásmo 3",
    description: "1,5–2 mil. Kč — 27 139 Kč/měs.",
  },
];

type CostPercentType =
  | typeof COST_PERCENT_40
  | typeof COST_PERCENT_60
  | typeof COST_PERCENT_80;

export default function FlatTaxVsCostCalculator() {
  const [annualIncome, setAnnualIncome] = useState<number>(1000000);
  const [costPercent, setCostPercent] = useState<CostPercentType>(0.6);
  const deriveBandFromIncome = (income: number) => {
    if (income <= 1000000) return "band1";
    if (income <= 1500000) return "band2";
    return "band3";
  };
  const [selectedBand, setSelectedBand] = useState<string>(() =>
    deriveBandFromIncome(1000000),
  );
  // Detailed parameters (defaults are editable)
  const [basicTaxpayer, setBasicTaxpayer] = useState<boolean>(true);
  const [childCount, setChildCount] = useState<number>(0);
  const [childZtpCount, setChildZtpCount] = useState<number>(0);
  const [childZtpCreditPer, setChildZtpCreditPer] = useState<number>(50000);
  const [spouseCare, setSpouseCare] = useState<boolean>(false);
  const [spouseCreditAmount, setSpouseCreditAmount] = useState<number>(
    2688 * 12,
  );
  const [spouseZtpCare, setSpouseZtpCare] = useState<boolean>(false);
  const [spouseZtpAmount, setSpouseZtpAmount] = useState<number>(50000);
  const [invalid12, setInvalid12] = useState<boolean>(false);
  const [invalid12Amount, setInvalid12Amount] = useState<number>(2500 * 12);
  const [invalid3, setInvalid3] = useState<boolean>(false);
  const [invalid3Amount, setInvalid3Amount] = useState<number>(5000 * 12);
  const [holderZtp, setHolderZtp] = useState<boolean>(false);
  const [holderZtpAmount, setHolderZtpAmount] = useState<number>(50000);

  // Nezdanitelne castky
  const [pensionPaid, setPensionPaid] = useState<number>(0);
  const [investmentPaid, setInvestmentPaid] = useState<number>(0);
  const [lifeInsurancePaid, setLifeInsurancePaid] = useState<number>(0);
  const [interestPaid, setInterestPaid] = useState<number>(0);
  const [otherNonTaxable, setOtherNonTaxable] = useState<number>(0);

  const [showDetails, setShowDetails] = useState<boolean>(false);

  const calculations = useMemo(() => {
    // Paušální výdaje (normální režim)
    //////////////////////////////////////////////////
    const expensesAmount = annualIncome * costPercent;
    const profit = Math.max(0, annualIncome - expensesAmount);

    // Daň z příjmů (základní výpočet bude přepočten po započtení nezdanitelných částek a slev)
    // Nejprve se vypočte nezdanitelná částka (suma položek) a sníží se zisk
    const nonTaxableTotal =
      pensionPaid +
      investmentPaid +
      lifeInsurancePaid +
      interestPaid +
      otherNonTaxable;

    const taxableProfit = Math.max(0, profit - nonTaxableTotal);

    // Daň před slevami
    const incomeTax = Math.round(taxableProfit * INCOME_TAX_RATE);

    // Slevy na dani (suma podle nastavení)
    const totalTaxSaleCredits =
      (basicTaxpayer ? SLEVA_NA_POPLATNIKA : 0) +
      (spouseCare ? spouseCreditAmount : 0) +
      (spouseZtpCare ? spouseZtpAmount : 0) +
      (invalid12 ? invalid12Amount : 0) +
      (invalid3 ? invalid3Amount : 0) +
      (holderZtp ? holderZtpAmount : 0);

    const incomeTaxAfterCredits = Math.max(0, incomeTax - totalTaxSaleCredits);

    const totalTaxBenefits =
      childCount * SLEVA_NA_DITE + childZtpCount * (SLEVA_NA_DITE * 2);

    const incomeTaxAfterBenefits = incomeTaxAfterCredits - totalTaxBenefits;

    // Vyměřovací základ pro pojištění (zjednodušeně 50% ze zisku)
    //////////////////////////////////////////////
    const assessmentBaseAnnual = profit * 0.5;

    // Zdravotní pojištění (roční) s minimem
    const healthAnnualRaw = assessmentBaseAnnual * HEALTH_RATE;

    // Sociální pojištění (roční) s minimem
    const socialAnnualRaw = assessmentBaseAnnual * SOCIAL_RATE;

    // Minima podle typu činnosti (hlavní/vedlejší) - použijeme roční hodnoty
    // Note: zde počítáme roční minima jako měsíční minima * 12
    // Ve formuláři nemáme informaci o tom, zda je hlavní/vedlejší, takže použijeme obecné hlavní minima pro hrubý odhad
    const minHealthAnnualMain = MIN_HEALTH_MONTHLY_MAIN * 12;
    const minSocialAnnualMain = MIN_SOCIAL_MONTHLY_MAIN * 12;

    // For this calculator we conservatively use MAIN minima for estimation
    const healthAnnual = Math.round(
      Math.max(healthAnnualRaw, minHealthAnnualMain),
    );
    const socialAnnual = Math.round(
      Math.max(socialAnnualRaw, minSocialAnnualMain),
    );

    const socialHealthInsurance = healthAnnual + socialAnnual;

    const totalCostMethod = incomeTaxAfterBenefits + socialHealthInsurance;

    const costPercentLabel =
      costPercent === 0.4
        ? "40% (IT, poradenství)"
        : costPercent === 0.6
          ? "60% (obchod, služby)"
          : "80% (zemědělství)";

    return {
      // Paušální výdaje
      expensesAmount: Math.round(expensesAmount),
      profit: Math.round(profit),
      assessmentBaseAnnual: Math.round(assessmentBaseAnnual),
      incomeTax,
      healthAnnual,
      socialAnnual,
      socialHealthInsurance,
      totalCostMethod,
      costPercentLabel,
      taxableProfit,
      incomeTaxAfterCredits,
      incomeTaxAfterBenefits,
    };
  }, [
    annualIncome,
    costPercent,
    selectedBand,
    pensionPaid,
    investmentPaid,
    lifeInsurancePaid,
    interestPaid,
    otherNonTaxable,
    basicTaxpayer,
    childCount,
    childZtpCount,
    childZtpCreditPer,
    spouseCare,
    spouseCreditAmount,
    spouseZtpCare,
    spouseZtpAmount,
    invalid12,
    invalid12Amount,
    invalid3,
    invalid3Amount,
    holderZtp,
    holderZtpAmount,
  ]);

  const flatTaxCalculations = useMemo(() => {
    // Paušální daň - použije se vybrané pásmo (pokud je paušální daň dostupná)
    const canUseFlatTax = annualIncome <= FLAT_TAX_LIMIT;
    let flatTaxMonthly = 0;
    let flatTaxBand = "";

    if (canUseFlatTax) {
      if (selectedBand === "band1") {
        flatTaxMonthly = FLAT_TAX_BAND1_MONTHLY;
        flatTaxBand = "1. pásmo";
      } else if (selectedBand === "band2") {
        flatTaxMonthly = FLAT_TAX_BAND2_MONTHLY;
        flatTaxBand = "2. pásmo";
      } else if (selectedBand === "band3") {
        flatTaxMonthly = FLAT_TAX_BAND3_MONTHLY;
        flatTaxBand = "3. pásmo";
      }
    }

    const flatTaxAnnual = flatTaxMonthly * 12;
    return { flatTaxMonthly, flatTaxAnnual, flatTaxBand, canUseFlatTax };
  }, [annualIncome, selectedBand]);

  const resultsCalculations = useMemo(() => {
    // Úspora
    const savings =
      calculations.totalCostMethod - flatTaxCalculations.flatTaxAnnual;
    const savingsPercentage =
      calculations.totalCostMethod > 0
        ? ((savings / calculations.totalCostMethod) * 100).toFixed(1)
        : "0.0";

    const costPercentLabel =
      costPercent === 0.4
        ? "40% (IT, poradenství)"
        : costPercent === 0.6
          ? "60% (obchod, služby)"
          : "80% (zemědělství)";

    const isFlatTaxBetter = savings > 0;
    return {
      savings,
      savingsPercentage,
      costPercentLabel,
      isFlatTaxBetter,
    };
  }, [
    calculations.totalCostMethod,
    flatTaxCalculations.flatTaxAnnual,
    costPercent,
  ]);

  const handleSliderChange = (value: number) => {
    setAnnualIncome(value);
  };

  const handleInputChange = (value: number) => {
    setAnnualIncome(Math.min(value, FLAT_TAX_LIMIT * 1.2));
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: 0,
    });
  };

  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Paušální daň vs. Paušální výdaje",
          secondHeading: "Která varianta se vám vyplatí?",
          text: "Porovnávejte paušální daň (zjednodušený režim bez DPH) s tradičním režimem paušálních výdajů. Zjistěte, kolik Kč si každý měsíc ušetříte.",
          buttonsColumns: 1,
        }}
      />

      <SectionWrapper>
        <div className="w-full max-w-3xl mx-auto">
          {/* Kalkulátor */}
          <div className="bg-white rounded-2xl border-2 border-zinc-200 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bebas mb-8">
              Porovnání režimů zdanění
            </h2>

            {/* Input - Roční příjmy */}
            <div className="mb-8">
              <RangeInput
                label="Roční příjmy"
                min={100000}
                max={2400000}
                step={50000}
                value={annualIncome}
                onChange={handleSliderChange}
                marks={[
                  { value: 100000, label: "100 tis." },
                  { value: 500000, label: "500 tis." },
                  { value: 1000000, label: "1 mil." },
                  { value: 1500000, label: "1,5 mil." },
                  { value: 2000000, label: "2 mil." },
                ]}
              />
            </div>

            <NumberInput
              value={annualIncome}
              onChange={handleInputChange}
              placeholder="Zadejte roční příjmy"
              helperText="Paušální daň je k dispozici do 2 mil. Kč/rok"
            />
            {!flatTaxCalculations.canUseFlatTax && (
              <div className="my-8 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900">
                    Paušální daň není dostupná
                  </p>
                  <p className="text-sm text-red-800 mt-1">
                    Vaše příjmy překračují limit 2 milionů Kč. Pro vás je
                    dostupný jen režim paušálních výdajů.
                  </p>
                </div>
              </div>
            )}
            {/* Výběr paušálu */}
            <div className="my-10 pt-8 border-t border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RadioGroup
                  label="Druh paušálních výdajů (režim s paušálními výdaji)"
                  name="costPercent"
                  value={costPercent}
                  onChange={(val) => setCostPercent(val as CostPercentType)}
                  options={costOptions}
                />
                <RadioGroup
                  label="Pásmo paušální daně"
                  name="flatTaxBand"
                  value={selectedBand}
                  onChange={(val) => setSelectedBand(String(val))}
                  options={bandOptions}
                />
              </div>
            </div>

            {/* Upozornění - překročení limitu */}

            {/* Výsledky */}
            <div className="mt-12 mb-5 space-y-6">
              {/* Rozbalitelné parametry pro přesnější výpočet */}
              <div className="mb-6">
                <Button
                  onClick={() => setShowDetails(!showDetails)}
                  text={`${showDetails ? "Skrýt" : "Zobrazit"} parametry pro přesnější výpočet`}
                  variant="outlined"
                  size="xs"
                />
                {showDetails && (
                  <div className="mt-4 p-4 rounded-lg border border-zinc-200 bg-secondary/5">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-3">
                        <p className="font-semibold mb-2">
                          Slevy na dani (automaticky dopočítané)
                        </p>
                        <CheckboxToggle
                          label="Sleva na poplatníka"
                          checked={basicTaxpayer}
                          onChange={setBasicTaxpayer}
                          amount={SLEVA_NA_POPLATNIKA}
                        />
                        <CheckboxToggle
                          label="Na manžela/manželku pečující o dítě do 3 let"
                          checked={spouseCare}
                          onChange={setSpouseCare}
                          amount={spouseCreditAmount}
                        />
                        <CheckboxToggle
                          label="Manžel/manželka s průkazem ZTP/P pečující o dítě"
                          checked={spouseZtpCare}
                          onChange={setSpouseZtpCare}
                          amount={spouseZtpAmount}
                        />
                        <CheckboxToggle
                          label="Invalidní důchod 1. nebo 2. stupně"
                          checked={invalid12}
                          onChange={setInvalid12}
                          amount={invalid12Amount}
                        />
                        <CheckboxToggle
                          label="Invalidní důchod 3. stupně"
                          checked={invalid3}
                          onChange={setInvalid3}
                          amount={invalid3Amount}
                        />
                        <CheckboxToggle
                          label="Držitel průkazu ZTP/P"
                          checked={holderZtp}
                          onChange={setHolderZtp}
                          amount={holderZtpAmount}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="font-semibold mb-2">Počet dětí</p>
                        <div className="flex flex-row gap-4 items-center justify-between">
                          <div className="flex gap-4 items-center">
                            <div className="flex flex-col">
                              <label
                                htmlFor="childCount"
                                className="text-xs text-zinc-600 mb-1"
                              >
                                Počet dětí
                              </label>
                              <div className="border border-zinc-300 rounded-lg px-3 py-2 min-w-[120px] bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                                <select
                                  className="w-full"
                                  id="childCount"
                                  value={childCount}
                                  onChange={(e) => {
                                    const newChildCount = Number(
                                      e.target.value,
                                    );
                                    setChildCount(newChildCount);
                                    if (childZtpCount > newChildCount) {
                                      setChildZtpCount(newChildCount);
                                    }
                                  }}
                                >
                                  {Array.from({ length: 11 }, (_, i) => (
                                    <option key={i} value={i}>
                                      {i}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="childZtpCount"
                                className="text-xs text-zinc-600 mb-1"
                              >
                                Počet dětí ZTP/P
                              </label>
                              <div className="border border-zinc-300 rounded-lg px-3 py-2 min-w-[140px] bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                                <select
                                  className="w-full"
                                  id="childZtpCount"
                                  value={childZtpCount}
                                  onChange={(e) => {
                                    const newZtpCount = Number(e.target.value);
                                    setChildZtpCount(
                                      Math.min(newZtpCount, childCount),
                                    );
                                  }}
                                >
                                  {Array.from(
                                    { length: childCount + 1 },
                                    (_, i) => (
                                      <option key={i} value={i}>
                                        {i}
                                      </option>
                                    ),
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <p>Sleva na děti:&nbsp;</p>
                            <p className="">
                              {formatCurrency(
                                childCount * SLEVA_NA_DITE +
                                  childZtpCount * (SLEVA_NA_DITE * 2),
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Nezdanitelné částky (zadejte ročně)
                        </p>
                        <div className="space-y-2">
                          <NumberInput
                            value={pensionPaid}
                            onChange={setPensionPaid}
                            placeholder="Zaplacené penzijní (Kč/rok)"
                            label="Zaplacené penzijní připojištění"
                          />
                          <NumberInput
                            value={investmentPaid}
                            onChange={setInvestmentPaid}
                            placeholder="Zaplacené investiční (Kč/rok)"
                            label="Zaplacené investiční připojištění"
                          />
                          <NumberInput
                            value={lifeInsurancePaid}
                            onChange={setLifeInsurancePaid}
                            placeholder="Zaplacené životní připojištění (Kč/rok)"
                            label="Zaplacené životní připojištění"
                          />
                          <NumberInput
                            value={interestPaid}
                            onChange={setInterestPaid}
                            placeholder="Zaplacené úroky (Kč/rok)"
                            label="Zaplacené úroky"
                          />
                          <NumberInput
                            value={otherNonTaxable}
                            onChange={setOtherNonTaxable}
                            placeholder="Ostatní nezdanitelné (Kč/rok)"
                            label="Ostatní nezdanitelné částky"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Paušální výdaje */}
                <CalculationBreakdown
                  title={`Paušální výdaje (${Math.round(costPercent * 100)}%)`}
                  items={[
                    {
                      type: "calculation",
                      label: "Uplatněné výdaje",
                      value: formatCurrency(calculations.expensesAmount),
                      description: "Paušální % z příjmů",
                    },
                    {
                      type: "calculation",

                      label: "Zisk před zdaněním",
                      value: formatCurrency(calculations.profit),
                      description: "Příjmy − paušální výdaje",
                    },
                    {
                      type: "divider",
                      label: "Výpočet sociálního a zdravotního pojištění",
                    },
                    {
                      type: "calculation",

                      label: "Vyměřovací základ (ročně)",
                      value: formatCurrency(calculations.assessmentBaseAnnual),
                      description: "50% ze zisku (odhad)",
                    },
                    {
                      type: "calculation",

                      label: "Zdravotní pojištění (ročně)",
                      value: formatCurrency(calculations.healthAnnual),
                      description:
                        "13.5% z vyměřovacího základu; minimum aplikováno",
                    },
                    {
                      type: "calculation",

                      label: "Sociální pojištění (ročně)",
                      value: formatCurrency(calculations.socialAnnual),
                      description:
                        "9.5% z vyměřovacího základu; minimum aplikováno",
                    },
                    {
                      type: "divider",
                      label: "Výpočet daně",
                    },
                    {
                      type: "calculation",

                      label: "Daňový základ",
                      value: formatCurrency(calculations.taxableProfit),
                      description: "Příjmy − paušální výdaje",
                    },
                    {
                      type: "calculation",
                      label: "Daň z příjmů",
                      value: formatCurrency(calculations.incomeTax),
                      description: "15% z vyměřitelného základu",
                    },
                    {
                      type: "calculation",

                      label: "Daň po slevách",
                      value: formatCurrency(calculations.incomeTaxAfterCredits),
                      description: "Daň po odečtení slev",
                    },
                    {
                      type: "calculation",

                      label: "Výsledná daň/daňový bonus (přeplatek)",
                      value: formatCurrency(
                        calculations.incomeTaxAfterBenefits,
                      ),
                      description: "Daň po daňovém zvýhodnění",
                    },
                  ]}
                  result={{
                    type: "calculation",
                    label: "Celkem (ročně)",
                    value: formatCurrency(calculations.totalCostMethod),
                    description: "Daň + pojištění",
                  }}
                  className="flex flex-col justify-between"
                />
                {/* Paušální daň */}
                <CalculationBreakdown
                  title="Paušální daň"
                  items={[
                    {
                      type: "calculation",
                      label: `Pásmo`,
                      value: flatTaxCalculations.flatTaxBand || "—",
                      description: "Vybrané pásmo paušální daně",
                    },
                    {
                      type: "calculation",
                      label: `Měsíční platba`,
                      value:
                        formatCurrency(flatTaxCalculations.flatTaxMonthly) +
                        "/měs.",
                      description: "Fixní měsíční částka",
                    },
                  ]}
                  result={{
                    type: "calculation",
                    label: "Roční platba",
                    value: formatCurrency(flatTaxCalculations.flatTaxAnnual),
                    description: "Souhrn za rok",
                  }}
                  className="flex flex-col justify-between"
                />
              </div>

              {/* Porovnání */}
              <div className="mt-8 pt-8 border-t-2 border-zinc-200">
                <div
                  className={`p-6 rounded-xl ${
                    resultsCalculations.isFlatTaxBetter
                      ? "bg-green-50 border-2 border-green-200"
                      : "bg-orange-50 border-2 border-orange-200"
                  }`}
                >
                  <div className="flex gap-3 mb-3">
                    {resultsCalculations.isFlatTaxBetter ? (
                      <Check className="w-6 h-6 text-green-600 shrink-0" />
                    ) : (
                      <TrendingUp className="w-6 h-6 text-orange-600 shrink-0" />
                    )}
                    <h4
                      className={`text-lg font-bebas ${
                        resultsCalculations.isFlatTaxBetter
                          ? "text-green-900"
                          : "text-orange-900"
                      }`}
                    >
                      {resultsCalculations.isFlatTaxBetter
                        ? "Paušální daň se vám vyplatí"
                        : "Paušální výdaje jsou lepší"}
                    </h4>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span
                        className={
                          resultsCalculations.isFlatTaxBetter
                            ? "text-green-800"
                            : "text-orange-800"
                        }
                      >
                        Měsíční úspora/prodlení
                      </span>
                      <span
                        className={`text-2xl font-bebas ${
                          resultsCalculations.isFlatTaxBetter
                            ? "text-green-900"
                            : "text-orange-900"
                        }`}
                      >
                        {resultsCalculations.isFlatTaxBetter ? "+" : "-"}
                        {formatCurrency(
                          Math.abs(resultsCalculations.savings) / 12,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span
                        className={
                          resultsCalculations.isFlatTaxBetter
                            ? "text-green-700"
                            : "text-orange-700"
                        }
                      >
                        Roční úspora/prodlení
                      </span>
                      <span
                        className={`text-lg font-semibold ${
                          resultsCalculations.isFlatTaxBetter
                            ? "text-green-800"
                            : "text-orange-800"
                        }`}
                      >
                        {resultsCalculations.isFlatTaxBetter ? "+" : "-"}
                        {formatCurrency(Math.abs(resultsCalculations.savings))}
                      </span>
                    </div>
                    {resultsCalculations.savingsPercentage !== "0.0" && (
                      <div className="flex justify-between items-center text-sm pt-2 border-t border-current/20">
                        <span
                          className={
                            resultsCalculations.isFlatTaxBetter
                              ? "text-green-700"
                              : "text-orange-700"
                          }
                        >
                          Procento úspory
                        </span>
                        <span
                          className={
                            resultsCalculations.isFlatTaxBetter
                              ? "text-green-800"
                              : "text-orange-800"
                          }
                        >
                          {resultsCalculations.savingsPercentage}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tipy */}
            <TipBox text="Paušální daň je vhodná pro jednoduché podnikání bez DPH. Nemusíte podávat daňové přiznání - jen platíte měsíčně. Naopak paušální výdaje se vyplatí, máte-li vyšší skutečné náklady a chcete si uplatnit daňové slevy." />
          </div>

          {/* Informační karty */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <InfoCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Paušální daň"
              description="Zjednodušený režim - měsíční fixní platba, bez podávání přiznání, bez DPH, vhodné do 2 mil. Kč/rok."
            />
            <InfoCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Paušální výdaje"
              description="Tradičnější režim - počítá se procento výdajů, podání přiznání, možnost slev, lepší pro vyšší příjmy."
            />
          </div>
        </div>
      </SectionWrapper>

      <OneStringInputCta
        options={{
          heading: "Máte dotazy k daňovému plánování?",
          subheading:
            "Pošlete nám svou e-mailovou adresu a my vám pošleme podrobný průvodce.",
          buttonText: "Poslat",
          inputType: "email",
          dataDestination: "/api/subscribe",
          placeholder: "Vaš e-mail",
        }}
      />
    </>
  );
}
