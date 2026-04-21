"use client";

import { useState } from "react";
import type { UserName } from "@/lib/types";
import { FLIGHTS, HOTELS, DAYS, CHECKLIST, RECOS, FLIGHT_FIELDS, HOTEL_FIELDS } from "@/lib/data";
import { useTripState, useUser, timeAgo, USER_COLORS } from "@/lib/hooks";
import { isConfigured } from "@/lib/supabase";
import NameModal from "./NameModal";
import EditableField from "./EditableField";
import { Avatar } from "./Avatar";
import Mural from "./Mural";

export default function TripHub() {
  const { user, setUser, ready } = useUser();
  const { state, updateEntity, status } = useTripState();
  const [showNameModal, setShowNameModal] = useState(false);

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
      <div className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-line px-5 py-2.5 flex justify-between items-center text-sm">
        <button
          onClick={promptName}
          className="inline-flex items-center gap-2 bg-card border border-line rounded-full pl-1 pr-3 py-1 font-medium hover:border-accent transition"
        >
          <Avatar name={user} size={24} />
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
          <span>
            {!isConfigured ? "Sin configurar" :
             status === "online" ? "En línea" :
             status === "offline" ? "Desconectado" : "Conectando..."}
          </span>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-5 py-6">
        {/* HEADER */}
        <header className="pb-8 mb-8 border-b border-line">
          <div className="text-xs font-semibold text-accent tracking-[0.12em] uppercase mb-2">
            16 – 27 Mayo 2026 · 11 días
          </div>
          <h1 className="text-[40px] font-bold tracking-tight mb-2">Perú 🇵🇪</h1>
          <p className="text-muted text-base">Viaje familiar — Lima, Cusco y Machu Picchu.</p>
        </header>

        {!isConfigured && (
          <div className="bg-[#fff3d6] border border-[#e8c878] text-[#7a5a10] p-4 rounded-lg mb-6 text-sm">
            ⚠️ Falta configurar Supabase. Pegá <code className="bg-white px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> y <code className="bg-white px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en <code className="bg-white px-1 rounded">.env.local</code>.
          </div>
        )}

        {/* QUICK NAV */}
        <nav className="grid grid-cols-3 sm:grid-cols-7 gap-2 mb-8">
          {[
            { href: "#vuelos", emo: "✈️", label: "Vuelos" },
            { href: "#dormir", emo: "🛏️", label: "Dormir" },
            { href: "#dia-a-dia", emo: "📅", label: "Días" },
            { href: "#reservar", emo: "✅", label: "Pendientes" },
            { href: "#recos", emo: "⭐", label: "Recos" },
            { href: "#mural", emo: "💬", label: "Mural" },
            { href: "#info", emo: "📞", label: "Info" },
          ].map((l) => (
            <a key={l.href} href={l.href}
              className="bg-card border border-line rounded-lg py-3 text-center text-xs font-medium flex flex-col gap-1 items-center hover:border-accent hover:text-accent hover:-translate-y-px transition">
              <span className="text-lg">{l.emo}</span>{l.label}
            </a>
          ))}
        </nav>

        {/* VUELOS */}
        <section id="vuelos" className="mb-12 scroll-mt-16">
          <h2 className="text-[22px] font-bold tracking-tight mb-1">✈️ Vuelos</h2>
          <p className="text-muted text-sm mb-4">Click en cada campo para editar. Se sincroniza en vivo.</p>
          <div className="flex flex-col gap-2.5">
            {FLIGHTS.map((f) => (
              <div key={f.key} className="bg-card border border-line rounded-xl p-5">
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
        </section>

        {/* DORMIR */}
        <section id="dormir" className="mb-12 scroll-mt-16">
          <h2 className="text-[22px] font-bold tracking-tight mb-1">🛏️ Dónde dormir</h2>
          <p className="text-muted text-sm mb-4">Pegar links de Booking/Airbnb cuando reserven.</p>
          <div className="flex flex-col gap-2.5">
            {HOTELS.map((h) => (
              <div key={h.key} className="bg-card border border-line rounded-xl p-5">
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
        </section>

        {/* DÍA A DÍA */}
        <section id="dia-a-dia" className="mb-12 scroll-mt-16">
          <h2 className="text-[22px] font-bold tracking-tight mb-1 flex items-center gap-2 flex-wrap">
            📅 Día a día
            <span className="text-xs font-medium text-muted bg-soft px-2.5 py-0.5 rounded-full">11 días</span>
          </h2>
          <p className="text-muted text-sm mb-4">Cada día tiene una nota editable por los 3.</p>
          <div className="flex flex-col gap-2">
            {DAYS.map((d) => (
              <div key={d.key} className="bg-card border border-line rounded-xl p-5">
                <div className="flex justify-between gap-3 flex-wrap items-start">
                  <div>
                    <div className="text-[11px] font-bold tracking-[0.1em] text-accent uppercase">{d.date}</div>
                    <h3 className="text-[17px] font-semibold mt-0.5">{d.title}</h3>
                  </div>
                  <span className="text-[11px] font-semibold bg-soft px-2.5 py-0.5 rounded-full">{d.loc}</span>
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
        </section>

        {/* PENDIENTES */}
        <section id="reservar" className="mb-12 scroll-mt-16">
          <h2 className="text-[22px] font-bold tracking-tight mb-1">✅ Pendientes de reservar</h2>
          <p className="text-muted text-sm mb-4">Sincronizado entre los 3.</p>
          <div className="flex flex-col gap-1.5">
            {CHECKLIST.map((c) => {
              const entry = get(c.key);
              const checked = Boolean((entry?.value as any)?.checked);
              return (
                <div key={c.key} className="flex gap-2.5 p-3 px-4 bg-card border border-line rounded-lg items-start">
                  <input
                    type="checkbox"
                    id={c.key}
                    checked={checked}
                    onChange={(e) => toggleCheck(c.key, e.target.checked)}
                    className="w-[18px] h-[18px] mt-0.5 cursor-pointer accent-accent"
                  />
                  <label htmlFor={c.key} className={"flex-1 cursor-pointer text-sm " + (checked ? "line-through opacity-60" : "")}>
                    <strong className="font-semibold">{c.title}</strong>{" "}
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
                </div>
              );
            })}
          </div>
        </section>

        {/* RECOS */}
        <section id="recos" className="mb-12 scroll-mt-16">
          <h2 className="text-[22px] font-bold tracking-tight mb-4">⭐ Recomendaciones</h2>
          <div className="flex flex-col gap-2.5">
            <RecoCard title="🍽️ Restaurantes Lima" items={RECOS.lima} />
            <RecoCard title="🎟️ Tickets oficiales" items={RECOS.tickets} />
            <RecoCard title="🗺️ Tours" items={RECOS.tours} />
            <RecoCard title="🗺️ Mapas" items={RECOS.mapas} />
          </div>
        </section>

        {/* MURAL */}
        <section id="mural" className="mb-12 scroll-mt-16">
          <h2 className="text-[22px] font-bold tracking-tight mb-1">💬 Mural familiar</h2>
          <p className="text-muted text-sm mb-4">Chat en vivo para ideas, links, "miren esto".</p>
          <Mural user={user} onNeedsName={promptName} />
        </section>

        {/* INFO */}
        <section id="info" className="mb-12 scroll-mt-16">
          <h2 className="text-[22px] font-bold tracking-tight mb-4">📞 Info clave</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {[
              { t: "🇵🇪 Moneda", lines: ["1 USD ≈ 3.7 soles", "Llevar USD cash"] },
              { t: "🔌 Enchufe", lines: ["Tipo A y C (europeo sirve)"] },
              { t: "📱 SIM / datos", lines: ["Claro, Movistar, Airalo, Holafly"] },
              { t: "💊 Altura", lines: ["Mate de coca libre", "Acetazolamida (consultar)"] },
              { t: "🌡️ Clima mayo", lines: ["Lima: 15–22°C", "Cusco: -2 a 20°C"] },
              { t: "🚕 Taxis", lines: ["Uber, InDrive, Cabify"] },
            ].map((c) => (
              <div key={c.t} className="bg-card border border-line rounded-xl p-4">
                <div className="font-semibold text-base mb-1">{c.t}</div>
                {c.lines.map((l) => <div key={l} className="text-sm text-muted">{l}</div>)}
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-12 pt-6 border-t border-line text-center text-muted text-xs">
          🇵🇪 Nos vemos en Lima · 16 de mayo 2026
          <div className="mt-1.5 text-[11px] opacity-70">Hub familiar · Rami · Tomi · Nati</div>
        </footer>
      </div>
    </>
  );
}

function RecoCard({ title, items }: { title: string; items: { label: string; href: string; primary?: boolean }[] }) {
  return (
    <div className="bg-card border border-line rounded-xl p-5">
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <div className="flex gap-2 flex-wrap">
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
