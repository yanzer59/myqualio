"use client";
import { Section, Field } from "./shared";

interface Props {
  data: Record<string, string>;
  onUpdate: (field: string, value: string) => void;
}

export default function DocAttestationFin({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <Section title="Attestation délivrée par">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom / Prénom du signataire" field="signataire_nom" data={data} onUpdate={onUpdate} placeholder="Ex: Yusri BEN KHELIL" />
          <Field label="Qualité" field="signataire_qualite" data={data} onUpdate={onUpdate} placeholder="Ex: Président de Campus Excellence" />
          <div className="sm:col-span-2">
            <Field label="Organisme" field="organisme" data={data} onUpdate={onUpdate} placeholder="Ex: Campus Excellence — CFA — 102 Rue de Lannoy, 59650 Villeneuve d'Ascq" />
          </div>
        </div>
      </Section>

      <Section title="Bénéficiaire de la formation" color="bg-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom de l'apprenti(e)" field="apprenti_nom" data={data} onUpdate={onUpdate} required />
          <Field label="Prénom" field="apprenti_prenom" data={data} onUpdate={onUpdate} required />
          <Field label="Date de naissance" field="apprenti_naissance" data={data} onUpdate={onUpdate} type="date" />
          <Field label="Lieu de naissance" field="apprenti_lieu" data={data} onUpdate={onUpdate} />
          <Field label="Entreprise d'accueil" field="entreprise" data={data} onUpdate={onUpdate} />
        </div>
      </Section>

      <Section title="Formation suivie">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Formation" field="formation" data={data} onUpdate={onUpdate} placeholder="Ex: TP Agent de Médiation, Information et Services" />
          <Field label="RNCP" field="rncp" data={data} onUpdate={onUpdate} placeholder="Ex: RNCP 37722 — Niveau 3" />
          <Field label="Certificateur" field="certificateur" data={data} onUpdate={onUpdate} placeholder="Ex: Ministère du Travail" />
        </div>

        <div className="mt-3">
          <p className="text-xs font-bold text-primary uppercase mb-2">Blocs de compétences — Statut de validation</p>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 bg-light-gray rounded p-3 mb-2">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Field label="Bloc" field={`bloc_${i}_code`} data={data} onUpdate={onUpdate} placeholder={`Ex: BC0${i + 1}`} />
                <Field label="Intitulé" field={`bloc_${i}_titre`} data={data} onUpdate={onUpdate} placeholder="Intitulé du bloc" />
              </div>
              <select
                className="border border-gray-300 rounded px-2 py-1 text-xs"
                value={data[`bloc_${i}_statut`] || ""}
                onChange={(e) => onUpdate(`bloc_${i}_statut`, e.target.value)}
              >
                <option value="">— Statut —</option>
                <option value="Validé">Validé</option>
                <option value="Partiel">Partiel</option>
                <option value="Non validé">Non validé</option>
              </select>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Dates de la formation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Date de début" field="date_debut" data={data} onUpdate={onUpdate} type="date" />
          <Field label="Date de fin" field="date_fin" data={data} onUpdate={onUpdate} type="date" />
          <Field label="Volume horaire total CFA" field="volume_heures" data={data} onUpdate={onUpdate} placeholder="Ex: 441 heures" />
          <Field label="Fait à" field="fait_a" data={data} onUpdate={onUpdate} placeholder="Ex: Villeneuve d'Ascq" />
        </div>
      </Section>
    </div>
  );
}
