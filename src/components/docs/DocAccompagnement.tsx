"use client";
import { Section, TextArea, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

const ATELIERS = [
  { id: "cv", titre: "Atelier CV et lettre de motivation", desc: "Rédaction CV professionnel, lettre de motivation, simulation entretien" },
  { id: "emploi", titre: "Atelier recherche d'emploi", desc: "Outils numériques, France Travail, LinkedIn, Indeed" },
  { id: "numerique", titre: "Atelier inclusion numérique", desc: "Bureautique, email pro, outils collaboratifs" },
  { id: "citoyennete", titre: "Atelier citoyenneté", desc: "Droits et devoirs, laïcité, valeurs de la République" },
  { id: "budget", titre: "Atelier gestion du budget", desc: "Gestion financière, aides sociales, droits CAF" },
  { id: "sante", titre: "Atelier santé et bien-être", desc: "Hygiène de vie, gestion du stress, prévention" },
];

export default function DocAccompagnement({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />
      <Section title="Ateliers d'insertion professionnelle et citoyenne">
        {ATELIERS.map((a) => (
          <div key={a.id} className="flex items-start gap-3 bg-light-gray rounded-lg p-3 mb-2">
            <input type="checkbox" checked={data[`atelier_${a.id}`] === "oui"} onChange={(e) => onUpdate(`atelier_${a.id}`, e.target.checked ? "oui" : "")} className="accent-primary mt-0.5 w-4 h-4" />
            <div className="flex-1">
              <div className="font-bold text-primary text-sm">{a.titre}</div>
              <div className="text-xs text-gray-text">{a.desc}</div>
            </div>
          </div>
        ))}
      </Section>
      <Section title="Accompagnement personnalisé" color="bg-secondary">
        <TextArea label="Besoins spécifiques identifiés" field="besoins" data={data} onUpdate={onUpdate} placeholder="Difficultés sociales, logement, mobilité..." />
        <TextArea label="Partenaires mobilisés" field="partenaires_mobilises" data={data} onUpdate={onUpdate} placeholder="Mission Locale, CCAS, assistante sociale..." />
        <TextArea label="Objectifs d'accompagnement" field="objectifs" data={data} onUpdate={onUpdate} />
      </Section>
    </div>
  );
}
