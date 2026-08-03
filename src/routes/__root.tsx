import { createRootRoute, HeadContent, Outlet, Scripts, useLocation } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import appCss from "../styles.css?url";

function RootComponent() {
  const loc = useLocation();
  const isAdmin =
    loc.pathname === "/admin" ||
    loc.pathname.startsWith("/admin/") ||
    loc.pathname === "/dashboard" ||
    loc.pathname.startsWith("/dashboard/") ||
    loc.pathname === "/auth";
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
          <Link
            to="/"
            className="btn-approach inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
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
      { title: "Mana House · Recovery & Social Home Club em Ipanema, Rio de Janeiro" },
      {
        name: "description",
        content:
          "Sauna infravermelha, terapia de contraste, massagem terapêutica e hot yoga em Ipanema. A Mana House é o primeiro social home club do Rio.",
      },
      { property: "og:title", content: "Mana House · Recovery & Social Home Club em Ipanema" },
      { name: "twitter:title", content: "Mana House · Recovery & Social Home Club em Ipanema" },
      {
        property: "og:description",
        content:
          "Sauna infravermelha, terapia de contraste, massagem terapêutica e hot yoga em Ipanema, Rio de Janeiro.",
      },
      {
        name: "twitter:description",
        content:
          "Sauna infravermelha, terapia de contraste, massagem terapêutica e hot yoga em Ipanema, Rio de Janeiro.",
      },
      {
        name: "keywords",
        content:
          "sauna Rio de Janeiro, banho de gelo Rio, terapia de contraste Ipanema, massagem terapêutica Rio de Janeiro, recovery club Ipanema, hot yoga infravermelho Rio, wellness Ipanema",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
