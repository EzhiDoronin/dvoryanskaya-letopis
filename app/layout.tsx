import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Мой ритм — трекер привычек",
  description: "Интерактивный трекер привычек на август 2026",
  openGraph: {
    title: "Мой ритм — трекер привычек",
    description: "Маленькие шаги. Большой результат.",
    images: [{ url: "/og.png", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Мой ритм — трекер привычек",
    description: "Маленькие шаги. Большой результат.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
