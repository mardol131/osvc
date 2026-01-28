import React from "react";
import Card from "./Card";

type Props = {};

export default function CardExample({}: Props) {
  return (
    <>
      {" "}
      <Card
        name="Fakturoid"
        websiteUrl="https://www.fakturoid.cz"
        priceRange="249 - 999 Kč/měs"
        logoUrl="https://www.fakturoid.cz/favicon.ico"
        imageUrl="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80"
        description="Nejoblíbenější online nástroj pro fakturaci v ČR. Vytvářejte faktury, sledujte příjmy a výdaje, propojte s účetním systémem."
        category="Fakturace"
        tags={["Fakturace", "Účetnictví", "Propojení s bankou"]}
        featured={true}
      />
      {/* Standardní karta s obrázkem */}
      <Card
        name="Money S3"
        websiteUrl="https://www.money.cz"
        priceRange="990 - 2990 Kč/měs"
        logoUrl="https://www.money.cz/favicon.ico"
        imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
        description="Komplexní ekonomický systém pro OSVČ a malé firmy. Účetnictví, daňová evidence, fakturace, mzdy a sklady na jednom místě."
        category="Účetnictví"
        tags={["Účetnictví", "Fakturace", "Mzdy"]}
      />
      {/* Karta bez obrázku */}
      <Card
        name="Storyous"
        websiteUrl="https://www.storyous.com"
        priceRange="Od 699 Kč/měs"
        logoUrl="https://www.storyous.com/favicon.ico"
        imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
        description="Chytrý pokladní systém pro restaurace, kavárny a obchody. Jednoduché ovládání, online přehled tržeb, napojení na terminál."
        category="Pokladní systémy"
        tags={["POS", "Gastro", "Terminál"]}
      />
      {/* Featured karta 2 */}
      <Card
        name="Smartform"
        websiteUrl="https://www.smartform.cz"
        priceRange="Zdarma - 499 Kč/měs"
        logoUrl="https://www.smartform.cz/favicon.ico"
        imageUrl="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80"
        description="Tvořte profesionální online formuláře a dotazníky. Automatické zpracování odpovědí, integrace s dalšími nástroji."
        category="Automatizace"
        tags={["Formuláře", "Automatizace", "Integrace"]}
        featured={true}
      />
      {/* Standardní karta */}
      <Card
        name="Toggl Track"
        websiteUrl="https://toggl.com/track"
        priceRange="Zdarma - $9/měs"
        logoUrl="https://toggl.com/favicon.ico"
        imageUrl="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80"
        description="Sledování času stráveného na projektech a úkolech. Detailní reporty, fakturace podle odpracovaných hodin."
        category="Time tracking"
        tags={["Tracking", "Reporty", "Projekty"]}
      />
      {/* Karta s více tagy */}
      <Card
        name="Google Workspace"
        websiteUrl="https://workspace.google.com"
        priceRange="156 - 624 Kč/měs"
        logoUrl="https://www.google.com/favicon.ico"
        imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
        description="Komplexní sada nástrojů pro produktivitu - Gmail, Drive, Kalender, Meet, Docs. Profesionální e-mail na vlastní doméně."
        category="Produktivita"
        tags={["Email", "Cloud", "Komunikace", "Dokumenty"]}
      />
    </>
  );
}
