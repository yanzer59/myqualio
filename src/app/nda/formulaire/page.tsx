"use client";
import { useState, useEffect } from "react";
import { useOrganisme } from "@/lib/OrganismeContext";
import { getSupabase } from "@/lib/supabase";
import { PageSection, SectionBanner } from "@/components/ui";
import type { NdaDossier } from "@/lib/types";
import Link from "next/link";

const STEPS = [
  "Organisme",
  "Responsable",
  "Activité",
  "Première convention",
  "Récapitulatif",
];

const DOMAINES = [
  "Agriculture, pêche, forêt et espaces verts",
  "Arts, artisanat, commerce et services",
  "Bâtiment, travaux publics, architecture",
  "Communication, médias, multimédia",
  "Comptabilité, gestion, finances",
  "Droit, sciences politiques",
  "Enseignement, formation",
  "Hôtellerie, restauration, tourisme",
  "Industrie, matériaux, énergie",
  "Informatique, télécommunications",
  "Langues vivantes, civilisations",
  "Ressources humaines, management",
  "Santé, action sociale",
  "Sciences humaines et sociales",
  "Sport, animation, loisirs",
  "Transport, logistique",
];

const PUBLIC_OPTIONS = [
  "Salariés",
  "Demandeurs d'emploi",
  "Apprentis",
  "Particuliers",
  "Travailleurs non salariés",
];

