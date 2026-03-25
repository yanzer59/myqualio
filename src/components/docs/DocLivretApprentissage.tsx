"use client";
import { Section, Field } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocLivretApprentissage({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
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
          <Field label="Référent CFA" field="referent_cfa" data={data} onUpdate={onUpdate} placeholder="Ex: Yanis LADJ — contact@campus-excellence.fr" />
          <Field label="Rythme" field="rythme" data={data} onUpdate={onUpdate} placeholder="Ex: 1 jour/semaine au CFA — 4 jours en entreprise" />
        </div>
      </Section>
      <Section title="2. Suivi des compétences en entreprise" color="bg-secondary">
        <p className="text-xs text-gray-text mb-3">Le maître d&apos;apprentissage évalue la progression à chaque période. Ajoutez les compétences ci-dessous.</p>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <div key={i} className="flex items-center gap-2 mb-1 pl-2">
            <input className="border border-gray-300 rounded px-2 py-0.5 text-xs w-10 text-center" value={data[`suivi_${i}_code`] || ""} onChange={(e) => onUpdate(`suivi_${i}_code`, e.target.value)} placeholder={`C${i + 1}`} />
            <input className="border border-gray-300 rounded px-2 py-0.5 text-xs flex-1" value={data[`suivi_${i}_titre`] || ""} onChange={(e) => onUpdate(`suivi_${i}_titre`, e.target.value)} placeholder="Intitulé de la compétence" />
            {["Sem 1", "Sem 2"].map((sem) => (
              <select key={sem} className="border border-gray-300 rounded px-1 py-0.5 text-[10px] w-20" value={data[`suivi_${i}_${sem}`] || ""} onChange={(e) => onUpdate(`suivi_${i}_${sem}`, e.target.value)}>
                <option value="">{sem}</option>
                <option value="Non observé">Non observé</option>
                <option value="En cours">En cours</option>
                <option value="Acquis">Acquis</option>
                <option value="Maîtrisé">Maîtrisé</option>
              </select>
            ))}
          </div>
        ))}
      </Section>
    </div>
  );
}
