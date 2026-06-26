import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { especialidades, siteCopy, t } from "@/data/content";
import type { SiteLocale } from "@/hooks/use-locale";

export function HomeExperiencesClassic({ locale }: { locale: SiteLocale }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">{t(siteCopy.experiences.eyebrow, locale)}</p>
          <h2 className="text-3xl md:text-4xl">{t(siteCopy.experiences.title, locale)}</h2>
        </div>
        <Link to="/especialidades" className="hidden md:inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
          {t(siteCopy.experiences.all, locale)} <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
        {especialidades.map((e) => (
          <article key={e.slug} className="group rounded-2xl bg-card border border-border/50 p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-full gradient-sage mb-5" />
            <h3 className="text-xl mb-2">{t(e.title, locale)}</h3>
            <p className="text-sm font-medium text-primary mb-3">{t(e.short, locale)}</p>
            <p className="text-sm text-muted-foreground">{t(e.card, locale)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
