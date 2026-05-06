import { createFileRoute, Link, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutDashboard, FileText, Video, LogOut, Settings, Users } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Sereno" }] }),
  component: AdminLayout,
});

const menu = [
  { to: "/admin", label: "Início", icon: LayoutDashboard, exact: true, enabled: true },
  { to: "/admin/blog", label: "Blog", icon: FileText, enabled: true },
  { to: "/admin/vlog", label: "Vlog", icon: Video, enabled: true },
  { to: "/admin/usuarios", label: "Usuários", icon: Users, enabled: true },
];

const futureMenu = [
  { label: "Configurações", icon: Settings },
];

function AdminLayout() {
  const navigate = useNavigate();
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar email={email} onLogout={logout} />
        <SidebarInset>
          <header className="h-14 flex items-center gap-3 border-b px-4 sticky top-0 bg-background/80 backdrop-blur z-10">
            <SidebarTrigger />
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Painel</p>
              <h1 className="text-base font-serif leading-none">Administração</h1>
            </div>
            <div className="ml-auto text-xs text-muted-foreground hidden sm:block">{email}</div>
          </header>
          <main className="p-6">
            <RouterOutletOrHome />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function RouterOutletOrHome() {
  const loc = useLocation();
  const isRoot = loc.pathname === "/admin" || loc.pathname === "/admin/";
  return isRoot ? <AdminHome /> : <Outlet />;
}

function AdminSidebar({ email, onLogout }: { email: string; onLogout: () => void }) {
  const loc = useLocation();
  const isActive = (to: string, exact?: boolean) =>
    exact ? loc.pathname === to || loc.pathname === to + "/" : loc.pathname.startsWith(to);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="w-8 h-8 rounded-full gradient-sage flex items-center justify-center shrink-0">
            <span className="font-serif text-base text-primary-foreground">S</span>
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="font-serif text-sm tracking-[0.2em] leading-none">SERENO</p>
            <p className="text-[10px] text-muted-foreground mt-1">Admin</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conteúdo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((m) => (
                <SidebarMenuItem key={m.to}>
                  <SidebarMenuButton asChild isActive={isActive(m.to, m.exact)} tooltip={m.label}>
                    <Link to={m.to}>
                      <m.icon />
                      <span>{m.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Em breve</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {futureMenu.map((m) => (
                <SidebarMenuItem key={m.label}>
                  <SidebarMenuButton disabled tooltip={`${m.label} (em breve)`} className="opacity-50 cursor-not-allowed">
                    <m.icon />
                    <span>{m.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onLogout} tooltip="Sair">
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-2 pb-1 text-[10px] text-muted-foreground truncate group-data-[collapsible=icon]:hidden">
          {email}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function AdminHome() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Blog" value="Artigos" hint="Gerenciar publicações" />
        <StatCard title="Vlog" value="Vídeos" hint="YouTube e Vimeo" />
        <StatCard title="Módulos" value="+ Em breve" hint="Novos recursos" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/admin/blog" className="block p-6 rounded-2xl border hover:border-primary hover:shadow-sm transition">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-primary" />
            <h2 className="text-lg font-serif">Blog</h2>
          </div>
          <p className="text-sm text-muted-foreground">Criar, editar e publicar artigos.</p>
        </Link>
        <Link to="/admin/vlog" className="block p-6 rounded-2xl border hover:border-primary hover:shadow-sm transition">
          <div className="flex items-center gap-3 mb-2">
            <Video className="text-primary" />
            <h2 className="text-lg font-serif">Vlog</h2>
          </div>
          <p className="text-sm text-muted-foreground">Adicionar vídeos do YouTube ou Vimeo.</p>
        </Link>
      </div>
    </div>
  );
}

function StatCard({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <div className="p-5 rounded-2xl border bg-card">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
      <p className="text-2xl font-serif mt-2">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{hint}</p>
    </div>
  );
}
