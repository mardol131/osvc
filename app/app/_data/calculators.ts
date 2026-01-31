import { BarChart3, Calculator, Coins, Heart } from "lucide-react";

export const calculators = [
  {
    id: "odvody-osvc",
    title: "Kalkulačka odvodů OSVČ",
    description:
      "Spočítejte si, kolik budete muset platit na daň z příjmu a sociální a zdravotní pojištění jako OSVČ.",
    icon: Calculator,
    href: "/kalkulacky/odvody-osvc",
  },
  {
    id: "pausalni-dan-vs-pausalni-vydaje",
    title: "Paušální výdaje vs. paušální daň",
    description:
      "Porovnejte, která forma zdanění je pro vás výhodnější - paušální výdaje nebo paušální daň.",
    icon: Calculator,
    href: "/kalkulacky/pausalni-dan-vs-pausalni-vydaje",
  },
  {
    id: "socialni-zdravotni-pojisteni",
    title: "Kalkulačka sociálního a zdravotního pojištění",
    description:
      "Zjistěte částku sociálního a zdravotního pojištění pro OSVČ podle vašeho odhadu příjmů.",
    icon: Calculator,
    href: "/kalkulacky/socialni-zdravotni-pojisteni-osvc",
  },
  {
    id: "dan-z-prijmu",
    title: "Kalkulačka daně z příjmů",
    description:
      "Spočítejte si, kolik budete platit na dani z příjmů podle vašich tržeb a výdajů.",
    icon: Calculator,
    href: "/kalkulacky/dan-z-prijmu",
  },
];
