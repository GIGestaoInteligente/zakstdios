import { useEffect, useRef } from "react";
import wetGlass from "../../assets/mana-house-textura-vidro-molhado.png";
import { siteCopy, t } from "../../data/content";
import type { SiteLocale } from "../../hooks/use-locale";
import { SiteFooter } from "../SiteFooter";

/** Faixa fechada do vidro (vh). */
const START_VH = 18;
/**
 * Rolagem para o vidro ir de faixa → full (vh).
 * Menor = open mais rápido (evita stage preta a meio enquanto o sticky pin).
 */
const OPEN_RANGE_VH = 72;
/** Rolagem do footer após o vidro a 100% (vh). */
const FOOTER_RANGE_VH = 110;
/** Peek do footer sob o vidro (px) — só com open completo. */
const FOOTER_PEEK_PX = 460;
/** Open começa com a faixa completa no fundo. */
const OPEN_AFTER_FOOTER_PX = 0;

const SAGE = "#bdc9ad";
/** Preto = mesmo fundo do Journal (fica *acima* do vidro quando a faixa está em baixo). */
const STAGE_UNTIL_OPEN = "#000000";

export function HomeCloser({ locale }: { locale: SiteLocale }) {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const footerWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    const footerWrap = footerWrapRef.current;
    const img = imgRef.current;
    const caption = captionRef.current;
    if (!track || !stage || !frame || !footerWrap || !img) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const startPx = (START_VH / 100) * vh;
      const maxPx = vh;
      const footerH = Math.max(footerWrap.offsetHeight, 1);
      /* Peek escala com a viewport — em ecrã baixo não deixa o bloco “longe” */
      const peek = Math.min(
        FOOTER_PEEK_PX,
        footerH,
        Math.round(vh * (vh < 800 ? 0.72 : 0.55)),
      );
      const bottomPad = 16;
      const captionH = caption?.offsetHeight || 32;

      img.style.height = `${maxPx}px`;
      img.style.top = "0";
      img.style.bottom = "auto";

      const rect = track.getBoundingClientRect();
      const stageTop = stage.getBoundingClientRect().top;
      const pinTotal = Math.max(track.offsetHeight - vh, 1);

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

      const raw = Math.min(fromOpen / Math.max(openRangePx, 1), 1);
      /* ease-out: preenche a tela cedo no scroll */
      const scrollProgress = 1 - (1 - raw) * (1 - raw);

      /*
        Altura: scroll open + o quanto a stage já revelou.
        A stage revelada fica sempre coberta pelo vidro → sem “buraco” preto.
      */
      const scrollOpenH = startPx + scrollProgress * (maxPx - startPx);
      const revealedH =
        stageTop >= maxPx ? 0 : stageTop > 0 ? maxPx - stageTop : maxPx;
      const frameH = Math.min(maxPx, Math.max(scrollOpenH, revealedH, startPx));
      const glassProgress = Math.min(
        Math.max((frameH - startPx) / Math.max(maxPx - startPx, 1), 0),
        1,
      );
      const glassOpen = glassProgress >= 0.999;
      const footerProgress = glassOpen
        ? Math.min(
            Math.max(fromOpen - openRangePx, 0) / Math.max(footerRangePx, 1),
            1,
          )
        : 0;

      /*
        Vidro colado ao fundo do ecrã / stage e cresce para CIMA.
        Assim não há faixa preta sob o vidro — o preto (Journal) fica por cima
        até o frame cobrir tudo.
      */
      let frameTop: number;
      if (stageTop > 0) {
        // Sticky ainda a subir: fundo do frame = fundo da viewport
        frameTop = maxPx - stageTop - frameH;
        frameTop = Math.max(0, Math.min(maxPx - frameH, frameTop));
      } else {
        // Sticky pinado: abre do fundo da stage para o topo
        frameTop = maxPx - frameH;
      }

      frame.style.height = `${frameH}px`;
      frame.style.top = `${frameTop}px`;
      frame.style.bottom = "auto";
      frame.style.transform = `translate3d(0, ${-footerProgress * maxPx}px, 0)`;

      stage.style.backgroundColor = glassOpen ? SAGE : STAGE_UNTIL_OPEN;

      const footerY = glassOpen
        ? maxPx - peek + footerProgress * (0 - (maxPx - peek))
        : maxPx;
      footerWrap.style.transform = `translate3d(0, ${footerY}px, 0)`;
      footerWrap.style.visibility = glassOpen ? "visible" : "hidden";
      footerWrap.setAttribute("aria-hidden", glassOpen ? "false" : "true");

      if (caption) {
        const centerY = Math.max((startPx - captionH) / 2, 0);
        const bottomY = Math.max(frameH - captionH - bottomPad, 0);
        /*
          A frase NÃO usa glassProgress do frame (frame cresce cedo com a stage).
          Usa o open real do scroll com ease-in: fica no centro da faixa no início
          e só desce para a base à medida que o open de verdade avança.
        */
        const captionT = raw * raw;
        const captionY = centerY + captionT * (bottomY - centerY);
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
      <div
        ref={stageRef}
        className="sticky top-0 h-svh overflow-hidden bg-black"
      >
        <div
          ref={frameRef}
          className="home-closer-frame absolute left-0 right-0 z-10 overflow-hidden will-change-[height,top,transform]"
          style={{ height: `${START_VH}svh`, bottom: 0, top: "auto" }}
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
          className="absolute left-0 right-0 top-0 z-0 w-full will-change-transform"
          style={{
            transform: "translate3d(0, 100svh, 0)",
            visibility: "hidden",
          }}
          aria-hidden
        >
          <SiteFooter locale={locale} closer />
        </div>
      </div>
    </section>
  );
}
