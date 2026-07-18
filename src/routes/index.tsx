import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import community from "../assets/mana-house-comunidade-sauna.webp";
import hero from "../assets/mana-house-hero-recuperacao.webp";
import hotYoga from "../assets/mana-house-hot-yoga-infravermelho.webp";
import massage from "../assets/mana-house-massagem-terapeutica.webp";
import massageHands from "../assets/mana-house-massagem-maos.webp";
import saunaLight from "../assets/mana-house-sauna-luz-natural.webp";
import saunaPortrait from "../assets/mana-house-sauna-retrato.webp";
import saunaRelax from "../assets/mana-house-sauna-relaxamento.webp";
import wetGlass from "../assets/mana-house-textura-vidro-molhado.webp";
import { HomeMembership } from "../components/home/HomeMembership";
import { Reveal } from "../components/home/Reveal";
import { siteCopy, t } from "../data/content";
import { useLocale } from "../hooks/use-locale";

const experiences = [
  {
    label: { pt: "Banho de Gelo", en: "Cold Plunge" },
    image: saunaLight,
    desc: {
      pt: "Frio que desperta circulação, mente e sistema nervoso.",
      en: "Cold that awakens circulation, mind and nervous system.",
    },
  },
  {
    label: { pt: "Sauna", en: "Sauna" },
    image: saunaRelax,
    desc: {
      pt: "Calor profundo para desacelerar e recuperar.",
      en: "Deep heat to slow down and recover.",
    },
  },
  {
    label: { pt: "Massagem", en: "Massage" },
    image: massageHands,
    desc: {
      pt: "Toque qualificado para liberar tensão e restaurar movimento.",
      en: "Skilled touch to release tension and restore movement.",
    },
  },
  {
    label: { pt: "Tecnologia Pneumática", en: "Pneumatic Tech" },
    image: massage,
    desc: {
      pt: "Compressão sequencial para circulação e recuperação muscular.",
      en: "Sequential compression for circulation and muscle recovery.",
    },
  },
  {
    label: { pt: "Nervo Vago", en: "Vagus Nerve" },
    image: saunaPortrait,
    desc: {
      pt: "Um convite fisiológico para o corpo sair do estado de alerta.",
      en: "A physiological invitation for the body to leave alert mode.",
    },
  },
  {
    label: { pt: "ILIB", en: "ILIB" },
    image: hotYoga,
    desc: {
      pt: "Fotobiomodulação sistêmica como suporte ao equilíbrio do organismo.",
      en: "Systemic photobiomodulation supporting the body's balance.",
    },
  },
  {
    label: { pt: "Terapia de Luz Vermelha", en: "Red Light Therapy" },
    image: saunaPortrait,
    desc: {
      pt: "Luz, calor e tempo para estimular processos naturais de recuperação.",
      en: "Light, heat and time to stimulate natural recovery processes.",
    },
  },
  {
    label: { pt: "Comunidade", en: "Community" },
    image: community,
    desc: {
      pt: "Uma casa feita para recuperar junto e criar conexões reais.",
      en: "A house made to recover together and create real connections.",
    },
  },
  {
    label: { pt: "Eventos para Membros", en: "Member Events" },
    image: community,
    desc: {
      pt: "Encontros que transformam bem-estar em pertencimento.",
      en: "Gatherings that turn wellness into belonging.",
    },
  },
];

