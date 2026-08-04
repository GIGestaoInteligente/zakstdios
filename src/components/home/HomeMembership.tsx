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
              className={`membership-tab rounded-full px-4 py-1.5 text-sm transition-colors md:text-base ${
                active === index ? "bg-[#171717] text-[#dcc5a1]" : "hover:bg-black/5"
              }`}
            >
              {t(item.name, locale)}
            </button>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 md:mt-16 md:flex-row md:items-center md:justify-center md:gap-8 lg:gap-10">
          <div
            key={`${tier.id}-stone`}
            className="membership-stone relative flex aspect-square w-full max-w-[320px] shrink-0 items-center justify-center md:max-w-[380px]"
          >
            <img src={element} alt="" className="h-full w-full object-contain" />
          </div>

          <div
            key={tier.id}
            className="membership-panel w-full max-w-md"
            role="tabpanel"
          >
            <h3 className="membership-headline text-balance text-4xl leading-[0.95] md:text-5xl">
              {t(tier.headline, locale)}
            </h3>
            <p className="membership-body mt-6 max-w-sm text-base leading-snug">
              {t(tier.body, locale)}
            </p>
            <p className="membership-price mt-16 text-lg">{t(tier.price, locale)}</p>
            <Link
              to="/contato"
              className="membership-cta mt-3 flex w-full max-w-sm items-center justify-center rounded-full bg-[#171717] px-6 py-3 text-xs text-[#f2eadf] transition hover:bg-black/80"
            >
              {locale === "pt" ? "Começar" : "Get started"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
