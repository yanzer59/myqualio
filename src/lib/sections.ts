export interface Section {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  group: 'qualiopi' | 'nda' | 'outils';
}

export const sections: Section[] = [
  // Qualiopi
  { id: "qualiopi", title: "Dashboard Qualiopi", shortTitle: "Dashboard", icon: "📊", group: "qualiopi" },
  { id: "qualiopi/critere/1", title: "Critère 1 - Information du public", shortTitle: "C1 - Information", icon: "1", group: "qualiopi" },
  { id: "qualiopi/critere/2", title: "Critère 2 - Objectifs", shortTitle: "C2 - Objectifs", icon: "2", group: "qualiopi" },
  { id: "qualiopi/critere/3", title: "Critère 3 - Adaptation", shortTitle: "C3 - Adaptation", icon: "3", group: "qualiopi" },
  { id: "qualiopi/critere/4", title: "Critère 4 - Moyens", shortTitle: "C4 - Moyens", icon: "4", group: "qualiopi" },
  { id: "qualiopi/critere/5", title: "Critère 5 - Qualification", shortTitle: "C5 - Qualification", icon: "5", group: "qualiopi" },
  { id: "qualiopi/critere/6", title: "Critère 6 - Environnement", shortTitle: "C6 - Environnement", icon: "6", group: "qualiopi" },
  { id: "qualiopi/critere/7", title: "Critère 7 - Appréciations", shortTitle: "C7 - Appréciations", icon: "7", group: "qualiopi" },
  { id: "documents", title: "Gestion documentaire", shortTitle: "Documents", icon: "📁", group: "qualiopi" },
  { id: "rapports", title: "Rapports", shortTitle: "Rapports", icon: "📄", group: "qualiopi" },
  // NDA
  { id: "nda", title: "Déclaration d'activité", shortTitle: "NDA - Accueil", icon: "📋", group: "nda" },
  { id: "nda/formulaire", title: "Formulaire NDA", shortTitle: "Formulaire Cerfa", icon: "📝", group: "nda" },
  { id: "nda/suivi", title: "Suivi du dossier", shortTitle: "Suivi dossier", icon: "📌", group: "nda" },
  // Outils
  { id: "parametres", title: "Paramètres", shortTitle: "Paramètres", icon: "⚙", group: "outils" },
];
