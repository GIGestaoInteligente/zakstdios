import { createFileRoute } from "@tanstack/react-router";
import { posts } from "../data/content";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog · Sereno" },
      { name: "description", content: "Artigos sobre yoga, terapias e bem-estar." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Blog</p>
      <h1 className="text-4xl md:text-5xl mb-4">Reflexões e práticas</h1>
      <p className="text-lg text-muted-foreground mb-14 max-w-2xl">
        Conteúdos para inspirar uma rotina mais consciente e equilibrada.
      </p>
      <div className="divide-y divide-border/60">
        {posts.map((p) => (
          <article key={p.slug} className="py-8 group cursor-pointer">
            <p className="text-xs text-muted-foreground mb-2">{p.date} · {p.read} de leitura</p>
            <h2 className="text-2xl md:text-3xl mb-3 group-hover:text-primary transition">{p.title}</h2>
            <p className="text-muted-foreground">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
