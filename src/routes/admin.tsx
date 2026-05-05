import { createFileRoute, Link, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Sereno" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const loc = useLocation();
  const [state, setState] = useState<"loading" | "ok" | "denied">("loading");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    let active = true;
    const check = async () => {
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) {
        navigate({ to: "/auth" });
        return;
      }
      setEmail(s.session.user.email ?? "");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", s.session.user.id);
      if (!active) return;
      const isAdmin = (roles ?? []).some((r) => r.role === "admin");
      setState(isAdmin ? "ok" : "denied");
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth" });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (state === "loading") return <div className="p-20 text-center text-muted-foreground">Carregando...</div>;
  if (state === "denied")
    return (
      <div className="max-w-md mx-auto p-20 text-center">
        <h1 className="text-2xl font-serif mb-3">Acesso restrito</h1>
        <p className="text-muted-foreground mb-6">Sua conta ({email}) não tem permissão de administrador.</p>
        <Button onClick={logout}>Sair</Button>
      </div>
    );

  const isRoot = loc.pathname === "/admin" || loc.pathname === "/admin/";
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Painel</p>
          <h1 className="text-2xl font-serif">Administração</h1>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground hidden sm:inline">{email}</span>
          <Button variant="outline" size="sm" onClick={logout}>Sair</Button>
        </div>
      </div>
      <nav className="flex gap-2 mb-8 flex-wrap">
        {[
          { to: "/admin", label: "Início", exact: true },
          { to: "/admin/blog", label: "Blog" },
          { to: "/admin/vlog", label: "Vlog" },
        ].map((n) => {
          const active = n.exact ? isRoot : loc.pathname.startsWith(n.to);
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`px-4 py-2 rounded-full text-sm transition ${active ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"}`}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
      {isRoot ? <AdminHome /> : <Outlet />}
    </div>
  );
}

function AdminHome() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Link to="/admin/blog" className="block p-8 rounded-2xl border hover:border-primary transition">
        <h2 className="text-xl font-serif mb-2">Blog</h2>
        <p className="text-sm text-muted-foreground">Criar, editar e publicar artigos.</p>
      </Link>
      <Link to="/admin/vlog" className="block p-8 rounded-2xl border hover:border-primary transition">
        <h2 className="text-xl font-serif mb-2">Vlog</h2>
        <p className="text-sm text-muted-foreground">Adicionar vídeos do YouTube ou Vimeo.</p>
      </Link>
    </div>
  );
}
