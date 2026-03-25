export interface Organisme {
  id: string;
  nom: string;
  siret: string | null;
  adresse: string | null;
  code_postal: string | null;
  ville: string | null;
  telephone: string | null;
  email: string | null;
  responsable_nom: string | null;
  responsable_prenom: string | null;
  responsable_qualite: string | null;
  nda_numero: string | null;
  nda_statut: 'non_demande' | 'en_preparation' | 'envoye' | 'recepisse_recu' | 'obtenu';
  created_at: string;
  updated_at: string;
}

export interface Indicateur {
  id: number;
  critere: number;
  numero: number;
  code: string;
  titre: string;
  description: string;
  niveau_attendu: string;
  exemples_preuves: string;
  applicable_cfa: boolean;
}

export interface IndicateurSuivi {
  id: string;
  organisme_id: string;
  indicateur_id: number;
  statut: 'conforme' | 'non_conforme' | 'en_cours' | 'na' | 'non_evalue';
  notes: string | null;
  plan_action: string | null;
  responsable: string | null;
  date_echeance: string | null;
  updated_at: string;
  updated_by: string | null;
}

export interface Document {
  id: string;
  organisme_id: string;
  indicateur_id: number | null;
  nom: string;
  description: string | null;
  categorie: 'preuve' | 'modele' | 'procedure' | 'autre';
  storage_path: string;
  taille: number | null;
  mime_type: string | null;
  date_validite: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface NdaDossier {
  id: string;
  organisme_id: string;
  denomination: string | null;
  forme_juridique: string | null;
  siret: string | null;
  adresse_siege: string | null;
  code_postal: string | null;
  ville: string | null;
  telephone: string | null;
  email: string | null;
  representant_nom: string | null;
  representant_qualite: string | null;
  objet_activite: string | null;
  domaines_formation: string[] | null;
  public_vise: string[] | null;
  premiere_convention_date: string | null;
  premiere_convention_intitule: string | null;
  premiere_convention_duree: string | null;
  premiere_convention_effectif: number | null;
  statut: 'brouillon' | 'pret' | 'envoye' | 'recepisse' | 'obtenu';
  date_envoi: string | null;
  date_recepisse: string | null;
  numero_recepisse: string | null;
  date_obtention: string | null;
  nda_numero: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type StatutIndicateur = IndicateurSuivi['statut'];

export const STATUT_LABELS: Record<StatutIndicateur, string> = {
  conforme: 'Conforme',
  non_conforme: 'Non conforme',
  en_cours: 'En cours',
  na: 'Non applicable',
  non_evalue: 'Non évalué',
};

export const STATUT_COLORS: Record<StatutIndicateur, string> = {
  conforme: 'bg-green text-white',
  non_conforme: 'bg-red text-white',
  en_cours: 'bg-orange text-white',
  na: 'bg-gray-400 text-white',
  non_evalue: 'bg-light-gray text-gray-text',
};

export const CRITERE_TITLES: Record<number, string> = {
  1: "Conditions d'information du public",
  2: "Identification précise des objectifs",
  3: "Adaptation des prestations",
  4: "Adéquation des moyens pédagogiques",
  5: "Qualification et développement des connaissances",
  6: "Inscription dans l'environnement professionnel",
  7: "Recueil et prise en compte des appréciations",
};

export const CRITERE_DESCRIPTIONS: Record<number, string> = {
  1: "L'information sur les prestations, les résultats obtenus et les tarifs est diffusée.",
  2: "Les objectifs des prestations sont définis et adaptés au public bénéficiaire.",
  3: "Les prestations et les accompagnements sont adaptés aux publics bénéficiaires.",
  4: "Les moyens pédagogiques, techniques et d'encadrement sont adaptés.",
  5: "Les personnels sont qualifiés et développent leurs compétences.",
  6: "L'organisme s'inscrit dans son environnement professionnel.",
  7: "Les appréciations et réclamations des parties prenantes sont recueillies et traitées.",
};

export const CRITERE_INDICATEURS: Record<number, number[]> = {
  1: [1, 2, 3],
  2: [4, 5, 6, 7],
  3: [8, 9, 10, 11, 12, 13],
  4: [14, 15, 16, 17, 18],
  5: [19, 20, 21, 22],
  6: [23, 24, 25, 26, 27],
  7: [28, 29, 30, 31, 32],
};
