"use client";

import type { UserName } from "@/lib/types";
import { USER_COLORS } from "@/lib/hooks";

const NAMES: UserName[] = ["Rami", "Tomi", "Nati"];

export default function NameModal({ onPick, onClose }: { onPick: (n: UserName) => void; onClose?: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="bg-white rounded-2xl p-8 w-[90%] max-w-[380px] text-center" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-2">¿Quién sos?</h3>
        <p className="text-muted text-sm mb-5">Elegí tu nombre para que los demás vean quién editó qué.</p>
        <div className="flex gap-3 justify-center">
          {NAMES.map((n) => (
            <button
              key={n}
              onClick={() => onPick(n)}
              className="flex-1 border-2 border-line rounded-xl py-4 px-3 font-semibold transition hover:border-accent hover:bg-soft"
              style={{ ["--hover" as any]: USER_COLORS[n] }}
            >
              <span
                className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-base font-bold"
                style={{ background: USER_COLORS[n] }}
              >
                {n[0]}
              </span>
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
