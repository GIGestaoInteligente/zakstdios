import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { especialidades, siteCopy, t } from "../data/content";
import contrast from "../assets/mana-house-contrast.png";
import massage from "../assets/mana-house-massage.png";
import lounger from "../assets/mana-house-lounger.png";
import sauna from "../assets/mana-house-sauna.png";
import yoga from "../assets/yoga.jpg";
import { useLocale } from "../hooks/use-locale";

const imgs: Record<string, string> = {
  contraste: contrast,
  massagem: massage,
  "hot-yoga": yoga,
  espreguicadeira: lounger,
  sauna: sauna,
};

const imgSize: Record<string, { width: number; height: number }> = {
  contraste: { width: 1672, height: 941 },
  massagem: { width: 1402, height: 1122 },
  "hot-yoga": { width: 1024, height: 1024 },
  espreguicadeira: { width: 1536, height: 1024 },
  sauna: { width: 1672, height: 941 },
};

export const Route = createFileRoute("/especialidades")({
  head: () => ({
    meta: [
      { title: "Serviços · Mana House" },
      { name: "description", content: "Terapia de contraste, massagem terapêutica, hot yoga infravermelho, espreguiçadeira parassimpática e sauna híbrida em Ipanema." },
    ],
  }),
  component: Page,
});

function Page() {
  const locale = useLocale();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">{t(siteCopy.experiences.eyebrow, locale)}</p>
      <h1 className="text-4xl md:text-5xl mb-4 text-balance">{t(siteCopy.experiences.title, locale)}</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-16">
        {locale === "pt"
          ? "Tecnologias de recuperação e toque qualificado, num mesmo espaço para quem exige muito do próprio ritmo."
          : "Recovery technology and skilled touch in one space, for people who ask a lot from their bodies."}
      </p>
      <div className="space-y-20">
        {especialidades.map((e, i) => (
          <article key={e.slug} className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="relative">
              <div className="absolute -inset-4 gradient-warm rounded-[2rem] -z-10 blur-2xl opacity-50" />
              <img src={imgs[e.slug]} alt={t(e.imageAlt, locale)} loading="lazy" width={imgSize[e.slug].width} height={imgSize[e.slug].height} className="rounded-[2rem] w-full h-auto shadow-xl" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary mb-3">{t(e.short, locale)}</p>
              <h2 className="text-4xl md:text-5xl mb-4 text-balance">{t(e.title, locale)}</h2>
              <p className="text-xl text-foreground/80 mb-5 text-balance">{t(e.headline, locale)}</p>
              <p className="text-lg text-muted-foreground mb-6">{t(e.desc, locale)}</p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                {e.benefits[locale].map((benefit) => (
                  <li key={benefit} className="rounded-full bg-secondary px-4 py-2 text-secondary-foreground">
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link to="/contato" className="btn-approach mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
                {locale === "pt" ? "Agende sua sessão" : "Book your session"} <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
