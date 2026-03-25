"use client";
import { Section, Field, TextArea } from "./shared";

interface Props {
  data: Record<string, string>;
  onUpdate: (field: string, value: string) => void;
}

export default function DocDossierQualiopi({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      {/* 1. PRÉSENTATION DE L'ORGANISME */}
      <Section title="1. Présentation de l'organisme">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Raison sociale" field="q_raison_sociale" data={data} onUpdate={onUpdate} placeholder="Ex: Campus Excellence" />
          <Field label="Forme juridique" field="q_forme" data={data} onUpdate={onUpdate} placeholder="Ex: SAS, SARL, Association..." />
          <Field label="SIRET" field="q_siret" data={data} onUpdate={onUpdate} placeholder="N° SIRET" />
          <Field label="Code NAF / APE" field="q_naf" data={data} onUpdate={onUpdate} placeholder="Ex: 8559A" />
          <div className="sm:col-span-2">
            <Field label="Adresse" field="q_adresse" data={data} onUpdate={onUpdate} placeholder="Adresse complète — Code postal Ville" />
          </div>
          <Field label="Téléphone" field="q_telephone" data={data} onUpdate={onUpdate} placeholder="01 23 45 67 89" />
          <Field label="Email" field="q_email" data={data} onUpdate={onUpdate} placeholder="contact@..." />
          <Field label="Site internet" field="q_site" data={data} onUpdate={onUpdate} placeholder="www.exemple.fr" />
          <Field label="LinkedIn" field="q_linkedin" data={data} onUpdate={onUpdate} placeholder="linkedin.com/company/..." />
          <Field label="Groupe / Entité porteuse" field="q_groupe" data={data} onUpdate={onUpdate} placeholder="Nom du groupe si applicable" />
          <Field label="SIRET Groupe" field="q_groupe_siret" data={data} onUpdate={onUpdate} placeholder="N° SIRET du groupe" />
        </div>
      </Section>

      {/* Direction */}
      <Section title="Direction" color="bg-secondary">
        <p className="text-xs font-bold text-secondary uppercase mb-2">Président / Dirigeant</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom" field="q_pres_nom" data={data} onUpdate={onUpdate} placeholder="NOM" />
          <Field label="Prénom" field="q_pres_prenom" data={data} onUpdate={onUpdate} placeholder="Prénom" />
          <Field label="Date de naissance" field="q_pres_naissance" data={data} onUpdate={onUpdate} placeholder="JJ/MM/AAAA" />
          <Field label="Lieu de naissance" field="q_pres_lieu" data={data} onUpdate={onUpdate} placeholder="Ville (département)" />
          <Field label="Qualité" field="q_pres_qualite" data={data} onUpdate={onUpdate} placeholder="Ex: Président, Gérant..." />
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4">
          <p className="text-xs font-bold text-secondary uppercase mb-2">Responsable pédagogique</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nom" field="q_dir_nom" data={data} onUpdate={onUpdate} placeholder="NOM" />
            <Field label="Prénom" field="q_dir_prenom" data={data} onUpdate={onUpdate} placeholder="Prénom" />
            <div className="sm:col-span-2">
              <Field label="Fonction" field="q_dir_fonction" data={data} onUpdate={onUpdate} placeholder="Ex: Responsable pédagogique — Directeur du Centre de Formation" />
            </div>
            <Field label="Email" field="q_dir_email" data={data} onUpdate={onUpdate} placeholder="email@..." />
          </div>
        </div>
      </Section>

      {/* 1.1 Périmètre */}
      <Section title="1.1 Périmètre de la certification Qualiopi">
        <TextArea label="Types de prestations" field="q_perimetre" data={data} onUpdate={onUpdate} placeholder="Ex: Actions de formation par apprentissage (CFA)&#10;Actions de formation professionnelle continue" rows={3} />
      </Section>

      {/* 1.2 Formation dispensée */}
      <Section title="1.2 Formation dispensée" color="bg-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Intitulé de la formation" field="q_formation" data={data} onUpdate={onUpdate} placeholder="Ex: Titre Professionnel Agent de Médiation..." />
          </div>
          <Field label="Code RNCP" field="q_rncp" data={data} onUpdate={onUpdate} placeholder="Ex: RNCP 37722" />
          <Field label="Niveau" field="q_niveau" data={data} onUpdate={onUpdate} placeholder="Ex: Niveau 3 (CAP/BEP)" />
          <div className="sm:col-span-2">
            <Field label="Certificateur" field="q_certificateur" data={data} onUpdate={onUpdate} placeholder="Ex: Ministère du Travail" />
          </div>
          <Field label="Date d'enregistrement RNCP" field="q_date_enreg" data={data} onUpdate={onUpdate} placeholder="JJ/MM/AAAA" />
          <Field label="Échéance certification" field="q_date_echeance" data={data} onUpdate={onUpdate} placeholder="JJ/MM/AAAA" />
          <Field label="Durée totale (mois)" field="q_duree" data={data} onUpdate={onUpdate} placeholder="Ex: 12" />
          <Field label="Heures CFA" field="q_heures" data={data} onUpdate={onUpdate} placeholder="Ex: 441" />
          <div className="sm:col-span-2">
            <Field label="Rythme d'alternance" field="q_rythme" data={data} onUpdate={onUpdate} placeholder="Ex: 1 jour/semaine au CFA — 4 jours en entreprise" />
          </div>
          <Field label="Démarrage prévu" field="q_demarrage" data={data} onUpdate={onUpdate} placeholder="Ex: Mai 2026" />
          <Field label="Fin prévue" field="q_fin" data={data} onUpdate={onUpdate} placeholder="Ex: Mai 2027" />
        </div>
      </Section>

      {/* Blocs de compétences */}
      <Section title="Blocs de compétences RNCP">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-primary-light/30 rounded-lg p-4 mb-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Code bloc" field={`q_bloc_${i}_code`} data={data} onUpdate={onUpdate} placeholder={`Ex: BC0${i + 1}`} />
              <Field label="Code RNCP" field={`q_bloc_${i}_rncp`} data={data} onUpdate={onUpdate} placeholder="Ex: RNCP37722BC01" />
              <Field label="Heures" field={`q_bloc_${i}_heures`} data={data} onUpdate={onUpdate} placeholder="Ex: 160" />
            </div>
            <div className="mt-2">
              <TextArea label="Intitulé du bloc" field={`q_bloc_${i}_titre`} data={data} onUpdate={onUpdate} placeholder="Intitulé complet du bloc de compétences" rows={2} />
            </div>
          </div>
        ))}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <Field label="Modules transversaux" field="q_modules_transv" data={data} onUpdate={onUpdate} placeholder="Ex: Numérique, insertion professionnelle, préparation examen" />
          <Field label="Heures modules transversaux" field="q_modules_transv_h" data={data} onUpdate={onUpdate} placeholder="Ex: 50" />
        </div>
      </Section>

      {/* 4. Calendrier */}
      <Section title="4. Calendrier de préparation à l'audit">
        <TextArea label="Planning des actions" field="q_calendrier" data={data} onUpdate={onUpdate} placeholder="Mars 2026 : ...&#10;Avril 2026 : ...&#10;Mai 2026 : ..." rows={8} />
      </Section>

      {/* 5. Organismes certificateurs */}
      <Section title="5. Organismes certificateurs Qualiopi (COFRAC)">
        <TextArea label="Liste des organismes contactés" field="q_certificateurs" data={data} onUpdate={onUpdate} placeholder="Organisme — Site — Couverture&#10;Ex: AFNOR Certification — www.afnor.org — Nationale" rows={6} />
        <Field label="Budget prévisionnel" field="q_budget_audit" data={data} onUpdate={onUpdate} placeholder="Ex: 1 500 à 3 500 € HT" />
      </Section>

      {/* DREETS */}
      <Section title="Informations DREETS" color="bg-secondary">
        <Field label="Adresse DREETS" field="q_dreets" data={data} onUpdate={onUpdate} placeholder="Ex: DREETS Hauts-de-France — 70 rue Saint-Sauveur — 59000 Lille" />
      </Section>
    </div>
  );
}
