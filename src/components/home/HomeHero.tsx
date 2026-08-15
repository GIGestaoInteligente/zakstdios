import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import breatheMark from "../../assets/mana-house-breathe-wordmark.png";
import hero from "../../assets/mana-house-hero-recuperacao.webp";
import symbol from "../../assets/MANAHOUSE_Logo-A.svg";
import { siteCopy, t } from "../../data/content";
import type { SiteLocale } from "../../hooks/use-locale";
import { markHomeHeroIntroDone } from "./home-hero-intro";

const RISE_MS = 1600;

export function HomeHero({ locale }: { locale: SiteLocale }) {
  const [rising, setRising] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      root.classList.remove("home-splash-lock");
      root.classList.add("home-hero-ready");
      markHomeHeroIntroDone();
    };

    if (reduce) {
      setRising(true);
      finish();
      return;
    }

    root.classList.add("home-splash-lock");
    root.classList.remove("home-hero-ready");

    const banner = bannerRef.current;
    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.target !== banner) return;
      if (e.propertyName !== "transform") return;
      finish();
    };
    banner?.addEventListener("transitionend", onTransitionEnd);

    let frame2 = 0;
    const frame1 = window.requestAnimationFrame(() => {
      frame2 = window.requestAnimationFrame(() => {
        setRising(true);
      });
    });

    // Fallback se transitionend não disparar
    const fallback = window.setTimeout(finish, RISE_MS + 200);

    return () => {
      window.cancelAnimationFrame(frame1);
      window.cancelAnimationFrame(frame2);
      window.clearTimeout(fallback);
      banner?.removeEventListener("transitionend", onTransitionEnd);
    };
  }, []);

  const arrived = locale === "pt" ? "Você chegou." : "You've arrived.";
  const breatheAlt = locale === "pt" ? "Respira." : "Breathe.";

  return (
    <section className="home-hero relative min-h-[128svh] overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0 bg-black" aria-hidden />

      <div className="absolute inset-0 z-[1] flex h-[100svh] items-center justify-center">
        <div className="flex flex-col items-center px-6 text-center">
          <img
            src={symbol}
            alt=""
            width={327}
            height={318}
            className="hero-splash-symbol h-14 w-14 object-contain md:h-16 md:w-16"
          />
          <span className="mt-1 text-[10px] leading-none text-white/80">®</span>
          <p className="type-sans-medium mt-4 text-[11px] uppercase tracking-[0.22em] text-white md:text-xs">
            Recovery, ritual and belonging
          </p>
          <p className="type-sans-medium mt-2 text-[10px] uppercase tracking-[0.18em] text-white/75 md:text-[11px]">
            Ipanema · Rio de Janeiro
          </p>
        </div>
      </div>

      <div ref={bannerRef} className={`home-banner-rise ${rising ? "is-up" : ""}`}>
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
            <h1 className="hero-title-stack">
              <span className="sr-only">{t(siteCopy.hero.title, locale)}</span>
              <span aria-hidden className="hero-line hero-line-solid hero-arrived">
                {arrived}
              </span>
              <span aria-hidden className="hero-breathe">
                <img
                  src={breatheMark}
                  alt=""
                  width={1024}
                  height={272}
                  className="hero-breathe-img"
                  draggable={false}
                />
                <span className="sr-only">{breatheAlt}</span>
              </span>
            </h1>

            <div className="hero-cta-row flex flex-wrap items-center justify-center gap-3">
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
          <p>
            {siteCopy.about.bodyLines[locale].map((line, i) => (
              <span key={`about-1-${i}`}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
          <p>
            {siteCopy.about.body2Lines[locale].map((line, i) => (
              <span key={`about-2-${i}`}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
