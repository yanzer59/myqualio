"use client";
import { Section, Field, TextArea, Select, PhoneField, EmailField, AddressField } from "./shared";
import { FORMATIONS_RNCP, getFormationFromOption, getFormationOptions } from "@/lib/formations-rncp";

interface Props {
  data: Record<string, string>;
  onUpdate: (field: string, value: string) => void;
}

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
  "8h00 — 16h00", "8h30 — 16h30", "9h00 — 17h00", "9h00 — 16h30", "9h30 — 17h30",
  "8h00 — 12h00 / 13h00 — 17h00", "9h00 — 12h30 / 13h30 — 17h00",
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

const DUREES = [
  "6 mois", "8 mois", "10 mois", "12 mois", "14 mois", "16 mois", "18 mois", "24 mois",
];

export default function DocLivretAccueil({ data, onUpdate }: Props) {
  // Quand on sélectionne une formation, remplir auto les champs RNCP + blocs
  function handleFormationChange(field: string, value: string) {
    onUpdate(field, value);
    const formation = getFormationFromOption(value);
    if (formation) {
      onUpdate("formation_rncp", formation.rncp);
      onUpdate("formation_niveau", formation.niveau);
      onUpdate("formation_certificateur", formation.certificateur);
      onUpdate("formation_date_enreg", formation.date_enregistrement);
      onUpdate("formation_date_echeance", formation.date_echeance);
      onUpdate("formation_duree", formation.duree_indicative);
      onUpdate("formation_heures", formation.heures_indicatives);
      // Remplir les blocs de compétences
      formation.blocs.forEach((bloc, i) => {
        onUpdate(`bloc_${i}_code`, bloc.code);
        onUpdate(`bloc_${i}_rncp`, bloc.rncp);
        onUpdate(`bloc_${i}_titre`, bloc.titre);
        onUpdate(`bloc_${i}_heures`, bloc.heures ? String(bloc.heures) : "");
      });
      // Nettoyer les blocs en trop si la nouvelle formation en a moins
      for (let i = formation.blocs.length; i < 6; i++) {
        onUpdate(`bloc_${i}_code`, "");
        onUpdate(`bloc_${i}_rncp`, "");
        onUpdate(`bloc_${i}_titre`, "");
        onUpdate(`bloc_${i}_heures`, "");
      }
      onUpdate("nb_blocs", String(formation.blocs.length));
    }
  }

  // Nombre de blocs à afficher
  const nbBlocs = parseInt(data.nb_blocs || "3") || 3;
  const maxBlocs = Math.max(nbBlocs, 2);

  return (
    <div className="space-y-4">
      <div className="bg-accent-light border border-accent/30 rounded-lg px-4 py-2 text-xs text-dark">
        Les champs marqués d&apos;un <span className="text-red font-bold">*</span> sont obligatoires.
        Sélectionnez une formation pour <strong>remplir automatiquement</strong> les blocs de compétences.
      </div>

      <Section title="1. Présentation de l'organisme">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Raison sociale" field="raison_sociale" data={data} onUpdate={onUpdate} placeholder="Nom de votre CFA" required />
          <Select label="Forme juridique" field="forme_juridique" data={data} onUpdate={onUpdate} options={FORMES_JURIDIQUES} required />
          <Field label="Président / Dirigeant" field="president" data={data} onUpdate={onUpdate} placeholder="Prénom NOM" required />
          <Field label="Responsable pédagogique" field="responsable_peda" data={data} onUpdate={onUpdate} placeholder="Prénom NOM" required />
          <div className="sm:col-span-2">
            <AddressField label="Adresse" field="adresse" data={data} onUpdate={onUpdate} required />
          </div>
          <EmailField label="Email" field="email_contact" data={data} onUpdate={onUpdate} required />
          <PhoneField label="Téléphone" field="telephone" data={data} onUpdate={onUpdate} required />
          <Field label="Site internet" field="site_web" data={data} onUpdate={onUpdate} placeholder="www.exemple.fr" />
          <Field label="LinkedIn" field="linkedin" data={data} onUpdate={onUpdate} placeholder="linkedin.com/company/..." />
        </div>
      </Section>

      <Section title="2. La formation" color="bg-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Select
              label="Titre professionnel"
              field="formation_titre"
              data={data}
              onUpdate={handleFormationChange}
              options={getFormationOptions()}
              placeholder="— Sélectionner le titre RNCP —"
              required
            />
          </div>

          {/* Champs auto-remplis mais modifiables */}
          <Field label="Code RNCP" field="formation_rncp" data={data} onUpdate={onUpdate} placeholder="Auto-rempli" required />
          <Field label="Niveau" field="formation_niveau" data={data} onUpdate={onUpdate} placeholder="Auto-rempli" required />
          <div className="sm:col-span-2">
            <Field label="Certificateur" field="formation_certificateur" data={data} onUpdate={onUpdate} placeholder="Auto-rempli" required />
          </div>
          <Field label="Date d'enregistrement RNCP" field="formation_date_enreg" data={data} onUpdate={onUpdate} placeholder="Auto-rempli" />
          <Field label="Échéance certification" field="formation_date_echeance" data={data} onUpdate={onUpdate} placeholder="Auto-rempli" />
          <Select label="Durée totale" field="formation_duree" data={data} onUpdate={onUpdate} options={DUREES} required />
          <Field label="Heures CFA" field="formation_heures" data={data} onUpdate={onUpdate} placeholder="Auto-rempli" required />
          <div className="sm:col-span-2">
            <Select label="Rythme d'alternance" field="formation_rythme" data={data} onUpdate={onUpdate} options={RYTHMES} required />
          </div>
        </div>

        {/* Blocs de compétences — remplis automatiquement */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-secondary uppercase">Blocs de compétences (auto-remplis)</p>
            {data.formation_titre && (
              <span className="text-xs bg-green/10 text-green px-2 py-1 rounded font-medium">
                ✓ {maxBlocs} blocs chargés
              </span>
            )}
          </div>
          <div className="space-y-3">
            {Array.from({ length: maxBlocs }).map((_, i) => (
              <div key={i} className={`rounded-lg p-4 ${data[`bloc_${i}_code`] ? "bg-secondary/5 border border-secondary/20" : "bg-light-gray"}`}>
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
          <Select label="Horaires du CFA" field="horaires_cfa" data={data} onUpdate={onUpdate} options={HORAIRES} required />
          <Select label="Jour(s) de formation CFA" field="jour_cfa" data={data} onUpdate={onUpdate} options={JOURS} required />
          <Field label="Accès transports" field="acces_transports" data={data} onUpdate={onUpdate} placeholder="Métro, bus, parking..." />
          <Field label="Restauration" field="restauration" data={data} onUpdate={onUpdate} placeholder="Salle de pause, micro-ondes..." />
        </div>
      </Section>

      <Section title="4. Référent handicap">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom du référent" field="referent_handicap" data={data} onUpdate={onUpdate} placeholder="Prénom NOM" required />
          <EmailField label="Email référent" field="referent_handicap_email" data={data} onUpdate={onUpdate} required />
          <PhoneField label="Téléphone référent" field="referent_handicap_tel" data={data} onUpdate={onUpdate} />
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
