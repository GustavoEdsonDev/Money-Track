import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "MoneyTrack",
  description: "Controle financeiro pessoal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}