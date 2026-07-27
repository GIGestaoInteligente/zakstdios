import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "../../assets/mana-house-hero-recuperacao.webp";
import symbol from "../../assets/mana-house-symbol.png";
import titleMark from "../../assets/mana-house-voce-chegou-respira.png";
import { siteCopy, t } from "../../data/content";
import type { SiteLocale } from "../../hooks/use-locale";

const RISE_MS = 5000;

export function HomeHero({ locale }: { locale: SiteLocale }) {
  const [rising, setRising] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRising(true);
      return;
    }

    document.documentElement.classList.add("home-splash-lock");

    const start = window.requestAnimationFrame(() => {
      setRising(true);
    });

    const done = window.setTimeout(() => {
      document.documentElement.classList.remove("home-splash-lock");
    }, RISE_MS);

    return () => {
      window.cancelAnimationFrame(start);
      window.clearTimeout(done);
      document.documentElement.classList.remove("home-splash-lock");
    };
  }, []);

  return (
    <section className="home-hero relative min-h-[128svh] overflow-hidden text-white">
      <div className="absolute inset-0 z-0 bg-[#1a1a1a]" aria-hidden />

      <div className="absolute inset-0 z-[1] flex h-[100svh] items-center justify-center">
        <div className="flex flex-col items-center px-6 text-center">
          <img
            src={symbol}
            alt=""
            width={303}
            height={294}
            className="h-14 w-14 object-contain invert md:h-16 md:w-16"
          />
          <span className="mt-1 text-[10px] leading-none text-white/80">®</span>
          <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white md:text-xs">
            Recovery, ritual and belonging
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/75 md:text-[11px]">
            Ipanema · Rio de Janeiro
          </p>
        </div>
      </div>

      <div className={`home-banner-rise ${rising ? "is-up" : ""}`}>
        <img
          src={hero}
          alt={
            locale === "pt"
              ? "Pele molhada após ritual de recuperação na Mana House"
              : "Wet skin after a recovery ritual at Mana House"
          }
          width={819}
          height={1024}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[55%_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        <div className="relative z-10 mx-auto flex h-[100svh] max-w-7xl flex-col items-center justify-center px-5 pt-24 md:px-10">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <h1 className="sr-only">{t(siteCopy.hero.title, locale)}</h1>
            <img
              src={titleMark}
              alt={t(siteCopy.hero.title, locale)}
              width={1100}
              height={375}
              className="h-auto w-[min(82vw,34rem)] object-contain"
            />

            <div className="hero-cta-row mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contato" className="hero-cta hero-cta-solid">
                {t(siteCopy.hero.primaryCta, locale)}
              </Link>
              <Link to="/especialidades" className="hero-cta hero-cta-ghost">
                {t(siteCopy.hero.secondaryCta, locale)}
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-about-corner">
          <p>{t(siteCopy.about.body, locale)}</p>
          <p>{t(siteCopy.about.body2, locale)}</p>
        </div>
      </div>
    </section>
  );
}
