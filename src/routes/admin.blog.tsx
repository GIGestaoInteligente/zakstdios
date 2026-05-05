import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/blog")({
  component: BlogAdmin,
});

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  read_minutes: number | null;
  published: boolean;
  published_at: string | null;
};

const empty: Partial<Post> = { slug: "", title: "", excerpt: "", content: "", cover_url: "", read_minutes: 5, published: true };

function BlogAdmin() {
  const [items, setItems] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Partial<Post> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setItems((data as Post[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const payload = {
      slug: editing.slug!,
      title: editing.title!,
      excerpt: editing.excerpt || null,
      content: editing.content || null,
      cover_url: editing.cover_url || null,
      read_minutes: Number(editing.read_minutes) || 5,
      published: !!editing.published,
      published_at: editing.published ? (editing.published_at || new Date().toISOString()) : null,
    };
    if (editing.id) {
      await supabase.from("blog_posts").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("blog_posts").insert(payload);
    }
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Apagar este post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    load();
  };

  if (editing) {
    return (
      <form onSubmit={save} className="space-y-4 max-w-3xl">
        <h2 className="text-xl font-serif">{editing.id ? "Editar" : "Novo"} artigo</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Título</Label><Input required value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
          <div><Label>Slug (URL)</Label><Input required value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} /></div>
        </div>
        <div><Label>Resumo</Label><Textarea rows={2} value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></div>
        <div><Label>Conteúdo</Label><Textarea rows={10} value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>URL da imagem de capa</Label><Input value={editing.cover_url ?? ""} onChange={(e) => setEditing({ ...editing, cover_url: e.target.value })} /></div>
          <div><Label>Minutos de leitura</Label><Input type="number" min={1} value={editing.read_minutes ?? 5} onChange={(e) => setEditing({ ...editing, read_minutes: Number(e.target.value) })} /></div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
          Publicado
        </label>
        <div className="flex gap-3">
          <Button type="submit">Salvar</Button>
          <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif">Artigos do blog</h2>
        <Button onClick={() => setEditing({ ...empty })}><Plus size={16} /> Novo</Button>
      </div>
      {loading ? <p className="text-muted-foreground">Carregando...</p> : items.length === 0 ? (
        <p className="text-muted-foreground">Nenhum artigo. Crie o primeiro.</p>
      ) : (
        <div className="divide-y border rounded-lg">
          {items.map((p) => (
            <div key={p.id} className="p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium truncate">{p.title}</p>
                <p className="text-xs text-muted-foreground">/{p.slug} · {p.published ? "publicado" : "rascunho"}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="icon" variant="outline" onClick={() => setEditing(p)}><Pencil size={14} /></Button>
                <Button size="icon" variant="outline" onClick={() => remove(p.id)}><Trash2 size={14} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
