"use client";

import { framesAround } from "@/lib/frames";
import { ui, t } from "@/lib/copy";
import { places, STREET_LENGTH } from "@/lib/street-data";
import type { Lang, Place, Text } from "@/lib/types";

const PEEKS: Record<string, { src: string; caption: Text; side: "left" | "right" }> = {
  church: {
    src: "/images/church-05.jpg",
    caption: { en: "Inside: iconostasis from Sieradz", pl: "Wnętrze: ikonostas z Sieradza" },
    side: "right",
  },
  "parish-house": {
    src: "/images/church-pano-01.jpg",
    caption: { en: "Liturgy in the parish church", pl: "Liturgia w cerkwi parafialnej" },
    side: "right",
  },
  "niecala-4": {
    src: "/images/dolls-shirley.jpg",
    caption: { en: "Shirley dolls from this factory", pl: "Shirlejki z tej fabryki" },
    side: "left",
  },
  "niecala-6": {
    src: "/images/dolls-shirley.jpg",
    caption: { en: "Shirley dolls from this factory", pl: "Shirlejki z tej fabryki" },
    side: "left",
  },
  "niecala-2": {
    src: "/images/rogozinski.jpg",
    caption: { en: "Szolc-Rogoziński, born at number 2", pl: "Szolc-Rogoziński, urodzony pod dwójką" },
    side: "left",
  },
  "niecala-12": {
    src: "/images/boretti-portrait.jpg",
    caption: { en: "A Kalisz woman, by Boretti", pl: "Kaliszanka, fotografował Boretti" },
    side: "left",
  },
  "niecala-14": {
    src: "/images/boretti-portrait.jpg",
    caption: { en: "From the photographer’s house", pl: "Z domu fotografa" },
    side: "left",
  },
  "niecala-5": {
    src: "/images/factory-plan.png",
    caption: { en: "Nestrypke’s own line, 1933", pl: "Linia Nestrypkego, 1933" },
    side: "right",
  },
  "niecala-8": {
    src: "/images/factory-plan.png",
    caption: { en: "The same architect’s factory plan", pl: "Plan fabryki tego samego architekta" },
    side: "left",
  },
  "niecala-7": {
    src: "/images/park-flora.jpg",
    caption: { en: "Flora, in the park he kept", pl: "Flora, w parku, którego strzegł" },
    side: "right",
  },
};

export function StreetScene({
  meters,
  lang,
  selected,
  onSelect,
}: {
  meters: number;
  lang: Lang;
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const nearest = nearestPlace(meters);
  const { a, b, mix } = framesAround(meters);
  const dusk = Math.min(1, Math.max(0, (meters - 70) / 90));
  const frame = mix < 0.55 ? a : b;
  const inFrame = nearest ? frame.hotspots.some((h) => h.id === nearest.id) : false;
  const peek = nearest ? PEEKS[nearest.id] : undefined;

  return (
    <div className="street-scene relative h-full w-full overflow-hidden bg-[#120e0c]">
      <FrameLayer
        src={a.src}
        opacity={1}
        scale={a.ken === "in" ? 1 + mix * 0.14 : 1.14 - mix * 0.08}
        shift={mix * -2.4}
        origin={a.origin ?? "50% 55%"}
      />
      {b.src !== a.src ? (
        <FrameLayer
          src={b.src}
          opacity={mix}
          scale={b.ken === "in" ? 1 + (1 - mix) * 0.05 : 1.1}
          shift={(mix - 1) * 2.4}
          origin={b.origin ?? "50% 55%"}
        />
      ) : b.origin !== a.origin ? (
        <FrameLayer
          src={b.src}
          opacity={mix}
          scale={1.04 + mix * 0.06}
          shift={(mix - 0.5) * 1.2}
          origin={b.origin ?? "50% 55%"}
        />
      ) : null}

      <div className="absolute inset-0">
        {frame.hotspots.map((spot) => {
          const place = places.find((p) => p.id === spot.id);
          if (!place) return null;
          const active = nearest?.id === place.id || selected === place.id;
          return (
            <button
              key={`${spot.id}-${spot.left}-${spot.top}`}
              type="button"
              onClick={() => onSelect(place.id)}
              className="group absolute z-10 rounded-sm border-0 bg-transparent p-0"
              style={{
                left: `${spot.left}%`,
                top: `${spot.top}%`,
                width: `${spot.width}%`,
                height: `${spot.height}%`,
                outline: active ? "3px solid rgba(251, 191, 36, 0.9)" : "2px solid rgba(255,255,255,0.18)",
                boxShadow: active ? "inset 0 0 0 999px rgba(251, 191, 36, 0.12)" : "none",
              }}
              aria-label={t(place.name, lang)}
            >
              <span className="pointer-events-none absolute bottom-2 left-2 hidden rounded bg-black/70 px-2 py-1 text-left text-[11px] text-amber-50 group-hover:block">
                {place.address ?? t(place.name, lang)}
              </span>
            </button>
          );
        })}
      </div>

      {frame.src === "/images/niecala-1900.jpg" ? (
        <p className="pointer-events-none absolute left-4 top-[38%] z-20 rounded bg-black/65 px-3 py-1 font-mono text-[11px] tracking-[0.25em] text-amber-100">
          {t({ en: "c. 1900 · the street as a postcard", pl: "ok. 1900 · ulica na pocztówce" }, lang)}
        </p>
      ) : null}

      {nearest && !inFrame ? (
        <PassingPlate place={nearest} lang={lang} onSelect={onSelect} />
      ) : null}

      {peek ? (
        <WindowPeek
          src={peek.src}
          caption={t(peek.caption, lang)}
          side={peek.side}
          onClick={() => onSelect(nearest.id)}
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(12,18,32,${0.18 + dusk * 0.28}) 0%, transparent 28%, transparent 58%, rgba(10,8,6,0.5) 100%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden niecala-motes">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${8 + ((i * 7) % 90)}%`,
              animationDelay: `${i * 0.9}s`,
              animationDuration: `${11 + (i % 5)}s`,
            }}
          />
        ))}
      </div>
      <div className="pointer-events-none niecala-walk-grain absolute inset-0" />
    </div>
  );
}

