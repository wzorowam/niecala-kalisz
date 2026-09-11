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
    ],
    story: [
      {
        en: "Niecała begins at the knot of Plac św. Jana Pawła II and Plac Kilińskiego.",
        pl: "Niecała zaczyna się u zbiegu placu św. Jana Pawła II i placu Kilińskiego.",
      },
    ],
    details: [
      { label: { en: "Opened", pl: "Uruchomienie" }, value: { en: "October 2017", pl: "październik 2017" } },
    ],
    sources: [
      { title: "Kalisz Czasem Malowany — Fontanna Noce i Dnie", url: "https://kaliszczasemmalowany.pl/index.php/2025/fontanna-noce-i-dnie/" },
    ],
  },
];

export const people: Person[] = [];
export const festival = {
  title: { en: "Święto Ulicy Niecałej", pl: "Święto Ulicy Niecałej" },
  story: {
    en: "Each year at the start of September the 230 metres fill with the street festival.",
    pl: "Na początku września 230 metrów wypełnia święto ulicy.",
  },
  sources: [],
};
export const nameHistory = [
  { year: "1990", en: "Niecała restored.", pl: "Przywrócono nazwę Niecała." },
];