export default function NdaFormulairePage() {
  const { organisme } = useOrganisme();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dossier, setDossier] = useState<Partial<NdaDossier>>({
    denomination: organisme?.nom || "",
    siret: organisme?.siret || "",
    adresse_siege: organisme?.adresse || "",
    code_postal: organisme?.code_postal || "",
    ville: organisme?.ville || "",
    telephone: organisme?.telephone || "",
    email: organisme?.email || "",
    representant_nom: "",
    representant_qualite: "",
    forme_juridique: "",
    objet_activite: "",
    domaines_formation: [],
    public_vise: [],
    premiere_convention_date: "",
    premiere_convention_intitule: "",
    premiere_convention_duree: "",
    premiere_convention_effectif: undefined,
  });

  useEffect(() => {
    if (!organisme) return;
    async function loadDossier() {
      const { data } = await getSupabase()
        .from("nda_dossiers")
        .select("*")
        .eq("organisme_id", organisme!.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      if (data) setDossier(data);
    }
    loadDossier();
  }, [organisme]);

  function update(field: string, value: unknown) {
    setDossier((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (!organisme) return;
    setSaving(true);
    const sb = getSupabase();
    const payload = { ...dossier, organisme_id: organisme.id };

    if (dossier.id) {
      await sb.from("nda_dossiers").update(payload).eq("id", dossier.id);
    } else {
      const { data } = await sb.from("nda_dossiers").insert(payload).select().single();
      if (data) setDossier(data);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!organisme) return null;

  const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light";
  const labelCls = "block text-sm font-bold text-primary mb-1";

  return (
    <PageSection
      title="Formulaire de Déclaration d'Activité"
      action={
        <Link href="/nda" className="text-sm text-secondary hover:underline">
          Retour
        </Link>
      }
    >
      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto">
        {STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              i === step
                ? "bg-primary text-white"
                : i < step
                  ? "bg-green/10 text-green"
                  : "bg-light-gray text-gray-text"
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              i === step ? "bg-white text-primary" : i < step ? "bg-green text-white" : "bg-gray-300 text-white"
            }`}>
              {i < step ? "✓" : i + 1}
            </span>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Step 0: Organisme */}
        {step === 0 && (
          <div className="space-y-4">
            <SectionBanner title="Informations sur l'organisme" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className={labelCls}>Dénomination :</label>
                <input type="text" className={inputCls} value={dossier.denomination || ""} onChange={(e) => update("denomination", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Forme juridique :</label>
                <input type="text" className={inputCls} value={dossier.forme_juridique || ""} onChange={(e) => update("forme_juridique", e.target.value)} placeholder="SARL, SAS, Association..." />
              </div>
              <div>
                <label className={labelCls}>SIRET :</label>
                <input type="text" className={inputCls} value={dossier.siret || ""} onChange={(e) => update("siret", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Téléphone :</label>
                <input type="tel" className={inputCls} value={dossier.telephone || ""} onChange={(e) => update("telephone", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Adresse du siège :</label>
                <input type="text" className={inputCls} value={dossier.adresse_siege || ""} onChange={(e) => update("adresse_siege", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Code postal :</label>
                <input type="text" className={inputCls} value={dossier.code_postal || ""} onChange={(e) => update("code_postal", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Ville :</label>
                <input type="text" className={inputCls} value={dossier.ville || ""} onChange={(e) => update("ville", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Email :</label>
                <input type="email" className={inputCls} value={dossier.email || ""} onChange={(e) => update("email", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Responsable */}
        {step === 1 && (
          <div className="space-y-4">
            <SectionBanner title="Responsable de l'organisme" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="sm:col-span-2">
                <label className={labelCls}>Nom et prénom du dirigeant :</label>
                <input type="text" className={inputCls} value={dossier.representant_nom || ""} onChange={(e) => update("representant_nom", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Qualité (fonction) :</label>
                <input type="text" className={inputCls} value={dossier.representant_qualite || ""} onChange={(e) => update("representant_qualite", e.target.value)} placeholder="Gérant, Président, Directeur..." />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Activité */}
        {step === 2 && (
          <div className="space-y-4">
            <SectionBanner title="Activité de formation" />
            <div className="mt-4">
              <label className={labelCls}>Objet de l&apos;activité de formation :</label>
              <textarea
                className={inputCls + " resize-none"}
                rows={3}
                value={dossier.objet_activite || ""}
                onChange={(e) => update("objet_activite", e.target.value)}
                placeholder="Décrivez les prestations de formation que vous proposez..."
              />
            </div>
            <div>
              <label className={labelCls}>Domaines de formation :</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {DOMAINES.map((d) => (
                  <label key={d} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(dossier.domaines_formation || []).includes(d)}
                      onChange={(e) => {
                        const list = dossier.domaines_formation || [];
                        update("domaines_formation", e.target.checked ? [...list, d] : list.filter((x) => x !== d));
                      }}
                      className="accent-primary"
                    />
                    {d}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Public visé :</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {PUBLIC_OPTIONS.map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(dossier.public_vise || []).includes(p)}
                      onChange={(e) => {
                        const list = dossier.public_vise || [];
                        update("public_vise", e.target.checked ? [...list, p] : list.filter((x) => x !== p));
                      }}
                      className="accent-primary"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Première convention */}
        {step === 3 && (
          <div className="space-y-4">
            <SectionBanner title="Première convention ou contrat de formation" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="sm:col-span-2">
                <label className={labelCls}>Intitulé de la formation :</label>
                <input type="text" className={inputCls} value={dossier.premiere_convention_intitule || ""} onChange={(e) => update("premiere_convention_intitule", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Date de la convention :</label>
                <input type="date" className={inputCls} value={dossier.premiere_convention_date || ""} onChange={(e) => update("premiere_convention_date", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Durée (en heures) :</label>
                <input type="text" className={inputCls} value={dossier.premiere_convention_duree || ""} onChange={(e) => update("premiere_convention_duree", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Nombre de stagiaires :</label>
                <input type="number" className={inputCls} value={dossier.premiere_convention_effectif || ""} onChange={(e) => update("premiere_convention_effectif", Number(e.target.value) || undefined)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Récapitulatif */}
        {step === 4 && (
          <div className="space-y-4">
            <SectionBanner title="Récapitulatif" color="bg-green" />
            <div className="mt-4 space-y-3">
              <RecapSection title="Organisme" items={[
                ["Dénomination", dossier.denomination],
                ["Forme juridique", dossier.forme_juridique],
                ["SIRET", dossier.siret],
                ["Adresse", `${dossier.adresse_siege || ""} ${dossier.code_postal || ""} ${dossier.ville || ""}`],
                ["Téléphone", dossier.telephone],
                ["Email", dossier.email],
              ]} />
              <RecapSection title="Responsable" items={[
                ["Nom", dossier.representant_nom],
                ["Qualité", dossier.representant_qualite],
              ]} />
              <RecapSection title="Activité" items={[
                ["Objet", dossier.objet_activite],
                ["Domaines", (dossier.domaines_formation || []).join(", ")],
                ["Public visé", (dossier.public_vise || []).join(", ")],
              ]} />
              <RecapSection title="Première convention" items={[
                ["Intitulé", dossier.premiere_convention_intitule],
                ["Date", dossier.premiere_convention_date],
                ["Durée", dossier.premiere_convention_duree],
                ["Effectif", dossier.premiere_convention_effectif?.toString()],
              ]} />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="text-sm text-gray-text hover:text-primary disabled:opacity-30 font-medium"
          >
            ← Précédent
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-secondary hover:bg-secondary/90 text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              {saving ? "..." : "Sauvegarder"}
            </button>
            {saved && <span className="text-green text-xs">Sauvegardé !</span>}

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2 rounded-lg transition-colors text-sm"
              >
                Suivant →
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-green hover:bg-green/90 text-white font-bold px-6 py-2 rounded-lg transition-colors text-sm"
              >
                Finaliser le dossier
              </button>
            )}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function RecapSection({ title, items }: { title: string; items: [string, string | undefined | null][] }) {
  return (
    <div className="bg-light-gray rounded-lg p-4">
      <h4 className="font-bold text-primary text-sm mb-2">{title}</h4>
      {items.map(([label, value], i) => (
        <div key={i} className="flex items-baseline gap-2 text-sm py-0.5">
          <span className="font-medium text-gray-text w-32 shrink-0">{label} :</span>
          <span className="text-dark">{value || "—"}</span>
        </div>
      ))}
    </div>
  );
}
