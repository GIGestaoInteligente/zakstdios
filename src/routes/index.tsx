import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HomeExperiencesClassic } from "../components/home/HomeExperiencesClassic";
import { HomeExperiencesPillars } from "../components/home/HomeExperiencesPillars";
import { HOME_EXPERIENCES_LAYOUT } from "../config/home-layout";
import hero from "../assets/mana-house-home.png";
import { membershipTiers, posts, siteCopy, t } from "../data/content";
import { useLocale } from "../hooks/use-locale";

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

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-5">{t(siteCopy.hero.eyebrow, locale)}</p>
            <h1 className="text-4xl md:text-6xl leading-[1.05] text-balance text-foreground">{t(siteCopy.hero.title, locale)}</h1>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground max-w-xl">
              <p>{t(siteCopy.about.body, locale)}</p>
              <p>{t(siteCopy.about.body2, locale)}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contato" className="btn-approach inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
                {t(siteCopy.hero.primaryCta, locale)} <ArrowRight size={16} />
              </Link>
              <Link to="/especialidades" className="btn-approach inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition">
                {t(siteCopy.hero.secondaryCta, locale)}
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 gradient-warm rounded-[2rem] -z-10 blur-2xl opacity-60" />
            <img src={hero} alt={t(siteCopy.hero.heroAlt, locale)} width={1024} height={819} className="rounded-[2rem] w-full h-auto shadow-2xl" />
          </div>
        </div>
      </section>

      {HOME_EXPERIENCES_LAYOUT === "pillars" ? (
        <HomeExperiencesPillars locale={locale} />
      ) : (
        <HomeExperiencesClassic locale={locale} />
      )}

      <section className="bg-secondary/45 py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">{t(siteCopy.members.eyebrow, locale)}</p>
            <h2 className="text-3xl md:text-4xl mb-4">{t(siteCopy.members.title, locale)}</h2>
            <p className="text-lg text-muted-foreground mb-5">{t(siteCopy.members.subtitle, locale)}</p>
            <p className="text-muted-foreground">{t(siteCopy.members.body, locale)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contato" className="btn-approach inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
                {t(siteCopy.members.primaryCta, locale)}
              </Link>
              <Link to="/contato" className="btn-approach inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-background transition">
                {t(siteCopy.members.secondaryCta, locale)}
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {membershipTiers.map((tier) => (
              <article key={tier.name.pt} className="rounded-2xl bg-background border border-border/50 p-6">
                <h3 className="text-xl mb-3">{t(tier.name, locale)}</h3>
                <p className="text-sm text-muted-foreground">{t(tier.body, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">{t(siteCopy.blog.eyebrow, locale)}</p>
            <h2 className="text-3xl md:text-4xl">{t(siteCopy.blog.title, locale)}</h2>
          </div>
          <Link to="/blog" className="hidden md:inline-flex items-center gap-2 text-sm text-primary">
            {t(siteCopy.blog.all, locale)} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((p) => (
            <article key={p.slug} className="rounded-2xl bg-card p-6 border border-border/50 hover:shadow-md transition">
              <p className="text-xs text-muted-foreground mb-3">{p.date} · {p.read}</p>
              <h3 className="text-xl mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
