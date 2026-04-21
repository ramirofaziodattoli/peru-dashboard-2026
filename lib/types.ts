export type UserName = "Rami" | "Tomi" | "Nati";

export interface EntityState {
  key: string;
  value: Record<string, unknown>;
  updated_by: UserName | null;
  updated_at: string;
}

export interface TripNote {
  id: string;
  author: UserName;
  text: string;
  created_at: string;
}

export interface FlightInfo {
  key: string;
  title: string;
  date: string;
  time: string;
  meta: string;
}

export interface HotelInfo {
  key: string;
  title: string;
  meta: string;
  links: { label: string; href: string }[];
}

export interface DayInfo {
  key: string;
  date: string;
  title: string;
  loc: string;
  items: string[];
}

export interface ChecklistInfo {
  key: string;
  title: string;
  owner: UserName | "Todos";
  sub?: string;
  subHtml?: string;
  bookingUrl?: string;
  bookingLabel?: string;
}
