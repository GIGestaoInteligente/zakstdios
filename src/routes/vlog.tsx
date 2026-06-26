import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { siteCopy, t, vlogs as fallback } from "../data/content";
import { useLocale } from "../hooks/use-locale";

export const Route = createFileRoute("/vlog")({
  head: () => ({
    meta: [
      { title: "Vídeos · Mana House" },
      { name: "description", content: "Vídeos sobre terapia de contraste, hot yoga, sauna infravermelha e bastidores da Mana House." },
    ],
  }),
  component: Page,
});

type DbVlog = { id: string; slug: string; title: string; description: string | null; video_url: string; duration: string | null };

function getEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      return v ? `https://www.youtube.com/embed/${v}` : null;
    }
    if (u.hostname === "youtu.be") return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    if (u.hostname.includes("vimeo.com")) return `https://player.vimeo.com/video/${u.pathname.replace("/", "")}`;
    return null;
  } catch {
    return null;
  }
}

function Page() {
  const [items, setItems] = useState<{ slug: string; title: string; desc: string; duration: string; embed: string | null }[]>([]);
  const [loaded, setLoaded] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    supabase
      .from("vlog_posts")
      .select("id,slug,title,description,video_url,duration")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        const rows = (data as DbVlog[]) ?? [];
        if (rows.length) {
          setItems(rows.map((v) => ({
            slug: v.slug,
            title: v.title,
            desc: v.description ?? "",
            duration: v.duration ?? "",
            embed: getEmbed(v.video_url),
          })));
        } else {
          setItems(fallback.map((v) => ({ ...v, embed: null })));
        }
        setLoaded(true);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">{t(siteCopy.nav.vlog, locale)}</p>
      <h1 className="text-4xl md:text-5xl mb-4">{locale === "pt" ? "A casa em movimento" : "The house in motion"}</h1>
      <p className="text-lg text-muted-foreground mb-14 max-w-2xl">
        {locale === "pt"
          ? "Vídeos curtos para conhecer os serviços, os protocolos e o ritmo da Mana House."
          : "Short videos to discover the services, protocols and rhythm of Mana House."}
      </p>
      {!loaded ? (
        <p className="text-muted-foreground">{locale === "pt" ? "Carregando..." : "Loading..."}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((v) => (
            <article key={v.slug} className="group">
              <div className="relative aspect-video rounded-2xl gradient-sage overflow-hidden mb-4 flex items-center justify-center">
                {v.embed ? (
                  <iframe className="absolute inset-0 w-full h-full" src={v.embed} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition shadow-xl" aria-label={v.title}>
                    <Play size={22} className="text-primary translate-x-0.5" />
                  </div>
                )}
                {v.duration && <span className="absolute bottom-3 right-3 text-xs bg-foreground/80 text-background px-2 py-1 rounded">{v.duration}</span>}
              </div>
              <h2 className="text-xl mb-2 group-hover:text-primary transition">{v.title}</h2>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
