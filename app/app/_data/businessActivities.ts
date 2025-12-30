export type BusinessActivity = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  keywords: string[];
  items: { id: string; item: string }[];
  order?: number;
};

// export const businessActivities: BusinessActivity[] = [
//   {
//     slug: "it_services",
//     name: "IT služby a digitální technologie",
//     description:
//       "Povinnosti související s poskytováním IT služeb, vývoje software, správy dat a digitálních technologií",
//     price: 199,
//     keywords: [
//       "it",
//       "software",
//       "vývoj",
//       "programování",
//       "technologie",
//       "webové služby",
//       "hosting",
//       "virtuální aktiva",
//     ],
//     items: [
//       "Poskytování software, poradenství v oblasti informačních technologií, zpracování dat, hostingové a související činnosti a webové portály",
//       "Činnost informačních a zpravodajských kanceláří",
//       "Poskytování služeb spojených s virtuálním aktivem",
//     ],
//   },

//   {
//     slug: "consulting",
//     name: "Poradenství a odborné služby",
//     description:
//       "Konzultační činnost, výzkum a vývoj, testování a odborné posudky",
//     price: 199,
//     keywords: [
//       "poradenství",
//       "konzultace",
//       "výzkum",
//       "vývoj",
//       "testování",
//       "analýzy",
//     ],
//     items: [
//       "Poradenská a konzultační činnost, zpracování odborných studií a posudků",
//       "Testování, měření, analýzy a kontroly",
//       "Poskytování služeb pro právnické osoby a svěřenské fondy",
//     ],
//   },

//   {
//     slug: "marketing",
//     name: "Marketing, kreativa a média",
//     description:
//       "Reklamní služby, marketing, design, fotografie a mediální činnosti",
//     price: 199,
//     keywords: [
//       "marketing",
//       "reklama",
//       "design",
//       "fotografie",
//       "kreativa",
//       "media",
//     ],
//     items: [
//       "Reklamní činnost, marketing, mediální zastoupení",
//       "Návrhářská, designérská, aranžérská činnost a modeling",
//       "Fotografické služby",
//       "Výroba, rozmnožování, distribuce, prodej, pronájem zvukových a zvukově-obrazových záznamů",
//     ],
//   },

//   {
//     slug: "education",
//     name: "Vzdělávání a školení",
//     description: "Mimoškolní vzdělávání, kurzy, školení a lektorská činnost",
//     price: 199,
//     keywords: ["vzdělávání", "školení", "lektor", "kurzy", "výuka"],
//     items: [
//       "Mimoškolní výchova a vzdělávání, pořádání kurzů, školení, včetně lektorské činnosti",
//     ],
//   },
//   {
//     slug: "culture_sport",
//     name: "Kultura, sport a zábava",
//     description:
//       "Provozování kulturních, sportovních a zábavních zařízení a pořádání akcí",
//     price: 199,
//     keywords: ["kultura", "sport", "zábava", "akce", "tělovýchova"],
//     items: [
//       "Provozování kulturních, kulturně-vzdělávacích a zábavních zařízení, pořádání kulturních produkcí, zábav, výstav, veletrhů",
//       "Provozování tělovýchovných a sportovních zařízení a organizování sportovní činnosti",
//     ],
//   },
//   //   {
//   //     slug: process.env.STRIPE_TRADING_PRODUCT_slug || "trading",
//   //     priceId: process.env.STRIPE_TRADING_PRICE_ID || "trading_price",
//   //     name: "Obchod a zprostředkování",
//   //     description:
//   //       "Velkoobchodní a maloobchodní činnost, zprostředkování obchodu a služeb",
//   //     price: 199,
//   //     keywords: [
//   //       "obchod",
//   //       "prodej",
//   //       "e-shop",
//   //       "maloobchod",
//   //       "velkoobchod",
//   //       "zprostředkování",
//   //     ],
//   //     items: [
//   //       "Zprostředkování obchodu a služeb",
//   //       "Velkoobchod a maloobchod",
//   //       "Zastavárenská činnost a maloobchod s použitým zbožím",
//   //     ],
//   //   },

