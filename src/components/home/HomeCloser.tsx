import { useEffect, useRef } from "react";
import wetGlass from "../../assets/mana-house-textura-vidro-molhado.webp";
import { siteCopy, t } from "../../data/content";
import type { SiteLocale } from "../../hooks/use-locale";
import { SiteFooter } from "../SiteFooter";

/** Faixa fechada (vh) — igual à 2ª imagem. */
const START_VH = 18;
/**
 * Extra de rolagem (vh) para completar a abertura do vidro depois do trigger.
 * ↑ maior = abertura mais lenta. ~80–120 = razoável; 40 = mais rápida.
 */
const OPEN_RANGE_VH = 160;
/** Rolagem (vh) só para o footer subir, depois do vidro aberto. */
const FOOTER_RANGE_VH = 120;
/** Quanto do footer fica visível sob o vidro (px). */
const FOOTER_PEEK_PX = 460;
/**
 * Faixa sage/footer (px) que deve aparecer sob o vidro
 * antes da abertura começar — evita o vidro colado na borda inferior.
 */
const OPEN_AFTER_FOOTER_PX = 120;

export function HomeCloser({ locale }: { locale: SiteLocale }) {
  const trackRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const footerWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const frame = frameRef.current;
    const footerWrap = footerWrapRef.current;
    const img = imgRef.current;
    const caption = captionRef.current;
    if (!track || !frame || !footerWrap || !img) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const startPx = (START_VH / 100) * vh;
      const maxPx = vh;
      const footerH = Math.max(footerWrap.offsetHeight, 1);
      const peek = Math.min(FOOTER_PEEK_PX, footerH);
      const bottomPad = 16;
      const captionH = caption?.offsetHeight || 32;

      img.style.height = `${maxPx}px`;
      img.style.top = "0";
      img.style.bottom = "auto";

      const rect = track.getBoundingClientRect();
      const pinTotal = Math.max(track.offsetHeight - vh, 1);

      /*
        Abertura começa com pezinho de footer, mas é mapeada em OPEN_RANGE_VH
        de scroll (mais range = mais lenta). Footer sobe só depois.
      */
      const glassEntryTop = Math.max(vh - startPx - OPEN_AFTER_FOOTER_PX, 1);
      const openRangePx = (OPEN_RANGE_VH / 100) * vh;
      const footerRangePx = (FOOTER_RANGE_VH / 100) * vh;

      let fromOpen = 0;
      if (rect.top < glassEntryTop) {
        if (rect.top > 0) {
          fromOpen = glassEntryTop - rect.top;
        } else {
          fromOpen = glassEntryTop + Math.min(-rect.top, pinTotal);
        }
      }

      const glassProgress = Math.min(fromOpen / Math.max(openRangePx, 1), 1);
      const footerProgress =
        fromOpen <= openRangePx
          ? 0
          : Math.min((fromOpen - openRangePx) / Math.max(footerRangePx, 1), 1);

      const frameH = startPx + glassProgress * (maxPx - startPx);
      frame.style.height = `${frameH}px`;
      frame.style.top = "0";
      frame.style.transform = `translate3d(0, ${-footerProgress * maxPx}px, 0)`;

      const footerY = -peek - footerProgress * (footerH - peek);
      footerWrap.style.transform = `translate3d(0, ${footerY}px, 0)`;

      if (caption) {
        const centerY = Math.max((startPx - captionH) / 2, 0);
        const bottomY = Math.max(frameH - captionH - bottomPad, 0);
        const captionY = centerY + glassProgress * (bottomY - centerY);
        caption.style.top = `${captionY}px`;
        caption.style.transform = "none";
      }
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("scroll", onScroll, true);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      className="home-closer relative z-0"
      style={{ height: `${OPEN_RANGE_VH + FOOTER_RANGE_VH + 100}svh` }}
      aria-label={t(siteCopy.footerClose, locale)}
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-[#bdc9ad]">
        <div
          ref={frameRef}
          className="home-closer-frame absolute left-0 right-0 top-0 z-10 overflow-hidden will-change-[height,transform]"
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
            style={{ height: "100svh" }}
            loading="eager"
            decoding="async"
          />
          <p
            ref={captionRef}
            className="home-closer-caption absolute right-4 z-[1] text-right text-[1.7rem] leading-tight text-[#1a1a1a] md:right-8 md:text-[1.875rem]"
            style={{ top: `${START_VH / 2}svh`, transform: "translateY(-50%)" }}
          >
            {t(siteCopy.footerClose, locale)}
          </p>
        </div>

        <div
          ref={footerWrapRef}
          className="absolute left-0 right-0 top-full z-0 will-change-transform"
          style={{ transform: `translate3d(0, -${FOOTER_PEEK_PX}px, 0)` }}
        >
          <SiteFooter locale={locale} closer />
        </div>
      </div>
    </section>
  );
}
