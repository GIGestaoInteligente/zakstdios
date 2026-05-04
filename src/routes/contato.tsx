import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato · Sereno" },
      { name: "description", content: "Agende sua sessão ou tire dúvidas." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Contato</p>
        <h1 className="text-4xl md:text-5xl mb-4">Vamos conversar</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Conte o que procura — encontramos juntos a melhor prática para você.
        </p>
        <ul className="space-y-5 text-sm">
          <li className="flex items-center gap-3"><Mail size={18} className="text-primary" /> contato@sereno.com</li>
          <li className="flex items-center gap-3"><Phone size={18} className="text-primary" /> (11) 99999-0000</li>
          <li className="flex items-center gap-3"><MapPin size={18} className="text-primary" /> Rua das Acácias, 123</li>
        </ul>
      </div>
      <form className="rounded-2xl bg-card border border-border/50 p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-sm mb-1 block">Nome</label>
          <input className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="text-sm mb-1 block">E-mail</label>
          <input type="email" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="text-sm mb-1 block">Mensagem</label>
          <textarea rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <button className="w-full rounded-full bg-primary text-primary-foreground py-3 text-sm font-medium hover:bg-primary/90 transition">
          Enviar mensagem
        </button>
      </form>
    </div>
  );
}
