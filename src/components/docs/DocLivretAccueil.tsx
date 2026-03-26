"use client";
import { Section, Field, TextArea, Select } from "./shared";

interface Props {
  data: Record<string, string>;
  onUpdate: (field: string, value: string) => void;
}

// Listes déroulantes
const FORMATIONS = [
  "Titre Professionnel Agent de Médiation, Information et Services (AMIS)",
  "Titre Professionnel Assistant de Direction",
  "Titre Professionnel Assistant Ressources Humaines",
  "Titre Professionnel Comptable Assistant",
  "Titre Professionnel Secrétaire Assistant",
  "Titre Professionnel Conseiller en Insertion Professionnelle",
  "Titre Professionnel Employé Commercial",
  "Titre Professionnel Manager d'Unité Marchande",
  "Titre Professionnel Négociateur Technico-Commercial",
  "Titre Professionnel Développeur Web et Web Mobile",
  "CAP Accompagnant Éducatif Petite Enfance",
  "BTS Management Commercial Opérationnel (MCO)",
  "BTS Négociation et Digitalisation de la Relation Client (NDRC)",
  "BTS Support à l'Action Managériale (SAM)",
  "BTS Comptabilité et Gestion",
];

const NIVEAUX = [
  "Niveau 3 (CAP/BEP)",
  "Niveau 4 (Bac)",
  "Niveau 5 (Bac+2 / BTS / DUT)",
  "Niveau 6 (Bac+3 / Licence)",
  "Niveau 7 (Bac+5 / Master)",
];

const CERTIFICATEURS = [
  "Ministère du Travail, du Plein Emploi et de l'Insertion",
  "Ministère de l'Éducation Nationale",
  "Ministère de l'Enseignement Supérieur",
  "Ministère de la Santé",
  "Ministère de l'Agriculture",
];

const DUREES = [
  "6 mois", "8 mois", "10 mois", "12 mois", "14 mois", "16 mois", "18 mois", "24 mois",
];

const HEURES_CFA = [
  "200h", "300h", "400h", "441h", "450h", "500h", "600h", "675h", "700h", "800h", "900h", "1000h", "1200h", "1350h",
];

const RYTHMES = [
  "1 jour/semaine au CFA — 4 jours en entreprise",
  "2 jours/semaine au CFA — 3 jours en entreprise",
  "3 jours/semaine au CFA — 2 jours en entreprise",
  "1 semaine CFA / 1 semaine entreprise",
  "1 semaine CFA / 2 semaines entreprise",
  "1 semaine CFA / 3 semaines entreprise",
  "2 semaines CFA / 2 semaines entreprise",
];

const HORAIRES = [
  "8h00 — 16h00",
  "8h30 — 16h30",
  "9h00 — 17h00",
  "9h00 — 16h30",
  "9h30 — 17h30",
  "8h00 — 12h00 / 13h00 — 17h00",
  "9h00 — 12h30 / 13h30 — 17h00",
];

const JOURS = [
  "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi",
  "Lundi et Mardi", "Lundi et Jeudi", "Mardi et Jeudi",
  "Lundi, Mardi et Mercredi", "Mercredi, Jeudi et Vendredi",
];

const FORMES_JURIDIQUES = [
  "SAS (Société par Actions Simplifiée)",
  "SARL (Société à Responsabilité Limitée)",
  "SASU (Société par Actions Simplifiée Unipersonnelle)",
  "EURL (Entreprise Unipersonnelle à Responsabilité Limitée)",
  "SA (Société Anonyme)",
  "Association loi 1901",
  "SCOP (Société Coopérative)",
  "Micro-entreprise",
  "Établissement public",
];

export default function DocLivretAccueil({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <Section title="1. Présentation de l'organisme">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Raison sociale" field="raison_sociale" data={data} onUpdate={onUpdate} placeholder="Nom de votre CFA" />
          <Select label="Forme juridique" field="forme_juridique" data={data} onUpdate={onUpdate} options={FORMES_JURIDIQUES} />
          <Field label="Président / Dirigeant" field="president" data={data} onUpdate={onUpdate} placeholder="Prénom NOM" />
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
            <Select label="Intitulé de la formation" field="formation_titre" data={data} onUpdate={onUpdate} options={FORMATIONS} placeholder="— Choisir la formation —" />
          </div>
          <Field label="Code RNCP" field="formation_rncp" data={data} onUpdate={onUpdate} placeholder="Ex: RNCP 37722" />
          <Select label="Niveau" field="formation_niveau" data={data} onUpdate={onUpdate} options={NIVEAUX} />
          <div className="sm:col-span-2">
            <Select label="Certificateur" field="formation_certificateur" data={data} onUpdate={onUpdate} options={CERTIFICATEURS} />
          </div>
          <Select label="Durée totale" field="formation_duree" data={data} onUpdate={onUpdate} options={DUREES} />
          <Select label="Heures CFA" field="formation_heures" data={data} onUpdate={onUpdate} options={HEURES_CFA} />
          <div className="sm:col-span-2">
            <Select label="Rythme d'alternance" field="formation_rythme" data={data} onUpdate={onUpdate} options={RYTHMES} />
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
          <Select label="Horaires du CFA" field="horaires_cfa" data={data} onUpdate={onUpdate} options={HORAIRES} />
          <Select label="Jour(s) de formation CFA" field="jour_cfa" data={data} onUpdate={onUpdate} options={JOURS} />
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
