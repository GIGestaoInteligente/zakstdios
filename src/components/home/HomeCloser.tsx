import { useEffect, useRef } from "react";
import wetGlass from "../../assets/mana-house-textura-vidro-molhado.webp";
import { siteCopy, t } from "../../data/content";
import type { SiteLocale } from "../../hooks/use-locale";
import { SiteFooter } from "../SiteFooter";

/** Faixa inicial do vidro (vh). */
const START_VH = 18;
/** Rolagem só para abrir o vidro (vh). */
const GLASS_RANGE_VH = 145;
/** Rolagem depois, para o footer completar (vh). */
const FOOTER_RANGE_VH = 100;
/** Quanto do footer fica visível enquanto o vidro abre (px). */
const FOOTER_PEEK_PX = 500;

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

      /*
        Progresso pelo quanto a pista já “passou” do topo.
        total ≈ distância em que o sticky consegue scrubar.
      */
      const rect = track.getBoundingClientRect();
      const total = Math.max(track.offsetHeight - vh, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const t = scrolled / total;

      const glassShare = GLASS_RANGE_VH / (GLASS_RANGE_VH + FOOTER_RANGE_VH);
      const glassProgress = Math.min(t / glassShare, 1);
      const footerProgress =
        t <= glassShare ? 0 : Math.min((t - glassShare) / (1 - glassShare), 1);

      const frameH = startPx + glassProgress * (maxPx - startPx);
      frame.style.height = `${frameH}px`;
      frame.style.transform = `translate3d(0, ${-footerProgress * maxPx}px, 0)`;

      const footerY = -peek - footerProgress * (footerH - peek);
      footerWrap.style.transform = `translate3d(0, ${footerY}px, 0)`;

      // Frase: centro da faixa → desce até a base (via top, sem transform)
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
    // Garante update mesmo se o scroll for em outro container
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
      style={{ height: `${GLASS_RANGE_VH + FOOTER_RANGE_VH + 100}svh` }}
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
