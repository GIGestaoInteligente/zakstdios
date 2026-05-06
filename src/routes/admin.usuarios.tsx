import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
} from "@/server/users.functions";

export const Route = createFileRoute("/admin/usuarios")({
  head: () => ({ meta: [{ title: "Usuários · Admin" }] }),
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

  const refresh = async () => {
    try {
      setLoading(true);
      const data = await listUsers();
      setUsers(data);
    } catch (e: any) {
      toast.error(e.message ?? "Erro ao carregar usuários");
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
      toast.error("Informe e-mail válido e senha com pelo menos 6 caracteres.");
      return;
    }
    setCreating(true);
    try {
      await createUser({ data: { email, password, isAdmin } });
      toast.success("Usuário criado com sucesso");
      setEmail("");
      setPassword("");
      setIsAdmin(false);
      refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao criar usuário");
    } finally {
      setCreating(false);
    }
  };

  const toggleAdmin = async (u: UserRow) => {
    const isCurrentlyAdmin = u.roles.includes("admin");
    try {
      await setUserAdmin({ data: { userId: u.id, isAdmin: !isCurrentlyAdmin } });
      toast.success(isCurrentlyAdmin ? "Admin removido" : "Admin concedido");
      refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Erro");
    }
  };

  const handleDelete = async (u: UserRow) => {
    if (!confirm(`Excluir o usuário ${u.email}? Esta ação é irreversível.`)) return;
    try {
      await deleteUser({ data: { userId: u.id } });
      toast.success("Usuário excluído");
      refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao excluir");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Módulo</p>
        <h2 className="text-2xl font-serif">Usuários</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie acessos ao painel administrativo.
        </p>
      </div>

      <section className="border rounded-2xl p-6 bg-card">
        <h3 className="font-serif text-lg mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Novo acesso
        </h3>
        <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-[1fr_1fr_auto_auto] md:items-end">
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
              placeholder="Mín. 6 caracteres"
              minLength={6}
              required
            />
          </div>
          <div className="flex items-center gap-2 pb-2">
            <Switch id="isAdmin" checked={isAdmin} onCheckedChange={setIsAdmin} />
            <Label htmlFor="isAdmin" className="cursor-pointer">Admin</Label>
          </div>
          <Button type="submit" disabled={creating}>
            {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Criar"}
          </Button>
        </form>
      </section>

      <section className="border rounded-2xl bg-card overflow-hidden">
        <div className="p-6 pb-3">
          <h3 className="font-serif text-lg">Usuários cadastrados</h3>
        </div>
        {loading ? (
          <div className="p-10 text-center text-muted-foreground text-sm">Carregando...</div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground text-sm">Nenhum usuário.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>E-mail</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Último acesso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
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
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs " +
                          (isUserAdmin
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground")
                        }
                      >
                        {isUserAdmin ? "Admin" : "Usuário"}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {u.last_sign_in_at
                        ? new Date(u.last_sign_in_at).toLocaleString("pt-BR")
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleAdmin(u)}
                        title={isUserAdmin ? "Remover admin" : "Tornar admin"}
                      >
                        {isUserAdmin ? (
                          <ShieldOff className="w-4 h-4" />
                        ) : (
                          <Shield className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(u)}
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
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
