"use client";
import { Section, Field, TextArea, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocRegistreDysfonctionnements({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />
      <div className="bg-red/5 rounded-lg p-3 text-xs text-red">
        <strong>Indicateur 31 — Critère 7</strong> : Procédure de traitement des dysfonctionnements et réclamations obligatoire.
      </div>
      <Section title="Registre des dysfonctionnements et réclamations">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-light-gray rounded-lg p-3 mb-2">
            <div className="text-xs font-bold text-gray-text mb-2">Signalement n°{i + 1}</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Field label="Date" field={`dysf_${i}_date`} data={data} onUpdate={onUpdate} type="date" />
              <Field label="Signalé par" field={`dysf_${i}_par`} data={data} onUpdate={onUpdate} placeholder="Nom / Fonction" />
              <div>
                <label className="block text-sm font-bold text-primary mb-1">Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary" value={data[`dysf_${i}_type`] || ""} onChange={(e) => onUpdate(`dysf_${i}_type`, e.target.value)}>
                  <option value="">—</option><option>Dysfonctionnement</option><option>Réclamation</option><option>Suggestion</option>
                </select>
              </div>
            </div>
            <TextArea label="Description" field={`dysf_${i}_desc`} data={data} onUpdate={onUpdate} rows={2} placeholder="Description du problème..." />
            <TextArea label="Action corrective" field={`dysf_${i}_action`} data={data} onUpdate={onUpdate} rows={2} placeholder="Mesure prise..." />
            <Field label="Date de clôture" field={`dysf_${i}_cloture`} data={data} onUpdate={onUpdate} type="date" />
          </div>
        ))}
      </Section>
    </div>
  );
}
