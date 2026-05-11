import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Trash2, Shield, ShieldOff, Plus, Loader2 } from "lucide-react";
import {
  listUsers,
  createUser,
  setUserAdmin,
  deleteUser,
} from "@/utils/users.functions";

export const Route = createFileRoute("/admin/usuarios")({
  head: () => ({ meta: [{ title: "Usuarios · Admin" }] }),
  component: UsersPage,
});

type UserRow = Awaited<ReturnType<typeof listUsers>>[number];

function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [creating, setCreating] = useState(false);

  const getAuthHeaders = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    const token = data.session?.access_token;
    if (!token) {
      throw new Error("Sessao expirada. Faca login novamente.");
    }

    return {
      authorization: `Bearer ${token}`,
    };
  };

  const refresh = async () => {
    try {
      setLoading(true);
      const headers = await getAuthHeaders();
      const data = await listUsers({ headers });
      setUsers(data);
    } catch (e: any) {
      toast.error(e.message ?? "Erro ao carregar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || password.length < 6) {
      toast.error("Informe e-mail valido e senha com pelo menos 6 caracteres.");
      return;
    }

    setCreating(true);
    try {
      const headers = await getAuthHeaders();
      await createUser({ data: { email, password, isAdmin }, headers });
      toast.success("Usuario criado com sucesso");
      setEmail("");
      setPassword("");
      setIsAdmin(false);
      refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao criar usuario");
    } finally {
      setCreating(false);
    }
  };

  const toggleAdmin = async (u: UserRow) => {
    const isCurrentlyAdmin = u.roles.includes("admin");

    try {
      const headers = await getAuthHeaders();
      await setUserAdmin({
        data: { userId: u.id, isAdmin: !isCurrentlyAdmin },
        headers,
      });
      toast.success(isCurrentlyAdmin ? "Admin removido" : "Admin concedido");
      refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Erro");
    }
  };

  const handleDelete = async (u: UserRow) => {
    if (!confirm(`Excluir o usuario ${u.email}? Esta acao e irreversivel.`)) return;

    try {
      const headers = await getAuthHeaders();
      await deleteUser({ data: { userId: u.id }, headers });
      toast.success("Usuario excluido");
      refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao excluir");
    }
  };

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Modulo</p>
        <h2 className="text-2xl font-serif">Usuarios</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie acessos ao painel administrativo.
        </p>
      </div>

      <section className="rounded-2xl border bg-card p-6">
        <h3 className="mb-4 flex items-center gap-2 font-serif text-lg">
          <Plus className="h-4 w-4 text-primary" /> Novo acesso
        </h3>

        <form
          onSubmit={handleCreate}
          className="grid gap-4 md:grid-cols-[1fr_1fr_auto_auto] md:items-end"
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@dominio.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 caracteres"
              minLength={6}
              required
            />
          </div>

          <div className="flex items-center gap-2 pb-2">
            <Switch id="isAdmin" checked={isAdmin} onCheckedChange={setIsAdmin} />
            <Label htmlFor="isAdmin" className="cursor-pointer">
              Admin
            </Label>
          </div>

          <Button type="submit" disabled={creating}>
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar"}
          </Button>
        </form>
      </section>

      <section className="overflow-hidden rounded-2xl border bg-card">
        <div className="p-6 pb-3">
          <h3 className="font-serif text-lg">Usuarios cadastrados</h3>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-muted-foreground">Carregando...</div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            Nenhum usuario.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>E-mail</TableHead>
                <TableHead>Funcao</TableHead>
                <TableHead>Ultimo acesso</TableHead>
                <TableHead className="text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((u) => {
                const isUserAdmin = u.roles.includes("admin");

                return (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.email}</TableCell>
                    <TableCell>
                      <span
                        className={
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs " +
                          (isUserAdmin
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground")
                        }
                      >
                        {isUserAdmin ? "Admin" : "Usuario"}
                      </span>
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground">
                      {u.last_sign_in_at
                        ? new Date(u.last_sign_in_at).toLocaleString("pt-BR")
                        : "-"}
                    </TableCell>

                    <TableCell className="space-x-1 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleAdmin(u)}
                        title={isUserAdmin ? "Remover admin" : "Tornar admin"}
                      >
                        {isUserAdmin ? (
                          <ShieldOff className="h-4 w-4" />
                        ) : (
                          <Shield className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(u)}
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  );
}
