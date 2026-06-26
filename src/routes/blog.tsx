import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { posts as fallback, siteCopy, t } from "../data/content";
import { useLocale } from "../hooks/use-locale";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Conteúdo · Mana House" },
      { name: "description", content: "Artigos sobre terapia de contraste, massagem terapêutica, hot yoga e recuperação em Ipanema." },
    ],
  }),
  component: Page,
});

type DbPost = { id: string; slug: string; title: string; excerpt: string | null; published_at: string | null; read_minutes: number | null };

function Page() {
  const [items, setItems] = useState<{ slug: string; title: string; excerpt: string; date: string; read: string }[]>([]);
  const [loaded, setLoaded] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id,slug,title,excerpt,published_at,read_minutes")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        const rows = (data as DbPost[]) ?? [];
        if (rows.length) {
          setItems(rows.map((p) => ({
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt ?? "",
            date: p.published_at ? new Date(p.published_at).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", { day: "2-digit", month: "short", year: "numeric" }) : "",
            read: `${p.read_minutes ?? 5} min`,
          })));
        } else {
          setItems(fallback);
        }
        setLoaded(true);
      });
  }, [locale]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">{t(siteCopy.blog.eyebrow, locale)}</p>
      <h1 className="text-4xl md:text-5xl mb-4">{t(siteCopy.blog.title, locale)}</h1>
      <p className="text-lg text-muted-foreground mb-14 max-w-2xl">
        {locale === "pt"
          ? "Conteúdos sobre recuperação, corpo e comunidade para quem vive o próprio ritmo com intensidade."
          : "Notes on recovery, body and community for people who live their rhythm with intensity."}
      </p>
      {!loaded ? (
        <p className="text-muted-foreground">{locale === "pt" ? "Carregando..." : "Loading..."}</p>
      ) : (
        <div className="divide-y divide-border/60">
          {items.map((p) => (
            <article key={p.slug} className="py-8 group cursor-pointer">
              <p className="text-xs text-muted-foreground mb-2">{p.date} {p.date && "·"} {p.read} {locale === "pt" ? "de leitura" : "read"}</p>
              <h2 className="text-2xl md:text-3xl mb-3 group-hover:text-primary transition">{p.title}</h2>
              <p className="text-muted-foreground">{p.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
