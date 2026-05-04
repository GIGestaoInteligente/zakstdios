import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Início" },
  { to: "/especialidades", label: "Especialidades" },
  { to: "/blog", label: "Blog" },
  { to: "/vlog", label: "Vlog" },
  { to: "/contato", label: "Contato" },
] as const;

export function Layout() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-full gradient-sage flex items-center justify-center text-primary-foreground font-serif text-lg">S</span>
            <span className="font-serif text-xl tracking-tight">Sereno</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`text-sm transition-colors hover:text-primary ${loc.pathname === n.to ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav className="md:hidden border-t border-border/50 px-6 py-4 flex flex-col gap-3 bg-background">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-sm text-foreground">
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="flex-1"><Outlet /></main>
      <footer className="border-t border-border/50 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sereno · Terapias Integrativas</p>
          <p className="font-serif italic">Equilíbrio em movimento.</p>
        </div>
      </footer>
    </div>
  );
}
