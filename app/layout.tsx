import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlytBase Art Security Dashboard",
  description: "Mission-critical security dashboard for Le Musée d'Art Précieux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

