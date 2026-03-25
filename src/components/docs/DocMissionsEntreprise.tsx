"use client";
import { CAMPUS } from "@/lib/campus-data";
import { Section, Field, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocMissionsEntreprise({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />
      <Section title="1. Identification">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Apprenti(e)" field="apprenti" data={data} onUpdate={onUpdate} required />
          <Field label="Entreprise" field="entreprise" data={data} onUpdate={onUpdate} required />
          <Field label="Maître d'apprentissage" field="ma" data={data} onUpdate={onUpdate} />
          <Field label="Poste occupé" field="poste" data={data} onUpdate={onUpdate} />
        </div>
      </Section>
      <Section title="2. Missions par compétence RNCP 37722" color="bg-secondary">
        {CAMPUS.blocs.map((b) => (
          <div key={b.code} className="mb-4">
            <h4 className="font-bold text-primary text-sm mb-2">{b.code} — {b.titre.substring(0, 80)}</h4>
            {b.competences.map((c) => (
              <div key={c.code} className="flex items-start gap-2 mb-2">
                <span className="text-xs font-bold text-secondary bg-secondary-light px-1.5 py-0.5 rounded shrink-0 mt-1">{c.code}</span>
                <div className="flex-1">
                  <p className="text-xs text-dark mb-1">{c.titre}</p>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-primary" value={data[`mission_${c.code}`] || ""} onChange={(e) => onUpdate(`mission_${c.code}`, e.target.value)} placeholder="Mission confiée en entreprise..." />
                </div>
              </div>
            ))}
          </div>
        ))}
      </Section>
    </div>
  );
}
