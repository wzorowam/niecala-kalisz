"use client";

import { BuildingPanel } from "@/components/building-panel";
import { HouseFilmstrip, nearestPlace, StreetRibbon, StreetScene } from "@/components/street-scene";
import { ui, t } from "@/lib/copy";
import { festival, nameHistory, people, places, STREET_LENGTH } from "@/lib/street-data";
import imageCredits from "../../public/images/credits.json";
import type { Lang } from "@/lib/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const WALK_VH = 720;

export function NiecalaApp() {
  const [lang, setLang] = useState<Lang>("en");
  const [meters, setMeters] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [intro, setIntro] = useState(true);
  const scroller = useRef<HTMLDivElement>(null);
  const walkRef = useRef<HTMLDivElement>(null);

  const nearest = useMemo(() => nearestPlace(meters), [meters]);

  const setWalkFromScroll = useCallback(() => {
    const el = scroller.current;
    const walk = walkRef.current;
    if (!el || !walk) return;
    const range = Math.max(1, walk.offsetHeight - el.clientHeight);
    const p = el.scrollTop / range;
    setMeters(Math.min(STREET_LENGTH, Math.max(0, p * STREET_LENGTH)));
    if (p > 0.03) setIntro(false);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", setWalkFromScroll, { passive: true });
    return () => el.removeEventListener("scroll", setWalkFromScroll);
  }, [setWalkFromScroll]);

  const jumpTo = useCallback((m: number, smooth = true) => {
    const clamped = Math.min(STREET_LENGTH, Math.max(0, m));
    setMeters(clamped);
    setIntro(false);
    const el = scroller.current;
    const walk = walkRef.current;
    if (!el || !walk) return;
    const range = Math.max(1, walk.offsetHeight - el.clientHeight);
    el.scrollTo({ top: (clamped / STREET_LENGTH) * range, behavior: smooth ? "smooth" : "auto" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        jumpTo(Math.min(STREET_LENGTH, meters + 12));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        jumpTo(Math.max(0, meters - 12));
      }
      if (e.key === "Enter" && nearest) setSelected(nearest.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [meters, nearest, jumpTo]);

  return (
    <div className="min-h-screen bg-[#120e0c] text-[#f4e8d8]">
      <div
        ref={scroller}
        className="h-screen overflow-y-auto overflow-x-hidden"
        style={{ height: "100dvh" }}
      >
        <div ref={walkRef} style={{ height: `${WALK_VH}vh` }} className="relative">
          <div className="sticky top-0 h-[100dvh] overflow-hidden">
            <div
              className="absolute inset-0"
              onPointerDown={(e) => {
                if ((e.target as HTMLElement).closest("button, a, aside")) return;
                const startX = e.clientX;
                const startM = meters;
                const move = (ev: PointerEvent) => {
                  const delta = (startX - ev.clientX) / 8;
                  jumpTo(Math.min(STREET_LENGTH, Math.max(0, startM + delta)), false);
                };
                const up = () => {
                  window.removeEventListener("pointermove", move);
                  window.removeEventListener("pointerup", up);
                };
                window.addEventListener("pointermove", move);
                window.addEventListener("pointerup", up);
              }}
            >
            <StreetScene
              meters={meters}
              lang={lang}
              selected={selected}
              onSelect={(id) => {
                setSelected(id);
                setIntro(false);
              }}
            />
            </div>
            <Hud
              lang={lang}
              setLang={setLang}
              meters={meters}
              nearestId={nearest.id}
              onJump={jumpTo}
              onOpen={(id) => {
                setSelected(id);
                setIntro(false);
              }}
            />
            {intro ? (
              <div className="pointer-events-none absolute inset-0 z-20 flex items-end bg-gradient-to-t from-black/75 via-black/25 to-black/20">
                <div className="pointer-events-auto mx-auto mb-44 w-full max-w-3xl px-6 text-center">
                  <p className="font-mono text-xs tracking-[0.35em] text-amber-200/90">
                    {t(ui.kicker, lang)}
                  </p>
                  <h1 className="mt-3 font-[family-name:var(--font-display)] text-6xl text-white md:text-8xl">
                    Niecała
                  </h1>
                  <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/85 md:text-lg">
                    {t(ui.tagline, lang)}
                  </p>
                  <p className="mt-3 text-sm text-amber-100/80">{t(ui.walkHint, lang)}</p>
                  <button
                    onClick={() => jumpTo(18)}
                    className="pointer-events-auto mt-6 rounded-full bg-amber-200 px-6 py-2 text-sm font-medium text-[#2a1608] hover:bg-white"
                  >
                    {t(ui.begin, lang)}
                  </button>
                </div>
              </div>
            ) : null}
            <BuildingPanel id={selected} lang={lang} onClose={() => setSelected(null)} />
          </div>
        </div>

        <Documentary lang={lang} onOpen={(id, m) => { setSelected(id); jumpTo(m); }} />
      </div>
    </div>
  );
}

function Hud({
  lang,
  setLang,
  meters,
  nearestId,
  onJump,
  onOpen,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  meters: number;
  nearestId: string;
  onJump: (m: number) => void;
  onOpen: (id: string) => void;
}) {
  const nearest = places.find((p) => p.id === nearestId);
  return (
    <>
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-4 md:p-6">
      <div className="pointer-events-auto rounded-2xl bg-black/45 px-4 py-3 backdrop-blur-md">
        <p className="font-[family-name:var(--font-display)] text-xl leading-none text-white">
          Niecała
        </p>
        <p className="mt-1 font-mono text-[11px] tracking-wider text-amber-100/80">
          {Math.round(meters)} {t(ui.metres, lang)}
        </p>
      </div>
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => setLang(lang === "en" ? "pl" : "en")}
          className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs tracking-wider text-white hover:bg-black/60"
        >
          {lang === "en" ? "PL" : "EN"}
        </button>
      </div>
      <div className="pointer-events-none absolute inset-x-4 top-20 md:inset-x-8">
        <div className="relative h-1.5 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full bg-amber-300"
            style={{ width: `${(meters / STREET_LENGTH) * 100}%` }}
          />
          {places.map((place) => (
            <button
              key={place.id}
              type="button"
              className="pointer-events-auto absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/40 bg-amber-100 hover:scale-125"
              style={{ left: `${(place.meters / STREET_LENGTH) * 100}%` }}
              title={t(place.name, lang)}
              onClick={() => onJump(place.meters)}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-white/70">
          <span>{t(ui.fromSquare, lang)}</span>
          <span>{t(ui.toPark, lang)}</span>
        </div>
        <div className="mt-2">
          <StreetRibbon meters={meters} lang={lang} onJump={onJump} />
        </div>
      </div>
    </div>
      <div className="pointer-events-auto absolute bottom-4 left-1/2 z-50 w-[min(96vw,48rem)] -translate-x-1/2">
        <HouseFilmstrip meters={meters} lang={lang} onJump={onJump} onOpen={onOpen} />
        {nearest ? (
          <button
            type="button"
            onClick={() => onOpen(nearest.id)}
            className="mt-2 w-full rounded-2xl bg-black/55 px-5 py-3 text-center backdrop-blur-md hover:bg-black/70"
          >
            <p className="font-mono text-[10px] tracking-[0.25em] text-amber-200">
              {nearest.address ?? `${nearest.meters} m`}
            </p>
            <p className="font-[family-name:var(--font-display)] text-2xl text-white">
              {t(nearest.name, lang)}
            </p>
            <p className="mt-1 text-sm text-amber-100">{t(ui.stepInside, lang)}</p>
            <p className="text-[11px] text-white/70">{t(ui.keyboard, lang)}</p>
          </button>
        ) : null}
      </div>
    </>
  );
}

function Documentary({
  lang,
  onOpen,
}: {
  lang: Lang;
  onOpen: (id: string, meters: number) => void;
}) {
  return (
    <section className="relative z-10 bg-[#0f0c0a] px-4 py-20 md:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-[family-name:var(--font-display)] text-4xl text-amber-100 md:text-5xl">
          {t({ en: "230 metres, read slowly", pl: "230 metrów, czytane powoli" }, lang)}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#f4e8d8]/80">
          {t(
            {
              en: "The walk above is the street. Below is the archive: every house we can name, the people who lived in them, the names the street wore, and the festival that still occupies it one Saturday in September.",
              pl: "Spacer powyżej jest ulicą. Poniżej archiwum: każdy dom, który umiemy nazwać, ludzie, którzy w nich mieszkali, nazwy, które ulica nosiła, i święto, które wciąż zajmuje ją w wrześniową sobotę.",
            },
            lang,
          )}
        </p>

        <ol className="mt-12 space-y-10">
          {places.map((place) => (
            <li
              key={place.id}
              className="grid gap-5 border-t border-white/10 pt-8 md:grid-cols-[220px_1fr]"
            >
              <button onClick={() => onOpen(place.id, place.meters)} className="text-left">
                <img
                  src={place.photos[0]?.src ?? place.facade}
                  alt={t(place.name, lang)}
                  className="h-40 w-full rounded-md object-cover"
                />
              </button>
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-amber-200/80">
                  {place.address ?? `${place.meters} m`} · {place.year}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-3xl text-white">
                  {t(place.name, lang)}
                </h3>
                <p className="mt-2 text-[#f4e8d8]/85">{t(place.subtitle, lang)}</p>
                <p className="mt-3 text-[15px] leading-7 text-[#f4e8d8]/75">{t(place.story[0], lang)}</p>
                <button
                  onClick={() => onOpen(place.id, place.meters)}
                  className="mt-3 text-sm text-amber-200 underline underline-offset-4"
                >
                  {t(ui.explore, lang)}
                </button>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-20">
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-amber-100">
            {t(ui.people, lang)}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {people.map((person) => (
              <article key={person.id} className="rounded-xl bg-white/5 p-5">
                <p className="font-[family-name:var(--font-display)] text-2xl text-white">
                  {person.name}
                </p>
                <p className="text-xs tracking-wider text-amber-200/80">{person.years}</p>
                <p className="mt-3 text-sm leading-7 text-[#f4e8d8]/80">{t(person.bio, lang)}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {person.placeIds.map((id) => {
                    const place = places.find((p) => p.id === id);
                    if (!place) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => onOpen(place.id, place.meters)}
                        className="text-xs text-amber-200 underline underline-offset-4"
                      >
                        {place.address ?? t(place.name, lang)}
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-amber-100">
            {t({ en: "The street changes name", pl: "Ulica zmienia imię" }, lang)}
          </h2>
          <ul className="mt-8 space-y-4">
            {nameHistory.map((row) => (
              <li key={row.year} className="grid grid-cols-[7rem_1fr] gap-4">
                <span className="font-mono text-sm text-amber-200">{row.year}</span>
                <span className="leading-7">{lang === "en" ? row.en : row.pl}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20">
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-amber-100">
            {t(festival.title, lang)}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#f4e8d8]/85">{t(festival.story, lang)}</p>
        </div>

        <p className="mt-16 text-sm text-white/50">{t(ui.photoNote, lang)}</p>
        <h3 className="mt-8 font-[family-name:var(--font-display)] text-2xl text-amber-100">
          {t(ui.credits, lang)}
        </h3>
        <ul className="mt-4 columns-1 gap-4 text-sm text-white/55 md:columns-2">
          {imageCredits.map((credit) => (
            <li key={credit.file} className="mb-2 break-inside-avoid">
              {credit.commons ?? credit.file} — {credit.artist || "unknown"} ({credit.license})
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
