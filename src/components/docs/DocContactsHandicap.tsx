"use client";
import { Section, Field, TextArea, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

const ORGANISMES = [
  { id: "mdph", nom: "MDPH du Nord", email: "mdph@lenord.fr", tel: "03 59 73 89 89", adresse: "133 rue du Molinel — 59000 Lille" },
  { id: "agefiph", nom: "AGEFIPH Hauts-de-France", email: "hauts-de-france@agefiph.asso.fr", tel: "0 800 11 10 09", adresse: "" },
  { id: "capemploi", nom: "Cap Emploi 59", email: "", tel: "", adresse: "" },
];

export default function DocContactsHandicap({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />
      <div className="bg-secondary-light rounded-lg p-3 text-xs text-secondary">
        <strong>Indicateur 26 — Critère 6</strong> : L&apos;auditeur demandera les captures d&apos;écran des emails envoyés comme preuve de contact.
      </div>
      <Section title="Référent handicap Campus Excellence">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom du référent" field="referent_nom" data={data} onUpdate={onUpdate} placeholder="Yanis LADJ" />
          <Field label="Email" field="referent_email" data={data} onUpdate={onUpdate} placeholder="contact@campus-excellence.fr" />
        </div>
      </Section>
      <Section title="Organismes à contacter" color="bg-secondary">
        {ORGANISMES.map((org) => (
          <div key={org.id} className="bg-light-gray rounded-lg p-3 mb-2">
            <h4 className="font-bold text-primary text-sm mb-2">{org.nom}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {org.email && <div><span className="text-gray-text">Email :</span> {org.email}</div>}
              {org.tel && <div><span className="text-gray-text">Tél :</span> {org.tel}</div>}
              {org.adresse && <div className="sm:col-span-2"><span className="text-gray-text">Adresse :</span> {org.adresse}</div>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <Field label="Date de contact" field={`contact_${org.id}_date`} data={data} onUpdate={onUpdate} type="date" />
              <Field label="Objet du contact" field={`contact_${org.id}_objet`} data={data} onUpdate={onUpdate} placeholder="Information aménagements..." />
            </div>
          </div>
        ))}
      </Section>
      <Section title="Procédure d'accueil PSH">
        <TextArea label="Aménagements possibles identifiés" field="amenagements" data={data} onUpdate={onUpdate} placeholder="Temps supplémentaire, supports adaptés, accessibilité..." />
      </Section>
    </div>
  );
}
