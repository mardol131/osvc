"use client";

import React, { useState, useMemo, useEffect, use } from "react";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import Button from "@/app/_components/atoms/Button";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import OneStringInputCta from "@/app/_components/blocks/OneStringInputCta";
import RangeInput from "@/app/_components/molecules/calculator/RangeInput";
import NumberInput from "@/app/_components/molecules/calculator/NumberInput";
import CurrencyDisplay from "@/app/_components/molecules/calculator/CurrencyDisplay";
import InfoCard from "@/app/_components/molecules/calculator/InfoCard";
import CalculationBreakdown, {
  BreakdownItem,
  CalculationBreakdownProps,
} from "@/app/_components/molecules/calculator/CalculationBreakdown";
import TipBox from "@/app/_components/molecules/calculator/TipBox";
import RadioGroup, {
  type RadioOption,
} from "@/app/_components/molecules/calculator/RadioGroup";
import { TrendingUp, DollarSign, AlertCircle, Check, User } from "lucide-react";
import CheckboxToggle from "@/app/_components/molecules/calculator/CheckboxToggle";
import Select from "@/app/_components/molecules/calculator/Select";
import BuyButton from "@/app/_components/atoms/BuyButton";
import Divider from "./calculator/Divider";
import { FaXmark } from "react-icons/fa6";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

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

// Minimální příjem pro vedlejší činnost (pro odhad pojištění)
const MINIMAL_INCOME_FOR_SECONDARY_ACTIVITY = 117521;

// Sociální a zdravotní pojištění (paušální výdaje)
// Minimální měsíční zálohy (použito pro odhad, vychází z aktuálních hodnot)
const MIN_HEALTH_MONTHLY_MAIN = 3143;
const MIN_SOCIAL_MONTHLY_MAIN = 4759;
const MIN_SOCIAL_MONTHLY_SECONDARY = 1574;

// Sazby pojištění (použijeme pro výpočet z vyměřovacího základu)
const HEALTH_RATE = 0.135; // 13.5% zdravotní
const SOCIAL_RATE = 0.095; // 9.5% sociální (6.5% + 3%)

// Slevy na dani

const SLEVA_NA_POPLATNIKA = 30840; // ročně
const SLEVA_NA_DITE = [15204, 22320, 27840]; // první, druhé, třetí a další dítě
const SLEVA_NA_MANZELKU = 24840;
const SLEVA_NA_MANZELKU_DITE_ZTP = 49680;
const INVALIDITA_1_2_STUPNE = 2520;
const INVALIDITA_3_STUPNE = 5040;
const DRZITEL_ZTP = 16140;

const costOptions: RadioOption[] = [
  {
    value: COST_PERCENT_40,
    label: "40% paušál",
    description: "Autorská činnost, svobodná povolání atd.",
  },
  {
    value: COST_PERCENT_60,
    label: "60% paušál",
    description: "Zejména volné živnosti",
  },
  {
    value: COST_PERCENT_80,
    label: "80% paušál",
    description: "Zemědělství, lesnictví, řemeslné atd.",
  },
];

const bandOptions: RadioOption[] = [
  {
    value: "band1",
    label: "Pásmo 1",
    description: `${FLAT_TAX_BAND1_MONTHLY} Kč/měs.`,
  },
  {
    value: "band2",
    label: "Pásmo 2",
    description: `${FLAT_TAX_BAND2_MONTHLY} Kč/měs.`,
  },
  {
    value: "band3",
    label: "Pásmo 3",
    description: `${FLAT_TAX_BAND3_MONTHLY} Kč/měs.`,
  },
];

const costDistribution: RadioOption[] = [
  {
    value: "undefined",
    label: "Rozdělení příjmu dle výdajových paušálů neznám",
    description: "",
  },
  {
    value: "60-80",
    label:
      "75 % příjmů pochází z činností, na které se vztahuje 60% nebo 80% paušál",
    description: "",
  },
  {
    value: "80",
    label: "75 % příjmů pochází z činností, na které se vztahuje 80% paušál",
    description: "",
  },
];

const isActivityPrimary: RadioOption[] = [
  {
    value: true,
    label: "Podnikám na hlavní výdělečnou činnost",
    description: "",
  },
  {
    value: false,
    label: "Podnikám na vedlejší výdělečnou činnost",
  },
];

