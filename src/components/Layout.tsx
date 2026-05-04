import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Instagram, Facebook, MapPin, Mail } from "lucide-react";

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
      {/* Top contact bar */}
      <div className="hidden md:block border-b border-border/40 bg-background">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone size={12} className="text-primary" /> (11) 99999-0000</span>
            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-primary" /> Rua das Acácias, 123</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-primary transition"><Instagram size={14} /></a>
            <a href="#" className="hover:text-primary transition"><Facebook size={14} /></a>
          </div>
        </div>
      </div>

      {/* Logo banner */}
      <div className="bg-background">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-center relative">
          <div className="absolute left-6 right-6 top-1/2 h-px bg-primary/30 hidden md:block" />
          <Link to="/" className="relative z-10 flex flex-col items-center gap-1 bg-background px-6">
            <div className="w-14 h-14 rounded-full gradient-sage flex items-center justify-center shadow-md">
              <span className="font-serif text-2xl text-primary-foreground">S</span>
            </div>
            <span className="font-serif text-2xl tracking-[0.2em] text-foreground">SERENO</span>
            <span className="text-[10px] tracking-[0.35em] text-primary uppercase">terapias integrativas</span>
          </Link>
          <button className="md:hidden absolute right-6 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Nav strip */}
      <nav className="banner-strip border-y border-primary/20 hidden md:block">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-12 py-4">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm uppercase tracking-[0.15em] transition-colors hover:text-primary ${loc.pathname === n.to ? "text-primary font-medium" : "text-foreground/80"}`}
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>

      {open && (
        <nav className="md:hidden border-t border-border/50 px-6 py-4 flex flex-col gap-3 banner-strip">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-sm uppercase tracking-[0.15em] text-foreground">
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
              <li className="flex items-center gap-2"><Phone size={14} /> (11) 99999-0000</li>
              <li className="flex items-center gap-2"><Mail size={14} /> contato@sereno.com</li>
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5" /> Rua das Acácias, 123</li>
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
