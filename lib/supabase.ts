import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isConfigured = Boolean(url && anon);

// Creamos el cliente aunque falten envs para no romper el SSR;
// los callers deben chequear `isConfigured` antes de usarlo.
export const supabase = createClient(url ?? "http://placeholder", anon ?? "placeholder");

export type Json = Record<string, unknown>;