function PassingPlate({
  place,
  lang,
  onSelect,
}: {
  place: Place;
  lang: Lang;
  onSelect: (id: string) => void;
}) {
  const side = place.side === "south" ? "right-4" : "left-4";
  const photo = place.photos[0]?.src ?? place.facade;
  return (
    <button
      type="button"
      onClick={() => onSelect(place.id)}
      className={`niecala-plate absolute top-[18%] z-20 w-44 overflow-hidden rounded-lg border border-amber-200/40 bg-black/70 text-left shadow-2xl backdrop-blur-sm md:w-60 ${side}`}
    >
      <img src={photo} alt={t(place.name, lang)} className="h-28 w-full object-cover md:h-36" />
      <span className="block px-3 py-2">
        <span className="block font-mono text-[10px] tracking-[0.2em] text-amber-200">
          {t(ui.glancing, lang)}
        </span>
        <span className="block font-[family-name:var(--font-display)] text-lg text-white">
          {t(place.name, lang)}
        </span>
        <span className="block text-xs text-white/70">{place.address}</span>
      </span>
    </button>
  );
}

function WindowPeek({
  src,
  caption,
  side,
  onClick,
}: {
  src: string;
  caption: string;
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`niecala-peek absolute bottom-52 z-20 hidden w-32 overflow-hidden rounded-md border-4 border-[#3a2a22] shadow-xl md:bottom-56 md:block md:w-40 ${side === "left" ? "left-4" : "right-4"}`}
    >
      <img src={src} alt={caption} className="h-24 w-full object-cover md:h-28" />
      <span className="block bg-black/70 px-2 py-1 text-[10px] leading-4 text-amber-50">{caption}</span>
    </button>
  );
}

function FrameLayer({
  src,
  opacity,
  scale,
  shift,
  origin,
}: {
  src: string;
  opacity: number;
  scale: number;
  shift: number;
  origin: string;
}) {
  return (
    <div
      className="absolute inset-0 niecala-frame"
      style={{
        opacity,
        transform: `translateX(${shift}%) scale(${scale})`,
        transformOrigin: origin,
        willChange: "transform, opacity",
      }}
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

export function nearestPlace(meters: number) {
  return places.reduce((best, place) => {
    if (!best) return place;
    return Math.abs(place.meters - meters) < Math.abs(best.meters - meters) ? place : best;
  });
}

function chipLabel(place: Place, lang: Lang) {
  if (place.id === "church") return lang === "pl" ? "Cerkiew" : "Church";
  if (place.id === "parish-house") return lang === "pl" ? "Dom Popów" : "Parish";
  if (place.address) return place.address.split(" /")[0];
  return t(place.name, lang);
}

export function StreetRibbon({
  meters,
  lang,
  onJump,
}: {
  meters: number;
  lang: Lang;
  onJump?: (m: number) => void;
}) {
  const here = nearestPlace(meters).id;
  return (
    <div>
      <svg viewBox={`0 0 ${STREET_LENGTH} 36`} className="h-8 w-full" aria-hidden>
        <rect x="0" y="14" width={STREET_LENGTH} height="8" rx="2" fill="rgba(255,255,255,0.12)" />
        {places.map((place) => (
          <rect
            key={place.id}
            x={place.meters - 3}
            y={place.side === "south" ? 4 : place.side === "north" ? 24 : 12}
            width={Math.max(6, place.depth / 4)}
            height={8}
            fill={place.id === here ? "#fbbf24" : "rgba(255,236,200,0.55)"}
          />
        ))}
        <circle cx={meters} cy="18" r="4.5" fill="#fff" stroke="#fbbf24" strokeWidth="1.5" />
      </svg>
      <div className="mt-1 flex gap-1 overflow-x-auto pb-1">
        {places.map((place) => (
          <button
            key={place.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onJump?.(place.meters);
            }}
            className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] ${
              place.id === here ? "bg-amber-300 text-black" : "bg-white/10 text-white/80"
            }`}
          >
            {chipLabel(place, lang)}
          </button>
        ))}
      </div>
    </div>
  );
}

export function HouseFilmstrip({
  meters,
  lang,
  onJump,
  onOpen,
}: {
  meters: number;
  lang: Lang;
  onJump: (m: number) => void;
  onOpen: (id: string) => void;
}) {
  const here = nearestPlace(meters).id;
  return (
    <div className="pointer-events-auto mt-2 flex gap-2 overflow-x-auto pb-1">
      {places.map((place) => {
        const active = place.id === here;
        return (
          <button
            key={place.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onJump(place.meters);
              onOpen(place.id);
            }}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border ${
              active ? "border-amber-300 ring-2 ring-amber-300/70" : "border-white/15"
            }`}
            title={t(place.name, lang)}
          >
            <img src={place.facade} alt={t(place.name, lang)} className="h-full w-full object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-black/65 px-1 py-0.5 font-mono text-[9px] text-amber-50">
              {chipLabel(place, lang)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