const journal = [
  {
    image: saunaPortrait,
    title: {
      pt: "Por que a terapia de contraste acelera a recuperação",
      en: "Why contrast therapy accelerates recovery",
    },
    excerpt: {
      pt: "Entenda como calor e frio estimulam circulação, clareza mental e recuperação muscular.",
      en: "How heat and cold support circulation, mental clarity and muscle recovery.",
    },
    date: "28 Mar 2026",
    read: "6 min",
  },
  {
    image: massage,
    title: {
      pt: "Massagem terapêutica: técnica, escuta e resultado",
      en: "Therapeutic massage: technique, listening and results",
    },
    excerpt: {
      pt: "O que muda quando a sessão é uma abordagem clínica, não um protocolo.",
      en: "What changes when a session is a clinical approach, not a protocol.",
    },
    date: "12 Abr 2026",
    read: "5 min",
  },
  {
    image: hotYoga,
    title: {
      pt: "Hot yoga infravermelho: mobilidade, suor e presença",
      en: "Infrared hot yoga: mobility, sweat and presence",
    },
    excerpt: {
      pt: "Como o calor profundo amplia os efeitos da prática.",
      en: "How deep heat amplifies the effects of the practice.",
    },
    date: "03 Mai 2026",
    read: "4 min",
  },
  {
    image: saunaRelax,
    title: { pt: "O ritual da sauna para corpo e mente", en: "The sauna ritual for body and mind" },
    excerpt: {
      pt: "Calor, pausa e presença como parte de uma recuperação completa.",
      en: "Heat, pause and presence as part of complete recovery.",
    },
    date: "18 Mai 2026",
    read: "5 min",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mana House · Recovery & Social Home Club em Ipanema, Rio de Janeiro" },
      {
        name: "description",
        content:
          "Sauna infravermelha, terapia de contraste, massagem terapêutica e hot yoga em Ipanema. A Mana House é o primeiro social home club do Rio.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const locale = useLocale();
  const [activeExperience, setActiveExperience] = useState(2);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const activeItem = experiences[activeExperience];

  useEffect(() => {
    const image = heroImageRef.current;
    const copy = heroCopyRef.current;
    if (!image || !copy || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      image.style.transform = `translate3d(0, ${progress * 12}%, 0) scale(1.08)`;
      copy.style.transform = `translate3d(0, ${progress * -36}px, 0)`;
      copy.style.opacity = String(Math.max(0, 1 - progress * 1.35));
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="overflow-hidden bg-[#f2eadf] text-[#171717]">
      <section className="relative min-h-[100svh] overflow-hidden text-white">
        <img
          ref={heroImageRef}
          src={hero}
          alt={
            locale === "pt"
              ? "Pele molhada após ritual de recuperação na Mana House"
              : "Wet skin after a recovery ritual at Mana House"
          }
          width={819}
          height={1024}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-[55%_45%] will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/45" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-10 pt-28 md:px-10">
          <div ref={heroCopyRef} className="mx-auto text-center will-change-transform">
            <h1 className="text-balance text-5xl leading-[0.82] tracking-[-0.06em] md:text-8xl">
              {locale === "pt" ? (
                <>
                  <span
                    className="hero-line hero-line-breath hero-line-first block"
                    data-text="Você chegou."
                  >
                    Você chegou.
                  </span>
                  <span
                    className="hero-line hero-line-breath hero-line-second block"
                    data-text="Respira."
                  >
                    Respira.
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="hero-line hero-line-breath hero-line-first block"
                    data-text="You've arrived."
                  >
                    You&apos;ve arrived.
                  </span>
                  <span
                    className="hero-line hero-line-breath hero-line-second block"
                    data-text="Breathe."
                  >
                    Breathe.
                  </span>
                </>
              )}
            </h1>
            <Link
              to="/contato"
              className="mt-8 inline-flex items-center rounded-full border border-white/70 bg-white px-6 py-2.5 text-xs text-black transition hover:bg-transparent hover:text-white"
            >
              {locale === "pt" ? "Seja membro" : "Become a member"}
            </Link>
          </div>
          <div className="mt-auto max-w-md space-y-4 text-sm leading-tight md:text-base">
            <p>{t(siteCopy.about.body, locale)}</p>
            <p>{t(siteCopy.about.body2, locale)}</p>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal className="max-w-xs">
            <p className="text-xl">{locale === "pt" ? "A Experiência" : "The Experience"}</p>
            <p className="mt-4 text-sm leading-snug">
              {locale === "pt"
                ? "Nove pilares que definem o ritmo da Mana House — recuperação, conexão e presença em Ipanema."
                : "Nine pillars that define the rhythm of Mana House — recovery, connection and presence in Ipanema."}
            </p>
          </Reveal>

          <div className="relative lg:pl-16">
            <div className="mb-8 grid grid-cols-[120px_1fr] items-end gap-5 lg:absolute lg:-left-28 lg:top-[25%] lg:z-10 lg:mb-0 lg:block">
              <div className="relative aspect-square overflow-hidden lg:w-40">
                <img
                  key={activeItem.label.en}
                  src={activeItem.image}
                  alt={t(activeItem.label, locale)}
                  className="experience-image absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p
                key={`${activeItem.label.en}-desc`}
                className="experience-copy max-w-[190px] text-xs leading-tight lg:mt-5"
              >
                {t(activeItem.desc, locale)}
              </p>
            </div>
            <div>
              {experiences.map((item, index) => (
                <Reveal key={item.label.en} className="experience-row" delay={index * 75}>
                  <Link
                    to="/especialidades"
                    onMouseEnter={() => setActiveExperience(index)}
                    onFocus={() => setActiveExperience(index)}
                    className={`experience-link block border-b border-black/30 text-[clamp(2.35rem,5.4vw,5.6rem)] leading-[0.83] tracking-[-0.065em] ${
                      activeExperience === index ? "is-active text-black" : "text-[#d8bd94]"
                    }`}
                  >
                    {t(item.label, locale)}
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#dcc5a1] px-5 pt-4 md:px-10 md:pt-10">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative min-h-[330px] overflow-hidden rounded-2xl text-white md:min-h-[420px]">
            <img
              src={community}
              alt={t(siteCopy.members.alt, locale)}
              className="ambient-zoom absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative grid min-h-[330px] gap-8 p-7 md:min-h-[420px] md:grid-cols-[1fr_auto] md:p-12">
              <div className="max-w-xs">
                <h2 className="text-3xl">{t(siteCopy.members.title, locale)}</h2>
                <p className="mt-4 text-sm leading-snug">
                  {t(siteCopy.members.subtitle, locale)} {t(siteCopy.members.body, locale)}
                </p>
              </div>
              <Link
                to="/contato"
                className="self-start rounded-full border border-white/80 px-7 py-4 text-sm transition hover:bg-white hover:text-black md:self-center"
              >
                {t(siteCopy.members.secondaryCta, locale)}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <HomeMembership locale={locale} />

      <section className="bg-[#171717] px-5 py-20 text-[#f2eadf] md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="text-2xl">{locale === "pt" ? "Journal" : "Journal"}</h2>
            <p className="mt-2 text-sm text-white/70">
              {locale === "pt"
                ? "Notas sobre recuperação e ritmo."
                : "Notes on recovery and rhythm."}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {journal.map((post, index) => (
              <Reveal key={post.title.en} delay={index * 90}>
                <article className="group">
                  <div className="journal-image aspect-[4/5] overflow-hidden">
                    <img
                      src={post.image}
                      alt={t(post.title, locale)}
                      loading="lazy"
                      className="h-full w-full scale-[1.03] object-cover brightness-75 saturate-75 transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-100 group-hover:saturate-100"
                    />
                  </div>
                  <p className="mt-3 text-[10px] text-white/55">
                    {post.date} · {post.read}
                  </p>
                  <h3 className="mt-1 text-xl leading-[0.95]">{t(post.title, locale)}</h3>
                  <p className="mt-3 text-xs leading-snug text-white/65">
                    {t(post.excerpt, locale)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Link
            to="/blog"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#d8bd94] px-6 py-2 text-xs text-[#d8bd94] transition hover:bg-[#d8bd94] hover:text-black"
          >
            {locale === "pt" ? "Ver todos" : "View all"} <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <section className="relative h-64 overflow-hidden md:h-80">
        <img
          src={wetGlass}
          alt=""
          className="wet-glass-drift absolute inset-0 h-full w-full scale-110 object-cover object-center grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-white/5" />
        <p className="fade-in absolute bottom-4 right-5 text-3xl tracking-[-0.04em] md:right-10 md:text-5xl">
          {t(siteCopy.footerClose, locale)}
        </p>
      </section>
    </div>
  );
}
