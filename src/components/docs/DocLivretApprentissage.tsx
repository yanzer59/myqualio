"use client";
import { CAMPUS } from "@/lib/campus-data";
import { Section, Field, InfoLine, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocLivretApprentissage({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />
      <Section title="1. Identification">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom et prénom de l'apprenti(e)" field="apprenti" data={data} onUpdate={onUpdate} required />
          <Field label="Date de naissance" field="naissance" data={data} onUpdate={onUpdate} type="date" />
          <Field label="Adresse" field="adresse" data={data} onUpdate={onUpdate} />
          <Field label="Téléphone" field="telephone" data={data} onUpdate={onUpdate} />
          <Field label="Email" field="email" data={data} onUpdate={onUpdate} type="email" />
          <Field label="Entreprise d'accueil" field="entreprise" data={data} onUpdate={onUpdate} required />
          <Field label="Adresse entreprise" field="entreprise_adresse" data={data} onUpdate={onUpdate} />
          <Field label="Maître d'apprentissage" field="ma" data={data} onUpdate={onUpdate} />
          <Field label="Tél. maître d'apprentissage" field="ma_tel" data={data} onUpdate={onUpdate} />
          <Field label="Email MA" field="ma_email" data={data} onUpdate={onUpdate} type="email" />
          <Field label="Date début contrat" field="debut" data={data} onUpdate={onUpdate} type="date" />
          <Field label="Date fin contrat" field="fin" data={data} onUpdate={onUpdate} type="date" />
        </div>
        <div className="mt-2">
          <InfoLine label="Référent CFA" value={`${CAMPUS.directeur_prenom} ${CAMPUS.directeur_nom} — ${CAMPUS.email}`} />
          <InfoLine label="Rythme" value={CAMPUS.rythme} />
        </div>
      </Section>
      <Section title="2. Suivi des compétences en entreprise" color="bg-secondary">
        <p className="text-xs text-gray-text mb-3">Le maître d&apos;apprentissage évalue la progression à chaque période.</p>
        {CAMPUS.blocs.map((b) => (
          <div key={b.code} className="mb-3">
            <h4 className="font-bold text-primary text-xs mb-1 bg-primary-light px-2 py-1 rounded">{b.code} — {b.titre.substring(0, 60)}</h4>
            {b.competences.map((c) => (
              <div key={c.code} className="flex items-center gap-2 mb-1 pl-2">
                <span className="text-xs font-bold text-secondary w-6">{c.code}</span>
                <span className="text-xs text-dark flex-1">{c.titre}</span>
                {["Sem 1", "Sem 2"].map((sem) => (
                  <select key={sem} className="border border-gray-300 rounded px-1 py-0.5 text-[10px] w-20" value={data[`suivi_${c.code}_${sem}`] || ""} onChange={(e) => onUpdate(`suivi_${c.code}_${sem}`, e.target.value)}>
                    <option value="">{sem}</option>
                    <option value="Non observé">Non observé</option>
                    <option value="En cours">En cours</option>
                    <option value="Acquis">Acquis</option>
                    <option value="Maîtrisé">Maîtrisé</option>
                  </select>
                ))}
              </div>
            ))}
          </div>
        ))}
      </Section>
    </div>
  );
}
