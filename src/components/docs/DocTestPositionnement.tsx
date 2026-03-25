"use client";
import { CAMPUS } from "@/lib/campus-data";
import { Section, Field, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

const QUESTIONS = [
  "Savez-vous ce qu'est la médiation sociale ?",
  "Avez-vous déjà géré une situation de conflit ?",
  "Êtes-vous à l'aise pour parler en public ?",
  "Connaissez-vous les gestes de premiers secours (SST) ?",
  "Avez-vous déjà travaillé en équipe sur un projet ?",
  "Maîtrisez-vous les outils informatiques de base ?",
  "Êtes-vous à l'aise avec la rédaction de rapports ?",
  "Connaissez-vous les dispositifs d'aide sociale de votre territoire ?",
];

export default function DocTestPositionnement({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />
      <Section title="Identification du candidat">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom / Prénom" field="candidat" data={data} onUpdate={onUpdate} required />
          <Field label="Date du test" field="date_test" data={data} onUpdate={onUpdate} type="date" />
        </div>
      </Section>
      <Section title="Auto-évaluation des compétences" color="bg-secondary">
        <p className="text-xs text-gray-text mb-3">1 = Pas du tout | 2 = Un peu | 3 = Moyennement | 4 = Bien | 5 = Très bien</p>
        {QUESTIONS.map((q, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <span className="text-xs text-dark flex-1">{i + 1}. {q}</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-xs w-16" value={data[`q${i}`] || ""} onChange={(e) => onUpdate(`q${i}`, e.target.value)}>
              <option value="">—</option>{[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        ))}
      </Section>
      <Section title="Résultat et avis du formateur">
        <div>
          <label className="block text-sm font-bold text-primary mb-1">Avis</label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary" value={data.avis || ""} onChange={(e) => onUpdate("avis", e.target.value)}>
            <option value="">—</option>
            <option value="Favorable">✅ Favorable — Admission directe</option>
            <option value="Favorable avec réserves">🟡 Favorable avec réserves — Parcours adapté</option>
            <option value="Défavorable">🔴 Défavorable — Réorientation conseillée</option>
          </select>
        </div>
        <Field label="Commentaire du formateur" field="commentaire" data={data} onUpdate={onUpdate} />
      </Section>
    </div>
  );
}
