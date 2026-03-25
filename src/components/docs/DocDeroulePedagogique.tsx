"use client";
import { CAMPUS } from "@/lib/campus-data";
import { Section, Field, InfoLine, TextArea, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocDeroulePedagogique({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <CampusHeader />
      <Section title="Informations générales">
        <InfoLine label="Formation" value={CAMPUS.formation} />
        <InfoLine label="RNCP" value={CAMPUS.rncp} />
        <InfoLine label="Durée CFA" value={`${CAMPUS.heures_cfa}h — ${CAMPUS.duree_mois} mois`} />
        <InfoLine label="Rythme" value={CAMPUS.rythme} />
        <InfoLine label="Répartition" value={CAMPUS.blocs.map(b => `${b.code}: ${b.heures}h`).join(" | ") + ` | Transversal: ${CAMPUS.modules_transversaux_heures}h`} />
      </Section>
      {CAMPUS.blocs.map((b) => (
        <Section key={b.code} title={`${b.code} — ${b.titre.substring(0, 70)} (${b.heures}h)`} color={b.code === "BC01" ? "bg-primary" : b.code === "BC02" ? "bg-secondary" : "bg-accent"}>
          {b.competences.map((c) => (
            <div key={c.code} className="bg-light-gray rounded p-3 mb-2">
              <div className="font-bold text-xs text-primary mb-1">{c.code} — {c.titre}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`${c.code}_methode`] || ""} onChange={(e) => onUpdate(`${c.code}_methode`, e.target.value)} placeholder="Méthode pédagogique" />
                <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`${c.code}_duree`] || ""} onChange={(e) => onUpdate(`${c.code}_duree`, e.target.value)} placeholder="Durée (heures)" />
              </div>
            </div>
          ))}
        </Section>
      ))}
      <Section title="Modules transversaux" color="bg-gray-600">
        <TextArea label={`Contenu (${CAMPUS.modules_transversaux_heures}h)`} field="transversal_contenu" data={data} onUpdate={onUpdate} placeholder={CAMPUS.modules_transversaux} />
      </Section>
    </div>
  );
}
