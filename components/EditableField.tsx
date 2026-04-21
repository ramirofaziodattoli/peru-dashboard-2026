"use client";

import { useEffect, useRef } from "react";

export default function EditableField({
  value,
  onCommit,
  isUrl = false,
  multiline = false,
  placeholder,
}: {
  value: string;
  onCommit: (v: string) => void;
  isUrl?: boolean;
  multiline?: boolean;
  placeholder?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lastCommitted = useRef(value);

  useEffect(() => {
    if (!ref.current) return;
    if (document.activeElement === ref.current) return;
    // Only update DOM if value changed externally
    if (ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
    lastCommitted.current = value;
  }, [value]);

  const handleBlur = () => {
    const text = (ref.current?.textContent ?? "").trim();
    if (text === lastCommitted.current) return;
    lastCommitted.current = text;
    onCommit(text);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !multiline) {
      e.preventDefault();
      ref.current?.blur();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const hasVal = value && value.length > 0;
  const showUrl = isUrl && hasVal && value.startsWith("http");

  return (
    <div className="relative">
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onKeyDown={handleKey}
        onPaste={handlePaste}
        className={
          "min-h-[30px] px-3 py-1.5 rounded-md bg-soft text-sm break-all " +
          "border border-transparent hover:border-line focus:border-accent focus:bg-white " +
          "transition cursor-text outline-none " +
          (!hasVal ? "text-muted italic" : "")
        }
        data-placeholder={placeholder}
      >
        {showUrl ? value : value}
      </div>
      {!hasVal && placeholder && (
        <div className="absolute top-1.5 left-3 text-sm text-muted italic pointer-events-none">
          {placeholder}
        </div>
      )}
      {showUrl && (
        <a
          href={value}
          target="_blank"
          rel="noopener"
          className="text-xs text-accent underline mt-1 inline-block"
          onMouseDown={(e) => e.stopPropagation()}
        >
          Abrir →
        </a>
      )}
    </div>
  );
}
