"use client";
import { useState } from "react";
import { PageSection, SectionBanner } from "@/components/ui";
import { CFA_STEPS, getDefaultCfaData, type CfaData } from "@/lib/cfa-fields";
import StepOrganisme from "@/components/cfa-form/StepOrganisme";
import StepDirection from "@/components/cfa-form/StepDirection";
import StepFormation from "@/components/cfa-form/StepFormation";
import StepLocaux from "@/components/cfa-form/StepLocaux";
import StepFormateurs from "@/components/cfa-form/StepFormateurs";
import StepPartenaires from "@/components/cfa-form/StepPartenaires";
import StepNda from "@/components/cfa-form/StepNda";
import StepQualiopi from "@/components/cfa-form/StepQualiopi";

export default function QualiopiDashboard() {
  // Multi-CFA: liste de CFA avec possibilité d'en ajouter
  const [cfaList, setCfaList] = useState<{ id: string; name: string; data: CfaData }[]>([]);
  const [activeCfaId, setActiveCfaId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const [newCfaName, setNewCfaName] = useState("");

  const activeCfa = cfaList.find((c) => c.id === activeCfaId);

  function addCfa() {
    if (!newCfaName.trim()) return;
    const id = `cfa_${Date.now()}`;
    const newCfa = { id, name: newCfaName.trim(), data: getDefaultCfaData() };
    newCfa.data.raison_sociale = newCfaName.trim();
    setCfaList([...cfaList, newCfa]);
    setActiveCfaId(id);
    setNewCfaName("");
    setStep(0);
  }

  function updateField(field: keyof CfaData, value: unknown) {
    if (!activeCfa) return;
    const updated = cfaList.map((c) =>
      c.id === activeCfaId ? { ...c, data: { ...c.data, [field]: value }, name: field === "raison_sociale" ? (value as string) || c.name : c.name } : c
    );
    setCfaList(updated);
  }

  function handleSave() {
    // Pour l'instant on sauvegarde en localStorage
    localStorage.setItem("myqualio_cfas", JSON.stringify(cfaList));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  // Charger depuis localStorage au premier rendu
  useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myqualio_cfas");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setCfaList(parsed);
          if (parsed.length > 0) setActiveCfaId(parsed[0].id);
        } catch { /* ignore */ }
      }
    }
  });

  const stepComponents = [
    StepOrganisme, StepDirection, StepFormation, StepLocaux,
    StepFormateurs, StepPartenaires, StepNda, StepQualiopi,
  ];
  const CurrentStep = activeCfa ? stepComponents[step] : null;

  return (
    <PageSection title="MyQualio — Gestion des CFA">
      {/* Sélecteur de CFA + ajout */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {cfaList.map((c) => (
          <button
            key={c.id}
            onClick={() => { setActiveCfaId(c.id); setStep(0); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              c.id === activeCfaId
                ? "bg-primary text-white shadow-md"
                : "bg-white border border-gray-200 text-dark hover:border-primary/30"
            }`}
          >
            🏢 {c.name}
          </button>
        ))}

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newCfaName}
            onChange={(e) => setNewCfaName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCfa()}
            placeholder="Nom du nouveau CFA"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
          />
          <button
            onClick={addCfa}
            disabled={!newCfaName.trim()}
            className="bg-green hover:bg-green/90 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            + Ajouter
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      {!activeCfa ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏢</div>
          <h2 className="text-xl font-bold text-dark mb-2">Bienvenue sur MyQualio</h2>
          <p className="text-gray-text mb-4">Créez votre premier centre de formation pour commencer.</p>
          <p className="text-sm text-gray-text">Entrez le nom de votre CFA ci-dessus et cliquez &quot;+ Ajouter&quot;</p>
        </div>
      ) : (
        <>
          {/* Navigation par étapes */}
          <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
            {CFA_STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setStep(i)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  i === step
                    ? "bg-primary text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-text hover:border-primary/30 hover:text-primary"
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          {/* Étape courante */}
          <SectionBanner title={`${CFA_STEPS[step].icon} ${CFA_STEPS[step].title} — ${CFA_STEPS[step].description}`} />
          <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-6 mt-0">
            {CurrentStep && <CurrentStep data={activeCfa.data} update={updateField} />}
          </div>

          {/* Navigation + sauvegarde */}
          <div className="flex items-center justify-between mt-4">
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
                className="bg-secondary hover:bg-secondary/90 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                Sauvegarder
              </button>
              {saved && <span className="text-green text-sm font-medium animate-pulse">Sauvegardé !</span>}
              {step < CFA_STEPS.length - 1 && (
                <button
                  onClick={() => setStep(step + 1)}
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
                >
                  Suivant →
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </PageSection>
  );
}
