import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import community from "../assets/mana-house-comunidade-sauna.webp";
import hotYoga from "../assets/mana-house-hot-yoga-infravermelho.webp";
import massage from "../assets/mana-house-massagem-terapeutica.webp";
import massageHands from "../assets/mana-house-massagem-maos.webp";
import saunaLight from "../assets/mana-house-sauna-luz-natural.webp";
import saunaPortrait from "../assets/mana-house-sauna-retrato.webp";
import saunaRelax from "../assets/mana-house-sauna-relaxamento.webp";
import { HomeCloser } from "../components/home/HomeCloser";
import { HomeHero } from "../components/home/HomeHero";
import { HomeJournal } from "../components/home/HomeJournal";
import { HomeMembership } from "../components/home/HomeMembership";
import { Reveal } from "../components/home/Reveal";
import { siteCopy, t } from "../data/content";
import { useLocale } from "../hooks/use-locale";

const experiences = [
  {
    label: { pt: "Banho de Gelo", en: "Cold Plunge" },
    image: saunaLight,
    desc: {
      pt: "Frio que desperta circulação,\nmente e sistema nervoso.",
      en: "Ice bath and contrast circuit that wake\ncirculation, mind and nervous system",
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

const PREVIEW_SLOTS = ["right", "left", "top"] as const;
type PreviewSlot = (typeof PREVIEW_SLOTS)[number];

function previewSlotFor(index: number): PreviewSlot {
  return PREVIEW_SLOTS[index % PREVIEW_SLOTS.length];
}

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
  const activeItem = experiences[activeExperience];
  const previewSlot = previewSlotFor(activeExperience);

  return (
    <div className="bg-[#f2eadf] text-[#171717]">
      <HomeHero locale={locale} />

      <section className="experience-section relative bg-[#f2eadf] pl-[1.15rem] pr-0 md:pl-8">
        <div className="experience-layout flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="experience-intro relative z-[2] shrink-0 pr-4 md:pr-8">
            <Reveal>
              <p className="experience-label text-xl leading-none tracking-[-0.03em] md:text-[1.35rem]">
                {locale === "pt" ? "A Experiência" : "The Experience"}
              </p>
              <p className="experience-lede mt-3 max-w-[16rem] text-sm leading-[1.35] md:max-w-[18rem] md:text-[0.95rem]">
                {locale === "pt"
                  ? "Oito pilares que definem o ritmo da Mana House — recuperação, conexão e presença em Ipanema."
                  : "Eight pillars that define the rhythm of Mana House — recovery, connection and presence in Ipanema."}
              </p>
            </Reveal>
          </div>

          {/* Largura controlada em styles.css → .experience-list */}
          <div className="experience-list relative z-[2]">
            <div
              className={`experience-preview experience-preview--${previewSlot}`}
            >
              <p
                key={`copy-${activeItem.label.en}`}
                className="experience-copy text-[0.82rem] leading-[1.3] text-[#171717] md:text-[0.88rem]"
              >
                {t(activeItem.desc, locale)
                  .split("\n")
                  .map((line) => (
                    <span key={line} className="experience-copy-line">
                      {line}
                    </span>
                  ))}
              </p>
              <div
                key={`media-${activeItem.label.en}`}
                className="experience-preview-media relative aspect-square shrink-0 overflow-hidden"
              >
                <img
                  src={activeItem.image}
                  alt={t(activeItem.label, locale)}
                  className="experience-image absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="experience-rows">
              {experiences.map((item, index) => (
                <Reveal key={item.label.en} className="experience-row" delay={index * 40}>
                  <button
                    type="button"
                    onClick={() => setActiveExperience(index)}
                    onMouseEnter={() => setActiveExperience(index)}
                    onFocus={() => setActiveExperience(index)}
                    className={`experience-link block w-full whitespace-nowrap text-left text-[clamp(1.95rem,4.4vw,3.25rem)] tracking-[-0.04em] ${
                      activeExperience === index ? "is-active text-black" : "text-[#d8bd94]"
                    }`}
                  >
                    {t(item.label, locale)}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ohana full-bleed — imagem canto a canto */}
      <section className="ohana-section relative z-[1] w-full bg-[#dcc5a1] pt-0">
        <div className="ohana-banner relative min-h-[360px] w-full overflow-hidden text-white md:min-h-[460px]">
          <img
            src={community}
            alt={t(siteCopy.members.alt, locale)}
            className="absolute inset-0 h-full w-full object-cover object-[50%_18%] brightness-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-black/5" />
          <div className="relative z-[1] grid min-h-[360px] items-center gap-8 px-[1.15rem] py-10 md:min-h-[460px] md:grid-cols-[1fr_auto] md:px-8 md:py-14">
            <div className="ohana-copy max-w-xs text-left md:max-w-sm">
              <h2 className="ohana-title text-3xl drop-shadow-sm">{t(siteCopy.members.title, locale)}</h2>
              <p className="ohana-body mt-4 text-sm leading-snug drop-shadow-sm">
                {t(siteCopy.members.subtitle, locale)} {t(siteCopy.members.body, locale)}
              </p>
            </div>
            <div className="ohana-cta-slot flex w-full justify-start md:w-auto md:justify-end md:self-center">
              <Link
                to="/contato"
                className="ohana-cta inline-flex items-center justify-start rounded-full border border-white text-left text-sm leading-none text-white no-underline whitespace-nowrap transition hover:bg-white hover:text-black"
              >
                {t(siteCopy.members.secondaryCta, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HomeMembership locale={locale} />

      <HomeJournal locale={locale} posts={journal} />

      <HomeCloser locale={locale} />
    </div>
  );
}
