import type { Metadata } from "next";
import ScrollToTopButton from "./_components/atoms/ScrollToTopbutton";
import Footer from "./_components/blocks/footer/Footer";
import Header from "./_components/blocks/header/Header";
import "./_css/globals.css";
import image from "../public/OSVČ.png";

export const metadata: Metadata = {
  title: "Vy podnikáte, my hlídáme byrokracii",
  description:
    "Jste OSVČ? Stát vás na nové povinnosti neupozorní, jen pokutuje. My hlídáme zákony a termíny, posíláme upozornění a šetříme nervy.",
  keywords: [
    "OSVČ",
    "podnikání",
    "byrokracie",
    "daňové přiznání",
    "evidence příjmů",
    "upozornění na termíny",
    "správa podnikání",
    "účetnictví pro OSVČ",
    "daňové povinnosti",
    "podnikatelské služby",
  ],
  category: "business",
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/logo-osvc.png",
  },
  appleWebApp: {
    capable: true,
    title: "Vy podnikáte, my hlídáme byrokracii",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "OSVČ365: Vy podnikáte, my hlídáme byrokracii",
    description: `Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět, když se něco změní. Už žádné pokuty ani stres z neznámých povinností. A za rok to stojí jako tři kafe.`,
    url: "https://www.osvc365.cz",
    siteName: "OSVČ365",
    images: [
      {
        url: image.src,
        width: 1200,
        height: 627,
      },
    ],
    type: "website",
  },
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
