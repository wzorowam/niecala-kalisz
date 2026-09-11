export type Hotspot = {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

export type Frame = {
  at: number;
  src: string;
  ken: "in" | "out";
  origin?: string;
  hotspots: Hotspot[];
};

/** Real photographs of Niecała and its ends, in walking order (west → east). */
export const frames: Frame[] = [
  {
    at: 0,
    src: "/images/fountain-4.jpg",
    ken: "in",
    origin: "50% 78%",
    hotspots: [{ id: "square", left: 4, top: 8, width: 92, height: 84 }],
  },
  {
    at: 10,
    src: "/images/fountain-1.jpg",
    ken: "out",
    origin: "42% 42%",
    hotspots: [{ id: "square", left: 8, top: 10, width: 84, height: 78 }],
  },
  {
    at: 18,
    src: "/images/square-night.jpg",
    ken: "in",
    origin: "28% 40%",
    hotspots: [{ id: "square", left: 6, top: 8, width: 88, height: 80 }],
  },
  {
    at: 28,
    src: "/images/niecala-4.jpg",
    ken: "in",
    origin: "18% 48%",
    hotspots: [
      { id: "niecala-4", left: 1, top: 2, width: 68, height: 78 },
      { id: "niecala-6", left: 68, top: 12, width: 31, height: 62 },
    ],
  },
  {
    at: 38,
    src: "/images/niecala-4.jpg",
    ken: "out",
    origin: "42% 52%",
    hotspots: [
      { id: "niecala-4", left: 1, top: 2, width: 68, height: 78 },
      { id: "niecala-6", left: 68, top: 12, width: 31, height: 62 },
    ],
  },
  {
    at: 46,
    src: "/images/niecala-1900.jpg",
    ken: "in",
    origin: "50% 58%",
    hotspots: [
      { id: "niecala-6", left: 0, top: 6, width: 34, height: 82 },
      { id: "niecala-4", left: 8, top: 8, width: 24, height: 70 },
      { id: "parish-house", left: 52, top: 16, width: 40, height: 52 },
    ],
  },
  {
    at: 52,
    src: "/images/niecala-4.jpg",
    ken: "in",
    origin: "82% 48%",
    hotspots: [
      { id: "niecala-4", left: 1, top: 2, width: 62, height: 78 },
      { id: "niecala-6", left: 62, top: 10, width: 37, height: 64 },
    ],
  },
  {
    at: 62,
    src: "/images/niecala-6.jpg",
    ken: "in",
    origin: "38% 48%",
    hotspots: [
      { id: "niecala-6", left: 6, top: 0, width: 74, height: 74 },
      { id: "niecala-8", left: 78, top: 8, width: 20, height: 55 },
    ],
  },
  {
    at: 72,
    src: "/images/niecala-6.jpg",
    ken: "out",
    origin: "88% 42%",
    hotspots: [
      { id: "niecala-6", left: 4, top: 0, width: 70, height: 74 },
      { id: "niecala-8", left: 72, top: 28, width: 26, height: 48 },
      { id: "niecala-10", left: 78, top: 36, width: 18, height: 28 },
    ],
  },
  {
    at: 82,
    src: "/images/church-front.jpg",
    ken: "in",
    origin: "48% 42%",
    hotspots: [
      { id: "parish-house", left: 0, top: 38, width: 22, height: 42 },
      { id: "church", left: 26, top: 4, width: 52, height: 82 },
    ],
  },
  {
    at: 90,
    src: "/images/church-09.jpg",
    ken: "in",
    origin: "48% 62%",
    hotspots: [
      { id: "parish-house", left: 0, top: 42, width: 24, height: 48 },
      { id: "church", left: 22, top: 6, width: 62, height: 86 },
    ],
  },
  {
    at: 96,
    src: "/images/church-2022.jpg",
    ken: "out",
    origin: "22% 58%",
    hotspots: [
      { id: "parish-house", left: 0, top: 42, width: 38, height: 38 },
      { id: "church", left: 36, top: 12, width: 46, height: 72 },
    ],
  },
  {
    at: 104,
    src: "/images/church-03.jpg",
    ken: "in",
    origin: "48% 58%",
    hotspots: [
      { id: "parish-house", left: 0, top: 8, width: 22, height: 72 },
      { id: "church", left: 18, top: 0, width: 72, height: 92 },
    ],
  },
  {
    at: 112,
    src: "/images/church-01.jpg",
    ken: "out",
    origin: "18% 58%",
    hotspots: [
      { id: "niecala-3", left: 0, top: 48, width: 22, height: 32 },
      { id: "church", left: 18, top: 8, width: 62, height: 72 },
    ],
  },
  {
    at: 120,
    src: "/images/church-from-park.jpg",
    ken: "in",
    origin: "22% 48%",
    hotspots: [
      { id: "niecala-8", left: 0, top: 42, width: 22, height: 40 },
      { id: "church", left: 24, top: 8, width: 52, height: 70 },
      { id: "niecala-3", left: 72, top: 48, width: 26, height: 36 },
    ],
  },
  {
    at: 132,
    src: "/images/church-02.jpg",
    ken: "out",
    origin: "48% 48%",
    hotspots: [
      { id: "niecala-5", left: 0, top: 48, width: 16, height: 28 },
      { id: "church", left: 16, top: 6, width: 70, height: 72 },
    ],
  },
  {
    at: 144,
    src: "/images/church-summer.jpg",
    ken: "in",
    origin: "38% 52%",
    hotspots: [
      { id: "parish-house", left: 0, top: 28, width: 16, height: 50 },
      { id: "church", left: 16, top: 10, width: 52, height: 78 },
    ],
  },
  {
    at: 155,
    src: "/images/church-night-18.jpg",
    ken: "out",
    origin: "48% 42%",
    hotspots: [{ id: "church", left: 22, top: 8, width: 52, height: 70 }],
  },
  {
    at: 168,
    src: "/images/park-edge-houses.jpg",
    ken: "in",
    origin: "52% 48%",
    hotspots: [
      { id: "niecala-12", left: 36, top: 38, width: 28, height: 28 },
      { id: "niecala-14", left: 42, top: 40, width: 26, height: 26 },
      { id: "park", left: 4, top: 4, width: 92, height: 88 },
    ],
  },
  {
    at: 186,
    src: "/images/park-path-white.jpg",
    ken: "out",
    origin: "62% 42%",
    hotspots: [
      { id: "niecala-14", left: 48, top: 28, width: 28, height: 32 },
      { id: "park", left: 4, top: 4, width: 92, height: 88 },
    ],
  },
  {
    at: 200,
    src: "/images/park-2014.jpg",
    ken: "in",
    origin: "55% 55%",
    hotspots: [
      { id: "niecala-7", left: 60, top: 30, width: 30, height: 40 },
      { id: "park", left: 4, top: 4, width: 92, height: 88 },
    ],
  },
  {
    at: 210,
    src: "/images/park-1.jpg",
    ken: "out",
    origin: "50% 50%",
    hotspots: [{ id: "park", left: 10, top: 8, width: 80, height: 80 }],
  },
  {
    at: 220,
    src: "/images/park-2.jpg",
    ken: "in",
    origin: "48% 55%",
    hotspots: [{ id: "park", left: 4, top: 4, width: 92, height: 88 }],
  },
  {
    at: 230,
    src: "/images/tyniec-bridge.jpg",
    ken: "in",
    origin: "50% 42%",
    hotspots: [
      { id: "niecala-7", left: 8, top: 8, width: 84, height: 36 },
      { id: "park", left: 10, top: 28, width: 80, height: 62 },
    ],
  },
];

export function framesAround(meters: number) {
  const last = frames[frames.length - 1];
  if (meters <= frames[0].at) return { a: frames[0], b: frames[0], mix: 0 };
  if (meters >= last.at) return { a: last, b: last, mix: 0 };
  for (let i = 0; i < frames.length - 1; i++) {
    const a = frames[i];
    const b = frames[i + 1];
    if (meters >= a.at && meters <= b.at) {
      const mix = (meters - a.at) / Math.max(1, b.at - a.at);
      return { a, b, mix };
    }
  }
  return { a: last, b: last, mix: 0 };
}
