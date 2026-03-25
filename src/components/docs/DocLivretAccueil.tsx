"use client";
import { Section, Field, TextArea } from "./shared";

interface Props {
  data: Record<string, string>;
  onUpdate: (field: string, value: string) => void;
}

export default function DocLivretAccueil({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <Section title="1. Présentation de l'organisme">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Raison sociale" field="raison_sociale" data={data} onUpdate={onUpdate} placeholder="Ex: Campus Excellence" />
          <Field label="Forme juridique" field="forme_juridique" data={data} onUpdate={onUpdate} placeholder="Ex: SAS" />
          <Field label="Président" field="president" data={data} onUpdate={onUpdate} placeholder="Prénom NOM" />
          <Field label="Responsable pédagogique" field="responsable_peda" data={data} onUpdate={onUpdate} placeholder="Prénom NOM" />
          <div className="sm:col-span-2">
            <Field label="Adresse" field="adresse" data={data} onUpdate={onUpdate} placeholder="Adresse complète — Code postal Ville" />
          </div>
          <Field label="Email" field="email_contact" data={data} onUpdate={onUpdate} placeholder="contact@..." />
          <Field label="Téléphone" field="telephone" data={data} onUpdate={onUpdate} placeholder="01 23 45 67 89" />
          <Field label="Site internet" field="site_web" data={data} onUpdate={onUpdate} placeholder="www.exemple.fr" />
          <Field label="LinkedIn" field="linkedin" data={data} onUpdate={onUpdate} placeholder="linkedin.com/company/..." />
        </div>
      </Section>

      <Section title="2. La formation" color="bg-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Intitulé de la formation" field="formation_titre" data={data} onUpdate={onUpdate} placeholder="Ex: Titre Professionnel Agent de Médiation..." />
          </div>
          <Field label="Code RNCP" field="formation_rncp" data={data} onUpdate={onUpdate} placeholder="Ex: RNCP 37722" />
          <Field label="Niveau" field="formation_niveau" data={data} onUpdate={onUpdate} placeholder="Ex: Niveau 3 (CAP/BEP)" />
          <div className="sm:col-span-2">
            <Field label="Certificateur" field="formation_certificateur" data={data} onUpdate={onUpdate} placeholder="Ex: Ministère du Travail" />
          </div>
          <Field label="Durée totale" field="formation_duree" data={data} onUpdate={onUpdate} placeholder="Ex: 12 mois" />
          <Field label="Heures CFA" field="formation_heures" data={data} onUpdate={onUpdate} placeholder="Ex: 441h" />
          <div className="sm:col-span-2">
            <Field label="Rythme d'alternance" field="formation_rythme" data={data} onUpdate={onUpdate} placeholder="Ex: 1 jour/semaine au CFA — 4 jours en entreprise" />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-bold text-secondary uppercase mb-2">Blocs de compétences</p>
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-light-gray rounded-lg p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Field label={`Bloc ${i + 1} — Code`} field={`bloc_${i}_code`} data={data} onUpdate={onUpdate} placeholder={`Ex: BC0${i + 1}`} />
                  <Field label="Code RNCP" field={`bloc_${i}_rncp`} data={data} onUpdate={onUpdate} placeholder="Ex: RNCP37722BC01" />
                  <Field label="Heures" field={`bloc_${i}_heures`} data={data} onUpdate={onUpdate} placeholder="Ex: 160" />
                </div>
                <div className="mt-2">
                  <TextArea label="Intitulé du bloc" field={`bloc_${i}_titre`} data={data} onUpdate={onUpdate} placeholder="Intitulé complet du bloc de compétences" rows={2} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="3. Informations pratiques">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Horaires du CFA" field="horaires_cfa" data={data} onUpdate={onUpdate} placeholder="Ex: 9h00 — 17h00" />
          <Field label="Jour de formation CFA" field="jour_cfa" data={data} onUpdate={onUpdate} placeholder="Ex: Jeudi" />
          <Field label="Accès transports" field="acces_transports" data={data} onUpdate={onUpdate} placeholder="Métro, bus, parking..." />
          <Field label="Restauration" field="restauration" data={data} onUpdate={onUpdate} placeholder="Salle de pause, micro-ondes..." />
        </div>
      </Section>

      <Section title="4. Référent handicap">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom du référent" field="referent_handicap" data={data} onUpdate={onUpdate} placeholder="Prénom NOM" />
          <Field label="Email référent" field="referent_handicap_email" data={data} onUpdate={onUpdate} placeholder="email@..." />
          <Field label="Téléphone référent" field="referent_handicap_tel" data={data} onUpdate={onUpdate} placeholder="01 23 45 67 89" />
        </div>
      </Section>

      <Section title="5. Contacts utiles">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Urgence — numéros" field="urgence_tel" data={data} onUpdate={onUpdate} placeholder="15 (SAMU), 17 (Police), 18 (Pompiers)" />
          <Field label="Médecine du travail" field="medecine_travail" data={data} onUpdate={onUpdate} placeholder="Nom et téléphone" />
        </div>
      </Section>

      <Section title="6. Règlement intérieur">
        <TextArea label="Points clés du règlement" field="reglement" data={data} onUpdate={onUpdate} placeholder="Assiduité, ponctualité, respect, tenue, usage du téléphone..." rows={5} />
      </Section>
    </div>
  );
}
