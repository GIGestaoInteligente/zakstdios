import { createFileRoute } from "@tanstack/react-router";
import { vlogs } from "../data/content";
import { Play } from "lucide-react";

export const Route = createFileRoute("/vlog")({
  head: () => ({
    meta: [
      { title: "Vlog · Sereno" },
      { name: "description", content: "Vídeos sobre nossas terapias, sequências de yoga e bastidores do espaço." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Vlog</p>
      <h1 className="text-4xl md:text-5xl mb-4">Em movimento</h1>
      <p className="text-lg text-muted-foreground mb-14 max-w-2xl">
        Vídeos curtos para você praticar, aprender e conhecer o nosso universo.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vlogs.map((v) => (
          <article key={v.slug} className="group cursor-pointer">
            <div className="relative aspect-video rounded-2xl gradient-sage overflow-hidden mb-4 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition shadow-xl">
                <Play size={22} className="text-primary translate-x-0.5" />
              </div>
              <span className="absolute bottom-3 right-3 text-xs bg-foreground/80 text-background px-2 py-1 rounded">{v.duration}</span>
            </div>
            <h2 className="text-xl mb-2 group-hover:text-primary transition">{v.title}</h2>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
