"use client";
import { Section, Field, TextArea, CampusHeader } from "./shared";

interface Props {
  data: Record<string, string>;
  onUpdate: (field: string, value: string) => void;
}

export default function DocDossierCandidature({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />

      <Section title="1. État civil">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom de famille" field="nom" data={data} onUpdate={onUpdate} required />
          <Field label="Prénom" field="prenom" data={data} onUpdate={onUpdate} required />
          <Field label="Date de naissance" field="date_naissance" data={data} onUpdate={onUpdate} type="date" required />
          <Field label="Lieu de naissance" field="lieu_naissance" data={data} onUpdate={onUpdate} />
          <Field label="Nationalité" field="nationalite" data={data} onUpdate={onUpdate} />
          <Field label="N° de sécurité sociale" field="secu" data={data} onUpdate={onUpdate} />
          <div className="sm:col-span-2">
            <Field label="Adresse complète" field="adresse" data={data} onUpdate={onUpdate} />
          </div>
          <Field label="Téléphone" field="telephone" data={data} onUpdate={onUpdate} />
          <Field label="Email" field="email" data={data} onUpdate={onUpdate} type="email" />
        </div>
      </Section>

      <Section title="2. Situation actuelle" color="bg-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-primary mb-1">Situation</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
              value={data.situation || ""}
              onChange={(e) => onUpdate("situation", e.target.value)}
            >
              <option value="">— Sélectionner —</option>
              <option value="Demandeur d'emploi">Demandeur d&apos;emploi</option>
              <option value="Salarié(e)">Salarié(e)</option>
              <option value="Étudiant(e)">Étudiant(e)</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <Field label="Suivi France Travail (identifiant)" field="france_travail" data={data} onUpdate={onUpdate} placeholder="Identifiant demandeur" />
          <Field label="Entreprise d'accueil identifiée" field="entreprise_accueil" data={data} onUpdate={onUpdate} placeholder="Nom de l'entreprise ou 'En recherche'" />
          <div>
            <label className="block text-sm font-bold text-primary mb-1">Bénéficiaire RQTH ?</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
              value={data.rqth || ""}
              onChange={(e) => onUpdate("rqth", e.target.value)}
            >
              <option value="">— Sélectionner —</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>
        </div>
      </Section>

      <Section title="3. Parcours scolaire et professionnel">
        <TextArea label="Diplômes obtenus (du plus récent au plus ancien)" field="diplomes" data={data} onUpdate={onUpdate} rows={4} placeholder="Ex: CAP Agent de Sécurité — Lycée X — 2020" />
        <TextArea label="Expériences professionnelles" field="experiences" data={data} onUpdate={onUpdate} rows={4} placeholder="Ex: Agent de sécurité — APEN — 2021 à 2024" />
      </Section>

      <Section title="4. Motivation" color="bg-accent">
        <TextArea label="Pourquoi souhaitez-vous suivre la formation AMIS ?" field="motivation" data={data} onUpdate={onUpdate} rows={4} />
        <TextArea label="Quel est votre projet professionnel après la formation ?" field="projet_pro" data={data} onUpdate={onUpdate} rows={3} />
      </Section>
    </div>
  );
}
