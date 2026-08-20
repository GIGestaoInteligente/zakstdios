import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import logoFull from "../assets/MANAHOUSE_Full-C.svg";
import symbol from "../assets/MANAHOUSE_Logo-A.svg";
import wordmark from "../assets/mana-house-wordmark.png";
import { siteCopy, t } from "../data/content";
import { setSiteLocale, useLocale } from "../hooks/use-locale";
import { SiteFooter } from "./SiteFooter";
import { resetHomeHeroIntro } from "./home/home-hero-intro";

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
  // Mesma regra da home: topo “completo”; ao rolar → menu compacto (glass + logo full)
  const compact = scrolled;

  // Home: trava o scroll no splash; header só com .home-hero-ready
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!isHome) {
      resetHomeHeroIntro();
      root.classList.remove("home-splash-lock", "home-hero-ready");
      setScrolled(window.scrollY > 48);
      return;
    }
    resetHomeHeroIntro();
    root.classList.add("home-splash-lock");
    root.classList.remove("home-hero-ready");
    setScrolled(false);
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const linkClass = (to: string) =>
    `site-nav-link text-[9px] uppercase tracking-[0.04em] transition-opacity hover:opacity-55 ${
      loc.pathname === to ? "underline underline-offset-4" : ""
    }`;

  // Topo home = branco (foto); topo internas = escuro (fundo cream); compacto = sempre branco
  const onLightTop = !isHome && !compact;

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={[
          "site-header left-0 right-0 top-0 z-50 fixed",
          isHome ? "site-header--home-intro" : "",
          compact ? "site-header--scrolled site-header--home-scrolled text-white" : "",
          !compact && isHome ? "text-white" : "",
          onLightTop ? "text-[#171717]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="site-header-inner relative mx-auto flex max-w-[1600px] items-start px-5 md:px-7">
          {/* Wordmark + Services… — some no scroll (igual home) */}
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
              className={`site-header-wordmark-img h-auto object-contain ${
                onLightTop ? "brightness-0" : ""
              }`}
            />
          </Link>

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

          {/* Centro: símbolo + tagline (ref) → logo full ao rolar */}
          <Link to="/" className="site-header-center" aria-label="Mana House">
            <span
              className={`site-header-symbol-wrap ${compact ? "is-hidden" : ""}`}
              aria-hidden
            >
              <img
                src={symbol}
                alt=""
                aria-hidden
                className={`site-header-symbol object-contain ${
                  !compact && isHome ? "site-header-symbol--on-dark" : ""
                } ${onLightTop ? "site-header-symbol--on-light" : ""}`}
              />
            </span>
            <img
              src={logoFull}
              alt={logoAlt}
              className={`site-header-logo-full object-contain ${
                compact ? "is-visible brightness-0 invert" : ""
              }`}
            />
            <span
              className={`site-header-tagline mt-0 hidden whitespace-nowrap text-center uppercase md:block ${
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
            className="site-header-menu-btn ml-auto p-2 md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={locale === "pt" ? "Abrir menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <nav
            className={`flex flex-col gap-5 border-t px-5 py-7 md:hidden ${
              compact || isHome
                ? "border-white/15 bg-black/85 text-white"
                : "border-black/15 bg-[#f2eadf] text-[#171717]"
            }`}
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

      <main className={`relative flex-1 ${isHome ? "" : "bg-[#f2eadf] pt-[7.25rem]"}`}>
        <Outlet />
      </main>

      {!isHome ? <SiteFooter locale={locale} /> : null}
    </div>
  );
}
