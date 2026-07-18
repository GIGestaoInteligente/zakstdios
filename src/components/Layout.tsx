import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/mana-house-logo.svg";
import symbol from "../assets/mana-house-symbol.png";
import wordmark from "../assets/mana-house-wordmark.png";
import { siteCopy, t } from "../data/content";
import { setSiteLocale, useLocale } from "../hooks/use-locale";

const nav = [
  { to: "/" as const, label: siteCopy.nav.home },
  { to: "/especialidades" as const, label: siteCopy.nav.especialidades },
  { to: "/blog" as const, label: siteCopy.nav.blog },
  { to: "/vlog" as const, label: siteCopy.nav.vlog },
  { to: "/contato" as const, label: siteCopy.nav.contato },
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const locale = useLocale();
  const logoAlt = "Mana House AMO logo Ipanema Rio de Janeiro";
  const isHome = loc.pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={`${isHome ? "absolute text-white" : "relative bg-[#f2eadf] text-[#171717]"} left-0 right-0 top-0 z-50`}
      >
        <div className="relative mx-auto flex h-20 max-w-[1600px] items-center px-5 md:px-7">
          <Link to="/" className="shrink-0" aria-label="Mana House - início">
            <img
              src={wordmark}
              alt="Mana House"
              width={454}
              height={64}
              className="h-auto w-[126px] object-contain md:w-[145px]"
            />
          </Link>

          <nav className="ml-10 hidden items-center gap-7 md:flex">
            {nav.slice(1).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`text-[9px] uppercase tracking-[0.04em] transition-opacity hover:opacity-55 ${
                  loc.pathname === n.to ? "underline underline-offset-4" : ""
                }`}
              >
                {t(n.label, locale)}
              </Link>
            ))}
          </nav>

          <Link
            to="/"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            aria-label="Mana House"
          >
            <img
              src={symbol}
              alt={logoAlt}
              className={`h-7 w-7 object-contain md:h-8 md:w-8 ${isHome ? "invert" : ""}`}
            />
            <span className="mt-1 hidden whitespace-nowrap text-center text-[7px] uppercase leading-[1.15] tracking-[0.04em] md:block">
              Recovery, ritual and belonging
              <br />
              Ipanema · Rio de Janeiro
            </span>
          </Link>

          <div className="ml-auto hidden items-center gap-4 md:flex">
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-[8px] uppercase tracking-[0.05em] transition-opacity hover:opacity-55"
            >
              <span aria-hidden>•</span>
              {t(siteCopy.account, locale)}
            </Link>
            <button
              type="button"
              onClick={() => setSiteLocale(locale === "pt" ? "en" : "pt")}
              className="rounded-full border border-current/45 px-2.5 py-1 text-[8px] uppercase tracking-[0.08em] transition-opacity hover:opacity-55"
              aria-label={
                locale === "pt" ? "Alterar idioma para inglês" : "Change language to Portuguese"
              }
            >
              {locale === "pt" ? "EN" : "PT"}
            </button>
          </div>

          <button
            type="button"
            className="ml-auto p-2 md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={locale === "pt" ? "Abrir menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <nav
            className={`${isHome ? "bg-black/85 text-white" : "bg-[#f2eadf]"} flex flex-col gap-5 border-t border-current/15 px-5 py-7 md:hidden`}
          >
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-xl">
                {t(n.label, locale)}
              </Link>
            ))}
            <Link to="/admin" onClick={() => setOpen(false)} className="mt-3 text-sm opacity-65">
              {t(siteCopy.account, locale)}
            </Link>
            <button
              type="button"
              onClick={() => setSiteLocale(locale === "pt" ? "en" : "pt")}
              className="mt-2 w-fit rounded-full border border-current/45 px-4 py-2 text-sm uppercase tracking-[0.08em]"
            >
              {locale === "pt" ? "English" : "Português"}
            </button>
          </nav>
        )}
      </header>

      <main className="relative z-10 flex-1 bg-[#f2eadf]">
        <Outlet />
      </main>

      <footer className="site-footer sticky bottom-0 z-0 bg-[#bdc9ad] px-5 pb-8 pt-10 text-[#171717] md:px-10 md:pb-10">
        <div className="mx-auto max-w-7xl">
          <p className="whitespace-nowrap text-[clamp(4.5rem,13.7vw,13rem)] leading-[0.72] tracking-[-0.085em]">
            MANA HOUSE
          </p>
          <div className="mt-16 grid gap-10 text-xs sm:grid-cols-3 md:ml-auto md:mt-20 md:max-w-2xl">
            <ul>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:underline">
                    {t(n.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
            <ul>
              <li>(11) 99999-0000</li>
              <li>
                <a href="mailto:contato@manahouse.com" className="hover:underline">
                  contato@manahouse.com
                </a>
              </li>
              <li>Ipanema, Rio de Janeiro</li>
            </ul>
            <ul>
              <li>{t(siteCopy.weekdayHours, locale)}</li>
              <li>{t(siteCopy.saturdayHours, locale)}</li>
              <li>{t(siteCopy.sundayHours, locale)}</li>
            </ul>
          </div>
          <div className="mt-28 flex items-end justify-between md:mt-36">
            <p className="text-xl leading-[0.82] tracking-[-0.04em]">
              Recover.
              <br />
              Ritual.
              <br />
              Belonging.
            </p>
            <img
              src={logo}
              alt={logoAlt}
              className="h-14 w-14 object-contain grayscale brightness-0"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
