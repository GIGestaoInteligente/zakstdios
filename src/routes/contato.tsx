import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteCopy, t } from "../data/content";
import { useLocale } from "../hooks/use-locale";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato · Mana House" },
      { name: "description", content: "Quero ser membro ou agendar sessão avulsa na Mana House em Ipanema." },
    ],
  }),
  component: Page,
});

function Page() {
  const locale = useLocale();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">{t(siteCopy.footerContact, locale)}</p>
        <h1 className="home-closer-caption text-4xl md:text-5xl mb-4">{locale === "pt" ? "A Casa te espera." : "The House is waiting for you."}</h1>
        <p className="text-lg text-muted-foreground mb-10">
          {locale === "pt"
            ? "Fale com a Mana House para ser membro, agendar uma sessão avulsa ou conhecer os serviços da casa."
            : "Talk to Mana House to become a member, book a single session or learn more about the house services."}
        </p>
        <ul className="space-y-5 text-sm">
          <li className="flex items-center gap-3"><Mail size={18} className="text-primary" /> contato@manahouse.com</li>
          <li className="flex items-center gap-3"><Phone size={18} className="text-primary" /> (11) 99999-0000</li>
          <li className="flex items-center gap-3"><MapPin size={18} className="text-primary" /> Ipanema, Rio de Janeiro</li>
        </ul>
      </div>
      <form className="rounded-2xl bg-card border border-border/50 p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-sm mb-1 block">{locale === "pt" ? "Nome" : "Name"}</label>
          <input className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="text-sm mb-1 block">E-mail</label>
          <input type="email" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="text-sm mb-1 block">{locale === "pt" ? "Mensagem" : "Message"}</label>
          <textarea rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <button className="btn-approach w-full rounded-full bg-primary text-primary-foreground py-3 text-sm font-medium hover:bg-primary/90 transition">
          {locale === "pt" ? "Enviar mensagem" : "Send message"}
        </button>
      </form>
    </div>
  );
}
