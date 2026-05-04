import { createFileRoute } from "@tanstack/react-router";
import { especialidades } from "../data/content";
import yoga from "../assets/yoga.jpg";
import boots from "../assets/boots.jpg";
import massage from "../assets/massage.jpg";

const imgs: Record<string, string> = { yoga, contraste: boots, botas: boots, massagem: massage };

export const Route = createFileRoute("/especialidades")({
  head: () => ({
    meta: [
      { title: "Especialidades · Sereno" },
      { name: "description", content: "Conheça nossas terapias: yoga, contraste, botas biomecânicas e massagem." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Especialidades</p>
      <h1 className="text-4xl md:text-5xl mb-4 text-balance">Terapias que cuidam por inteiro</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-16">
        Cada prática foi escolhida para atender necessidades diferentes — sempre com presença, escuta e técnica.
      </p>
      <div className="space-y-20">
        {especialidades.map((e, i) => (
          <article key={e.slug} className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="relative">
              <div className="absolute -inset-4 gradient-warm rounded-[2rem] -z-10 blur-2xl opacity-50" />
              <img src={imgs[e.slug]} alt={e.title} loading="lazy" width={1024} height={1024} className="rounded-[2rem] w-full h-auto shadow-xl" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl mb-4">{e.title}</h2>
              <p className="text-lg text-muted-foreground">{e.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
