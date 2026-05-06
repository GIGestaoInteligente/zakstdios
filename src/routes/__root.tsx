import { createRootRoute, HeadContent, Scripts, Outlet, useLocation } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Layout } from "../components/Layout";

function RootComponent() {
  const loc = useLocation();
  const isAdmin = loc.pathname === "/admin" || loc.pathname.startsWith("/admin/") || loc.pathname === "/auth";
  if (isAdmin) return <Outlet />;
  return <Layout />;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-serif text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-serif text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">A página que procura não existe.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sereno · Yoga, Botas Biomecânicas e Massagem" },
      { name: "description", content: "Espaço de terapias integrativas: yoga, terapia de contraste, botas biomecânicas e massagem terapêutica." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: Layout,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}
