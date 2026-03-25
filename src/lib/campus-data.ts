// Données pré-remplies Campus Excellence
// Ces valeurs sont partagées entre tous les documents

export const CAMPUS = {
  // Organisme
  nom: "CAMPUS EXCELLENCE",
  forme: "Société par Actions Simplifiée (SAS)",
  siret: "", // En cours d'attribution
  code_naf: "8559A",
  adresse: "102 Rue de Lannoy",
  cp: "59650",
  ville: "Villeneuve d'Ascq",
  telephone: "",
  email: "contact@campus-excellence.fr",
  site: "www.campus-excellence.fr",
  linkedin: "linkedin.com/company/campus-excellence",
  groupe: "A.P.E.N — Accompagnement Protection Évènement Nord",
  groupe_siret: "421 850 066 00042",

  // Direction
  president_nom: "BEN KHELIL",
  president_prenom: "Yusri",
  president_naissance: "02/08/1996",
  president_lieu: "Lille (59)",
  president_adresse: "18 Rue Molière — 59100 Roubaix",
  president_qualite: "Président",

  directeur_nom: "LADJ",
  directeur_prenom: "Yanis",
  directeur_fonction: "Responsable pédagogique — Directeur du Centre de Formation",
  directeur_email: "yanis.ladj@campus-excellence.fr",

  // Formation
  formation: "Titre Professionnel Agent de Médiation, Information et Services (AMIS)",
  formation_court: "TP AMIS",
  rncp: "RNCP 37722",
  niveau: "Niveau 3 (CAP/BEP)",
  certificateur: "Ministère du Travail, du Plein Emploi et de l'Insertion",
  date_enregistrement: "17/07/2023",
  date_echeance: "02/07/2028",
  duree_mois: 12,
  heures_cfa: 441,
  rythme: "1 jour/semaine au CFA — 4 jours/semaine en entreprise",
  demarrage: "Mai 2026",
  fin: "Mai 2027",

  // Blocs
  blocs: [
    {
      code: "BC01",
      rncp: "RNCP37722BC01",
      titre: "Participer au maintien du lien social et prévenir les situations de conflit ou de dysfonctionnement par une présence active",
      heures: 160,
      competences: [
        { code: "C1", titre: "Détecter les signes révélateurs de dysfonctionnements" },
        { code: "C2", titre: "Discerner les signes révélateurs de besoins, d'attentes ou de détresse" },
        { code: "C3", titre: "Aller à la rencontre des personnes et instaurer un dialogue" },
        { code: "C4", titre: "Informer, orienter les personnes et apporter une aide ponctuelle" },
        { code: "C5", titre: "Transmettre les observations (veille sociale et technique)" },
      ],
    },
    {
      code: "BC02",
      rncp: "RNCP37722BC02",
      titre: "Réguler par la médiation des situations de tension et de conflit",
      heures: 175,
      competences: [
        { code: "C6", titre: "Sensibiliser au respect des règles" },
        { code: "C7", titre: "Apaiser les situations de conflit en temps réel" },
        { code: "C8", titre: "Veiller à la sécurité — gestes d'urgence (SST obligatoire)" },
        { code: "C9", titre: "Analyser des situations vécues et rendre compte" },
      ],
    },
    {
      code: "BC03",
      rncp: "RNCP37722BC03",
      titre: "Participer à des actions d'animation ponctuelles ou à des projets partenariaux",
      heures: 56,
      competences: [
        { code: "C10", titre: "S'inscrire dans un travail collaboratif pour mener un projet" },
        { code: "C11", titre: "Préparer, animer et évaluer une action d'information ou de médiation" },
        { code: "C12", titre: "Faciliter et accompagner des projets d'habitants" },
      ],
    },
  ],
  modules_transversaux: "Numérique, insertion professionnelle, préparation examen",
  modules_transversaux_heures: 50,

  // DREETS
  dreets: "DREETS Hauts-de-France — Unité Territoriale du Nord — 70 rue Saint-Sauveur — 59000 Lille",
};
