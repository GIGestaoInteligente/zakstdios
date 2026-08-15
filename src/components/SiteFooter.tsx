import { Link } from "@tanstack/react-router";
import symbol from "../assets/MANAHOUSE_Logo-A.svg";
import wordmark from "../assets/MANAHOUSE_Wordmark-Hor-A-Rio.svg";
import { siteCopy, t } from "../data/content";
import type { SiteLocale } from "../hooks/use-locale";

/** Navegação — ordem da referência */
const nav = [
  { to: "/" as const, label: siteCopy.nav.home },
  { to: "/" as const, hash: "sobre", label: { pt: "Sobre", en: "About" } },
  { to: "/especialidades" as const, label: siteCopy.nav.especialidades },
  { to: "/blog" as const, label: siteCopy.nav.blog },
  { to: "/vlog" as const, label: siteCopy.nav.vlog },
  { to: "/contato" as const, label: siteCopy.nav.contato },
];

/** Horários — dia | hora (ref. layout) */
const hoursLines = [
  {
    day: { pt: "Seg-Sex", en: "Mon-Fri" },
    time: { pt: "8h—21h", en: "8am—9pm" },
  },
  {
    day: { pt: "Sábado", en: "Saturday" },
    time: { pt: "9h—18h", en: "9am—6pm" },
  },
  {
    day: { pt: "Domingo", en: "Sunday" },
    time: { pt: "fechado", en: "Closed" },
  },
] as const;

function FooterBody({
  locale,
  closer = false,
  compact = false,
  showBottom = true,
}: {
  locale: SiteLocale;
  closer?: boolean;
  compact?: boolean;
  showBottom?: boolean;
}) {
  const logoAlt = "Mana House AMO logo Ipanema Rio de Janeiro";

  return (
    <>
      <div className={`site-footer-wordmark-wrap ${closer ? "is-closer" : ""}`}>
        <img
          src={wordmark}
          alt="MANA HOUSE"
          className="site-footer-wordmark"
          draggable={false}
        />
      </div>

      <div
        className={`site-footer-cols ${
          compact ? "is-compact" : ""
        } ${closer ? "is-closer" : ""}`}
      >
        <div className="site-footer-cols-spacer" aria-hidden />
        <div className="site-footer-cols-grid">
          <ul>
            {nav.map((n) => (
              <li key={`${n.to}-${"hash" in n ? n.hash : ""}-${t(n.label, locale)}`}>
                <Link to={n.to} hash={"hash" in n ? n.hash : undefined}>
                  {t(n.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            <li>(11) 999 990 000</li>
            <li>
              <a href="mailto:contato@manahouse.com">contato@manahouse.com</a>
            </li>
            <li>Ipanema, Rio de Janeiro</li>
          </ul>
          <ul className="site-footer-hours">
            {hoursLines.map((line) => (
              <li key={line.day.en}>
                <span>{t(line.day, locale)}</span>
                <span>{t(line.time, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showBottom ? (
        <div className={`site-footer-bottom ${closer ? "is-closer" : ""}`}>
          <p className="site-footer-tagline">
            {locale === "pt" ? (
              <>
                Recover,
                <br />
                Ritual,
                <br />
                Belonging.
              </>
            ) : (
              <>
                Recover,
                <br />
                Ritual,
                <br />
                Belonging.
              </>
            )}
          </p>
          <img
            src={symbol}
            alt={logoAlt}
            className="site-footer-symbol"
            draggable={false}
          />
        </div>
      ) : null}
    </>
  );
}

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
  const showBottom = closer || !compact;

  if (closer) {
    return (
      <footer
        className={`site-footer site-footer--closer relative flex flex-col overflow-x-hidden bg-[#bdc9ad] text-[#171717] ${className}`}
      >
        <FooterBody locale={locale} closer showBottom />
      </footer>
    );
  }

  return (
    <footer
      className={`site-footer relative overflow-x-hidden bg-[#bdc9ad] text-[#171717] ${
        compact ? "is-compact" : ""
      } ${className}`}
    >
      <FooterBody locale={locale} compact={compact} showBottom={showBottom} />
    </footer>
  );
}
