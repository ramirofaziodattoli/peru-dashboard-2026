import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isConfigured = Boolean(url && anon);

/* Usamos un placeholder **válido** cuando faltan las env vars.
   `createClient("")` tira "supabaseUrl is required" durante el prerender de Next.
   Con un placeholder no rompe — y los callers igual chequean `isConfigured`
   antes de hacer queries, así que nunca se llega a conectar a esa URL fake. */
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anon || "placeholder-anon-key",
);

export type Json = Record<string, unknown>;
