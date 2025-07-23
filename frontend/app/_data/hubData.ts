export const hubDataList: hubDataType = [
  {
    groupCode: "nastroje",
    groupName: "Nástroje",
    groupData: [
      { code: "umela_inteligence", name: "(AI) Umělá inteligence" },
      { code: "automatizace", name: "Automatizace" },
      { code: "fakturace", name: "Fakturace" },
      { code: "ucetnictvi", name: "Účetnictví" },
    ],
  },
  {
    groupCode: "rady_clanky",
    groupName: "Rady a články",
    groupData: [
      { code: "dane", name: "Daně" },
      { code: "socialni_pojisteni", name: "Sociální pojištění" },
      { code: "zdravotni_pojisteni", name: "Zdravotní pojištění" },
      { code: "dph", name: "DPH" },
      { code: "finance", name: "Finance" },
      { code: "podcasty", name: "Podcasty" },
    ],
  },
  {
    groupCode: "komunita",
    groupName: "Komunity",
    groupData: [
      { code: "fb_skupiny", name: "FB Skupiny" },
      { code: "meetup", name: "Meetupy" },
      { code: "podcasty", name: "Podcasty" },
    ],
  },
];

export type hubDataType = {
  groupCode: string;
  groupName: string;
  groupData: { code: string; name: string }[];
}[];
