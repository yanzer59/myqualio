"use client";
import { Section, Field } from "./shared";

interface Props {
  data: Record<string, string>;
  onUpdate: (field: string, value: string) => void;
}

export default function DocConvocation({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <Section title="1. Identité de l'apprenant(e)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom" field="apprenti_nom" data={data} onUpdate={onUpdate} required />
          <Field label="Prénom" field="apprenti_prenom" data={data} onUpdate={onUpdate} required />
          <Field label="Date de naissance" field="apprenti_naissance" data={data} onUpdate={onUpdate} type="date" />
          <Field label="Téléphone" field="apprenti_tel" data={data} onUpdate={onUpdate} />
          <Field label="Email" field="apprenti_email" data={data} onUpdate={onUpdate} type="email" />
          <Field label="Employeur (entreprise)" field="employeur" data={data} onUpdate={onUpdate} />
          <Field label="Maître d'apprentissage" field="maitre_apprentissage" data={data} onUpdate={onUpdate} />
        </div>
      </Section>

      <Section title="2. Objet de la convocation" color="bg-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-primary mb-1">Type de session *</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
              value={data.type_session || ""}
              onChange={(e) => onUpdate("type_session", e.target.value)}
            >
              <option value="">— Sélectionner —</option>
              <option value="Séquence de formation">Séquence de formation</option>
              <option value="Évaluation">Évaluation</option>
              <option value="Conseil de classe">Conseil de classe</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <Field label="Date" field="date_session" data={data} onUpdate={onUpdate} type="date" required />
          <Field label="Horaire début" field="heure_debut" data={data} onUpdate={onUpdate} placeholder="09:00" />
          <Field label="Horaire fin" field="heure_fin" data={data} onUpdate={onUpdate} placeholder="17:00" />
          <Field label="Salle" field="salle" data={data} onUpdate={onUpdate} placeholder="Salle principale" />
          <Field label="Formateur / Référent" field="formateur" data={data} onUpdate={onUpdate} />
          <div className="sm:col-span-2">
            <Field label="Thématique de la session" field="thematique" data={data} onUpdate={onUpdate} placeholder="Ex: BC01 — Lien social et prévention" />
          </div>
        </div>
      </Section>
    </div>
  );
}
