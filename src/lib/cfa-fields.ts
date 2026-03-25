// Tous les champs nécessaires pour un CFA complet
// Basé sur les documents Campus Excellence

export interface CfaData {
  // === ÉTAPE 1 : ORGANISME ===
  raison_sociale: string;
  forme_juridique: string; // SAS, SARL, Association...
  siret: string;
  code_naf: string;
  adresse: string;
  code_postal: string;
  ville: string;
  telephone: string;
  email: string;
  site_internet: string;
  linkedin: string;
  groupe_nom: string; // Groupe porteur (ex: APEN)
  groupe_siret: string;
  date_creation: string;
  date_demarrage_activite: string; // Date prévue de démarrage

  // === ÉTAPE 2 : DIRECTION ===
  president_nom: string;
  president_prenom: string;
  president_date_naissance: string;
  president_lieu_naissance: string;
  president_adresse: string;
  president_qualite: string; // Président, Gérant...

  responsable_peda_nom: string;
  responsable_peda_prenom: string;
  responsable_peda_fonction: string;
  responsable_peda_email: string;
  responsable_peda_telephone: string;

  referent_handicap_nom: string;
  referent_handicap_email: string;
  referent_handicap_telephone: string;

  // === ÉTAPE 3 : FORMATION ===
  formation_intitule: string; // Ex: Titre Professionnel AMIS
  formation_rncp: string; // Ex: RNCP 37722
  formation_niveau: string; // Niveau 3, 4, 5...
  formation_certificateur: string;
  formation_date_enregistrement: string;
  formation_date_echeance: string;
  formation_duree_mois: number;
  formation_volume_heures_cfa: number;
  formation_rythme: string; // Ex: 1 jour/semaine CFA - 4 jours entreprise
  formation_type: string; // Apprentissage, Formation continue...
  formation_financement: string; // Contrat d'apprentissage, OPCO...
  formation_prerequis: string;

  // Blocs de compétences (dynamique)
  blocs_competences: BlocCompetence[];

  // Modules transversaux
  modules_transversaux: string;
  modules_transversaux_heures: number;

  // === ÉTAPE 4 : LOCAUX & MOYENS ===
  locaux_adresse: string;
  locaux_conformite_erp: boolean;
  locaux_accessibilite_pmr: boolean;
  salles: Salle[];
  equipements: Equipement[];

  // Moyens pédagogiques texte libre
  moyens_pedagogiques: string;

  // === ÉTAPE 5 : FORMATEURS ===
  formateurs: Formateur[];

  // === ÉTAPE 6 : PARTENAIRES ===
  partenaires: Partenaire[];

  // Contacts handicap
  contacts_handicap: ContactHandicap[];

  // === ÉTAPE 7 : NDA ===
  nda_objet_activite: string;
  nda_domaines_formation: string[];
  nda_public_vise: string[];
  nda_premiere_convention_date: string;
  nda_premiere_convention_intitule: string;
  nda_premiere_convention_duree: string;
  nda_premiere_convention_effectif: number;
  nda_statut: string;

  // === ÉTAPE 8 : QUALIOPI ===
  qualiopi_cible_audit: string;
  qualiopi_organisme_certificateur: string;
  qualiopi_budget_previsionnel: string;
}

export interface BlocCompetence {
  code: string; // BC01, BC02...
  code_rncp: string; // RNCP37722BC01
  intitule: string;
  volume_heures: number;
  competences: CompetenceDetail[];
}

export interface CompetenceDetail {
  code: string; // C1, C2...
  intitule: string;
}

export interface Salle {
  nom: string;
  surface: string;
  capacite: number;
  usage: string;
}

export interface Equipement {
  categorie: string;
  description: string;
  quantite: number;
  etat: string;
}

export interface Formateur {
  nom: string;
  prenom: string;
  qualification: string;
  experience: string;
  specialite: string;
  statut: 'salarie' | 'externe' | 'vacataire';
  blocs_enseignes: string[]; // BC01, BC02...
  competences_enseignees: string[]; // C1, C2...
}

export interface Partenaire {
  nom: string;
  type: string; // Entreprise, Association, Institution...
  contact: string;
  convention: boolean;
  description: string;
}

export interface ContactHandicap {
  organisme: string;
  interlocuteur: string;
  telephone: string;
  email: string;
  mission: string;
}

