import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "../../assets/mana-house-logo.svg";
import stone from "../../assets/mana-house-pedra-membership.webp";
import { membershipTiers, t } from "../../data/content";
import type { SiteLocale } from "../../hooks/use-locale";

export function HomeMembership({ locale }: { locale: SiteLocale }) {
  const [active, setActive] = useState(2);
  const tier = membershipTiers[active];

  return (
    <section className="bg-[#dcc5a1] px-5 pb-20 pt-10 text-[#171717] md:px-12 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <div
          className="flex flex-wrap justify-center gap-2 md:gap-5"
          role="tablist"
          aria-label={locale === "pt" ? "Planos de membros" : "Membership plans"}
        >
          {membershipTiers.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors md:text-base ${
                active === index ? "bg-[#171717] text-[#dcc5a1]" : "hover:bg-black/5"
              }`}
            >
              {t(item.name, locale)}
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-12 md:mt-16 md:grid-cols-2 md:gap-20">
          <div
            key={`${tier.id}-stone`}
            className="membership-stone relative mx-auto aspect-[4/5] w-full max-w-[310px] overflow-hidden [clip-path:polygon(12%_3%,92%_0,100%_11%,96%_91%,82%_100%,8%_97%,0_80%,2%_15%)]"
          >
            <img
              src={stone}
              alt=""
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/25" />
            <img
              src={logo}
              alt="Símbolo Mana House"
              className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 object-contain grayscale brightness-150 contrast-50 mix-blend-overlay"
            />
          </div>

          <div key={tier.id} className="membership-panel max-w-md" role="tabpanel">
            <h3 className="text-balance text-4xl leading-[0.95] md:text-5xl">
              {t(tier.headline, locale)}
            </h3>
            <p className="mt-6 max-w-sm text-base leading-snug">{t(tier.body, locale)}</p>
            <p className="mt-16 text-lg">{t(tier.price, locale)}</p>
            <Link
              to="/contato"
              className="mt-3 flex w-full items-center justify-center rounded-full bg-[#171717] px-6 py-3 text-xs text-[#f2eadf] transition hover:bg-black/80"
            >
              {locale === "pt" ? "Começar" : "Get started"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
