import type { UserName } from "@/lib/types";
import { USER_COLORS } from "@/lib/hooks";

export function Avatar({ name, size = 24 }: { name: UserName | null | undefined; size?: number }) {
  if (!name) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full bg-gray-400 text-white font-bold"
        style={{ width: size, height: size, fontSize: size * 0.5 }}
      >?</span>
    );
  }
  return (
    <span
      className="inline-flex items-center justify-center rounded-full text-white font-bold"
      style={{ width: size, height: size, fontSize: size * 0.5, background: USER_COLORS[name] }}
    >{name[0]}</span>
  );
}
