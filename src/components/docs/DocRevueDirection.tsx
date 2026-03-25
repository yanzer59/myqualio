"use client";
import { Section, Field, TextArea, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocRevueDirection({ data, onUpdate }: Props) {
  const indicateurs = [
    { id: "taux_titre", label: "Taux d'obtention du titre AMIS", objectif: "≥ 80%" },
    { id: "taux_insertion", label: "Taux d'insertion professionnelle à 6 mois", objectif: "≥ 75%" },
    { id: "taux_satisfaction", label: "Taux de satisfaction apprenants (à chaud)", objectif: "≥ 85%" },
    { id: "taux_rupture", label: "Taux de rupture de contrat", objectif: "≤ 15%" },
    { id: "taux_assiduite", label: "Taux d'assiduité moyen", objectif: "≥ 90%" },
  ];
  return (
    <div className="space-y-4">
      <CampusHeader />
      <Section title="Informations générales">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Période couverte" field="periode" data={data} onUpdate={onUpdate} placeholder="Mai 2026 — Mai 2027" />
          <Field label="Date de la revue" field="date_revue" data={data} onUpdate={onUpdate} type="date" />
          <Field label="Prochaine revue" field="prochaine_revue" data={data} onUpdate={onUpdate} type="date" />
        </div>
      </Section>
      <Section title="1. Bilan des indicateurs de résultats" color="bg-secondary">
        {indicateurs.map((ind) => (
          <div key={ind.id} className="grid grid-cols-4 gap-2 mb-1 items-center">
            <span className="text-xs text-dark">{ind.label}</span>
            <span className="text-xs text-gray-text text-center">{ind.objectif}</span>
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`ind_${ind.id}_resultat`] || ""} onChange={(e) => onUpdate(`ind_${ind.id}_resultat`, e.target.value)} placeholder="Résultat" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`ind_${ind.id}_analyse`] || ""} onChange={(e) => onUpdate(`ind_${ind.id}_analyse`, e.target.value)} placeholder="Analyse" />
          </div>
        ))}
      </Section>
      <Section title="2. Points forts identifiés">
        <TextArea label="" field="points_forts" data={data} onUpdate={onUpdate} rows={3} placeholder="Listez les points forts de l'année..." />
      </Section>
      <Section title="3. Axes d'amélioration" color="bg-orange">
        <TextArea label="" field="axes_amelioration" data={data} onUpdate={onUpdate} rows={3} placeholder="Axes d'amélioration prioritaires..." />
      </Section>
      <Section title="4. Plan d'action pour l'année suivante">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-1">
            <input className="border border-gray-300 rounded px-2 py-1 text-xs col-span-2" value={data[`action_${i}_desc`] || ""} onChange={(e) => onUpdate(`action_${i}_desc`, e.target.value)} placeholder="Action à mener" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`action_${i}_echeance`] || ""} onChange={(e) => onUpdate(`action_${i}_echeance`, e.target.value)} placeholder="Échéance" />
          </div>
        ))}
      </Section>
    </div>
  );
}
