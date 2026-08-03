import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoFull from "../assets/mana-house-logo-full.png";
import symbol from "../assets/mana-house-symbol.png";
import wordmark from "../assets/mana-house-wordmark.png";
import { siteCopy, t } from "../data/content";
import { setSiteLocale, useLocale } from "../hooks/use-locale";
import { SiteFooter } from "./SiteFooter";

const nav = [
  { to: "/" as const, label: siteCopy.nav.home },
  { to: "/especialidades" as const, label: siteCopy.nav.especialidades },
  { to: "/blog" as const, label: siteCopy.nav.blog },
  { to: "/vlog" as const, label: siteCopy.nav.vlog },
  { to: "/contato" as const, label: siteCopy.nav.contato },
];

const navDesktop = nav.slice(1);

export function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const locale = useLocale();
  const logoAlt = "Mana House AMO logo Ipanema Rio de Janeiro";
  const isHome = loc.pathname === "/";
  const compact = !isHome || scrolled;

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const linkClass = (to: string) =>
    `site-nav-link text-[9px] uppercase tracking-[0.04em] transition-opacity hover:opacity-55 ${
      loc.pathname === to ? "underline underline-offset-4" : ""
    }`;

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={`site-header left-0 right-0 top-0 z-50 ${
          isHome ? "fixed text-white" : "relative bg-[#f2eadf] text-[#171717]"
        } ${compact ? "site-header--scrolled" : ""} ${
          isHome && compact ? "site-header--home-scrolled" : ""
        }`}
      >
        <div className="site-header-inner relative mx-auto flex h-20 max-w-[1600px] items-center px-5 md:px-7">
          {/* Wordmark lateral — some ao rolar */}
          <Link
            to="/"
            className={`site-header-wordmark shrink-0 ${compact ? "is-hidden" : ""}`}
            aria-label="Mana House - início"
            tabIndex={compact ? -1 : undefined}
          >
            <img
              src={wordmark}
              alt="Mana House"
              width={454}
              height={64}
              className="h-auto w-[126px] object-contain md:w-[145px]"
            />
          </Link>

          {/* Menus desktop — ficam à esquerda (também ao rolar) */}
          <nav
            className={`site-header-nav site-header-nav--left hidden md:flex ${
              compact ? "is-compact" : ""
            }`}
            aria-label="Principal"
          >
            {navDesktop.map((n) => (
              <Link key={n.to} to={n.to} className={linkClass(n.to)}>
                {t(n.label, locale)}
              </Link>
            ))}
          </nav>

          {/* Centro: símbolo no topo → logo full ao rolar */}
          <Link to="/" className="site-header-center" aria-label="Mana House">
            <img
              src={symbol}
              alt=""
              aria-hidden
              className={`site-header-symbol object-contain ${isHome ? "invert" : ""} ${
                compact ? "is-hidden" : ""
              }`}
            />
            <img
              src={logoFull}
              alt={logoAlt}
              className={`site-header-logo-full object-contain ${isHome ? "" : "brightness-0"} ${
                compact ? "is-visible" : ""
              }`}
            />
            <span
              className={`site-header-tagline mt-0 hidden whitespace-nowrap text-center text-[8.5px] uppercase leading-[1.35] tracking-[0.25em] md:block ${
                compact ? "is-hidden" : ""
              }`}
            >
              Recovery, ritual and belonging
              <br />
              Ipanema · Rio de Janeiro
            </span>
          </Link>

          <div
            className={`site-header-actions ml-auto hidden items-center gap-4 md:flex ${
              compact ? "is-compact" : ""
            }`}
          >
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

      <main className={`relative flex-1 ${isHome ? "" : "bg-[#f2eadf]"}`}>
        <Outlet />
      </main>

      {!isHome ? <SiteFooter locale={locale} /> : null}
    </div>
  );
}
