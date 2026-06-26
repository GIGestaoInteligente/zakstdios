import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { homePillars, siteCopy, t } from "@/data/content";
import type { SiteLocale } from "@/hooks/use-locale";
import {
  BarIcon,
  ColdPlungeIcon,
  ConnectionsIcon,
  FloatingIcon,
  HotYogaIcon,
  MembershipIcon,
  NatureIcon,
} from "./pillar-icons";

const pillarIcons = {
  "hot-yoga": HotYogaIcon,
  "cold-plunge": ColdPlungeIcon,
  floating: FloatingIcon,
  bar: BarIcon,
  connections: ConnectionsIcon,
  membership: MembershipIcon,
  nature: NatureIcon,
} as const;

export function HomeExperiencesPillars({ locale }: { locale: SiteLocale }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-12">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">{t(siteCopy.pillars.eyebrow, locale)}</p>
          <h2 className="text-3xl md:text-4xl mb-4">{t(siteCopy.pillars.title, locale)}</h2>
          <p className="text-lg text-muted-foreground">{t(siteCopy.pillars.subtitle, locale)}</p>
        </div>
        <Link to="/especialidades" className="hidden md:inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all shrink-0">
          {t(siteCopy.pillars.all, locale)} <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {homePillars.map((pillar) => {
          const Icon = pillarIcons[pillar.id];
          const inner = (
            <>
              <div className="w-14 h-14 rounded-full bg-secondary/80 flex items-center justify-center text-primary mb-5 group-hover:bg-secondary transition-colors">
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-sm uppercase tracking-[0.14em] text-foreground mb-2">{t(pillar.label, locale)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(pillar.desc, locale)}</p>
            </>
          );

          return pillar.href ? (
            <Link
              key={pillar.id}
              to={pillar.href}
              className="group rounded-2xl bg-card border border-border/50 p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {inner}
            </Link>
          ) : (
            <article key={pillar.id} className="group rounded-2xl bg-card border border-border/50 p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
              {inner}
            </article>
          );
        })}
      </div>
      <Link to="/especialidades" className="mt-8 inline-flex md:hidden items-center gap-2 text-sm text-primary">
        {t(siteCopy.pillars.all, locale)} <ArrowRight size={14} />
      </Link>
    </section>
  );
}
