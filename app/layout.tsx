import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/src/design-system/theme-provider";
import { NoiseTexture } from "@/src/components/ui/NoiseTexture";

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <NoiseTexture />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
