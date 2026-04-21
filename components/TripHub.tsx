"use client";

import { useMemo, useState } from "react";
import type { UserName } from "@/lib/types";
import { FLIGHTS, HOTELS, DAYS, CHECKLIST, RECOS, FLIGHT_FIELDS, HOTEL_FIELDS } from "@/lib/data";
import { useTripState, useUser, timeAgo } from "@/lib/hooks";
import { isConfigured } from "@/lib/supabase";
import NameModal from "./NameModal";
import EditableField from "./EditableField";
import { Avatar } from "./Avatar";
import Mural from "./Mural";
import CollapsibleSection from "./CollapsibleSection";
import ProgressBar, { type FilterMode } from "./ProgressBar";

export default function TripHub() {
  const { user, setUser, ready } = useUser();
  const { state, updateEntity, status } = useTripState();
  const [showNameModal, setShowNameModal] = useState(false);
  const [filter, setFilter] = useState<FilterMode>("all");

  /* ⚠️ IMPORTANTE: todos los hooks ANTES del early return.
     Si no, React error #310 (hook order change entre renders). */
  const checklistDone = useMemo(
    () => CHECKLIST.filter((c) => (state[c.key]?.value as any)?.checked).length,
    [state],
  );
  const myItems = useMemo(
    () => CHECKLIST.filter((c) => c.owner === user || c.owner === "Todos"),
    [user],
  );
  const myDone = useMemo(
    () => myItems.filter((c) => (state[c.key]?.value as any)?.checked).length,
    [state, myItems],
  );
  const visibleChecklist = useMemo(() => {
    let items = CHECKLIST;
    if (filter === "mine" && user) items = CHECKLIST.filter((c) => c.owner === user || c.owner === "Todos");
    else if (filter === "Rami" || filter === "Tomi" || filter === "Nati")
      items = CHECKLIST.filter((c) => c.owner === filter || c.owner === "Todos");
    return [...items].sort((a, b) => {
      const ac = (state[a.key]?.value as any)?.checked ? 1 : 0;
      const bc = (state[b.key]?.value as any)?.checked ? 1 : 0;
      return ac - bc;
    });
  }, [filter, user, state]);

  if (!ready) return null;

  const needsName = !user;
  const promptName = () => setShowNameModal(true);

  const pickName = (n: UserName) => {
    setUser(n);
    setShowNameModal(false);
  };

  const get = (key: string) => state[key];
  const getField = (key: string, field: string) => {
    const v = state[key]?.value as Record<string, unknown> | undefined;
    return (v?.[field] as string) ?? "";
  };

  const commitField = (key: string, field: string, val: string) => {
    if (!user) { promptName(); return; }
    const current = (state[key]?.value ?? {}) as Record<string, unknown>;
    updateEntity(key, { ...current, [field]: val }, user);
  };

  const toggleCheck = (key: string, checked: boolean) => {
    if (!user) { promptName(); return; }
    updateEntity(key, { checked }, user);
  };

  const EditorBy = ({ entKey }: { entKey: string }) => {
    const e = get(entKey);
    if (!e?.updated_by) return null;
    return (
      <div className="flex items-center gap-1.5 text-[11px] text-muted mt-2">
        <Avatar name={e.updated_by} size={14} />
        <span>editado por {e.updated_by} · {timeAgo(e.updated_at)}</span>
      </div>
    );
  };

  const OwnerTag = ({ owner }: { owner: UserName | "Todos" }) => {
    const colors: Record<string, string> = {
      Rami: "bg-[#fce8df] text-rami",
      Tomi: "bg-[#dce6f2] text-tomi",
      Nati: "bg-[#f2dcf2] text-nati",
      Todos: "bg-[#e8f0e0] text-ok",
    };
    return <span className={"inline-block text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase " + colors[owner]}>{owner}</span>;
  };

  return (
    <>
      {(needsName || showNameModal) && <NameModal onPick={pickName} onClose={showNameModal ? () => setShowNameModal(false) : undefined} />}

      {/* TOP BAR */}
      <div className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-line px-4 py-2 flex justify-between items-center text-sm">
        <button
          onClick={promptName}
          className="inline-flex items-center gap-2 bg-card border border-line rounded-full pl-1 pr-3 py-1 font-medium hover:border-accent transition"
        >
          <Avatar name={user} size={22} />
          <span>{user ?? "Elegir"}</span>
        </button>
        <div className="inline-flex items-center gap-1.5 text-xs text-muted">
          <span
            className={
              "w-2 h-2 rounded-full transition " +
              (status === "online" ? "bg-ok shadow-[0_0_0_3px_rgba(45,122,61,0.15)]" :
               status === "offline" ? "bg-red-500" : "bg-gray-400")
            }
          />
          <span className="hidden sm:inline">
            {!isConfigured ? "Sin configurar" :
             status === "online" ? "En línea" :
             status === "offline" ? "Desconectado" : "Conectando..."}
          </span>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-5 py-5 sm:py-6">
        {/* HEADER */}
        <header className="pb-6 mb-5 border-b border-line">
          <div className="text-[11px] font-semibold text-accent tracking-[0.12em] uppercase mb-1.5">
            16 – 27 Mayo 2026 · 11 días
          </div>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-tight mb-1.5">Perú 🇵🇪</h1>
          <p className="text-muted text-sm sm:text-base">Viaje familiar — Lima, Cusco y Machu Picchu.</p>
        </header>

        {!isConfigured && (
          <div className="bg-[#fff3d6] border border-[#e8c878] text-[#7a5a10] p-4 rounded-lg mb-6 text-sm">
            ⚠️ Falta configurar Supabase. Pegá <code className="bg-white px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> y <code className="bg-white px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en <code className="bg-white px-1 rounded">.env.local</code>.
          </div>
        )}

        {/* PROGRESS (siempre visible) */}
        <ProgressBar
          done={checklistDone}
          total={CHECKLIST.length}
          mine={myDone}
          mineTotal={myItems.length}
          user={user}
          filter={filter}
          onFilterChange={setFilter}
        />

        {/* QUICK NAV */}
        <nav className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2 mb-6">
          {[
            { href: "#reservar", emo: "✅", label: "Pendientes" },
            { href: "#mural", emo: "💬", label: "Mural" },
            { href: "#dia-a-dia", emo: "📅", label: "Días" },
            { href: "#vuelos", emo: "✈️", label: "Vuelos" },
            { href: "#dormir", emo: "🛏️", label: "Hoteles" },
            { href: "#recos", emo: "⭐", label: "Recos" },
            { href: "#info", emo: "📞", label: "Info" },
          ].map((l) => (
            <a key={l.href} href={l.href}
              className="bg-card border border-line rounded-lg py-2.5 sm:py-3 text-center text-[11px] sm:text-xs font-medium flex flex-col gap-0.5 items-center hover:border-accent hover:text-accent transition">
              <span className="text-base sm:text-lg">{l.emo}</span>{l.label}
            </a>
          ))}
        </nav>

        {/* PENDIENTES — abierto por defecto (lo más importante) */}
        <CollapsibleSection
          id="reservar"
          title="✅ Pendientes de reservar"
          badge={<span className="text-xs font-medium text-muted bg-soft px-2.5 py-0.5 rounded-full">{checklistDone}/{CHECKLIST.length}</span>}
          subtitle={filter === "mine" ? `Filtrando pendientes de ${user}` : filter === "all" ? undefined : `Filtrando pendientes de ${filter}`}
          defaultOpen={true}
        >
          <div className="flex flex-col gap-1.5">
            {visibleChecklist.length === 0 && (
              <p className="text-muted text-sm italic py-4 text-center">No hay pendientes para ese filtro.</p>
            )}
            {visibleChecklist.map((c) => {
              const entry = get(c.key);
              const checked = Boolean((entry?.value as any)?.checked);
              return (
                <div key={c.key} className={"bg-card border rounded-lg p-3 sm:p-4 transition " + (checked ? "border-line opacity-60" : "border-line")}>
                  <div className="flex gap-2.5 items-start">
                    <input
                      type="checkbox"
                      id={c.key}
                      checked={checked}
                      onChange={(e) => toggleCheck(c.key, e.target.checked)}
                      className="w-[18px] h-[18px] mt-0.5 cursor-pointer accent-accent shrink-0"
                    />
                    <label htmlFor={c.key} className="flex-1 cursor-pointer text-sm min-w-0">
                      <strong className={"font-semibold " + (checked ? "line-through" : "")}>{c.title}</strong>{" "}
                      <OwnerTag owner={c.owner} />
                      {c.sub && <span className="block text-xs text-muted mt-0.5">{c.sub}</span>}
                      {c.subHtml && <span className="block text-xs text-muted mt-0.5" dangerouslySetInnerHTML={{ __html: c.subHtml }} />}
                      {entry?.updated_by && (
                        <span className="flex items-center gap-1.5 text-[10px] text-muted mt-1.5">
                          <Avatar name={entry.updated_by} size={14} />
                          <span>{entry.updated_by} · {timeAgo(entry.updated_at)}</span>
                        </span>
                      )}
                    </label>
                    {c.bookingUrl && !checked && (
                      <a
                        href={c.bookingUrl}
                        target="_blank"
                        rel="noopener"
                        className="shrink-0 bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-[#a33d21] transition whitespace-nowrap"
                      >
                        {c.bookingLabel ?? "Reservar"} →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CollapsibleSection>

        {/* MURAL — abierto */}
        <CollapsibleSection
          id="mural"
          title="💬 Mural familiar"
          subtitle="Chat en vivo para ideas, links, &quot;miren esto&quot;"
          defaultOpen={true}
        >
          <Mural user={user} onNeedsName={promptName} />
        </CollapsibleSection>

        {/* DÍA A DÍA — abierto */}
        <CollapsibleSection
          id="dia-a-dia"
          title="📅 Día a día"
          badge={<span className="text-xs font-medium text-muted bg-soft px-2.5 py-0.5 rounded-full">11 días</span>}
          subtitle="Cada día tiene una nota editable por los 3"
          defaultOpen={true}
        >
          <div className="flex flex-col gap-2">
            {DAYS.map((d) => (
              <div key={d.key} className="bg-card border border-line rounded-xl p-4 sm:p-5">
                <div className="flex justify-between gap-3 flex-wrap items-start">
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold tracking-[0.1em] text-accent uppercase">{d.date}</div>
                    <h3 className="text-base sm:text-[17px] font-semibold mt-0.5">{d.title}</h3>
                  </div>
                  <span className="text-[11px] font-semibold bg-soft px-2.5 py-0.5 rounded-full shrink-0">{d.loc}</span>
                </div>
                <ul className="list-none p-0 mt-2.5">
                  {d.items.map((item, i) => (
                    <li key={i} className="py-1 text-sm border-t border-[#f5f0e4] first:border-0 before:content-['·'] before:mr-2.5 before:text-accent before:font-bold">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <label className="text-[11px] text-muted font-semibold uppercase tracking-wider">Nota del día</label>
                  <EditableField
                    value={getField(d.key, "notes")}
                    onCommit={(v) => commitField(d.key, "notes", v)}
                    multiline
                    placeholder="Agregá ideas, reservas, restaurantes..."
                  />
                </div>
                <EditorBy entKey={d.key} />
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* VUELOS — cerrado por defecto */}
        <CollapsibleSection
          id="vuelos"
          title="✈️ Vuelos"
          badge={<span className="text-xs font-medium text-muted bg-soft px-2.5 py-0.5 rounded-full">4 tramos</span>}
          subtitle="Click en cada campo para editar · sincroniza en vivo"
        >
          <div className="flex flex-col gap-2.5">
            {FLIGHTS.map((f) => (
              <div key={f.key} className="bg-card border border-line rounded-xl p-4 sm:p-5">
                <h3 className="flex items-center gap-2 flex-wrap text-base font-semibold mb-1">
                  {f.title} <OwnerTag owner="Todos" />
                </h3>
                <div className="text-sm text-muted mb-2.5">{f.date} · {f.time} · {f.meta}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {FLIGHT_FIELDS.map((ff) => (
                    <div key={ff.key} className="flex flex-col gap-0.5">
                      <label className="text-[11px] text-muted font-semibold uppercase tracking-wider">{ff.label}</label>
                      <EditableField
                        value={getField(f.key, ff.key)}
                        onCommit={(v) => commitField(f.key, ff.key, v)}
                        isUrl={"isUrl" in ff && ff.isUrl}
                        placeholder="—"
                      />
                    </div>
                  ))}
                </div>
                <EditorBy entKey={f.key} />
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* DORMIR — cerrado */}
        <CollapsibleSection
          id="dormir"
          title="🛏️ Dónde dormir"
          badge={<span className="text-xs font-medium text-muted bg-soft px-2.5 py-0.5 rounded-full">4 hoteles</span>}
          subtitle="Pegar links de Booking/Airbnb cuando reserven"
        >
          <div className="flex flex-col gap-2.5">
            {HOTELS.map((h) => (
              <div key={h.key} className="bg-card border border-line rounded-xl p-4 sm:p-5">
                <h3 className="text-base font-semibold mb-1">{h.title}</h3>
                <div className="text-sm text-muted mb-2.5">{h.meta}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {HOTEL_FIELDS.map((hf) => (
                    <div key={hf.key} className="flex flex-col gap-0.5">
                      <label className="text-[11px] text-muted font-semibold uppercase tracking-wider">{hf.label}</label>
                      <EditableField
                        value={getField(h.key, hf.key)}
                        onCommit={(v) => commitField(h.key, hf.key, v)}
                        isUrl={"isUrl" in hf && hf.isUrl}
                        multiline={hf.key === "notes"}
                        placeholder="—"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap mt-3">
                  {h.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener"
                      className="text-xs font-medium bg-soft px-3 py-1.5 rounded-md hover:border-line border border-transparent">
                      {l.label}
                    </a>
                  ))}
                </div>
                <EditorBy entKey={h.key} />
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* RECOS — cerrado */}
        <CollapsibleSection
          id="recos"
          title="⭐ Recomendaciones"
          subtitle="Links confirmados o búsquedas de Google (siempre caen al sitio real)"
        >
          <div className="flex flex-col gap-2.5">
            <RecoCard title="🍽️ Restaurantes Lima" items={RECOS.lima} />
            <RecoCard title="🎟️ Tickets oficiales" items={RECOS.tickets} />
            <RecoCard title="🗺️ Tours" items={RECOS.tours} />
            <RecoCard title="📍 Mapas" items={RECOS.mapas} />
          </div>
        </CollapsibleSection>

        {/* INFO — cerrado */}
        <CollapsibleSection
          id="info"
          title="📞 Info clave"
          subtitle="Moneda, enchufe, altura, clima"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {[
              { t: "🇵🇪 Moneda", lines: ["1 USD ≈ 3.7 soles (verificar)", "Llevar USD cash"] },
              { t: "🔌 Enchufe", lines: ["Tipo A y C (europeo sirve)"] },
              { t: "📱 SIM / datos", lines: ["Claro, Movistar, Airalo, Holafly"] },
              { t: "💊 Altura", lines: ["Mate de coca libre", "Acetazolamida (consultar)"] },
              { t: "🌡️ Clima mayo", lines: ["Lima: 15–22°C", "Cusco: -2 a 20°C"] },
              { t: "🚕 Taxis", lines: ["Uber, InDrive, Cabify"] },
            ].map((c) => (
              <div key={c.t} className="bg-card border border-line rounded-xl p-4">
                <div className="font-semibold text-sm sm:text-base mb-1">{c.t}</div>
                {c.lines.map((l) => <div key={l} className="text-sm text-muted">{l}</div>)}
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <footer className="mt-10 pt-6 border-t border-line text-center text-muted text-xs">
          🇵🇪 Nos vemos en Lima · 16 de mayo 2026
          <div className="mt-1.5 text-[11px] opacity-70">Hub familiar · Rami · Tomi · Nati</div>
        </footer>
      </div>
    </>
  );
}

function RecoCard({ title, items }: { title: string; items: { label: string; href: string; primary?: boolean }[] }) {
  return (
    <div className="bg-card border border-line rounded-xl p-4 sm:p-5">
      <h3 className="text-sm sm:text-base font-semibold mb-2">{title}</h3>
      <div className="flex gap-1.5 sm:gap-2 flex-wrap">
        {items.map((i) => (
          <a key={i.href} href={i.href} target="_blank" rel="noopener"
            className={
              "text-xs font-medium px-3 py-1.5 rounded-md transition " +
              (i.primary
                ? "bg-accent text-white hover:bg-[#a33d21]"
                : "bg-soft hover:border-line border border-transparent")
            }
          >
            {i.label}
          </a>
        ))}
      </div>
    </div>
  );
}
