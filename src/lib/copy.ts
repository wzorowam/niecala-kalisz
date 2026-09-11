import type { Lang, Text } from "./types";

export const t = (value: Text, lang: Lang) => value[lang];

export const ui = {
  title: { en: "Niecała", pl: "Niecała" },
  kicker: { en: "Kalisz · 230 metres of street", pl: "Kalisz · 230 metrów ulicy" },
  tagline: {
    en: "A street named for what it lacked — then filled with factories, a church, a parish house, and Poland’s oldest public park.",
    pl: "Ulica nazwana od tego, czego jej brakowało — potem wypełniona fabryką, cerkwią, domem parafialnym i najstarszym parkiem publicznym w Polsce.",
  },
  walkHint: {
    en: "Scroll, drag, or use the arrows. Click a façade to step inside its story.",
    pl: "Przewijaj, przeciągaj albo użyj strzałek. Kliknij elewację, żeby wejść w historię.",
  },
  begin: { en: "Walk the street", pl: "Wejdź na ulicę" },
  fromSquare: { en: "John Paul II Square", pl: "Plac św. Jana Pawła II" },
  toPark: { en: "Town Park", pl: "Park Miejski" },
  youAreHere: { en: "You are here", pl: "Jesteś tutaj" },
  explore: { en: "Explore", pl: "Zobacz" },
  close: { en: "Close", pl: "Zamknij" },
  sources: { en: "Sources", pl: "Źródła" },
  gallery: { en: "Photographs", pl: "Fotografie" },
  people: { en: "People of the street", pl: "Ludzie tej ulicy" },
  festival: { en: "Street festival", pl: "Święto ulicy" },
  metres: { en: "m along Niecała", pl: "m ulicy Niecałej" },
  north: { en: "City side", pl: "Strona miasta" },
  south: { en: "Park side", pl: "Strona parku" },
  photoNote: {
    en: "Photographs are real buildings and places, drawn from Wikimedia Commons and credited below.",
    pl: "Zdjęcia pokazują prawdziwe budynki i miejsca. Pochodzą z Wikimedia Commons i są opisane poniżej.",
  },
  credits: { en: "Image credits", pl: "Autorzy zdjęć" },
  keyboard: {
    en: "← → to walk · Enter to open · Esc to close",
    pl: "← → spacer · Enter otwiera · Esc zamyka",
  },
  stepInside: {
    en: "Step inside this house",
    pl: "Wejdź do tego domu",
  },
  glancing: {
    en: "You are passing",
    pl: "Mijasz",
  },
  northHouses: { en: "City side — even numbers", pl: "Strona miasta — numery parzyste" },
  southHouses: { en: "Park side — odd numbers", pl: "Strona parku — numery nieparzyste" },
  photoHonesty: { en: "About this photograph", pl: "O tej fotografii" },
  lookInside: { en: "Glance inside", pl: "Spojrzenie do środka" },
};
