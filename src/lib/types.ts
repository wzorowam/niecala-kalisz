export type Lang = "en" | "pl";

export type Text = { en: string; pl: string };

export type Source = {
  title: string;
  url: string;
};

export type Photo = {
  src: string;
  alt: Text;
  credit: string;
};

export type Side = "north" | "south" | "axis";

export type Place = {
  id: string;
  kind: "building" | "landmark" | "park";
  address?: string;
  meters: number;
  depth: number;
  side: Side;
  year?: string;
  lat?: number;
  lon?: number;
  name: Text;
  subtitle: Text;
  facade: string;
  photos: Photo[];
  photoHonesty?: Text;
  story: Text[];
  details: { label: Text; value: Text }[];
  sources: Source[];
  people?: string[];
};

export type Person = {
  id: string;
  name: string;
  years: string;
  photo?: string;
  placeIds: string[];
  bio: Text;
};
