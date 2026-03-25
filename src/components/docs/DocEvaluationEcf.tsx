"use client";
import { CAMPUS } from "@/lib/campus-data";
import { Section, Field, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

const NOTES = ["", "A — Non acquis", "B — En cours", "C — Acquis", "D — Maîtrisé"];

export default function DocEvaluationEcf({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />
      <Section title="Informations apprenti(e)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom / Prénom" field="apprenti" data={data} onUpdate={onUpdate} required />
          <Field label="Entreprise" field="entreprise" data={data} onUpdate={onUpdate} />
          <Field label="Maître d'apprentissage" field="ma" data={data} onUpdate={onUpdate} />
          <Field label="Période évaluée" field="periode" data={data} onUpdate={onUpdate} placeholder="Ex: Mai — Août 2026" />
        </div>
      </Section>
      <Section title="Grille d'évaluation par compétence" color="bg-secondary">
        <p className="text-xs text-gray-text mb-3">A = Non acquis | B = En cours | C = Acquis | D = Maîtrisé</p>
        {CAMPUS.blocs.map((b) => (
          <div key={b.code} className="mb-4">
            <h4 className="font-bold text-primary text-sm mb-2 bg-primary-light px-3 py-1.5 rounded">{b.code} — {b.titre.substring(0, 60)}</h4>
            {b.competences.map((c) => (
              <div key={c.code} className="flex items-center gap-2 mb-1.5 pl-2">
                <span className="text-xs font-bold text-secondary w-6">{c.code}</span>
                <span className="text-xs text-dark flex-1">{c.titre}</span>
                {[1, 2, 3].map((eval_n) => (
                  <select key={eval_n} className="border border-gray-300 rounded px-1 py-0.5 text-[10px] w-20" value={data[`eval${eval_n}_${c.code}`] || ""} onChange={(e) => onUpdate(`eval${eval_n}_${c.code}`, e.target.value)}>
                    {NOTES.map((n) => <option key={n} value={n}>{n || `Éval ${eval_n}`}</option>)}
                  </select>
                ))}
              </div>
            ))}
          </div>
        ))}
      </Section>
    </div>
  );
}
