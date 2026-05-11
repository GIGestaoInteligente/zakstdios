import { createClient } from "@supabase/supabase-js";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    const missing = [
      ...(!supabaseUrl ? ["SUPABASE_URL"] : []),
      ...(!supabaseServiceRoleKey ? ["SUPABASE_SERVICE_ROLE_KEY"] : []),
    ];
    throw new Error(`Missing Supabase environment variable(s): ${missing.join(", ")}.`);
  }

  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function assertAdmin(userId: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Acesso negado");
}

export const listUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabaseAdmin = getSupabaseAdmin();
    await assertAdmin(context.userId);

    const { data: usersData, error: usersErr } =
      await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (usersErr) throw new Error(usersErr.message);

    const { data: roles, error: rolesErr } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, role");
    if (rolesErr) throw new Error(rolesErr.message);

    const roleMap = new Map<string, string[]>();
    (roles ?? []).forEach((r) => {
      const arr = roleMap.get(r.user_id) ?? [];
      arr.push(r.role);
      roleMap.set(r.user_id, arr);
    });

    return usersData.users.map((u) => ({
      id: u.id,
      email: u.email ?? "",
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
      roles: roleMap.get(u.id) ?? [],
    }));
  });

export const createUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
        isAdmin: z.boolean().default(false),
      })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    const supabaseAdmin = getSupabaseAdmin();
    await assertAdmin(context.userId);

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (error) throw new Error(error.message);
    const newUserId = created.user!.id;

    if (data.isAdmin) {
      const { error: roleError } = await supabaseAdmin
        .from("user_roles")
        .upsert({ user_id: newUserId, role: "admin" }, { onConflict: "user_id,role" });
      if (roleError) throw new Error(roleError.message);
    }

    return { id: newUserId, email: data.email };
  });

export const setUserAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({ userId: z.string().uuid(), isAdmin: z.boolean() }).parse(data),
  )
  .handler(async ({ context, data }) => {
    const supabaseAdmin = getSupabaseAdmin();
    await assertAdmin(context.userId);

    if (data.isAdmin) {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .upsert(
          { user_id: data.userId, role: "admin" },
          { onConflict: "user_id,role" },
        );
      if (error) throw new Error(error.message);
    } else {
      if (data.userId === context.userId) {
        throw new Error("Voce nao pode remover seu proprio acesso admin.");
      }

      const { error } = await supabaseAdmin
        .from("user_roles")
        .delete()
        .eq("user_id", data.userId)
        .eq("role", "admin");
      if (error) throw new Error(error.message);
    }

    return { ok: true };
  });

export const deleteUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ userId: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    const supabaseAdmin = getSupabaseAdmin();
    await assertAdmin(context.userId);

    if (data.userId === context.userId) {
      throw new Error("Voce nao pode excluir a si mesmo.");
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error(error.message);

    return { ok: true };
  });
