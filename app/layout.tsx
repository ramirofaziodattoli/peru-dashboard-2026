import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Perú 2026 · Rami, Tomi & Nati",
  description: "Hub familiar del viaje a Perú — 16 al 27 de mayo de 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
