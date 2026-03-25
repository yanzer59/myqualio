import type { Metadata } from "next";
import "./globals.css";
import AuthShell from "@/components/AuthShell";

export const metadata: Metadata = {
  title: "MyQualio - Qualiopi & NDA",
  description: "Application de gestion du dossier Qualiopi et de la déclaration d'activité pour les CFA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthShell>{children}</AuthShell>
      </body>
    </html>
  );
}
