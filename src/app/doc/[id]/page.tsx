"use client";
import { useParams } from "next/navigation";
import { DOCUMENTS } from "@/lib/documents";
import { useState, useEffect, useCallback } from "react";

// Import des composants de documents
import DocLivretAccueil from "@/components/docs/DocLivretAccueil";
import DocConvocation from "@/components/docs/DocConvocation";
import DocEmargement from "@/components/docs/DocEmargement";
import DocMissionsEntreprise from "@/components/docs/DocMissionsEntreprise";
import DocEvaluationEcf from "@/components/docs/DocEvaluationEcf";
import DocAttestationFin from "@/components/docs/DocAttestationFin";
import DocAccompagnement from "@/components/docs/DocAccompagnement";
import DocMoyensMateriels from "@/components/docs/DocMoyensMateriels";
import DocChecklistSalle from "@/components/docs/DocChecklistSalle";
import DocConseilPerfectionnement from "@/components/docs/DocConseilPerfectionnement";
import DocDossierFormateur from "@/components/docs/DocDossierFormateur";
import DocPlanCompetences from "@/components/docs/DocPlanCompetences";
import DocRegistreVeille from "@/components/docs/DocRegistreVeille";
import DocContactsHandicap from "@/components/docs/DocContactsHandicap";
import DocPartenaires from "@/components/docs/DocPartenaires";
import DocSatisfaction from "@/components/docs/DocSatisfaction";
import DocRegistreDysfonctionnements from "@/components/docs/DocRegistreDysfonctionnements";
import DocRevueDirection from "@/components/docs/DocRevueDirection";
import DocDossierCandidature from "@/components/docs/DocDossierCandidature";
import DocTestPositionnement from "@/components/docs/DocTestPositionnement";
import DocDeroulePedagogique from "@/components/docs/DocDeroulePedagogique";
import DocLivretApprentissage from "@/components/docs/DocLivretApprentissage";
import DocDossierQualiopi from "@/components/docs/DocDossierQualiopi";
import DocGeneric from "@/components/docs/DocGeneric";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DOC_COMPONENTS: Record<string, React.ComponentType<any>> = {
  "livret-accueil": DocLivretAccueil,
  "convocation": DocConvocation,
  "emargement": DocEmargement,
  "missions-entreprise": DocMissionsEntreprise,
  "evaluation-ecf": DocEvaluationEcf,
  "attestation-fin": DocAttestationFin,
  "accompagnement": DocAccompagnement,
  "moyens-materiels": DocMoyensMateriels,
  "checklist-salle": DocChecklistSalle,
  "conseil-perfectionnement": DocConseilPerfectionnement,
  "dossier-formateur": DocDossierFormateur,
  "plan-competences": DocPlanCompetences,
  "registre-veille": DocRegistreVeille,
  "contacts-handicap": DocContactsHandicap,
  "partenaires": DocPartenaires,
  "satisfaction-chaud": DocSatisfaction,
  "satisfaction-froid-entreprise": DocSatisfaction,
  "satisfaction-formateur": DocSatisfaction,
  "registre-dysfonctionnements": DocRegistreDysfonctionnements,
  "revue-direction": DocRevueDirection,
  "dossier-candidature": DocDossierCandidature,
  "test-positionnement": DocTestPositionnement,
  "deroule-pedagogique": DocDeroulePedagogique,
  "livret-apprentissage": DocLivretApprentissage,
  "dossier-qualiopi": DocDossierQualiopi,
};

export default function DocPage() {
  const params = useParams();
  const docId = params.id as string;
  const doc = DOCUMENTS.find((d) => d.id === docId);

  const [data, setData] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  // Charger les données depuis localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(`myqualio_doc_${docId}`);
    if (stored) {
      try { setData(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, [docId]);

  const handleUpdate = useCallback((field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  function handleSave() {
    localStorage.setItem(`myqualio_doc_${docId}`, JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!doc) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-dark">Document non trouvé</h1>
        <p className="text-gray-text mt-2">L&apos;identifiant &quot;{docId}&quot; ne correspond à aucun document.</p>
      </div>
    );
  }

  const DocComponent = DOC_COMPONENTS[docId] || DocGeneric;
  // Props spéciaux pour les questionnaires de satisfaction
  const extraProps: Record<string, unknown> = {};
  if (docId === "satisfaction-chaud") extraProps.type = "chaud";
  if (docId === "satisfaction-froid-entreprise") extraProps.type = "froid_entreprise";
  if (docId === "satisfaction-formateur") extraProps.type = "froid_formateur";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between border-b-2 border-accent pb-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">{doc.num}</span>
            <span className="text-xs text-gray-text">Critère {doc.critere}</span>
          </div>
          <h1 className="text-xl font-bold text-primary">{doc.title}</h1>
        </div>
      </div>

      {/* Formulaire du document */}
      <DocComponent data={data} onUpdate={handleUpdate} {...extraProps} />

      {/* Barre de sauvegarde + génération */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 mt-6 flex items-center justify-between gap-3 -mx-6 lg:-mx-10">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="bg-secondary hover:bg-secondary/90 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Sauvegarder
          </button>
          {saved && <span className="text-green text-sm font-medium animate-pulse">Sauvegardé !</span>}
        </div>
        <button
          onClick={async () => {
            try {
              const res = await fetch("/api/generate-doc", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ docId, docTitle: doc.title, data }),
              });
              if (!res.ok) throw new Error("Erreur serveur");
              const blob = await res.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${doc.num}-${doc.id}.pdf`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            } catch (err) {
              alert("Erreur lors de la génération du document.");
              console.error(err);
            }
          }}
          className="bg-green hover:bg-green/90 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Générer le PDF
        </button>
      </div>
    </div>
  );
}
