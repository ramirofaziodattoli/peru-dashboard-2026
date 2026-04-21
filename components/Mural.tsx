"use client";

import { useState, useRef, useEffect } from "react";
import type { UserName } from "@/lib/types";
import { useMural, timeAgo } from "@/lib/hooks";
import { Avatar } from "./Avatar";

export default function Mural({ user, onNeedsName }: { user: UserName | null; onNeedsName: () => void }) {
  const { notes, send, remove } = useMural();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(120, ta.scrollHeight) + "px";
  }, [text]);

  const handleSend = async () => {
    if (!text.trim()) return;
    if (!user) { onNeedsName(); return; }
    setSending(true);
    await send(user, text);
    setText("");
    setSending(false);
  };

  return (
    <div className="bg-card border border-line rounded-xl overflow-hidden">
      <div className="mural-feed flex flex-col-reverse gap-3 px-5 py-4 max-h-[400px] overflow-y-auto">
        {notes.length === 0 && (
          <p className="text-muted text-sm italic text-center py-6">
            Aún no hay mensajes. ¡Arrancá la charla!
          </p>
        )}
        {notes.map((n) => (
          <div key={n.id} className="flex gap-3 items-start group">
            <Avatar name={n.author} size={28} />
            <div className="flex-1 bg-soft px-3 py-2 rounded-xl relative">
              <div className="flex justify-between gap-2 text-[11px] text-muted mb-0.5">
                <strong className="text-ink font-semibold">{n.author}</strong>
                <span>{timeAgo(n.created_at)}</span>
              </div>
              <div className="text-sm whitespace-pre-wrap break-words">{n.text}</div>
              {user === n.author && (
                <button
                  onClick={() => { if (confirm("¿Borrar mensaje?")) remove(n.id); }}
                  className="absolute top-1 right-2 text-xs text-muted opacity-0 group-hover:opacity-100 transition hover:text-accent"
                  title="Borrar"
                >✕</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 p-3 bg-bg border-t border-line">
        <textarea
          ref={taRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
          }}
          placeholder={user ? "Escribí algo..." : "Primero elegí tu nombre arriba"}
          rows={1}
          className="flex-1 resize-none border border-line rounded-lg px-3 py-2 text-sm bg-white min-h-[38px] max-h-[120px] focus:border-accent outline-none"
        />
        <button
          onClick={handleSend}
          disabled={sending || !text.trim()}
          className="bg-accent text-white font-semibold text-sm px-5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a33d21] transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
