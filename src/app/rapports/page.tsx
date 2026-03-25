"use client";
import { useState } from "react";
import { useOrganisme } from "@/lib/OrganismeContext";
import { PageSection, SectionBanner, AlertBox } from "@/components/ui";

type ReportType = "dossier_complet" | "etat_avancement" | "plan_action";

export default function RapportsPage() {
  const { organisme, suivis } = useOrganisme();
  const [generating, setGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState<ReportType>("dossier_complet");

  if (!organisme) return null;

  async function handleGenerate() {
    setGenerating(true);
    try {
      const res = await fetch("/api/generate-rapport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organisme_id: organisme!.id,
          organisme_nom: organisme!.nom,
          type: selectedType,
          suivis,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la génération");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `myqualio-${selectedType}-${organisme!.nom.replace(/\s+/g, "-").toLowerCase()}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Erreur lors de la génération du rapport.");
      console.error(err);
    }
    setGenerating(false);
  }

  const reports = [
    {
      type: "dossier_complet" as ReportType,
      title: "Dossier Qualiopi complet",
      desc: "Document DOCX avec les 7 critères, 32 indicateurs, statuts et preuves référencées.",
      icon: "📋",
    },
    {
      type: "etat_avancement" as ReportType,
      title: "État d'avancement",
      desc: "Tableau récapitulatif avec le statut de chaque indicateur et les statistiques globales.",
      icon: "📊",
    },
    {
      type: "plan_action" as ReportType,
      title: "Plan d'action",
      desc: "Liste des indicateurs non conformes avec les plans d'action, responsables et échéances.",
      icon: "🎯",
    },
  ];

  return (
    <PageSection title="Génération de rapports">
      <AlertBox>
        Sélectionnez le type de rapport à générer. Le document sera téléchargé au format DOCX.
      </AlertBox>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {reports.map((r) => (
          <button
            key={r.type}
            onClick={() => setSelectedType(r.type)}
            className={`text-left p-5 rounded-lg border-2 transition-all ${
              selectedType === r.type
                ? "border-primary bg-primary-light shadow-md"
                : "border-gray-200 bg-white hover:border-primary/30"
            }`}
          >
            <div className="text-3xl mb-2">{r.icon}</div>
            <h3 className="font-bold text-primary text-sm mb-1">{r.title}</h3>
            <p className="text-xs text-gray-text">{r.desc}</p>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-green hover:bg-green/90 text-white font-bold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 text-sm"
        >
          {generating ? "Génération en cours..." : `Télécharger le ${reports.find((r) => r.type === selectedType)?.title}`}
        </button>
      </div>
    </PageSection>
  );
}
