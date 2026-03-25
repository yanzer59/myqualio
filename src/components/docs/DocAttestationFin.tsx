"use client";
import { CAMPUS } from "@/lib/campus-data";
import { Section, Field, InfoLine, CampusHeader } from "./shared";

interface Props {
  data: Record<string, string>;
  onUpdate: (field: string, value: string) => void;
}

export default function DocAttestationFin({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />

      <Section title="Attestation délivrée par">
        <InfoLine label="Nom / Prénom" value={`${CAMPUS.president_prenom} ${CAMPUS.president_nom}`} />
        <InfoLine label="Qualité" value={`${CAMPUS.president_qualite} de ${CAMPUS.nom}`} />
        <InfoLine label="Organisme" value={`${CAMPUS.nom} — CFA APEN — ${CAMPUS.adresse}, ${CAMPUS.cp} ${CAMPUS.ville}`} />
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
        <InfoLine label="Formation" value={CAMPUS.formation} />
        <InfoLine label="RNCP" value={`${CAMPUS.rncp} — ${CAMPUS.niveau}`} />
        <InfoLine label="Certificateur" value={CAMPUS.certificateur} />

        <div className="mt-3">
          <p className="text-xs font-bold text-primary uppercase mb-2">Blocs de compétences — Statut de validation</p>
          {CAMPUS.blocs.map((b) => (
            <div key={b.code} className="flex items-center gap-3 bg-light-gray rounded p-3 mb-2">
              <div className="flex-1">
                <div className="font-bold text-primary text-xs">{b.code} — {b.heures}h</div>
                <div className="text-xs text-dark">{b.titre}</div>
              </div>
              <select
                className="border border-gray-300 rounded px-2 py-1 text-xs"
                value={data[`bloc_${b.code}`] || ""}
                onChange={(e) => onUpdate(`bloc_${b.code}`, e.target.value)}
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
          <Field label="Volume horaire total CFA" field="volume_heures" data={data} onUpdate={onUpdate} placeholder={`${CAMPUS.heures_cfa} heures`} />
          <Field label="Fait à" field="fait_a" data={data} onUpdate={onUpdate} placeholder={CAMPUS.ville} />
        </div>
      </Section>
    </div>
  );
}
