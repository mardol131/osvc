import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://osvc365.cz";

  return [
    {
      url: `${baseUrl}`,
    },
    {
      url: `${baseUrl}/koupit-predplatne`,
    },
    {
      url: `${baseUrl}/cena`,
    },
    {
      url: `${baseUrl}/otazky`,
    },
    {
      url: `${baseUrl}/obchodni-podminky.pdf`,
    },
    {
      url: `${baseUrl}/gdpr.pdf`,
    },
    {
      url: `${baseUrl}/kalkulacky`,
    },
    {
      url: `${baseUrl}/kalkulacky/dan-z-prijmu`,
    },
    {
      url: `${baseUrl}/kalkulacky/odvody-osvc`,
    },
    {
      url: `${baseUrl}/kalkulacky/pausalni-dan-vs-pausalni-vydaje`,
    },
    {
      url: `${baseUrl}/kalkulacky/socialni-zdravotni-pojisteni-osvc`,
    },
  ];
}
