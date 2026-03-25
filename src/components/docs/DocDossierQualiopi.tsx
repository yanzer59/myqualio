"use client";
import { CAMPUS } from "@/lib/campus-data";
import { Section, Field, TextArea, CampusHeader } from "./shared";

interface Props {
  data: Record<string, string>;
  onUpdate: (field: string, value: string) => void;
}

export default function DocDossierQualiopi({ data, onUpdate }: Props) {
  // Pré-remplir avec CAMPUS au premier rendu
  function v(field: string, fallback: string) {
    return data[field] !== undefined ? data[field] : fallback;
  }
  function up(field: string, fallback: string) {
    return (val: string) => {
      // Premier appel ? on initialise avec fallback si vide
      onUpdate(field, val);
    };
  }

  return (
    <div className="space-y-4">
      <CampusHeader />

      {/* 1. PRÉSENTATION DE L'ORGANISME */}
      <Section title="1. Présentation de l'organisme">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Raison sociale" field="q_raison_sociale" data={{ ...data, q_raison_sociale: v("q_raison_sociale", CAMPUS.nom) }} onUpdate={(_, val) => up("q_raison_sociale", CAMPUS.nom)(val)} />
          <Field label="Forme juridique" field="q_forme" data={{ ...data, q_forme: v("q_forme", CAMPUS.forme) }} onUpdate={(_, val) => up("q_forme", CAMPUS.forme)(val)} />
          <Field label="SIRET" field="q_siret" data={{ ...data, q_siret: v("q_siret", CAMPUS.siret) }} onUpdate={(_, val) => up("q_siret", CAMPUS.siret)(val)} placeholder="En cours d'attribution" />
          <Field label="Code NAF / APE" field="q_naf" data={{ ...data, q_naf: v("q_naf", CAMPUS.code_naf) }} onUpdate={(_, val) => up("q_naf", CAMPUS.code_naf)(val)} />
          <div className="sm:col-span-2">
            <Field label="Adresse" field="q_adresse" data={{ ...data, q_adresse: v("q_adresse", `${CAMPUS.adresse} — ${CAMPUS.cp} ${CAMPUS.ville}`) }} onUpdate={(_, val) => up("q_adresse", `${CAMPUS.adresse} — ${CAMPUS.cp} ${CAMPUS.ville}`)(val)} />
          </div>
          <Field label="Téléphone" field="q_telephone" data={{ ...data, q_telephone: v("q_telephone", CAMPUS.telephone) }} onUpdate={(_, val) => up("q_telephone", CAMPUS.telephone)(val)} placeholder="À compléter" />
          <Field label="Email" field="q_email" data={{ ...data, q_email: v("q_email", CAMPUS.email) }} onUpdate={(_, val) => up("q_email", CAMPUS.email)(val)} />
          <Field label="Site internet" field="q_site" data={{ ...data, q_site: v("q_site", CAMPUS.site) }} onUpdate={(_, val) => up("q_site", CAMPUS.site)(val)} />
          <Field label="LinkedIn" field="q_linkedin" data={{ ...data, q_linkedin: v("q_linkedin", CAMPUS.linkedin) }} onUpdate={(_, val) => up("q_linkedin", CAMPUS.linkedin)(val)} />
          <Field label="Groupe / Entité porteuse" field="q_groupe" data={{ ...data, q_groupe: v("q_groupe", CAMPUS.groupe) }} onUpdate={(_, val) => up("q_groupe", CAMPUS.groupe)(val)} />
          <Field label="SIRET Groupe" field="q_groupe_siret" data={{ ...data, q_groupe_siret: v("q_groupe_siret", CAMPUS.groupe_siret) }} onUpdate={(_, val) => up("q_groupe_siret", CAMPUS.groupe_siret)(val)} />
        </div>
      </Section>

      {/* Direction */}
      <Section title="Direction" color="bg-secondary">
        <p className="text-xs font-bold text-secondary uppercase mb-2">Président</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom" field="q_pres_nom" data={{ ...data, q_pres_nom: v("q_pres_nom", CAMPUS.president_nom) }} onUpdate={(_, val) => up("q_pres_nom", CAMPUS.president_nom)(val)} />
          <Field label="Prénom" field="q_pres_prenom" data={{ ...data, q_pres_prenom: v("q_pres_prenom", CAMPUS.president_prenom) }} onUpdate={(_, val) => up("q_pres_prenom", CAMPUS.president_prenom)(val)} />
          <Field label="Date de naissance" field="q_pres_naissance" data={{ ...data, q_pres_naissance: v("q_pres_naissance", CAMPUS.president_naissance) }} onUpdate={(_, val) => up("q_pres_naissance", CAMPUS.president_naissance)(val)} />
          <Field label="Lieu de naissance" field="q_pres_lieu" data={{ ...data, q_pres_lieu: v("q_pres_lieu", CAMPUS.president_lieu) }} onUpdate={(_, val) => up("q_pres_lieu", CAMPUS.president_lieu)(val)} />
          <Field label="Qualité" field="q_pres_qualite" data={{ ...data, q_pres_qualite: v("q_pres_qualite", CAMPUS.president_qualite) }} onUpdate={(_, val) => up("q_pres_qualite", CAMPUS.president_qualite)(val)} />
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4">
          <p className="text-xs font-bold text-secondary uppercase mb-2">Responsable pédagogique</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nom" field="q_dir_nom" data={{ ...data, q_dir_nom: v("q_dir_nom", CAMPUS.directeur_nom) }} onUpdate={(_, val) => up("q_dir_nom", CAMPUS.directeur_nom)(val)} />
            <Field label="Prénom" field="q_dir_prenom" data={{ ...data, q_dir_prenom: v("q_dir_prenom", CAMPUS.directeur_prenom) }} onUpdate={(_, val) => up("q_dir_prenom", CAMPUS.directeur_prenom)(val)} />
            <div className="sm:col-span-2">
              <Field label="Fonction" field="q_dir_fonction" data={{ ...data, q_dir_fonction: v("q_dir_fonction", CAMPUS.directeur_fonction) }} onUpdate={(_, val) => up("q_dir_fonction", CAMPUS.directeur_fonction)(val)} />
            </div>
            <Field label="Email" field="q_dir_email" data={{ ...data, q_dir_email: v("q_dir_email", CAMPUS.directeur_email) }} onUpdate={(_, val) => up("q_dir_email", CAMPUS.directeur_email)(val)} />
          </div>
        </div>
      </Section>

      {/* 1.1 Périmètre */}
      <Section title="1.1 Périmètre de la certification Qualiopi">
        <TextArea label="Types de prestations" field="q_perimetre" data={{ ...data, q_perimetre: v("q_perimetre", "Actions de formation par apprentissage (CFA — contrat d'apprentissage)\nActions de formation professionnelle continue (hors apprentissage — à terme)") }} onUpdate={(_, val) => up("q_perimetre", "")(val)} rows={3} />
      </Section>

      {/* 1.2 Formation dispensée */}
      <Section title="1.2 Formation dispensée" color="bg-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Intitulé de la formation" field="q_formation" data={{ ...data, q_formation: v("q_formation", CAMPUS.formation) }} onUpdate={(_, val) => up("q_formation", CAMPUS.formation)(val)} />
          </div>
          <Field label="Code RNCP" field="q_rncp" data={{ ...data, q_rncp: v("q_rncp", CAMPUS.rncp) }} onUpdate={(_, val) => up("q_rncp", CAMPUS.rncp)(val)} />
          <Field label="Niveau" field="q_niveau" data={{ ...data, q_niveau: v("q_niveau", CAMPUS.niveau) }} onUpdate={(_, val) => up("q_niveau", CAMPUS.niveau)(val)} />
          <div className="sm:col-span-2">
            <Field label="Certificateur" field="q_certificateur" data={{ ...data, q_certificateur: v("q_certificateur", CAMPUS.certificateur) }} onUpdate={(_, val) => up("q_certificateur", CAMPUS.certificateur)(val)} />
          </div>
          <Field label="Date d'enregistrement RNCP" field="q_date_enreg" data={{ ...data, q_date_enreg: v("q_date_enreg", CAMPUS.date_enregistrement) }} onUpdate={(_, val) => up("q_date_enreg", CAMPUS.date_enregistrement)(val)} />
          <Field label="Échéance certification" field="q_date_echeance" data={{ ...data, q_date_echeance: v("q_date_echeance", CAMPUS.date_echeance) }} onUpdate={(_, val) => up("q_date_echeance", CAMPUS.date_echeance)(val)} />
          <Field label="Durée totale (mois)" field="q_duree" data={{ ...data, q_duree: v("q_duree", String(CAMPUS.duree_mois)) }} onUpdate={(_, val) => up("q_duree", String(CAMPUS.duree_mois))(val)} />
          <Field label="Heures CFA" field="q_heures" data={{ ...data, q_heures: v("q_heures", String(CAMPUS.heures_cfa)) }} onUpdate={(_, val) => up("q_heures", String(CAMPUS.heures_cfa))(val)} />
          <div className="sm:col-span-2">
            <Field label="Rythme d'alternance" field="q_rythme" data={{ ...data, q_rythme: v("q_rythme", CAMPUS.rythme) }} onUpdate={(_, val) => up("q_rythme", CAMPUS.rythme)(val)} />
          </div>
          <Field label="Démarrage prévu" field="q_demarrage" data={{ ...data, q_demarrage: v("q_demarrage", CAMPUS.demarrage) }} onUpdate={(_, val) => up("q_demarrage", CAMPUS.demarrage)(val)} />
          <Field label="Fin prévue" field="q_fin" data={{ ...data, q_fin: v("q_fin", CAMPUS.fin) }} onUpdate={(_, val) => up("q_fin", CAMPUS.fin)(val)} />
        </div>
      </Section>

      {/* Blocs de compétences */}
      <Section title="Blocs de compétences RNCP" color="bg-primary">
        {CAMPUS.blocs.map((bloc, i) => (
          <div key={bloc.code} className="bg-primary-light/30 rounded-lg p-4 mb-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Code bloc" field={`q_bloc_${i}_code`} data={{ ...data, [`q_bloc_${i}_code`]: v(`q_bloc_${i}_code`, bloc.code) }} onUpdate={(_, val) => up(`q_bloc_${i}_code`, bloc.code)(val)} />
              <Field label="Code RNCP" field={`q_bloc_${i}_rncp`} data={{ ...data, [`q_bloc_${i}_rncp`]: v(`q_bloc_${i}_rncp`, bloc.rncp) }} onUpdate={(_, val) => up(`q_bloc_${i}_rncp`, bloc.rncp)(val)} />
              <Field label="Heures" field={`q_bloc_${i}_heures`} data={{ ...data, [`q_bloc_${i}_heures`]: v(`q_bloc_${i}_heures`, String(bloc.heures)) }} onUpdate={(_, val) => up(`q_bloc_${i}_heures`, String(bloc.heures))(val)} />
            </div>
            <div className="mt-2">
              <TextArea label="Intitulé du bloc" field={`q_bloc_${i}_titre`} data={{ ...data, [`q_bloc_${i}_titre`]: v(`q_bloc_${i}_titre`, bloc.titre) }} onUpdate={(_, val) => up(`q_bloc_${i}_titre`, bloc.titre)(val)} rows={2} />
            </div>
          </div>
        ))}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <Field label="Modules transversaux" field="q_modules_transv" data={{ ...data, q_modules_transv: v("q_modules_transv", CAMPUS.modules_transversaux) }} onUpdate={(_, val) => up("q_modules_transv", CAMPUS.modules_transversaux)(val)} />
          <Field label="Heures modules transversaux" field="q_modules_transv_h" data={{ ...data, q_modules_transv_h: v("q_modules_transv_h", String(CAMPUS.modules_transversaux_heures)) }} onUpdate={(_, val) => up("q_modules_transv_h", String(CAMPUS.modules_transversaux_heures))(val)} />
        </div>
      </Section>

      {/* 4. Calendrier */}
      <Section title="4. Calendrier de préparation à l'audit">
        <TextArea label="Planning des actions" field="q_calendrier" data={{ ...data, q_calendrier: v("q_calendrier",
          "Mars 2026 : Finalisation immatriculation SAS — Obtention SIRET — Dépôt NDA DREETS\n" +
          "Avril 2026 : Ouverture site internet — Mise en ligne LinkedIn — Publication offres\n" +
          "Avril — Mai 2026 : Recrutement formateurs — Constitution dossiers formateurs\n" +
          "Mai 2026 : Démarrage première promotion TP AMIS\n" +
          "Juin — Juillet 2026 : Sélection organisme certificateur COFRAC\n" +
          "Juillet — Août 2026 : Audit interne — Simulation d'audit\n" +
          "Septembre — Octobre 2026 : Audit initial Qualiopi — Cible certificat"
        ) }} onUpdate={(_, val) => up("q_calendrier", "")(val)} rows={8} />
      </Section>

      {/* 5. Organismes certificateurs */}
      <Section title="5. Organismes certificateurs Qualiopi (COFRAC)">
        <TextArea label="Liste des organismes contactés" field="q_certificateurs" data={{ ...data, q_certificateurs: v("q_certificateurs",
          "AFNOR Certification — www.afnor.org — Nationale\n" +
          "Bureau Veritas — www.bureauveritas.fr — Hauts-de-France\n" +
          "SGS France — www.sgs.com — Régionale\n" +
          "ICPF — www.icpf.eu — Spécialisé formation pro\n" +
          "LNE — www.lne.fr — Accrédité COFRAC"
        ) }} onUpdate={(_, val) => up("q_certificateurs", "")(val)} rows={6} />
        <Field label="Budget prévisionnel" field="q_budget_audit" data={{ ...data, q_budget_audit: v("q_budget_audit", "1 500 à 3 500 € HT") }} onUpdate={(_, val) => up("q_budget_audit", "1 500 à 3 500 € HT")(val)} />
      </Section>

      {/* DREETS */}
      <Section title="Informations DREETS" color="bg-secondary">
        <Field label="Adresse DREETS" field="q_dreets" data={{ ...data, q_dreets: v("q_dreets", CAMPUS.dreets) }} onUpdate={(_, val) => up("q_dreets", CAMPUS.dreets)(val)} />
      </Section>
    </div>
  );
}
