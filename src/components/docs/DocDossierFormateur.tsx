"use client";
import { CAMPUS } from "@/lib/campus-data";
import { Section, Field, TextArea, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocDossierFormateur({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />
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
        {CAMPUS.blocs.map((b) => (
          <div key={b.code} className="mb-3">
            <h4 className="font-bold text-primary text-xs mb-1">{b.code} — {b.titre.substring(0, 60)}</h4>
            {b.competences.map((c) => (
              <label key={c.code} className="flex items-center gap-2 text-xs ml-4 mb-0.5 cursor-pointer">
                <input type="checkbox" checked={data[`enseigne_${c.code}`] === "oui"} onChange={(e) => onUpdate(`enseigne_${c.code}`, e.target.checked ? "oui" : "")} className="accent-primary" />
                {c.code} — {c.titre}
              </label>
            ))}
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
