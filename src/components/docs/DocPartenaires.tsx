"use client";
import { Section, Field } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocPartenaires({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <Section title="1. Partenaires sociaux et socio-économiques — Indicateur 28">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-1">
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`part_socio_${i}_nom`] || ""} onChange={(e) => onUpdate(`part_socio_${i}_nom`, e.target.value)} placeholder="Organisme" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`part_socio_${i}_type`] || ""} onChange={(e) => onUpdate(`part_socio_${i}_type`, e.target.value)} placeholder="Type de partenariat" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`part_socio_${i}_contact`] || ""} onChange={(e) => onUpdate(`part_socio_${i}_contact`, e.target.value)} placeholder="Contact" />
            <select className="border border-gray-300 rounded px-1 py-1 text-xs" value={data[`part_socio_${i}_statut`] || ""} onChange={(e) => onUpdate(`part_socio_${i}_statut`, e.target.value)}>
              <option value="">Statut</option><option value="Actif">✅ Actif</option><option value="À contacter">🟡 À contacter</option><option value="En cours">🔵 En cours</option>
            </select>
          </div>
        ))}
      </Section>
      <Section title="2. Entreprises d'accueil — Indicateur 29" color="bg-secondary">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-1">
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`ent_${i}_nom`] || ""} onChange={(e) => onUpdate(`ent_${i}_nom`, e.target.value)} placeholder="Entreprise" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`ent_${i}_contact`] || ""} onChange={(e) => onUpdate(`ent_${i}_contact`, e.target.value)} placeholder="Contact / MA" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`ent_${i}_secteur`] || ""} onChange={(e) => onUpdate(`ent_${i}_secteur`, e.target.value)} placeholder="Secteur" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`ent_${i}_convention`] || ""} onChange={(e) => onUpdate(`ent_${i}_convention`, e.target.value)} placeholder="Convention signée ?" />
          </div>
        ))}
      </Section>
    </div>
  );
}
