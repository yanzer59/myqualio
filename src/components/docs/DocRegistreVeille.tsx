"use client";
import { Section, Field, TextArea } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocRegistreVeille({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <div className="bg-primary-light rounded-lg p-3 text-xs text-primary">
        <strong>Indicateurs 23, 24, 25 — Critère 6</strong> : Mise à jour mensuelle minimum. Joindre les captures d&apos;écran en annexe.
      </div>
      <Section title="1. Veille légale et réglementaire — Indicateur 23">
        {[0, 1, 2].map((i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-1">
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`veille_legale_${i}_date`] || ""} onChange={(e) => onUpdate(`veille_legale_${i}_date`, e.target.value)} placeholder="Date" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs col-span-2" value={data[`veille_legale_${i}_objet`] || ""} onChange={(e) => onUpdate(`veille_legale_${i}_objet`, e.target.value)} placeholder="Objet / Source" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`veille_legale_${i}_action`] || ""} onChange={(e) => onUpdate(`veille_legale_${i}_action`, e.target.value)} placeholder="Action menée" />
          </div>
        ))}
      </Section>
      <Section title="2. Veille innovations pédagogiques — Indicateur 24" color="bg-secondary">
        {[0, 1, 2].map((i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-1">
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`veille_peda_${i}_date`] || ""} onChange={(e) => onUpdate(`veille_peda_${i}_date`, e.target.value)} placeholder="Date" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs col-span-2" value={data[`veille_peda_${i}_objet`] || ""} onChange={(e) => onUpdate(`veille_peda_${i}_objet`, e.target.value)} placeholder="Objet / Source" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`veille_peda_${i}_action`] || ""} onChange={(e) => onUpdate(`veille_peda_${i}_action`, e.target.value)} placeholder="Action menée" />
          </div>
        ))}
      </Section>
      <Section title="3. Veille métiers et compétences — Indicateur 25">
        {[0, 1, 2].map((i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-1">
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`veille_metier_${i}_date`] || ""} onChange={(e) => onUpdate(`veille_metier_${i}_date`, e.target.value)} placeholder="Date" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs col-span-2" value={data[`veille_metier_${i}_objet`] || ""} onChange={(e) => onUpdate(`veille_metier_${i}_objet`, e.target.value)} placeholder="Objet / Source" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`veille_metier_${i}_action`] || ""} onChange={(e) => onUpdate(`veille_metier_${i}_action`, e.target.value)} placeholder="Action menée" />
          </div>
        ))}
      </Section>
    </div>
  );
}
