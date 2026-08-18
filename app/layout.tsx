import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Construtor Municipal · Protótipo PNTP",
  description: "Protótipo visual do construtor de portais municipais com conformidade PNTP.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
