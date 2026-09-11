import type { Person, Place } from "./types";

export const STREET_LENGTH = 230;

export const places: Place[] = [
  {
    id: "square",
    kind: "landmark",
    meters: 0,
    depth: 28,
    side: "axis",
    year: "2017",
    name: { en: "Noce i Dnie fountain", pl: "Fontanna Noce i Dnie" },
    subtitle: {
      en: "Where Niecała meets the squares — on the buried arm of the Prosna called Babinka.",
      pl: "Tu Niecała styka się z placami — nad zasypaną odnogą Prosny zwaną Babinką.",
    },
    facade: "/images/fountain-1.jpg",
    photos: [
      { src: "/images/fountain-1.jpg", alt: { en: "Noce i Dnie fountain", pl: "Fontanna Noce i Dnie" }, credit: "Peżot, CC BY-SA 4.0" },
      { src: "/images/fountain-2.jpg", alt: { en: "Fountain jets at the square", pl: "Wodotryski na placu" }, credit: "Peżot, CC BY-SA 4.0" },
      { src: "/images/fountain-4.jpg", alt: { en: "KANAŁ BABINKA tiles in the pavement", pl: "Płyty KANAŁ BABINKA" }, credit: "Peżot, CC BY-SA 4.0" },
      { src: "/images/square-night.jpg", alt: { en: "The square in snow, looking toward Niecała", pl: "Plac zimą, w stronę Niecałej" }, credit: "Aktron, CC BY-SA 4.0" },
      { src: "/images/square-jp2.jpg", alt: { en: "John Paul II Square, Kalisz", pl: "Plac św. Jana Pawła II" }, credit: "Peżot, CC BY-SA 4.0" },
      { src: "/images/square-kilinski.jpg", alt: { en: "Kiliński Square", pl: "Plac Kilińskiego" }, credit: "Bast, CC BY-SA 3.0" },
    ],
    story: [
      {
        en: "Niecała begins at the knot of Plac św. Jana Pawła II and Plac Kilińskiego. The fountain here, opened in 2017, sits where Babinka — a side-arm of the Prosna — once ran. Its pale-blue pavement still spells KANAŁ BABINKA. Kalisz named the water for Maria Dąbrowska’s novel Nights and Days, whose world is this city.",
        pl: "Niecała zaczyna się u zbiegu placu św. Jana Pawła II i placu Kilińskiego. Fontanna z 2017 roku stoi tam, gdzie płynęła Babinka — odnoga Prosny. Na błękitnych płytach wciąż czyta się KANAŁ BABINKA. Miasto nazwało wodę od powieści Marii Dąbrowskiej „Noce i dnie".",
      },
      {
        en: "A five-domed Orthodox cathedral of Saints Peter and Paul stood on this square from 1877 until it was dismantled after independence. Brick and fittings from that cathedral were reused on Niecała itself, in the small church you will pass on the park side.",
        pl: "Na tym placu od 1877 roku stał pięciokopułowy sobór Świętych Apostołów Piotra i Pawła, rozebrany po odzyskaniu niepodległości. Cegła i wyposażenie z tamtego soboru wróciły na Niecałą — do małej cerkwi po stronie parku.",
      },
    ],
    details: [
      { label: { en: "Opened", pl: "Uruchomienie" }, value: { en: "October 2017", pl: "październik 2017" } },
      { label: { en: "Earlier fountain", pl: "Poprzedniczka" }, value: { en: "Nastroje", pl: "Nastroje" } },
      { label: { en: "Named for", pl: "Nazwa" }, value: { en: "Maria Dąbrowska, Nights and Days", pl: "Maria Dąbrowska, Noce i dnie" } },
    ],
    sources: [
      { title: "Kalisz Czasem Malowany — Fontanna Noce i Dnie", url: "https://kaliszczasemmalowany.pl/index.php/2025/fontanna-noce-i-dnie/" },
      { title: "Kalisz.pl — Orthodox trail", url: "https://www.kalisz.pl/en/tourists/tourist-routes/on-multicultural-kalisz-trail/orthodox-trail" },
    ],
  },
];

export const people: Person[] = [];
export const festival = { title: { en: "Święto Ulicy Niecałej", pl: "Święto Ulicy Niecałej" }, story: { en: "Festival.", pl: "Święto." }, sources: [] as { title: string; url: string }[] };
export const nameHistory = [{ year: "1990", en: "Niecała restored.", pl: "Przywrócono nazwę Niecała." }];
