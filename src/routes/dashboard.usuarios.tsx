import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/usuarios")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/usuarios" });
  },
});