//   //   {
//   //     id: process.env.STRIPE_HOSPITALITY_PRODUCT_ID || "hospitality",
//   //     priceId: process.env.STRIPE_HOSPITALITY_PRICE_ID || "hospitality_price",
//   //     name: "Ubytování a stravování",
//   //     description: "Ubytovací služby a gastronomické činnosti",
//   //     price: 199,
//   //     keywords: ["ubytování", "hotel", "penzion", "stravování"],
//   //     items: ["Ubytovací služby"],
//   //   },
//   //   {
//   //     id: process.env.STRIPE_REAL_ESTATE_PRODUCT_ID || "real_estate",
//   //     priceId: process.env.STRIPE_REAL_ESTATE_PRICE_ID || "real_estate_price",
//   //     name: "Nemovitosti a pronájem",
//   //     description: "Nákup, prodej, správa nemovitostí a pronájem movitých věcí",
//   //     price: 199,
//   //     keywords: ["nemovitosti", "realitky", "pronájem", "správa"],
//   //     items: [
//   //       "Nákup, prodej, správa a údržba nemovitostí",
//   //       "Pronájem a půjčování věcí movitých",
//   //     ],
//   //   },
//   //   {
//   //     id: "transport",
//   //     name: "Doprava, logistika a skladování",
//   //     description:
//   //       "Dopravní služby, skladování, manipulace s nákladem, zasilatelství a údržba vozidel",
//   //     price: 199,
//   //     keywords: [
//   //       "doprava",
//   //       "přeprava",
//   //       "logistika",
//   //       "kurýr",
//   //       "taxi",
//   //       "skladování",
//   //       "zasilatelství",
//   //     ],
//   //     items: [
//   //       "Údržba motorových vozidel a jejich příslušenství",
//   //       "Potrubní a pozemní doprava (vyjma železniční a silniční motorové dopravy)",
//   //       "Skladování, balení zboží, manipulace s nákladem a technické činnosti v dopravě",
//   //       "Zasilatelství a zastupování v celním řízení",
//   //     ],
//   //   },
//   //   {
//   //     id: "technical_services",
//   //     name: "Projektování a technické služby",
//   //     description:
//   //       "Technické návrhy, projektování, grafické práce a poskytování technických služeb",
//   //     price: 199,
//   //     keywords: [
//   //       "projektování",
//   //       "technické služby",
//   //       "návrhy",
//   //       "grafika",
//   //       "elektro",
//   //     ],
//   //     items: [
//   //       "Projektování pozemkových úprav",
//   //       "Příprava a vypracování technických návrhů, grafické a kresličské práce",
//   //       "Projektování elektrických zařízení",
//   //       "Poskytování technických služeb",
//   //     ],
//   //   },
// ]; //   {
// //     id: "admin_translation",
// //     name: "Administrativa a překlady",
// //     description: "Překladatelské, tlumočnické služby a administrativní správa",
// //     price: 199,
// //     keywords: ["překlady", "tlumočení", "administrativa", "správa"],
// //     items: [
// //       "Překladatelská a tlumočnická činnost",
// //       "Služby v oblasti administrativní správy a služby organizačně hospodářské povahy",
// //     ],
// //   },
// //   {
// //     id: "tourism",
// //     name: "Cestovní ruch",
// //     description:
// //       "Cestovní agentury, průvodcovské služby a organizace turistických aktivit",
// //     price: 199,
// //     keywords: ["cestování", "turistika", "průvodce", "agentura"],
// //     items: [
// //       "Provozování cestovní agentury a průvodcovská činnost v oblasti cestovního ruchu",
// //     ],
// //   },
// //   {
// //     id: "personal_services",
// //     name: "Osobní služby a péče o domácnost",
// //     description:
// //       "Služby osobního charakteru, praní, žehlení, opravy oděvů a údržba domácnosti",
// //     price: 199,
// //     keywords: [
// //       "osobní služby",
// //       "praní",
// //       "žehlení",
// //       "opravy",
// //       "domácnost",
// //       "hygiena",
// //     ],
// //     items: [
// //       "Praní pro domácnost, žehlení, opravy a údržba oděvů, bytového textilu a osobního zboží",
// //       "Opravy a údržba potřeb pro domácnost, předmětů kulturní povahy",
// //       "Poskytování služeb osobního charakteru a pro osobní hygienu",
// //       "Poskytování služeb pro rodinu a domácnost",
// //     ],
// //   },
// //   {
// //     id: "environment_energy",
// //     name: "Životní prostředí a energetika",
// //     description:
// //       "Vodovody, kanalizace, nakládání s odpady, výroba paliv a úprava nerostů",
// //     price: 199,
// //     keywords: [
// //       "vodovody",
// //       "kanalizace",
// //       "odpady",
// //       "paliva",
// //       "nerosty",
// //       "energie",
// //     ],
// //     items: [
// //       "Úprava nerostů, dobývání rašeliny a bahna",
// //       "Výroba koksu, surového dehtu a jiných pevných paliv",
// //       "Provozování vodovodů a kanalizací a úprava a rozvod vody",
// //       "Nakládání s odpady (vyjma nebezpečných)",
// //     ],
// //   },
// //   {
// //     id: "agriculture",
// //     name: "Zemědělství, lesnictví a péče o přírodu",
// //     description:
// //       "Specifické požadavky pro zemědělské služby, lesní hospodářství, ochranu rostlin a chov zvířat",
// //     price: 199,
// //     keywords: [
// //       "zemědělství",
// //       "lesnictví",
// //       "zahradnictví",
// //       "rybníkářství",
// //       "chov zvířat",
// //       "ochrana rostlin",
// //     ],
// //     items: [
// //       "Poskytování služeb pro zemědělství, zahradnictví, rybníkářství, lesnictví a myslivost",
// //       "Činnost odborného lesního hospodáře a vyhotovování lesních hospodářských plánů a osnov",
// //       "Diagnostická, zkušební a poradenská činnost v ochraně rostlin a ošetřování rostlin",
// //       "Nakládání s reprodukčním materiálem lesních dřevin",
// //       "Chov zvířat a jejich výcvik (s výjimkou živočišné výroby)",
// //     ],
// //   },
// //   {
// //     id: "food_production",
// //     name: "Výroba potravin a krmiv",
// //     description:
// //       "Povinnosti pro výrobce potravinářských produktů, nápojů a krmiv pro zvířata",
// //     price: 199,
// //     keywords: ["potraviny", "výroba", "pálení", "krmiva", "škrob"],
// //     items: [
// //       "Výroba potravinářských a škrobárenských výrobků",
// //       "Pěstitelské pálení",
// //       "Výroba krmiv, krmných směsí, doplňkových látek a premixů",
// //     ],
// //   },
// //   {
// //     id: "manufacturing",
// //     name: "Průmyslová výroba a zpracování",
// //     description:
// //       "Komplexní výroba včetně textilu, dřeva, papíru, chemických látek, plastů, skla, kovů a strojírenství",
// //     price: 199,
// //     keywords: [
// //       "výroba",
// //       "průmysl",
// //       "textil",
// //       "dřevo",
// //       "papír",
// //       "chemie",
// //       "plasty",
// //       "sklo",
// //       "kovy",
// //       "stroje",
// //     ],
// //     items: [
// //       "Výroba textilií, textilních výrobků, oděvů a oděvních doplňků",
// //       "Výroba a opravy obuvi, brašnářského a sedlářského zboží",
// //       "Zpracování dřeva, výroba dřevěných, korkových, proutěných a slaměných výrobků",
// //       "Výroba vlákniny, papíru a lepenky a zboží z těchto materiálů",
// //       "Vydavatelské činnosti, polygrafická výroba, knihařské a kopírovací práce",
// //       "Výroba chemických látek a chemických směsí nebo předmětů a kosmetických přípravků",
// //       "Výroba hnojiv",
// //       "Výroba plastových a pryžových výrobků",
// //       "Výroba a zpracování skla",
// //       "Výroba stavebních hmot, porcelánových, keramických a sádrových výrobků",
// //       "Výroba a hutní zpracování železa, drahých a neželezných kovů a jejich slitin",
// //       "Výroba kovových konstrukcí a kovodělných výrobků",
// //       "Povrchové úpravy a svařování kovů a dalších materiálů",
// //       "Výroba strojů a zařízení",
// //       "Výroba elektronických součástek, elektrických zařízení",
// //       "Výroba a opravy čalounických výrobků",
// //     ],
// //   },
// //   {
// //     id: "vehicles_production",
// //     name: "Výroba dopravních prostředků",
// //     description:
// //       "Výroba, vývoj a opravy motorových vozidel, plavidel, letadel a dalších dopravních prostředků",
// //     price: 199,
// //     keywords: ["automobily", "vozidla", "plavidla", "letadla", "vlaky", "kola"],
// //     items: [
// //       "Výroba motorových a přípojných vozidel a karoserií",
// //       "Stavba a výroba plavidel",
// //       "Výroba, vývoj, projektování, zkoušky, instalace, údržba, opravy letadel",
// //       "Výroba drážních hnacích vozidel a drážních vozidel",
// //       "Výroba jízdních kol, vozíků pro invalidy a jiných nemotorových dopravních prostředků",
// //     ],
// //   },
// //   {
// //     id: "consumer_goods",
// //     name: "Výroba spotřebního a zdravotnického zboží",
// //     description:
// //       "Výroba sportovních potřeb, hraček, zdravotnických prostředků a dalšího spotřebního zboží",
// //     price: 199,
// //     keywords: [
// //       "spotřební zboží",
// //       "hračky",
// //       "sport",
// //       "zdravotnické prostředky",
// //       "kancelářské potřeby",
// //     ],
// //     items: [
// //       "Výroba, opravy a údržba sportovních potřeb, her, hraček a dětských kočárků",
// //       "Výroba školních a kancelářských potřeb, bižuterie, kartáčnického a konfekčního zboží",
// //       "Výroba zdravotnických prostředků",
// //       "Výroba a opravy zdrojů ionizujícího záření",
// //       "Výroba měřicích, zkušebních, navigačních, optických a fotografických přístrojů a zařízení",
// //     ],
// //   },
// //   {
// //     id: "construction",
// //     name: "Stavebnictví a stavební řemesla",
// //     description:
// //       "Stavební práce, přípravné a dokončovací činnosti, specializované stavební služby",
// //     price: 199,
// //     keywords: [
// //       "stavba",
// //       "stavebnictví",
// //       "rekonstrukce",
// //       "zedník",
// //       "instalatér",
// //       "elektrikář",
// //     ],
// //     items: [
// //       "Přípravné a dokončovací stavební práce, specializované stavební činnosti",
// //       "Sklenářské práce, rámování a paspartování",
// //     ],
// //   },
