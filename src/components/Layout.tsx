import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Menu, Phone, Search, X } from "lucide-react";
import logo from "../assets/mana-house-logo.svg";
import { siteCopy, t } from "../data/content";
import { useLocale } from "../hooks/use-locale";

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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="hidden md:block bg-background">
        <div className="max-w-7xl mx-auto px-8 pt-2 pb-1 flex items-center justify-end text-xs text-foreground/80">
          <Link to="/admin" className="flex items-center gap-1.5 hover:text-primary">
            <span className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center text-[9px] text-primary">•</span>
            {t(siteCopy.account, locale)}
          </Link>
        </div>
        <div className="max-w-7xl mx-auto px-8">
          <div className="border-t border-dashed border-primary/50" />
        </div>
      </div>

      <div className="bg-background relative">
        <div className="max-w-7xl mx-auto px-8 py-5 grid md:grid-cols-3 items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <span className="w-11 h-11 rounded-full gradient-sage flex items-center justify-center text-primary-foreground shadow">
              <Phone size={18} />
            </span>
            <div className="leading-tight">
              <p className="text-sm text-foreground font-medium">{t(siteCopy.appointment, locale)}</p>
              <p className="text-base font-serif text-primary">(11) 99999-0000</p>
            </div>
          </div>

          <Link to="/" className="flex flex-col items-center justify-center">
            <img src={logo} alt={logoAlt} width={427} height={427} className="h-24 w-24 object-contain md:h-28 md:w-28" />
            <span className="sr-only">Mana House</span>
          </Link>

          <div className="hidden md:flex items-center justify-end gap-4 text-foreground/70">
            <a href="https://www.instagram.com/manahouserio" className="hover:text-primary transition" aria-label="Instagram Mana House Rio">
              <Instagram size={18} />
            </a>
            <a href="https://www.instagram.com/manahouseglobal" className="hover:text-primary transition" aria-label="Instagram Mana House Global">
              <Facebook size={18} />
            </a>
            <button aria-label={locale === "pt" ? "Buscar" : "Search"} className="hover:text-primary transition">
              <Search size={18} />
            </button>
          </div>

          <button className="md:hidden absolute right-6 top-6 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <nav className="banner-strip hidden md:block sticky top-0 z-50 shadow-sm backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-14 py-4">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm uppercase tracking-[0.2em] transition-colors hover:text-black ${
                loc.pathname === n.to ? "text-secondary font-semibold" : "text-primary-foreground/90"
              }`}
            >
              {t(n.label, locale)}
            </Link>
          ))}
        </div>
      </nav>

      {open && (
        <nav className="md:hidden px-6 py-4 flex flex-col gap-3 banner-strip">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-sm uppercase tracking-[0.2em] text-primary-foreground">
              {t(n.label, locale)}
            </Link>
          ))}
        </nav>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-20 bg-foreground text-background/90">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt={logoAlt} width={427} height={427} className="h-12 w-12 object-contain" />
              <span className="font-serif text-xl tracking-[0.12em]">MANA HOUSE</span>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">{t(siteCopy.footerIntro, locale)}</p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-accent">{t(siteCopy.footerNavigation, locale)}</h4>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-background/70 hover:text-accent transition">
                    {t(n.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-accent">{t(siteCopy.footerContact, locale)}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li className="flex items-center gap-2"><Phone size={14} /><span>(11) 99999-0000</span></li>
              <li className="flex items-center gap-2"><Mail size={14} /><span>contato@manahouse.com</span></li>
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5" /><span>Ipanema, Rio de Janeiro</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-accent">{t(siteCopy.footerHours, locale)}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>{t(siteCopy.weekdayHours, locale)}</li>
              <li>{t(siteCopy.saturdayHours, locale)}</li>
              <li>{t(siteCopy.sundayHours, locale)}</li>
            </ul>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://www.instagram.com/manahouserio" className="btn-approach w-9 h-9 rounded-full border border-background/30 flex items-center justify-center hover:bg-accent hover:text-foreground hover:border-accent transition" aria-label="Instagram Mana House Rio">
                <Instagram size={15} />
              </a>
              <a href="https://www.instagram.com/manahouseglobal" className="btn-approach w-9 h-9 rounded-full border border-background/30 flex items-center justify-center hover:bg-accent hover:text-foreground hover:border-accent transition" aria-label="Instagram Mana House Global">
                <Facebook size={15} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-background/60">
            <p>© {new Date().getFullYear()} {t(siteCopy.copyright, locale)}</p>
            <p className="font-serif italic">{t(siteCopy.footerClose, locale)}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
