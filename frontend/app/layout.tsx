import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/global/headerFooter/Header";
import ScrollButton from "./_components/global/buttons/ScrollButton";

export const metadata: Metadata = {
  title: "OSVČ365: Vy podnikáte, my hlídáme byrokracii.",
  description:
    "Jste OSVČ? Stát vás na nové povinnosti neupozorní, jen pokutuje. My hlídáme zákony a termíny, posíláme upozornění a šetříme nervy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={` text-primary`}>
        <Header />
        <ScrollButton />
        {children}
      </body>
    </html>
  );
}
