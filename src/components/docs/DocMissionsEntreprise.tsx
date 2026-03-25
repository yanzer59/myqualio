"use client";
import { Section, Field, TextArea } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocMissionsEntreprise({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <Section title="1. Identification">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Apprenti(e)" field="apprenti" data={data} onUpdate={onUpdate} required />
          <Field label="Entreprise" field="entreprise" data={data} onUpdate={onUpdate} required />
          <Field label="Maître d'apprentissage" field="ma" data={data} onUpdate={onUpdate} />
          <Field label="Poste occupé" field="poste" data={data} onUpdate={onUpdate} />
          <Field label="Formation" field="formation" data={data} onUpdate={onUpdate} placeholder="Ex: TP Agent de Médiation (AMIS)" />
          <Field label="Code RNCP" field="code_rncp" data={data} onUpdate={onUpdate} placeholder="Ex: RNCP 37722" />
        </div>
      </Section>
      <Section title="2. Missions par bloc de compétences" color="bg-secondary">
        <p className="text-xs text-gray-text mb-3">Décrivez les missions confiées en entreprise pour chaque bloc de compétences.</p>
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-light-gray rounded-lg p-3 mb-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <Field label="Code bloc" field={`bloc_${i}_code`} data={data} onUpdate={onUpdate} placeholder="Ex: BC01" />
              <Field label="Intitulé du bloc" field={`bloc_${i}_titre`} data={data} onUpdate={onUpdate} placeholder="Ex: Maintien du lien social et prévention" />
            </div>
            <TextArea label="Missions confiées" field={`bloc_${i}_missions`} data={data} onUpdate={onUpdate} rows={3} placeholder="Décrivez les missions confiées en entreprise pour ce bloc..." />
          </div>
        ))}
      </Section>
    </div>
  );
}
