"use client";
import { Section, Field, TextArea, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocConseilPerfectionnement({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />
      <Section title="1. Composition du Conseil">
        <p className="text-xs text-gray-text mb-3">Article L6231-3 du Code du travail — Obligatoire pour les CFA</p>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-1">
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`membre_${i}_nom`] || ""} onChange={(e) => onUpdate(`membre_${i}_nom`, e.target.value)} placeholder="Nom / Prénom" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`membre_${i}_fonction`] || ""} onChange={(e) => onUpdate(`membre_${i}_fonction`, e.target.value)} placeholder="Fonction" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`membre_${i}_college`] || ""} onChange={(e) => onUpdate(`membre_${i}_college`, e.target.value)} placeholder="Collège (CFA/Employeur/Apprenant)" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`membre_${i}_contact`] || ""} onChange={(e) => onUpdate(`membre_${i}_contact`, e.target.value)} placeholder="Contact" />
          </div>
        ))}
      </Section>
      <Section title="2. Compte rendu de réunion" color="bg-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Date de la réunion" field="date_reunion" data={data} onUpdate={onUpdate} type="date" />
          <Field label="Lieu" field="lieu" data={data} onUpdate={onUpdate} placeholder="Campus Excellence" />
        </div>
        <TextArea label="Ordre du jour" field="ordre_jour" data={data} onUpdate={onUpdate} rows={3} />
        <TextArea label="Points abordés" field="points" data={data} onUpdate={onUpdate} rows={4} />
        <TextArea label="Décisions / Actions" field="decisions" data={data} onUpdate={onUpdate} rows={3} />
      </Section>
    </div>
  );
}