const useDetailedOptions: RadioOption[] = [
  {
    value: true,
    label: "Chci započítávat daňové slevy a zvýhodnění",
    description: "",
  },
  {
    value: false,
    label: "Nechci započítávat daňové slevy a zvýhodnění",
    description:
      "Např. pokud podnikáte na vedlejší činnost a jste zároveň zaměstnanec, takže za vás uplatňuje slevy a zvýhodnění zaměstnavatel.",
  },
];

type CostPercentType =
  | typeof COST_PERCENT_40
  | typeof COST_PERCENT_60
  | typeof COST_PERCENT_80;

type Props = {
  useCostRateRange?: boolean;
  useCostRateOptions?: boolean;
  useTaxRateOptions?: boolean;
  useDetailedParameters?: boolean;
  useEarningsBeforeTaxResult?: boolean;
  useSocialHealthInsuranceResult?: boolean;
  useIncomeTaxResult?: boolean;
  useFlatTaxCalculation?: boolean;
  useCostBasedCalculation?: boolean;
  useSecondaryActivity?: boolean;
  allowToChoseDetailedOptions?: boolean;
  title: string;
  tipBox?: string;
};

export default function TaxesCalculator({
  useCostRateRange,
  useCostRateOptions,
  useTaxRateOptions,
  useDetailedParameters,
  useEarningsBeforeTaxResult,
  useSocialHealthInsuranceResult,
  useIncomeTaxResult,
  useFlatTaxCalculation,
  useCostBasedCalculation,
  useSecondaryActivity,
  allowToChoseDetailedOptions,
  title,
  tipBox,
}: Props) {
  const [annualIncome, setAnnualIncome] = useState<number>(800000);
  const [costPercent, setCostPercent] =
    useState<CostPercentType>(COST_PERCENT_60);

  const deriveBandFromIncome = (income: number) => {
    if (income <= 1000000) return "band1";
    if (income <= 1500000) return "band2";
    return "band3";
  };
  const [selectedBand, setSelectedBand] = useState<string>(() =>
    deriveBandFromIncome(annualIncome),
  );
  const [selectedCostDistribution, setSelectedCostDistribution] =
    useState<string>("undefined");

  const [isPrimaryActivity, setIsPrimaryActivity] = useState<boolean>(true);
  const [useBenefits, setUseBenefits] = useState<boolean>(true);
  // Detailed parameters (defaults are editable)
  const [basicTaxpayer, setBasicTaxpayer] = useState<boolean>(true);
  const [spouseCare, setSpouseCare] = useState<boolean>(false);

  const [spouseZtpCare, setSpouseZtpCare] = useState<boolean>(false);
  const [invalid12, setInvalid12] = useState<boolean>(false);
  const [invalid3, setInvalid3] = useState<boolean>(false);
  const [holderZtp, setHolderZtp] = useState<boolean>(false);

  // Nezdanitelne castky
  const [pensionPaid, setPensionPaid] = useState<number>(0);
  const [investmentPaid, setInvestmentPaid] = useState<number>(0);
  const [lifeInsurancePaid, setLifeInsurancePaid] = useState<number>(0);
  const [interestPaid, setInterestPaid] = useState<number>(0);
  const [otherNonTaxable, setOtherNonTaxable] = useState<number>(0);

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [childrenFields, setChildrenFields] = useState<
    { id: string; age: string; ztp: boolean }[]
  >([]);

  const addChildren = () => {
    setChildrenFields((prev) => [
      ...prev,
      { id: crypto.randomUUID(), age: "", ztp: false },
    ]);
  };

  const updateChildField = (id: string, value: string) => {
    setChildrenFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, age: value } : field)),
    );
  };

  const changeChildZtpStatus = (id: string) => {
    setChildrenFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, ztp: !field.ztp } : field,
      ),
    );
  };

  const removeChildren = (id: string) => {
    setChildrenFields((prev) => prev.filter((field) => field.id !== id));
  };

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
      (spouseCare ? SLEVA_NA_MANZELKU : 0) +
      (spouseZtpCare ? SLEVA_NA_MANZELKU_DITE_ZTP - SLEVA_NA_MANZELKU : 0) +
      (invalid12 ? INVALIDITA_1_2_STUPNE : 0) +
      (invalid3 ? INVALIDITA_3_STUPNE : 0) +
      (holderZtp ? DRZITEL_ZTP : 0);

    let incomeTaxBeforeCredits = incomeTax;
    if (useBenefits) {
      incomeTaxBeforeCredits -= totalTaxSaleCredits;
    }

    const incomeTaxAfterCredits = Math.max(0, incomeTaxBeforeCredits);

    let childBenefit = 0;

    const childArray = [...childrenFields];
    childArray.sort((a, b) => (a.age < b.age ? -1 : 1));

    childArray.forEach((child, index) => {
      if (child.ztp) {
        if (index === 0) childBenefit += SLEVA_NA_DITE[0] * 2;
        else if (index === 1) childBenefit += SLEVA_NA_DITE[1] * 2;
        else childBenefit += SLEVA_NA_DITE[2] * 2;
      } else {
        if (index === 0) childBenefit += SLEVA_NA_DITE[0];
        else if (index === 1) childBenefit += SLEVA_NA_DITE[1];
        else childBenefit += SLEVA_NA_DITE[2];
      }
    });

    // Výpočet běžných dětí (nezohledněných ZTP)

    const totalTaxBenefits = childBenefit;

    const incomeTaxAfterBenefits =
      incomeTaxAfterCredits - (useBenefits ? totalTaxBenefits : 0);

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
    const minHealthAnnualMain = isPrimaryActivity
      ? MIN_HEALTH_MONTHLY_MAIN * 12
      : 0;
    const minSocialAnnualMain =
      !isPrimaryActivity &&
      assessmentBaseAnnual > MINIMAL_INCOME_FOR_SECONDARY_ACTIVITY
        ? MIN_SOCIAL_MONTHLY_SECONDARY * 12
        : MIN_SOCIAL_MONTHLY_MAIN * 12;

    // For this calculator we conservatively use MAIN minima for estimation
    const healthAnnual = Math.max(healthAnnualRaw, minHealthAnnualMain);
    const socialAnnual =
      assessmentBaseAnnual < MINIMAL_INCOME_FOR_SECONDARY_ACTIVITY
        ? 0
        : Math.max(socialAnnualRaw, minSocialAnnualMain);

    const socialHealthInsurance = healthAnnual + socialAnnual;

    let totalCostMethod = 0;

    if (useSocialHealthInsuranceResult) {
      totalCostMethod += socialHealthInsurance;
    }

    if (useIncomeTaxResult) {
      totalCostMethod += incomeTaxAfterBenefits;
    }

    const costPercentLabel =
      costPercent === 0.4
        ? "40% (IT, poradenství)"
        : costPercent === 0.6
          ? "60% (obchod, služby)"
          : "80% (zemědělství)";

    return {
      // Paušální výdaje
      expensesAmount: expensesAmount,
      profit: profit,
      assessmentBaseAnnual: assessmentBaseAnnual,
      incomeTax,
      healthAnnual,
      socialAnnual,
      socialHealthInsurance,
      totalCostMethod,
      costPercentLabel,
      taxableProfit,
      incomeTaxAfterCredits,
      incomeTaxAfterBenefits,
      childBenefits: totalTaxBenefits,
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
    spouseCare,
    spouseZtpCare,
    invalid12,
    invalid3,
    holderZtp,
    childrenFields,
    isPrimaryActivity,
    useBenefits,
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
  }, [annualIncome, selectedBand, isPrimaryActivity]);

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

  const resultsCostBasedBreakdownItems: CalculationBreakdownProps["items"] =
    useMemo(() => {
      const array: CalculationBreakdownProps["items"] = [];

      if (useEarningsBeforeTaxResult) {
        array.push(
          {
            type: "calculation",
            label: "Celkový příjem",
            value: formatCurrency(
              calculations.profit + calculations.expensesAmount,
            ),
            description: "Paušální % z příjmů",
          },
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
        );
      }

      if (useSocialHealthInsuranceResult) {
        array.push(
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
            description: "13.5% z vyměřovacího základu; minimum aplikováno",
          },
          {
            type: "calculation",

            label: "Sociální pojištění (ročně)",
            value: formatCurrency(calculations.socialAnnual),
            description: "9.5% z vyměřovacího základu; minimum aplikováno",
          },
        );
      }

      if (useIncomeTaxResult) {
        array.push(
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
        );
      }

      if (useIncomeTaxResult && isPrimaryActivity) {
        array.push(
          {
            type: "calculation",

            label: "Daň po slevách",
            value: formatCurrency(calculations.incomeTaxAfterCredits),
            description: "Daň po odečtení slev",
          },
          {
            type: "calculation",

            label: "Výsledná daň/daňový bonus (přeplatek)",
            value: formatCurrency(calculations.incomeTaxAfterBenefits),
            description: "Daň po daňovém zvýhodnění",
          },
        );
      }

      return array;
    }, [
      useEarningsBeforeTaxResult,
      useSocialHealthInsuranceResult,
      useIncomeTaxResult,
      isPrimaryActivity,
      calculations,
    ]);

  useEffect(() => {
    if (annualIncome <= 1000000) {
      setSelectedBand("band1");
      return;
    } else if (annualIncome <= 1500000) {
      if (selectedCostDistribution === "undefined") {
        setSelectedBand("band2");
        return;
      } else if (selectedCostDistribution === "60-80") {
        setSelectedBand("band1");
        return;
      } else if (selectedCostDistribution === "80") {
        setSelectedBand("band1");
        return;
      }
    } else if (annualIncome <= 2000000) {
      if (selectedCostDistribution === "undefined") {
        setSelectedBand("band3");
        return;
      } else if (selectedCostDistribution === "60-80") {
        setSelectedBand("band2");
        return;
      } else if (selectedCostDistribution === "80") {
        setSelectedBand("band1");
        return;
      }
    }
  }, [annualIncome, selectedCostDistribution]);
  return (
    <div className="bg-white rounded-2xl border-2 border-zinc-200 p-8 md:p-12">
      <h2 className="text-3xl md:text-4xl text-center font-bebas mb-8">
        {title}
      </h2>
      {/* Input - Roční příjmy */}
      <div className="mb-8">
        <RangeInput
          label="Roční příjmy"
          min={100000}
          max={2400000}
          step={10000}
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
              Vaše příjmy překračují limit 2 milionů Kč. Pro vás je dostupný jen
              režim paušálních výdajů.
            </p>
          </div>
        </div>
      )}
      <Divider />
      {useSecondaryActivity && (
        <>
          <div className={`grid gap-6`}>
            <RadioGroup
              label="Je vaše podnikání hlavní nebo vedlejší výdělečná činnost?"
              name="costDistribution"
              value={isPrimaryActivity}
              onChange={(val) =>
                setIsPrimaryActivity(val === "true" || val === true)
              }
              options={isActivityPrimary}
            />
          </div>
          <Divider />
        </>
      )}
      {allowToChoseDetailedOptions && (
        <>
          <div className={`grid gap-6`}>
            <RadioGroup
              label="Chcete využívat daňové slevy a zvýhodnění?"
              name="useBenefits"
              value={useBenefits}
              onChange={(val) => setUseBenefits(val === "true" || val === true)}
              options={useDetailedOptions}
            />
          </div>
          <Divider />
        </>
      )}
      {useCostRateRange && (
        <>
          <div className={`grid gap-6`}>
            <RadioGroup
              description="Autorská činnost a svobodná povolání mají 40% výdajový paušál. Zemědělská, lesní a vodohospodářská činnost a řemeslné živnosti mají 80% výdajový paušál. Zbytek živností má 60% výdajový paušál."
              label="Rozdělení příjmů dle výdajového paušálu - důležité pro výpočet paušální daně"
              name="costDistribution"
              value={selectedCostDistribution}
              onChange={(val) => setSelectedCostDistribution(String(val))}
              options={costDistribution}
            />
          </div>
          <Divider />
        </>
      )}
      <div
        className={`grid ${useCostRateOptions && useTaxRateOptions ? "md:grid-cols-2" : "md:grid-cols-1"} gap-6`}
      >
        {useCostRateOptions && (
          <RadioGroup
            label="Druh paušálních výdajů (režim s paušálními výdaji)"
            name="costPercent"
            value={costPercent}
            onChange={(val) => setCostPercent(val as CostPercentType)}
            options={costOptions}
          />
        )}
        {useTaxRateOptions && (
          <RadioGroup
            label="Pásmo paušální daně (mění se automaticky dle dříve zvolených možností)"
            name="flatTaxBand"
            value={selectedBand}
            onChange={(val) => setSelectedBand(String(val))}
            options={bandOptions}
          />
        )}
      </div>
      <Divider />

      {/* Rozbalitelné parametry pro přesnější výpočet */}
      {useDetailedParameters && isPrimaryActivity && (
        <>
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
                      amount={SLEVA_NA_MANZELKU}
                    />
                    <CheckboxToggle
                      label="Manžel/manželka s průkazem ZTP/P, navyšuje se sleva"
                      checked={spouseZtpCare}
                      onChange={setSpouseZtpCare}
                      amount={SLEVA_NA_MANZELKU_DITE_ZTP - SLEVA_NA_MANZELKU}
                    />
                    <CheckboxToggle
                      label="Invalidní důchod 1. nebo 2. stupně"
                      checked={invalid12}
                      onChange={setInvalid12}
                      amount={INVALIDITA_1_2_STUPNE}
                    />
                    <CheckboxToggle
                      label="Invalidní důchod 3. stupně"
                      checked={invalid3}
                      onChange={setInvalid3}
                      amount={INVALIDITA_3_STUPNE}
                    />
                    <CheckboxToggle
                      label="Držitel průkazu ZTP/P"
                      checked={holderZtp}
                      onChange={setHolderZtp}
                      amount={DRZITEL_ZTP}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-semibold mb-2">Počet dětí</p>
                    <p className="text-base text-textP mb-4">
                      Aby byl výpočet přesný, je nutné vyplnit i věk dětí kvůli
                      určení pořadí a výši slevy.
                    </p>

                    <div className="flex flex-row gap-4 items-center justify-between">
                      <div className="flex flex-col gap-4 items-start">
                        {childrenFields.map((field, index) => (
                          <div key={field.id}>
                            <div className="flex gap-3 items-center">
                              <p className="text-sm text-primary my-2">
                                {`${index + 1}. dítě:`}
                              </p>
                              <FaXmark
                                className="text-rose-800 hover:scale-105 cursor-pointer transition-all ease-in-out"
                                onClick={() => {
                                  removeChildren(field.id);
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                onChange={(e) => {
                                  updateChildField(field.id, e.target.value);
                                }}
                                value={field.age}
                                type="text"
                                placeholder={"Zadejte věk dítěte"}
                                className="w-full p-2 border-2 bg-white border-zinc-300 rounded-xl font-oswald text-lg focus:border-secondary focus:outline-none transition-colors"
                              />
                              <button
                                type="button"
                                onClick={() => changeChildZtpStatus(field.id)}
                                className="flex cursor-pointer items-center gap-3 text-left"
                              >
                                <div className="shrink-0">
                                  {field.ztp ? (
                                    <MdCheckBox className="w-6 h-6 text-secondary" />
                                  ) : (
                                    <MdCheckBoxOutlineBlank className="w-6 h-6 text-zinc-400" />
                                  )}
                                </div>
                                <div className="grow">
                                  <div className="font-medium text-sm text-primary">
                                    ZTP
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={addChildren}
                          className="hover:bg-secondary/20 transition-all ease-in-out rounded-md p-2 cursor-pointer"
                        >
                          + Přidat dítě
                        </button>
                      </div>
                      <div className="">
                        <p>Sleva na děti:&nbsp;</p>
                        <p className="">
                          {formatCurrency(calculations.childBenefits)}
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
          <Divider />
        </>
      )}
      <div
        className={`grid ${useCostBasedCalculation && useFlatTaxCalculation ? "md:grid-cols-2" : "grid-cols-1"} gap-6`}
      >
        {useCostBasedCalculation && (
          <CalculationBreakdown
            title={`Paušální výdaje (${Math.round(costPercent * 100)}%)`}
            items={resultsCostBasedBreakdownItems}
            result={{
              type: "calculation",
              label: "Roční platba",
              value: formatCurrency(calculations.totalCostMethod),
              description: !isPrimaryActivity
                ? "Bez slev a zvýhodnění (vedlejší činnost)"
                : "",
            }}
            className="flex flex-col justify-between"
          />
        )}
        {/* Paušální daň */}
        {useFlatTaxCalculation && (
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
                  formatCurrency(flatTaxCalculations.flatTaxMonthly) + "/měs.",
                description: "Fixní měsíční částka",
              },
            ]}
            result={{
              type: "calculation",
              label: "Roční platba",
              value: formatCurrency(flatTaxCalculations.flatTaxAnnual),
            }}
            className="flex flex-col justify-between"
          />
        )}
      </div>

      {/* Porovnání */}
      {useFlatTaxCalculation && useCostBasedCalculation && (
        <>
          <Divider />
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
                  Měsíční úspora
                </span>
                <span
                  className={`text-2xl font-bebas ${
                    resultsCalculations.isFlatTaxBetter
                      ? "text-green-900"
                      : "text-orange-900"
                  }`}
                >
                  {resultsCalculations.isFlatTaxBetter ? "+" : "-"}
                  {formatCurrency(Math.abs(resultsCalculations.savings) / 12)}
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
                  Roční úspora
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
        </>
      )}
      {/* Tipy */}
      {tipBox && (
        <>
          <Divider />
          <TipBox text={tipBox} />
        </>
      )}
    </div>
  );
}
