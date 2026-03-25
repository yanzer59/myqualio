"use client";
import { Section, Field } from "./shared";

interface Props {
  data: Record<string, string>;
  onUpdate: (field: string, value: string) => void;
}

export default function DocEmargement({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <Section title="Informations de la session">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Date de la session" field="date_session" data={data} onUpdate={onUpdate} type="date" required />
          <Field label="Formateur / Intervenant" field="formateur" data={data} onUpdate={onUpdate} required />
          <Field label="Horaires matin" field="horaires_matin" data={data} onUpdate={onUpdate} placeholder="09:00 — 12:30" />
          <Field label="Horaires après-midi" field="horaires_apm" data={data} onUpdate={onUpdate} placeholder="13:30 — 17:00" />
          <Field label="Module / Thématique" field="module" data={data} onUpdate={onUpdate} placeholder="BC01 — Lien social" />
          <Field label="Salle" field="salle" data={data} onUpdate={onUpdate} placeholder="Salle principale" />
        </div>
      </Section>

      <Section title="Liste des apprenants (15 lignes)" color="bg-secondary">
        <p className="text-xs text-gray-text mb-3">
          Les noms ci-dessous apparaîtront sur la feuille d&apos;émargement. Les signatures seront à apposer manuellement sur le document imprimé.
        </p>
        <div className="space-y-2">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-6 text-center text-xs font-bold text-gray-text">{i + 1}</span>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                value={data[`apprenti_${i}`] || ""}
                onChange={(e) => onUpdate(`apprenti_${i}`, e.target.value)}
                placeholder={`Nom et prénom de l'apprenant(e) ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