// Valeurs par défaut pour un nouveau CFA
export function getDefaultCfaData(): CfaData {
  return {
    raison_sociale: "",
    forme_juridique: "",
    siret: "",
    code_naf: "8559A",
    adresse: "",
    code_postal: "",
    ville: "",
    telephone: "",
    email: "",
    site_internet: "",
    linkedin: "",
    groupe_nom: "",
    groupe_siret: "",
    date_creation: "",
    date_demarrage_activite: "",

    president_nom: "",
    president_prenom: "",
    president_date_naissance: "",
    president_lieu_naissance: "",
    president_adresse: "",
    president_qualite: "Président",

    responsable_peda_nom: "",
    responsable_peda_prenom: "",
    responsable_peda_fonction: "Responsable pédagogique",
    responsable_peda_email: "",
    responsable_peda_telephone: "",

    referent_handicap_nom: "",
    referent_handicap_email: "",
    referent_handicap_telephone: "",

    formation_intitule: "",
    formation_rncp: "",
    formation_niveau: "",
    formation_certificateur: "",
    formation_date_enregistrement: "",
    formation_date_echeance: "",
    formation_duree_mois: 12,
    formation_volume_heures_cfa: 0,
    formation_rythme: "",
    formation_type: "Apprentissage",
    formation_financement: "Contrat d'apprentissage — Prise en charge OPCO",
    formation_prerequis: "",

    blocs_competences: [],
    modules_transversaux: "",
    modules_transversaux_heures: 0,

    locaux_adresse: "",
    locaux_conformite_erp: false,
    locaux_accessibilite_pmr: false,
    salles: [],
    equipements: [],
    moyens_pedagogiques: "",

    formateurs: [],
    partenaires: [],
    contacts_handicap: [],

    nda_objet_activite: "",
    nda_domaines_formation: [],
    nda_public_vise: [],
    nda_premiere_convention_date: "",
    nda_premiere_convention_intitule: "",
    nda_premiere_convention_duree: "",
    nda_premiere_convention_effectif: 0,
    nda_statut: "brouillon",

    qualiopi_cible_audit: "",
    qualiopi_organisme_certificateur: "",
    qualiopi_budget_previsionnel: "",
  };
}

// Étapes du formulaire
export const CFA_STEPS = [
  { id: "organisme", title: "Organisme", icon: "🏢", description: "Raison sociale, SIRET, adresse, contacts" },
  { id: "direction", title: "Direction", icon: "👤", description: "Président, responsable pédagogique, référent handicap" },
  { id: "formation", title: "Formation", icon: "🎓", description: "Titre RNCP, blocs de compétences, durée, rythme" },
  { id: "locaux", title: "Locaux & Moyens", icon: "🏫", description: "Salles, équipements, conformité ERP" },
  { id: "formateurs", title: "Formateurs", icon: "👨‍🏫", description: "Équipe pédagogique, qualifications" },
  { id: "partenaires", title: "Partenaires", icon: "🤝", description: "Entreprises, associations, contacts handicap" },
  { id: "nda", title: "NDA", icon: "📋", description: "Déclaration d'activité, publics visés, convention" },
  { id: "qualiopi", title: "Qualiopi", icon: "✅", description: "Cible audit, certificateur, budget" },
];

// Options prédéfinies
export const FORMES_JURIDIQUES = ["SAS", "SARL", "EURL", "SCI", "Association loi 1901", "Auto-entrepreneur", "SA", "SCOP"];
export const NIVEAUX_FORMATION = ["Niveau 3 (CAP/BEP)", "Niveau 4 (Bac)", "Niveau 5 (Bac+2)", "Niveau 6 (Licence/Bac+3)", "Niveau 7 (Master/Bac+5)"];
export const TYPES_FORMATION = ["Apprentissage", "Formation continue", "VAE", "Bilan de compétences"];
export const PUBLICS_VISES = [
  "Demandeurs d'emploi",
  "Jeunes en contrat d'apprentissage",
  "Salariés en reconversion",
  "Salariés en montée de compétences",
  "Travailleurs non salariés",
  "Tout public",
];
export const DOMAINES_FORMATION = [
  "Agriculture, pêche, forêt et espaces verts",
  "Arts, artisanat, commerce et services",
  "Bâtiment, travaux publics, architecture",
  "Communication, médias, multimédia",
  "Comptabilité, gestion, finances",
  "Droit, sciences politiques",
  "Enseignement, formation",
  "Hôtellerie, restauration, tourisme",
  "Industrie, matériaux, énergie",
  "Informatique, télécommunications",
  "Langues vivantes, civilisations",
  "Ressources humaines, management",
  "Santé, action sociale",
  "Sciences humaines et sociales",
  "Sécurité, prévention, médiation",
  "Sport, animation, loisirs",
  "Transport, logistique",
];
export const STATUTS_FORMATEUR = [
  { value: "salarie", label: "Salarié" },
  { value: "externe", label: "Intervenant externe" },
  { value: "vacataire", label: "Vacataire" },
];
