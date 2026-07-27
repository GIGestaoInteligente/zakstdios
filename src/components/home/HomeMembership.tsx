import { Link } from "@tanstack/react-router";
import { useState } from "react";
import essentialElement from "../../assets/mana-house-elemento-essencial.png";
import immersionElement from "../../assets/mana-house-elemento-imersao.png";
import ritualElement from "../../assets/mana-house-elemento-ritual.png";
import { membershipTiers, t } from "../../data/content";
import type { SiteLocale } from "../../hooks/use-locale";

const tierElements = {
  essential: essentialElement,
  ritual: ritualElement,
  immersion: immersionElement,
} as const;

export function HomeMembership({ locale }: { locale: SiteLocale }) {
  const [active, setActive] = useState(2);
  const tier = membershipTiers[active];
  const element = tierElements[tier.id];

  return (
    <section className="bg-[#dcc5a1] px-5 pb-20 pt-6 text-[#171717] md:px-8 md:pb-28 md:pt-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
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

        <div className="mt-12 grid items-center gap-10 md:mt-16 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-14 lg:gap-20">
          <div
            key={`${tier.id}-stone`}
            className="membership-stone relative mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center md:mx-0 md:max-w-[420px]"
          >
            <img src={element} alt="" className="h-full w-full object-contain" />
          </div>

          <div
            key={tier.id}
            className="membership-panel max-w-md md:justify-self-start"
            role="tabpanel"
          >
            <h3 className="text-balance text-4xl leading-[0.95] md:text-5xl">
              {t(tier.headline, locale)}
            </h3>
            <p className="mt-6 max-w-sm text-base leading-snug">{t(tier.body, locale)}</p>
            <p className="mt-16 text-lg">{t(tier.price, locale)}</p>
            <Link
              to="/contato"
              className="mt-3 flex w-full max-w-sm items-center justify-center rounded-full bg-[#171717] px-6 py-3 text-xs text-[#f2eadf] transition hover:bg-black/80"
            >
              {locale === "pt" ? "Começar" : "Get started"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
