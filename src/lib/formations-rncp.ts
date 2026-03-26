// Base de données des titres professionnels RNCP
// Sources : France Compétences (francecompetences.fr)

export interface BlocCompetence {
  code: string;      // Ex: "BC01"
  rncp: string;      // Ex: "RNCP37722BC01"
  titre: string;
  heures?: number;   // Volume horaire CFA indicatif
}

export interface FormationRNCP {
  acronyme: string;          // AMIS, AMUM, EPR, etc.
  titre: string;             // Intitulé officiel complet
  rncp: string;              // Code RNCP (ex: "RNCP 37722")
  rncp_num: string;          // Numéro seul (ex: "37722")
  niveau: string;            // Niveau 3, 4, 5...
  certificateur: string;
  date_enregistrement: string;
  date_echeance: string;
  blocs: BlocCompetence[];
  duree_indicative: string;  // "12 mois"
  heures_indicatives: string; // "441h"
}

export const FORMATIONS_RNCP: FormationRNCP[] = [
  // ============ AMIS ============
  {
    acronyme: "AMIS",
    titre: "Agent de Médiation, Information, Services",
    rncp: "RNCP 37722",
    rncp_num: "37722",
    niveau: "Niveau 3 (CAP/BEP)",
    certificateur: "Ministère du Travail, du Plein Emploi et de l'Insertion",
    date_enregistrement: "17/07/2023",
    date_echeance: "02/07/2028",
    duree_indicative: "12 mois",
    heures_indicatives: "441h",
    blocs: [
      {
        code: "BC01", rncp: "RNCP37722BC01",
        titre: "Participer au maintien du lien social et prévenir les situations de conflit ou de dysfonctionnement par une présence active",
        heures: 160,
      },
      {
        code: "BC02", rncp: "RNCP37722BC02",
        titre: "Réguler par la médiation des situations de tension et de conflit",
        heures: 175,
      },
      {
        code: "BC03", rncp: "RNCP37722BC03",
        titre: "Participer à des actions d'animation ponctuelles ou à des projets partenariaux",
        heures: 56,
      },
    ],
  },

  // ============ AMUM ============
  {
    acronyme: "AMUM",
    titre: "Assistant Manager d'Unité Marchande",
    rncp: "RNCP 35233",
    rncp_num: "35233",
    niveau: "Niveau 4 (Bac)",
    certificateur: "Ministère du Travail, du Plein Emploi et de l'Insertion",
    date_enregistrement: "10/02/2021",
    date_echeance: "10/02/2027",
    duree_indicative: "12 mois",
    heures_indicatives: "600h",
    blocs: [
      {
        code: "BC01", rncp: "RNCP35233BC01",
        titre: "Développer l'efficacité commerciale d'une unité marchande dans un environnement omnicanal",
        heures: 300,
      },
      {
        code: "BC02", rncp: "RNCP35233BC02",
        titre: "Animer l'équipe d'une unité marchande",
        heures: 300,
      },
    ],
  },

  // ============ EPR ============
  {
    acronyme: "EPR",
    titre: "Employé Polyvalent en Restauration",
    rncp: "RNCP 38663",
    rncp_num: "38663",
    niveau: "Niveau 3 (CAP/BEP)",
    certificateur: "Ministère du Travail, du Plein Emploi et de l'Insertion",
    date_enregistrement: "22/02/2024",
    date_echeance: "04/06/2029",
    duree_indicative: "12 mois",
    heures_indicatives: "490h",
    blocs: [
      {
        code: "BC01", rncp: "RNCP38663BC01",
        titre: "Préparer et dresser des entrées et des desserts",
        heures: 120,
      },
      {
        code: "BC02", rncp: "RNCP38663BC02",
        titre: "Préparer et dresser des plats chauds et des produits snacking",
        heures: 140,
      },
      {
        code: "BC03", rncp: "RNCP38663BC03",
        titre: "Accueillir, conseiller et servir la clientèle",
        heures: 120,
      },
      {
        code: "BC04", rncp: "RNCP38663BC04",
        titre: "Réaliser la plonge et le nettoyage des locaux et des matériels",
        heures: 110,
      },
    ],
  },

  // ============ RPMS ============
  {
    acronyme: "RPMS",
    titre: "Responsable de Petite et Moyenne Structure",
    rncp: "RNCP 38575",
    rncp_num: "38575",
    niveau: "Niveau 5 (Bac+2 / BTS / DUT)",
    certificateur: "Ministère du Travail, du Plein Emploi et de l'Insertion",
    date_enregistrement: "20/12/2023",
    date_echeance: "20/12/2028",
    duree_indicative: "18 mois",
    heures_indicatives: "900h",
    blocs: [
      {
        code: "BC01", rncp: "RNCP38575BC01",
        titre: "Animer une équipe",
        heures: 300,
      },
      {
        code: "BC02", rncp: "RNCP38575BC02",
        titre: "Piloter les opérations commerciales et la production de biens et/ou services",
        heures: 300,
      },
      {
        code: "BC03", rncp: "RNCP38575BC03",
        titre: "Gérer les ressources financières",
        heures: 300,
      },
    ],
  },

  // ============ CADGA ============
  {
    acronyme: "CADGA",
    titre: "Chargé d'Accueil et de Gestion Administrative",
    rncp: "RNCP 41239",
    rncp_num: "41239",
    niveau: "Niveau 4 (Bac)",
    certificateur: "Ministère du Travail, du Plein Emploi et de l'Insertion",
    date_enregistrement: "20/06/2025",
    date_echeance: "20/06/2030",
    duree_indicative: "12 mois",
    heures_indicatives: "600h",
    blocs: [
      {
        code: "BC01", rncp: "RNCP41239BC01",
        titre: "Assurer les activités d'accueil d'une structure",
        heures: 300,
      },
      {
        code: "BC02", rncp: "RNCP41239BC02",
        titre: "Gérer les activités administratives d'une structure",
        heures: 300,
      },
    ],
  },

  // ============ CC ============
  {
    acronyme: "CC",
    titre: "Conseiller Commercial",
    rncp: "RNCP 37717",
    rncp_num: "37717",
    niveau: "Niveau 4 (Bac)",
    certificateur: "Ministère du Travail, du Plein Emploi et de l'Insertion",
    date_enregistrement: "31/07/2023",
    date_echeance: "31/07/2028",
    duree_indicative: "12 mois",
    heures_indicatives: "600h",
    blocs: [
      {
        code: "BC01", rncp: "RNCP37717BC01",
        titre: "Prospecter un secteur de vente",
        heures: 300,
      },
      {
        code: "BC02", rncp: "RNCP37717BC02",
        titre: "Accompagner le client et lui proposer des produits et des services",
        heures: 300,
      },
    ],
  },

  // ============ CV ============
  {
    acronyme: "CV",
    titre: "Conseiller de Vente",
    rncp: "RNCP 37098",
    rncp_num: "37098",
    niveau: "Niveau 4 (Bac)",
    certificateur: "Ministère du Travail, du Plein Emploi et de l'Insertion",
    date_enregistrement: "25/01/2023",
    date_echeance: "25/01/2028",
    duree_indicative: "12 mois",
    heures_indicatives: "600h",
    blocs: [
      {
        code: "BC01", rncp: "RNCP37098BC01",
        titre: "Contribuer à l'efficacité commerciale d'une unité marchande dans un environnement omnicanal",
        heures: 300,
      },
      {
        code: "BC02", rncp: "RNCP37098BC02",
        titre: "Améliorer l'expérience client dans un environnement omnicanal",
        heures: 300,
      },
    ],
  },

  // ============ FPA ============
  {
    acronyme: "FPA",
    titre: "Formateur Professionnel d'Adultes",
    rncp: "RNCP 37275",
    rncp_num: "37275",
    niveau: "Niveau 5 (Bac+2 / BTS / DUT)",
    certificateur: "Ministère du Travail, du Plein Emploi et de l'Insertion",
    date_enregistrement: "29/04/2023",
    date_echeance: "29/04/2028",
    duree_indicative: "12 mois",
    heures_indicatives: "800h",
    blocs: [
      {
        code: "BC01", rncp: "RNCP37275BC01",
        titre: "Concevoir et préparer la formation",
        heures: 200,
      },
      {
        code: "BC02", rncp: "RNCP37275BC02",
        titre: "Animer une formation et évaluer les acquis des apprenants",
        heures: 200,
      },
      {
        code: "BC03", rncp: "RNCP37275BC03",
        titre: "Accompagner les apprenants en formation",
        heures: 200,
      },
      {
        code: "BC04", rncp: "RNCP37275BC04",
        titre: "Inscrire sa pratique professionnelle dans une démarche de qualité et de responsabilité sociale des entreprises",
        heures: 200,
      },
    ],
  },
];

// Helpers
export function getFormationByAcronyme(acronyme: string): FormationRNCP | undefined {
  return FORMATIONS_RNCP.find((f) => f.acronyme === acronyme);
}

export function getFormationOptions(): string[] {
  return FORMATIONS_RNCP.map((f) => `TP ${f.acronyme} — ${f.titre}`);
}

export function getFormationFromOption(option: string): FormationRNCP | undefined {
  const acronyme = option.match(/^TP (\w+)/)?.[1];
  return acronyme ? getFormationByAcronyme(acronyme) : undefined;
}
