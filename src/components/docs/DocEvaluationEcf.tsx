"use client";
import { Section, Field } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

const NOTES = ["", "A — Non acquis", "B — En cours", "C — Acquis", "D — Maîtrisé"];

export default function DocEvaluationEcf({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <Section title="Informations apprenti(e)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom / Prénom" field="apprenti" data={data} onUpdate={onUpdate} required />
          <Field label="Entreprise" field="entreprise" data={data} onUpdate={onUpdate} />
          <Field label="Maître d'apprentissage" field="ma" data={data} onUpdate={onUpdate} />
          <Field label="Période évaluée" field="periode" data={data} onUpdate={onUpdate} placeholder="Ex: Mai — Août 2026" />
          <Field label="Formation" field="formation" data={data} onUpdate={onUpdate} placeholder="Ex: TP Agent de Médiation (AMIS)" />
          <Field label="Code RNCP" field="code_rncp" data={data} onUpdate={onUpdate} placeholder="Ex: RNCP 37722" />
        </div>
      </Section>
      <Section title="Grille d'évaluation par compétence" color="bg-secondary">
        <p className="text-xs text-gray-text mb-3">A = Non acquis | B = En cours | C = Acquis | D = Maîtrisé. Ajoutez les compétences à évaluer ci-dessous.</p>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <div key={i} className="flex items-center gap-2 mb-1.5 pl-2">
            <input className="border border-gray-300 rounded px-2 py-0.5 text-xs w-10 text-center" value={data[`comp_${i}_code`] || ""} onChange={(e) => onUpdate(`comp_${i}_code`, e.target.value)} placeholder={`C${i + 1}`} />
            <input className="border border-gray-300 rounded px-2 py-0.5 text-xs flex-1" value={data[`comp_${i}_titre`] || ""} onChange={(e) => onUpdate(`comp_${i}_titre`, e.target.value)} placeholder="Intitulé de la compétence" />
            {[1, 2, 3].map((eval_n) => (
              <select key={eval_n} className="border border-gray-300 rounded px-1 py-0.5 text-[10px] w-20" value={data[`eval${eval_n}_comp_${i}`] || ""} onChange={(e) => onUpdate(`eval${eval_n}_comp_${i}`, e.target.value)}>
                {NOTES.map((n) => <option key={n} value={n}>{n || `Éval ${eval_n}`}</option>)}
              </select>
            ))}
          </div>
        ))}
      </Section>
    </div>
  );
}
