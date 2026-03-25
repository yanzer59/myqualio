"use client";
import { Section, Field, TextArea, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocPlanCompetences({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />
      <div className="bg-secondary-light rounded-lg p-3 text-xs text-secondary">
        <strong>Indicateur 22 — Critère 5</strong> : Chaque formateur doit disposer d&apos;une action de formation prévue dans les 12 prochains mois.
      </div>
      <Section title="Politique de développement des compétences">
        <TextArea label="Axe 1 — Expertise métier" field="axe1" data={data} onUpdate={onUpdate} placeholder="Maintien des connaissances sur la médiation sociale..." />
        <TextArea label="Axe 2 — Pédagogie" field="axe2" data={data} onUpdate={onUpdate} placeholder="Techniques d'animation, outils numériques..." />
        <TextArea label="Axe 3 — Réglementaire" field="axe3" data={data} onUpdate={onUpdate} placeholder="Veille juridique, Qualiopi, RNCP..." />
      </Section>
      <Section title="Plan individuel par formateur" color="bg-secondary">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-light-gray rounded-lg p-3 mb-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Field label="Formateur" field={`form_${i}_nom`} data={data} onUpdate={onUpdate} />
              <Field label="Formation prévue" field={`form_${i}_formation`} data={data} onUpdate={onUpdate} placeholder="Titre de la formation" />
              <Field label="Date / Échéance" field={`form_${i}_date`} data={data} onUpdate={onUpdate} type="date" />
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}
