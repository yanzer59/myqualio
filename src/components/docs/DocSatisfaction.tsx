"use client";
import { Section, Field } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; type: "chaud" | "froid_entreprise" | "froid_formateur"; }

const QUESTIONS_CHAUD = [
  "Le contenu correspond aux compétences visées",
  "Les objectifs pédagogiques étaient clairement définis",
  "Les mises en situation illustrent bien le métier AMIS",
  "Le formateur maîtrise le sujet",
  "Le rythme était adapté",
  "Les supports pédagogiques sont de qualité",
  "L'ambiance de formation est favorable à l'apprentissage",
];
const QUESTIONS_ENTREPRISE = [
  "Les compétences acquises sont utiles en situation de travail",
  "L'alternance est bien coordonnée avec le CFA",
  "Le suivi par le CFA est satisfaisant",
  "La progression de l'apprenti est visible",
  "La communication avec le CFA est fluide",
];
const QUESTIONS_FORMATEUR = [
  "Les conditions matérielles sont satisfaisantes",
  "Les apprenants sont motivés et assidus",
  "Le référentiel RNCP est adapté aux réalités du terrain",
  "La coordination avec la direction est fluide",
  "Les outils pédagogiques mis à disposition sont suffisants",
];

export default function DocSatisfaction({ data, onUpdate, type }: Props) {
  const questions = type === "chaud" ? QUESTIONS_CHAUD : type === "froid_entreprise" ? QUESTIONS_ENTREPRISE : QUESTIONS_FORMATEUR;
  const titre = type === "chaud" ? "Questionnaire Satisfaction — Apprenant (à chaud)" : type === "froid_entreprise" ? "Questionnaire Satisfaction — Entreprise (à froid)" : "Questionnaire Satisfaction — Formateur (à froid)";

  return (
    <div className="space-y-4">
      <Section title="Informations">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {type === "chaud" && <Field label="Module / Session" field="module" data={data} onUpdate={onUpdate} />}
          {type === "froid_entreprise" && <Field label="Entreprise" field="entreprise" data={data} onUpdate={onUpdate} />}
          {type === "froid_formateur" && <Field label="Formateur" field="formateur_nom" data={data} onUpdate={onUpdate} />}
          <Field label="Date" field="date" data={data} onUpdate={onUpdate} type="date" />
        </div>
      </Section>
      <Section title={titre} color="bg-secondary">
        <p className="text-xs text-gray-text mb-3">Évaluation : Très satisfait / Satisfait / Peu satisfait / Insatisfait</p>
        {questions.map((q, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <span className="text-xs text-dark flex-1">{i + 1}. {q}</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-xs w-36" value={data[`q${i}`] || ""} onChange={(e) => onUpdate(`q${i}`, e.target.value)}>
              <option value="">—</option>
              <option value="Très satisfait">Très satisfait</option>
              <option value="Satisfait">Satisfait</option>
              <option value="Peu satisfait">Peu satisfait</option>
              <option value="Insatisfait">Insatisfait</option>
            </select>
          </div>
        ))}
      </Section>
    </div>
  );
}
