import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Instagram, Facebook, MapPin, Mail, Search } from "lucide-react";

const nav = [
  { to: "/" as const, label: "Home" },
  { to: "/especialidades" as const, label: "Especialidades" },
  { to: "/blog" as const, label: "Blog" },
  { to: "/vlog" as const, label: "Vlog" },
  { to: "/contato" as const, label: "Contato" },
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top utility bar */}
      <div className="hidden md:block bg-background">
        <div className="max-w-7xl mx-auto px-8 pt-2 pb-1 flex items-center justify-end text-xs text-foreground/80">
          <a href="#" className="flex items-center gap-1.5 hover:text-primary">
            <span className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center text-[9px]">●</span>
            Minha conta <span className="text-primary">|</span> Cadastre-se
          </a>
        </div>
        <div className="max-w-7xl mx-auto px-8">
          <div className="border-t border-dashed border-primary/50" />
        </div>
      </div>

      {/* Logo banner row */}
      <div className="bg-background relative">
        <div className="max-w-7xl mx-auto px-8 py-5 grid md:grid-cols-3 items-center gap-4">
          {/* Left: phone */}
          <div className="hidden md:flex items-center gap-3">
            <span className="w-11 h-11 rounded-full gradient-sage flex items-center justify-center text-primary-foreground shadow">
              <Phone size={18} />
            </span>
            <div className="leading-tight">
              <p className="text-sm text-foreground font-medium">Agendamento</p>
              <p className="text-base font-serif text-primary">(11) 99999-0000</p>
            </div>
          </div>

          {/* Center: logo */}
          <Link to="/" className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full gradient-sage flex items-center justify-center shadow-md">
              <span className="font-serif text-3xl text-primary-foreground">S</span>
            </div>
            <span className="font-serif text-2xl tracking-[0.25em] text-foreground mt-1">SERENO</span>
            <span className="text-[10px] tracking-[0.35em] text-primary uppercase">terapias integrativas</span>
          </Link>

          {/* Right: socials + search */}
          <div className="hidden md:flex items-center justify-end gap-4 text-foreground/70">
            <a href="#" className="hover:text-primary transition"><Instagram size={18} /></a>
            <a href="#" className="hover:text-primary transition"><Facebook size={18} /></a>
            <button aria-label="Buscar" className="hover:text-primary transition"><Search size={18} /></button>
          </div>

          {/* Mobile menu */}
          <button className="md:hidden absolute right-6 top-6 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Nav strip — peach */}
      <nav className="banner-strip hidden md:block">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-14 py-4">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm uppercase tracking-[0.2em] transition-colors hover:text-primary ${loc.pathname === n.to ? "text-primary font-semibold" : "text-foreground/85"}`}
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>

      {open && (
        <nav className="md:hidden px-6 py-4 flex flex-col gap-3 banner-strip">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-sm uppercase tracking-[0.2em] text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
      )}

      <main className="flex-1"><Outlet /></main>

      {/* Footer */}
      <footer className="mt-20 bg-foreground text-background/90">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-sage flex items-center justify-center">
                <span className="font-serif text-lg text-primary-foreground">S</span>
              </div>
              <span className="font-serif text-xl tracking-[0.2em]">SERENO</span>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              Uma ilha de tranquilidade dedicada ao seu equilíbrio em corpo e mente.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-accent">Navegação</h4>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.to}><Link to={n.to} className="text-background/70 hover:text-accent transition">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-accent">Contato</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li className="flex items-center gap-2"><Phone size={14} /><span>(11) 99999-0000</span></li>
              <li className="flex items-center gap-2"><Mail size={14} /><span>contato@sereno.com</span></li>
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5" /><span>Rua das Acácias, 123</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-accent">Horário</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Seg – Sex · 8h às 21h</li>
              <li>Sábado · 9h às 18h</li>
              <li>Domingo · fechado</li>
            </ul>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-full border border-background/30 flex items-center justify-center hover:bg-accent hover:text-foreground hover:border-accent transition"><Instagram size={15} /></a>
              <a href="#" className="w-9 h-9 rounded-full border border-background/30 flex items-center justify-center hover:bg-accent hover:text-foreground hover:border-accent transition"><Facebook size={15} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-background/60">
            <p>© {new Date().getFullYear()} Sereno · Terapias Integrativas</p>
            <p className="font-serif italic">Equilíbrio em movimento.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
