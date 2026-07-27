import { useEffect, useRef } from "react";
import wetGlass from "../../assets/mana-house-textura-vidro-molhado.webp";
import { siteCopy, t } from "../../data/content";
import type { SiteLocale } from "../../hooks/use-locale";
import { SiteFooter } from "../SiteFooter";

/** Faixa inicial. */
const START_VH = 30;
/** Abre até a tela inteira — sem travar em cima com sticky. */
const MAX_VH = 100;
/** Quanto de rolagem (em vh) a abertura usa. */
const SCROLL_RANGE_VH = 145;

export function HomeCloser({ locale }: { locale: SiteLocale }) {
  const trackRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const frame = frameRef.current;
    const img = imgRef.current;
    const caption = captionRef.current;
    if (!track || !frame || !img || !caption) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const startPx = (START_VH / 100) * vh;
      const maxPx = (MAX_VH / 100) * vh;
      const bottomPad = 16;
      const captionH = caption.offsetHeight || 32;

      img.style.height = `${maxPx}px`;

      // Centro da faixa inicial (direita)
      const centerY = Math.max((startPx - captionH) / 2, 0);

      if (reduced) {
        frame.style.height = `${maxPx}px`;
        caption.style.top = "auto";
        caption.style.bottom = `${bottomPad}px`;
        caption.style.transform = "none";
        return;
      }

      const rect = track.getBoundingClientRect();
      const startLine = vh * 0.5;
      const range = (SCROLL_RANGE_VH / 100) * vh;
      const progress = Math.min(Math.max((startLine - rect.top) / range, 0), 1);

      const frameH = startPx + progress * (maxPx - startPx);
      frame.style.height = `${frameH}px`;

      if (progress <= 0) {
        // Parada: centro à direita
        caption.style.top = "0";
        caption.style.bottom = "auto";
        caption.style.transform = `translate3d(0, ${centerY}px, 0)`;
      } else {
        // Rolagem iniciou: final da imagem (acompanha a abertura)
        const endY = Math.max(frameH - captionH - bottomPad, 0);
        caption.style.top = "0";
        caption.style.bottom = "auto";
        caption.style.transform = `translate3d(0, ${endY}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      className="home-closer relative bg-[#bdc9ad]"
      aria-label={t(siteCopy.footerClose, locale)}
    >
      <div
        ref={frameRef}
        className="home-closer-frame relative w-full overflow-hidden"
        style={{ height: `${START_VH}svh` }}
      >
        <img
          ref={imgRef}
          src={wetGlass}
          alt={
            locale === "pt"
              ? "Mulher atrás do vidro molhado do chuveiro"
              : "Woman behind wet shower glass"
          }
          className="pointer-events-none absolute left-0 top-0 w-full max-w-none object-cover object-center grayscale"
          style={{ height: `${MAX_VH}svh` }}
          loading="eager"
          decoding="async"
        />
        <p
          ref={captionRef}
          className="home-closer-caption absolute right-4 top-0 z-[1] text-right text-[1.7rem] leading-tight text-[#1a1a1a] will-change-transform md:right-8 md:text-[1.875rem]"
        >
          {t(siteCopy.footerClose, locale)}
        </p>
      </div>

      <SiteFooter locale={locale} closer />
    </section>
  );
}
