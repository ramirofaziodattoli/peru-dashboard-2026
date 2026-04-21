"use client";

import type { UserName } from "@/lib/types";

export type FilterMode = "all" | "mine" | UserName;

export default function ProgressBar({
  done,
  total,
  mine,
  mineTotal,
  user,
  filter,
  onFilterChange,
}: {
  done: number;
  total: number;
  mine: number;
  mineTotal: number;
  user: UserName | null;
  filter: FilterMode;
  onFilterChange: (f: FilterMode) => void;
}) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="bg-card border border-line rounded-xl p-4 mb-6">
      <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
        <div>
          <span className="text-2xl font-bold">{done}</span>
          <span className="text-muted">/{total}</span>
          <span className="text-sm text-muted ml-2">pendientes hechos</span>
        </div>
        <div className="text-sm text-muted">{pct}%</div>
      </div>
      <div className="h-2 bg-soft rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-accent transition-all duration-500 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex gap-1.5 flex-wrap text-xs">
        <FilterBtn active={filter === "all"} onClick={() => onFilterChange("all")}>
          Todos ({total})
        </FilterBtn>
        {user && (
          <FilterBtn active={filter === "mine"} onClick={() => onFilterChange("mine")}>
            Míos ({mineTotal - mine} pendientes)
          </FilterBtn>
        )}
        {(["Rami", "Tomi", "Nati"] as UserName[]).map((n) =>
          n === user ? null : (
            <FilterBtn key={n} active={filter === n} onClick={() => onFilterChange(n)}>
              {n}
            </FilterBtn>
          ),
        )}
      </div>
    </div>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-1 rounded-full font-medium transition " +
        (active ? "bg-accent text-white" : "bg-soft text-ink hover:bg-line")
      }
    >
      {children}
    </button>
  );
}
