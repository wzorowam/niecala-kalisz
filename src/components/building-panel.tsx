"use client";

import { t } from "@/lib/copy";
import { people, places } from "@/lib/street-data";
import type { Lang } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function BuildingPanel({
  id,
  lang,
  onClose,
}: {
  id: string | null;
  lang: Lang;
  onClose: () => void;
}) {
  const place = places.find((p) => p.id === id);
  const related = place ? people.filter((p) => p.placeIds.includes(place.id)) : [];

  return (
    <AnimatePresence>
      {place ? (
        <motion.aside
          key={place.id}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 48, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 32 }}
          className="pointer-events-auto absolute inset-x-0 top-0 bottom-40 z-40 flex w-full max-w-xl flex-col border-l border-white/10 bg-[#1a1410]/95 text-[#f4e8d8] shadow-2xl backdrop-blur-md md:inset-y-0 md:left-auto md:right-0 md:bottom-0 md:max-w-[32rem]"
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
            aria-label={t({ en: "Close", pl: "Zamknij" }, lang)}
          >
            <X className="h-4 w-4" />
          </button>
          <div className="relative h-56 shrink-0 overflow-hidden md:h-72">
            <img
              src={place.photos[0]?.src ?? place.facade}
              alt={t(place.name, lang)}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410] via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-5 right-12">
              {place.address ? (
                <p className="font-mono text-xs tracking-[0.2em] text-amber-200/90">
                  {place.address}
                </p>
              ) : null}
              <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl">
                {t(place.name, lang)}
              </h2>
              <p className="mt-1 text-sm text-[#f4e8d8]/80">{t(place.subtitle, lang)}</p>
            </div>
          </div>
          <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-6 px-5 py-5 pb-16">
              <div className="flex flex-wrap gap-2">
                {place.year ? (
                  <Badge variant="secondary" className="bg-amber-900/50 text-amber-100">
                    {place.year}
                  </Badge>
                ) : null}
                <Badge variant="outline" className="border-white/20 text-[#f4e8d8]">
                  {place.meters} m
                </Badge>
                {place.lat ? (
                  <Badge variant="outline" className="border-white/20 text-[#f4e8d8]/80">
                    {place.lat.toFixed(5)}°N {place.lon?.toFixed(5)}°E
                  </Badge>
                ) : null}
              </div>
              {place.story.map((paragraph) => (
                <p key={paragraph.en} className="text-[15px] leading-7 text-[#f4e8d8]/90">
                  {t(paragraph, lang)}
                </p>
              ))}
              {place.photoHonesty ? (
                <p className="rounded-lg border border-amber-200/20 bg-black/25 px-3 py-3 text-sm leading-6 text-amber-100/85">
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-amber-200/70">
                    {t({ en: "About this photograph", pl: "O tej fotografii" }, lang)}
                  </span>
                  {t(place.photoHonesty, lang)}
                </p>
              ) : null}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {place.details.map((row) => (
                  <div key={row.label.en} className="rounded-lg bg-black/30 p-3">
                    <p className="text-[11px] uppercase tracking-wider text-amber-200/70">
                      {t(row.label, lang)}
                    </p>
                    <p className="mt-1 text-sm">{t(row.value, lang)}</p>
                  </div>
                ))}
              </div>
              {place.photos.length > 1 ? (
                <div>
                  <h3 className="mb-3 font-[family-name:var(--font-display)] text-xl">
                    {t({ en: "Photographs", pl: "Fotografie" }, lang)}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {place.photos.map((photo) => (
                      <figure key={photo.src} className="overflow-hidden rounded-md">
                        <img src={photo.src} alt={t(photo.alt, lang)} className="h-32 w-full object-cover" />
                        <figcaption className="bg-black/40 px-2 py-1 text-[10px] text-white/70">
                          {photo.credit}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ) : null}
              {related.length ? (
                <div>
                  <h3 className="mb-3 font-[family-name:var(--font-display)] text-xl">
                    {t({ en: "People", pl: "Ludzie" }, lang)}
                  </h3>
                  <div className="space-y-3">
                    {related.map((person) => (
                      <div key={person.id} className="flex gap-3">
                        {person.photo ? (
                          <img
                            src={person.photo}
                            alt={person.name}
                            className="h-16 w-12 shrink-0 object-cover"
                          />
                        ) : null}
                        <div>
                          <p className="font-medium">
                            {person.name}{" "}
                            <span className="text-xs text-amber-200/70">{person.years}</span>
                          </p>
                          <p className="text-sm leading-6 text-[#f4e8d8]/80">{t(person.bio, lang)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <Separator className="bg-white/10" />
              <div>
                <h3 className="mb-2 text-xs uppercase tracking-wider text-amber-200/70">
                  {t({ en: "Sources", pl: "Źródła" }, lang)}
                </h3>
                <ul className="space-y-1 text-sm">
                  {place.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-100 underline decoration-amber-700 underline-offset-4 hover:text-white"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
