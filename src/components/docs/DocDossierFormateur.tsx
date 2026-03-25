"use client";
import { Section, Field, TextArea } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocDossierFormateur({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <Section title="1. Identification du formateur">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom / Prénom" field="nom" data={data} onUpdate={onUpdate} required />
          <Field label="Qualification(s)" field="qualification" data={data} onUpdate={onUpdate} />
          <Field label="Expérience professionnelle" field="experience" data={data} onUpdate={onUpdate} />
          <Field label="Spécialité(s)" field="specialite" data={data} onUpdate={onUpdate} />
          <div>
            <label className="block text-sm font-bold text-primary mb-1">Statut</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary" value={data.statut || ""} onChange={(e) => onUpdate("statut", e.target.value)}>
              <option value="">— Sélectionner —</option>
              <option value="Salarié">Salarié</option>
              <option value="Intervenant externe">Intervenant externe</option>
              <option value="Vacataire">Vacataire</option>
            </select>
          </div>
        </div>
      </Section>
      <Section title="2. Blocs et compétences enseignées" color="bg-secondary">
        <p className="text-xs text-gray-text mb-3">Listez les compétences enseignées par ce formateur.</p>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <div key={i} className="flex items-center gap-2 mb-1 ml-2">
            <input type="checkbox" checked={data[`enseigne_${i}`] === "oui"} onChange={(e) => onUpdate(`enseigne_${i}`, e.target.checked ? "oui" : "")} className="accent-primary" />
            <input className="border border-gray-300 rounded px-2 py-0.5 text-xs w-10 text-center" value={data[`comp_${i}_code`] || ""} onChange={(e) => onUpdate(`comp_${i}_code`, e.target.value)} placeholder={`C${i + 1}`} />
            <input className="border border-gray-300 rounded px-2 py-0.5 text-xs flex-1" value={data[`comp_${i}_titre`] || ""} onChange={(e) => onUpdate(`comp_${i}_titre`, e.target.value)} placeholder="Intitulé de la compétence" />
          </div>
        ))}
      </Section>
      <Section title="3. Formation continue">
        <TextArea label="Dernières formations suivies" field="formations_suivies" data={data} onUpdate={onUpdate} placeholder="Titre, organisme, date..." />
        <TextArea label="Actions prévues dans les 12 prochains mois" field="actions_prevues" data={data} onUpdate={onUpdate} />
      </Section>
    </div>
  );
}
