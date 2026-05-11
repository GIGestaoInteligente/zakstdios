import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/blog")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/blog" });
  },
});
