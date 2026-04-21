"use client";

import { useEffect, useState } from "react";

export default function CollapsibleSection({
  id,
  title,
  badge,
  subtitle,
  defaultOpen = false,
  children,
}: {
  id: string;
  title: React.ReactNode;
  badge?: React.ReactNode;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const storageKey = `peru_section_${id}`;
  const [open, setOpen] = useState<boolean | null>(null); // null = not hydrated yet

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored === null) setOpen(defaultOpen);
    else setOpen(stored === "1");
  }, [storageKey, defaultOpen]);

  const toggle = () => {
    setOpen((o) => {
      const next = !o;
      localStorage.setItem(storageKey, next ? "1" : "0");
      return next;
    });
  };

  const isOpen = open === null ? defaultOpen : open;

  return (
    <section id={id} className="mb-6 scroll-mt-[120px]">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-3 text-left py-2 group"
        aria-expanded={isOpen}
      >
        <div className="flex-1 min-w-0">
          <h2 className="text-[22px] font-bold tracking-tight flex items-center gap-2 flex-wrap">
            {title}
            {badge}
          </h2>
          {subtitle && <p className="text-muted text-sm mt-0.5">{subtitle}</p>}
        </div>
        <span
          className={"text-muted shrink-0 transition-transform duration-200 " + (isOpen ? "rotate-90" : "rotate-0")}
          aria-hidden
        >
          ▶
        </span>
      </button>
      <div
        className={"overflow-hidden transition-all " + (isOpen ? "mt-3" : "max-h-0")}
        style={{ maxHeight: isOpen ? "none" : 0 }}
      >
        {isOpen && children}
      </div>
    </section>
  );
}
