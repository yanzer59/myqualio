"use client";
import { Section, Field, TextArea } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocDeroulePedagogique({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <Section title="Informations générales">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Formation" field="formation" data={data} onUpdate={onUpdate} placeholder="Ex: TP Agent de Médiation, Information et Services" />
          <Field label="RNCP" field="rncp" data={data} onUpdate={onUpdate} placeholder="Ex: RNCP 37722" />
          <Field label="Durée CFA" field="duree_cfa" data={data} onUpdate={onUpdate} placeholder="Ex: 441h — 12 mois" />
          <Field label="Rythme" field="rythme" data={data} onUpdate={onUpdate} placeholder="Ex: 1 jour/semaine au CFA — 4 jours en entreprise" />
          <div className="sm:col-span-2">
            <Field label="Répartition horaire" field="repartition" data={data} onUpdate={onUpdate} placeholder="Ex: BC01: 160h | BC02: 175h | BC03: 56h | Transversal: 50h" />
          </div>
        </div>
      </Section>
      {[0, 1, 2].map((i) => (
        <Section key={i} title={data[`bloc_${i}_titre_complet`] || `Bloc de compétences ${i + 1}`} color={i === 0 ? "bg-primary" : i === 1 ? "bg-secondary" : "bg-accent"}>
          <div className="mb-3">
            <Field label="Titre du bloc" field={`bloc_${i}_titre_complet`} data={data} onUpdate={onUpdate} placeholder={`Ex: BC0${i + 1} — Intitulé du bloc (heures)`} />
          </div>
          {[0, 1, 2, 3, 4].map((j) => (
            <div key={j} className="bg-light-gray rounded p-3 mb-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`bloc_${i}_comp_${j}_code`] || ""} onChange={(e) => onUpdate(`bloc_${i}_comp_${j}_code`, e.target.value)} placeholder={`Code (ex: C${i * 5 + j + 1})`} />
                <input className="border border-gray-300 rounded px-2 py-1 text-xs sm:col-span-2" value={data[`bloc_${i}_comp_${j}_titre`] || ""} onChange={(e) => onUpdate(`bloc_${i}_comp_${j}_titre`, e.target.value)} placeholder="Intitulé de la compétence" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`bloc_${i}_comp_${j}_methode`] || ""} onChange={(e) => onUpdate(`bloc_${i}_comp_${j}_methode`, e.target.value)} placeholder="Méthode pédagogique" />
                <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`bloc_${i}_comp_${j}_duree`] || ""} onChange={(e) => onUpdate(`bloc_${i}_comp_${j}_duree`, e.target.value)} placeholder="Durée (heures)" />
              </div>
            </div>
          ))}
        </Section>
      ))}
      <Section title="Modules transversaux" color="bg-gray-600">
        <TextArea label="Contenu des modules transversaux" field="transversal_contenu" data={data} onUpdate={onUpdate} placeholder="Ex: Numérique, insertion professionnelle, préparation examen" />
        <Field label="Volume horaire" field="transversal_heures" data={data} onUpdate={onUpdate} placeholder="Ex: 50h" />
      </Section>
    </div>
  );
}
