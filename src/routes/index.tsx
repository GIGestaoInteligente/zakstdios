import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "../assets/hero-wellness.jpg";
import { especialidades, posts } from "../data/content";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sereno · Terapias integrativas para corpo e mente" },
      { name: "description", content: "Yoga, terapia de contraste, botas biomecânicas e massagem terapêutica em um espaço dedicado ao seu bem-estar." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-5">Espaço Sereno</p>
            <h1 className="text-4xl md:text-6xl leading-[1.05] text-balance text-foreground">
              Equilíbrio em movimento, <em className="text-primary not-italic">leveza</em> no corpo.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Yoga, terapia de contraste, botas biomecânicas e massagem em um só lugar — pensado para você respirar melhor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/especialidades" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
                Ver especialidades <ArrowRight size={16} />
              </Link>
              <Link to="/contato" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition">
                Agendar sessão
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 gradient-warm rounded-[2rem] -z-10 blur-2xl opacity-60" />
            <img src={hero} alt="Pessoa praticando yoga em ambiente sereno" width={1536} height={1024} className="rounded-[2rem] w-full h-auto shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Especialidades</p>
            <h2 className="text-3xl md:text-4xl">Cuidados para cada momento</h2>
          </div>
          <Link to="/especialidades" className="hidden md:inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
            Ver todas <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {especialidades.map((e) => (
            <article key={e.slug} className="group rounded-2xl bg-card border border-border/50 p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-full gradient-sage mb-5" />
              <h3 className="text-xl mb-2">{e.title}</h3>
              <p className="text-sm text-muted-foreground">{e.short}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Blog preview */}
      <section className="bg-secondary/40 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Blog</p>
              <h2 className="text-3xl md:text-4xl">Leituras para uma vida mais leve</h2>
            </div>
            <Link to="/blog" className="hidden md:inline-flex items-center gap-2 text-sm text-primary">
              Todos os artigos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((p) => (
              <article key={p.slug} className="rounded-2xl bg-background p-6 border border-border/50 hover:shadow-md transition">
                <p className="text-xs text-muted-foreground mb-3">{p.date} · {p.read}</p>
                <h3 className="text-xl mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
