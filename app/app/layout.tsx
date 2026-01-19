import type { Metadata } from "next";
import ScrollToTopButton from "./_components/atoms/ScrollToTopbutton";
import Footer from "./_components/blocks/footer/Footer";
import Header from "./_components/blocks/header/Header";
import "./_css/globals.css";
import BuyButton from "./_components/atoms/BuyButton";

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
        <ScrollToTopButton />
        {children}
        <Footer />
      </body>
    </html>
  );
}
