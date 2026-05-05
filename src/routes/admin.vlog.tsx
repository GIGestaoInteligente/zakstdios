import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/vlog")({
  component: VlogAdmin,
});

type Vlog = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  video_url: string;
  duration: string | null;
  published: boolean;
  published_at: string | null;
};

const empty: Partial<Vlog> = { slug: "", title: "", description: "", video_url: "", duration: "", published: true };

function VlogAdmin() {
  const [items, setItems] = useState<Vlog[]>([]);
  const [editing, setEditing] = useState<Partial<Vlog> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("vlog_posts").select("*").order("created_at", { ascending: false });
    setItems((data as Vlog[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const payload = {
      slug: editing.slug!,
      title: editing.title!,
      description: editing.description || null,
      video_url: editing.video_url!,
      duration: editing.duration || null,
      published: !!editing.published,
      published_at: editing.published ? (editing.published_at || new Date().toISOString()) : null,
    };
    if (editing.id) {
      await supabase.from("vlog_posts").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("vlog_posts").insert(payload);
    }
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Apagar este vídeo?")) return;
    await supabase.from("vlog_posts").delete().eq("id", id);
    load();
  };

  if (editing) {
    return (
      <form onSubmit={save} className="space-y-4 max-w-3xl">
        <h2 className="text-xl font-serif">{editing.id ? "Editar" : "Novo"} vídeo</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Título</Label><Input required value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
          <div><Label>Slug (URL)</Label><Input required value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} /></div>
        </div>
        <div>
          <Label>URL do vídeo (YouTube ou Vimeo)</Label>
          <Input required type="url" placeholder="https://www.youtube.com/watch?v=..." value={editing.video_url ?? ""} onChange={(e) => setEditing({ ...editing, video_url: e.target.value })} />
        </div>
        <div><Label>Descrição</Label><Textarea rows={3} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
        <div><Label>Duração (ex: 5:48)</Label><Input value={editing.duration ?? ""} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} /></div>
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
        <h2 className="text-xl font-serif">Vídeos do vlog</h2>
        <Button onClick={() => setEditing({ ...empty })}><Plus size={16} /> Novo</Button>
      </div>
      {loading ? <p className="text-muted-foreground">Carregando...</p> : items.length === 0 ? (
        <p className="text-muted-foreground">Nenhum vídeo. Adicione o primeiro.</p>
      ) : (
        <div className="divide-y border rounded-lg">
          {items.map((v) => (
            <div key={v.id} className="p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium truncate">{v.title}</p>
                <p className="text-xs text-muted-foreground truncate">{v.video_url} · {v.published ? "publicado" : "rascunho"}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="icon" variant="outline" onClick={() => setEditing(v)}><Pencil size={14} /></Button>
                <Button size="icon" variant="outline" onClick={() => remove(v.id)}><Trash2 size={14} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
