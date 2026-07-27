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

      <section className="experience-section relative bg-[#f2eadf] px-[1.15rem] py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="experience-intro relative z-[2] shrink-0">
            <Reveal>
              <p className="text-xl leading-none tracking-[-0.03em]">
                {locale === "pt" ? "A Experiência" : "The Experience"}
              </p>
              <p className="mt-4 max-w-[16rem] text-sm leading-snug md:max-w-[18rem]">
                {locale === "pt"
                  ? "Nove pilares que definem o ritmo da Mana House — recuperação, conexão e presença em Ipanema."
                  : "Nine pillars that define the rhythm of Mana House — recovery, connection and presence in Ipanema."}
              </p>
            </Reveal>
          </div>

          <div className="experience-list relative z-[2] w-full max-w-xl self-end lg:max-w-[32rem] xl:max-w-[36rem]">
            <div
              key={`${activeItem.label.en}-${previewSlot}`}
              className={`experience-preview experience-preview--${previewSlot}`}
            >
              <p className="experience-copy text-[0.8125rem] leading-[1.35] text-[#171717]">
                {t(activeItem.desc, locale)
                  .split("\n")
                  .map((line) => (
                    <span key={line} className="experience-copy-line">
                      {line}
                    </span>
                  ))}
              </p>
              <div className="relative aspect-square w-[7.5rem] shrink-0 overflow-hidden sm:w-32 lg:w-36">
                <img
                  src={activeItem.image}
                  alt={t(activeItem.label, locale)}
                  className="experience-image absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              {experiences.map((item, index) => (
                <Reveal key={item.label.en} className="experience-row" delay={index * 75}>
                  <button
                    type="button"
                    onClick={() => setActiveExperience(index)}
                    onMouseEnter={() => setActiveExperience(index)}
                    onFocus={() => setActiveExperience(index)}
                    className={`experience-link block w-full whitespace-nowrap border-b border-black/30 text-left text-[clamp(1.65rem,2.9vw,2.75rem)] leading-[1.08] tracking-[-0.045em] ${
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

      <section className="-mt-6 bg-[#dcc5a1] px-5 pt-0 md:-mt-10 md:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl text-white md:min-h-[460px]">
            <img
              src={community}
              alt={t(siteCopy.members.alt, locale)}
              className="absolute inset-0 h-full w-full object-cover object-[50%_18%]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-black/20" />
            <div className="relative grid min-h-[360px] gap-8 p-7 md:min-h-[460px] md:grid-cols-[1fr_auto] md:p-12">
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

      <HomeJournal locale={locale} posts={journal} />

      <HomeCloser locale={locale} />
    </div>
  );
}
