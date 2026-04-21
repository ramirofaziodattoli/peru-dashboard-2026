"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase, isConfigured } from "./supabase";
import type { EntityState, TripNote, UserName } from "./types";

type ConnStatus = "connecting" | "online" | "offline";

/* ============================================================
 * useTripState — estado compartido key/value con realtime
 * ============================================================ */
export function useTripState() {
  const [state, setState] = useState<Record<string, EntityState>>({});
  const [status, setStatus] = useState<ConnStatus>("connecting");

  useEffect(() => {
    if (!isConfigured) { setStatus("offline"); return; }
    let mounted = true;

    (async () => {
      const { data, error } = await supabase.from("trip_state").select("*");
      if (error) { console.error("load trip_state", error); return; }
      if (!mounted || !data) return;
      const obj: Record<string, EntityState> = {};
      data.forEach((row: any) => { obj[row.key] = row as EntityState; });
      setState(obj);
    })();

    const channel = supabase.channel("trip_state_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "trip_state" }, (payload: any) => {
        const row = (payload.new ?? payload.old) as EntityState | undefined;
        if (!row) return;
        if (payload.eventType === "DELETE") {
          setState((s) => { const n = { ...s }; delete n[row.key]; return n; });
        } else {
          setState((s) => ({ ...s, [row.key]: row }));
        }
      })
      .subscribe((s) => {
        if (s === "SUBSCRIBED") setStatus("online");
        else if (s === "CLOSED" || s === "CHANNEL_ERROR") setStatus("offline");
      });

    return () => { mounted = false; channel.unsubscribe(); };
  }, []);

  const updateEntity = useCallback(async (key: string, value: Record<string, unknown>, user: UserName) => {
    const updated_at = new Date().toISOString();
    // Optimistic
    setState((s) => ({ ...s, [key]: { key, value, updated_by: user, updated_at } }));
    if (!isConfigured) return;
    const { error } = await supabase.from("trip_state").upsert({ key, value, updated_by: user, updated_at });
    if (error) console.error("save trip_state", error);
  }, []);

  return { state, updateEntity, status };
}

/* ============================================================
 * useMural — mensajes tipo chat, realtime
 * ============================================================ */
export function useMural() {
  const [notes, setNotes] = useState<TripNote[]>([]);
  const seenIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!isConfigured) return;
    let mounted = true;

    (async () => {
      const { data, error } = await supabase.from("trip_notes")
        .select("*").order("created_at", { ascending: false }).limit(200);
      if (error) { console.error("load notes", error); return; }
      if (!mounted || !data) return;
      const items = data as TripNote[];
      items.forEach((n) => seenIds.current.add(n.id));
      setNotes(items);
    })();

    const channel = supabase.channel("trip_notes_changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "trip_notes" }, (payload: any) => {
        const n = payload.new as TripNote;
        if (seenIds.current.has(n.id)) return;
        seenIds.current.add(n.id);
        setNotes((curr) => [n, ...curr]);
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "trip_notes" }, (payload: any) => {
        const id = payload.old?.id as string | undefined;
        if (!id) return;
        seenIds.current.delete(id);
        setNotes((curr) => curr.filter((n) => n.id !== id));
      })
      .subscribe();

    return () => { mounted = false; channel.unsubscribe(); };
  }, []);

  const send = useCallback(async (author: UserName, text: string) => {
    if (!isConfigured || !text.trim()) return;
    const { error } = await supabase.from("trip_notes").insert({ author, text: text.trim() });
    if (error) console.error("send note", error);
  }, []);

  const remove = useCallback(async (id: string) => {
    if (!isConfigured) return;
    const { error } = await supabase.from("trip_notes").delete().eq("id", id);
    if (error) console.error("remove note", error);
  }, []);

  return { notes, send, remove };
}

/* ============================================================
 * useUser — identidad local persistida en localStorage
 * ============================================================ */
export function useUser() {
  const [user, setUserState] = useState<UserName | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const n = localStorage.getItem("peru_user") as UserName | null;
    if (n) setUserState(n);
    setReady(true);
  }, []);

  const setUser = useCallback((name: UserName) => {
    localStorage.setItem("peru_user", name);
    setUserState(name);
  }, []);

  return { user, setUser, ready };
}

/* ============================================================
 * Helpers
 * ============================================================ */
export function timeAgo(date: string): string {
  const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (s < 60) return "hace un momento";
  if (s < 3600) return `hace ${Math.floor(s / 60)}min`;
  if (s < 86400) return `hace ${Math.floor(s / 3600)}h`;
  return new Date(date).toLocaleDateString("es-AR", { day: "numeric", month: "short" });
}

export const USER_COLORS: Record<UserName, string> = {
  Rami: "#c0492a",
  Tomi: "#4a6b8a",
  Nati: "#a855a8",
};
