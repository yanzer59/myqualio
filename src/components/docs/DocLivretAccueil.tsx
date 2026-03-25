"use client";
import { CAMPUS } from "@/lib/campus-data";
import { Section, Field, InfoLine, CampusHeader } from "./shared";

interface Props {
  data: Record<string, string>;
  onUpdate: (field: string, value: string) => void;
}

export default function DocLivretAccueil({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />

      <Section title="1. Présentation de l'organisme">
        <InfoLine label="Raison sociale" value={CAMPUS.nom} />
        <InfoLine label="Président" value={`${CAMPUS.president_prenom} ${CAMPUS.president_nom}`} />
        <InfoLine label="Responsable pédagogique" value={`${CAMPUS.directeur_prenom} ${CAMPUS.directeur_nom}`} />
        <InfoLine label="Adresse" value={`${CAMPUS.adresse} — ${CAMPUS.cp} ${CAMPUS.ville}`} />
        <InfoLine label="Contact" value={CAMPUS.email} />
        <InfoLine label="Site internet" value={CAMPUS.site} />
      </Section>

      <Section title="2. La formation AMIS" color="bg-secondary">
        <InfoLine label="Titre" value={CAMPUS.formation} />
        <InfoLine label="RNCP" value={CAMPUS.rncp} />
        <InfoLine label="Niveau" value={CAMPUS.niveau} />
        <InfoLine label="Certificateur" value={CAMPUS.certificateur} />
        <InfoLine label="Durée" value={`${CAMPUS.duree_mois} mois — ${CAMPUS.heures_cfa}h CFA`} />
        <InfoLine label="Rythme" value={CAMPUS.rythme} />

        <div className="mt-3">
          <p className="text-xs font-bold text-secondary uppercase mb-2">Blocs de compétences</p>
          {CAMPUS.blocs.map((b) => (
            <div key={b.code} className="bg-light-gray rounded p-3 mb-2">
              <div className="font-bold text-primary text-xs">{b.code} — {b.heures}h</div>
              <div className="text-xs text-dark">{b.titre}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="3. Informations pratiques (personnalisables)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Horaires du CFA" field="horaires_cfa" data={data} onUpdate={onUpdate} placeholder="Ex: 9h00 — 17h00" />
          <Field label="Jour de formation CFA" field="jour_cfa" data={data} onUpdate={onUpdate} placeholder="Ex: Jeudi" />
          <Field label="Accès transports" field="acces_transports" data={data} onUpdate={onUpdate} placeholder="Métro, bus, parking..." />
          <Field label="Restauration" field="restauration" data={data} onUpdate={onUpdate} placeholder="Salle de pause, micro-ondes..." />
        </div>
      </Section>

      <Section title="4. Référent handicap">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom du référent" field="referent_handicap" data={data} onUpdate={onUpdate} placeholder={CAMPUS.directeur_prenom + " " + CAMPUS.directeur_nom} />
          <Field label="Email référent" field="referent_handicap_email" data={data} onUpdate={onUpdate} placeholder={CAMPUS.email} />
        </div>
      </Section>

      <Section title="5. Contacts utiles">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Urgence — numéro" field="urgence_tel" data={data} onUpdate={onUpdate} placeholder="15 (SAMU), 17 (Police), 18 (Pompiers)" />
          <Field label="Médecine du travail" field="medecine_travail" data={data} onUpdate={onUpdate} />
        </div>
      </Section>
    </div>
  );
}
