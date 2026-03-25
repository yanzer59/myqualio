// Liste des 27 documents MyQualio — Campus Excellence TP AMIS RNCP 37722

export interface DocSection {
  id: string;
  num: string;       // "01" à "24" + "NDA" + "QUA" + "PLA"
  title: string;
  shortTitle: string;
  critere: string;    // Critère Qualiopi associé
  group: "formation" | "qualite" | "dossier";
}

export const DOCUMENTS: DocSection[] = [
  // Groupe: Documents de formation
  { id: "livret-accueil", num: "01", title: "Livret d'Accueil", shortTitle: "Livret Accueil", critere: "C1/C2", group: "formation" },
  { id: "convocation", num: "02", title: "Convocation", shortTitle: "Convocation", critere: "C2", group: "formation" },
  { id: "emargement", num: "03", title: "Feuille d'Émargement", shortTitle: "Émargement", critere: "C3/C4", group: "formation" },
  { id: "missions-entreprise", num: "04", title: "Référentiel Missions Entreprise", shortTitle: "Missions Entreprise", critere: "C2/C3/C6", group: "formation" },
  { id: "evaluation-ecf", num: "05", title: "Grille d'Évaluation ECF", shortTitle: "Évaluation ECF", critere: "C3/C4", group: "formation" },
  { id: "attestation-fin", num: "06", title: "Attestation de Fin de Formation", shortTitle: "Attestation Fin", critere: "C1", group: "formation" },
  { id: "accompagnement", num: "07", title: "Accompagnement Socio-Professionnel", shortTitle: "Accompagnement", critere: "C2/C3", group: "formation" },
  { id: "dossier-candidature", num: "21", title: "Dossier de Candidature", shortTitle: "Candidature", critere: "C2", group: "formation" },
  { id: "test-positionnement", num: "22", title: "Test de Positionnement", shortTitle: "Positionnement", critere: "C2/C3", group: "formation" },
  { id: "deroule-pedagogique", num: "23", title: "Déroulé Pédagogique Détaillé", shortTitle: "Déroulé Péda.", critere: "C2/C4", group: "formation" },
  { id: "livret-apprentissage", num: "24", title: "Livret d'Apprentissage", shortTitle: "Livret Apprentissage", critere: "C3", group: "formation" },

  // Groupe: Qualité & Moyens
  { id: "moyens-materiels", num: "08", title: "Descriptif Moyens Matériels", shortTitle: "Moyens Matériels", critere: "C4", group: "qualite" },
  { id: "checklist-salle", num: "09", title: "Checklist Conformité Salle", shortTitle: "Conformité Salle", critere: "C4", group: "qualite" },
  { id: "conseil-perfectionnement", num: "10", title: "Conseil de Perfectionnement", shortTitle: "Conseil Perf.", critere: "C4/C7", group: "qualite" },
  { id: "dossier-formateur", num: "11", title: "Dossier Formateur", shortTitle: "Dossier Formateur", critere: "C4/C5", group: "qualite" },
  { id: "plan-competences", num: "12", title: "Plan Développement Compétences", shortTitle: "Plan Compétences", critere: "C5", group: "qualite" },
  { id: "registre-veille", num: "13", title: "Registre de Veille", shortTitle: "Registre Veille", critere: "C6", group: "qualite" },
  { id: "contacts-handicap", num: "14", title: "Contacts Handicap", shortTitle: "Handicap", critere: "C1/C2/C4", group: "qualite" },
  { id: "partenaires", num: "15", title: "Liste des Partenaires", shortTitle: "Partenaires", critere: "C6", group: "qualite" },
  { id: "satisfaction-chaud", num: "16", title: "Questionnaire Satisfaction Chaud — Apprenant", shortTitle: "Satisfaction Chaud", critere: "C7", group: "qualite" },
  { id: "satisfaction-froid-entreprise", num: "17", title: "Questionnaire Satisfaction Froid — Entreprise", shortTitle: "Satisfaction Entreprise", critere: "C7", group: "qualite" },
  { id: "satisfaction-formateur", num: "18", title: "Questionnaire Satisfaction Froid — Formateur", shortTitle: "Satisfaction Formateur", critere: "C7", group: "qualite" },
  { id: "registre-dysfonctionnements", num: "19", title: "Registre des Dysfonctionnements", shortTitle: "Dysfonctionnements", critere: "C7", group: "qualite" },
  { id: "revue-direction", num: "20", title: "Revue de Direction", shortTitle: "Revue Direction", critere: "C7", group: "qualite" },

  // Groupe: Dossiers principaux
  { id: "dossier-nda", num: "NDA", title: "Dossier NDA — Déclaration d'Activité", shortTitle: "Dossier NDA", critere: "NDA", group: "dossier" },
  { id: "dossier-qualiopi", num: "QUA", title: "Dossier Qualiopi Complet", shortTitle: "Dossier Qualiopi", critere: "C1-C7", group: "dossier" },
  { id: "plaquette", num: "PLA", title: "Plaquette Formation AMIS", shortTitle: "Plaquette AMIS", critere: "C1", group: "dossier" },
];
