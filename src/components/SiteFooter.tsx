import { Link } from "@tanstack/react-router";
import symbol from "../assets/mana-house-symbol-footer.png";
import wordmark from "../assets/mana-house-wordmark-footer.svg";
import { siteCopy, t } from "../data/content";
import type { SiteLocale } from "../hooks/use-locale";

/** Navegação — ordem da referência: Home, About, Services, Journal, Videos, Contact */
const nav = [
  { to: "/" as const, label: siteCopy.nav.home },
  { to: "/" as const, hash: "sobre", label: { pt: "Sobre", en: "About" } },
  { to: "/especialidades" as const, label: siteCopy.nav.especialidades },
  { to: "/blog" as const, label: siteCopy.nav.blog },
  { to: "/vlog" as const, label: siteCopy.nav.vlog },
  { to: "/contato" as const, label: siteCopy.nav.contato },
];

export function SiteFooter({
  locale,
  className = "",
  compact = false,
  closer = false,
}: {
  locale: SiteLocale;
  className?: string;
  compact?: boolean;
  closer?: boolean;
}) {
  const logoAlt = "Mana House AMO logo Ipanema Rio de Janeiro";

  return (
    <footer
      className={`site-footer relative overflow-x-hidden bg-[#bdc9ad] text-[#171717] ${
        closer
          ? "px-5 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8"
          : compact
            ? "px-5 py-8 md:px-10"
            : "px-5 pb-8 pt-12 md:px-10 md:pb-12 md:pt-10"
      } ${className}`}
    >
      {/* 1) MANA HOUSE — quase de ponta a ponta, como na referência */}
      <img
        src={wordmark}
        alt="MANA HOUSE"
        className="mx-auto block h-auto w-full max-w-none select-none"
        draggable={false}
      />

      {/* 2) Três colunas agrupadas na metade direita */}
      <div
        className={`ml-auto grid w-full max-w-xl grid-cols-1 gap-x-12 gap-y-6 text-left text-[13px] leading-[1.55] sm:grid-cols-3 md:max-w-2xl md:text-sm ${
          closer ? "mt-10 md:mt-12" : compact ? "mt-10" : "mt-12 md:mt-14"
        }`}
      >
        <ul className="space-y-1.5">
          {nav.map((n) => (
            <li key={`${n.to}-${"hash" in n ? n.hash : ""}-${t(n.label, locale)}`}>
              <Link to={n.to} hash={"hash" in n ? n.hash : undefined} className="hover:underline">
                {t(n.label, locale)}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-1.5">
          <li>(11) 99999-0000</li>
          <li>
            <a href="mailto:contato@manahouse.com" className="hover:underline">
              contato@manahouse.com
            </a>
          </li>
          <li>Ipanema, Rio de Janeiro</li>
        </ul>
        <ul className="space-y-1.5">
          <li>{t(siteCopy.weekdayHours, locale)}</li>
          <li>{t(siteCopy.saturdayHours, locale)}</li>
          <li>{t(siteCopy.sundayHours, locale)}</li>
        </ul>
      </div>

      {/* 3) Recover no canto esquerdo · logo no canto direito (alinhado à coluna de horários) */}
      {closer || !compact ? (
        <div
          className={`flex w-full items-end justify-between ${
            closer ? "mt-16 md:mt-20" : "mt-20 md:mt-24"
          }`}
        >
          <p className="site-footer-tagline text-[1.35rem] leading-[0.92] tracking-[-0.02em] md:text-[1.5rem]">
            Recover.
            <br />
            Ritual.
            <br />
            Belonging.
          </p>
          <img
            src={symbol}
            alt={logoAlt}
            className="block h-12 w-12 shrink-0 object-contain md:h-14 md:w-14"
            draggable={false}
          />
        </div>
      ) : null}
    </footer>
  );
}
