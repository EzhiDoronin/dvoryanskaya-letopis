import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Дворянская летопись — история российского дворянства",
  description: "Иллюстрированная энциклопедия российского дворянства: служба, усадьбы, балы, титулы и факты каждого дня.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
