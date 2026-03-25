"use client";
import { Section, Field, CampusHeader } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

export default function DocMoyensMateriels({ data, onUpdate }: Props) {
  const salles = ["Salle de cours principale", "Salle informatique", "Salle de pause", "Sanitaires", "Accueil / secrétariat"];
  const equipements = [
    { cat: "Mobilier", desc: "Tables modulables et chaises", champ: "mobilier" },
    { cat: "Projection", desc: "Vidéoprojecteur HD", champ: "videoproj" },
    { cat: "Projection", desc: "Écran de projection", champ: "ecran" },
    { cat: "Tableau", desc: "Tableau blanc magnétique", champ: "tableau" },
    { cat: "Informatique", desc: "Postes informatiques", champ: "postes_info" },
    { cat: "Réseau", desc: "Connexion internet WiFi", champ: "wifi" },
    { cat: "Impression", desc: "Imprimante / photocopieur", champ: "imprimante" },
    { cat: "Sécurité", desc: "Extincteur, trousse secours", champ: "securite" },
  ];
  return (
    <div className="space-y-4">
      <CampusHeader />
      <Section title="1. Identification du lieu">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Adresse" field="adresse" data={data} onUpdate={onUpdate} placeholder="102 Rue de Lannoy — 59650 Villeneuve d'Ascq" />
          <Field label="Responsable" field="responsable" data={data} onUpdate={onUpdate} placeholder="Yanis LADJ" />
          <Field label="Date de rédaction" field="date_redaction" data={data} onUpdate={onUpdate} type="date" />
        </div>
      </Section>
      <Section title="2. Description des locaux" color="bg-secondary">
        {salles.map((s, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-1">
            <span className="text-xs font-medium text-dark col-span-1 self-center">{s}</span>
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`salle_${i}_surface`] || ""} onChange={(e) => onUpdate(`salle_${i}_surface`, e.target.value)} placeholder="Surface m²" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`salle_${i}_capacite`] || ""} onChange={(e) => onUpdate(`salle_${i}_capacite`, e.target.value)} placeholder="Capacité" />
            <input className="border border-gray-300 rounded px-2 py-1 text-xs" value={data[`salle_${i}_usage`] || ""} onChange={(e) => onUpdate(`salle_${i}_usage`, e.target.value)} placeholder="Usage" />
          </div>
        ))}
      </Section>
      <Section title="3. Équipements pédagogiques">
        {equipements.map((e) => (
          <div key={e.champ} className="flex items-center gap-3 mb-1.5">
            <span className="text-xs text-gray-text w-24">{e.cat}</span>
            <span className="text-xs text-dark flex-1">{e.desc}</span>
            <input className="border border-gray-300 rounded px-2 py-1 text-xs w-12 text-center" value={data[`equip_${e.champ}_qty`] || ""} onChange={(ev) => onUpdate(`equip_${e.champ}_qty`, ev.target.value)} placeholder="Qté" />
            <select className="border border-gray-300 rounded px-1 py-1 text-xs" value={data[`equip_${e.champ}_etat`] || "Bon état"} onChange={(ev) => onUpdate(`equip_${e.champ}_etat`, ev.target.value)}>
              <option>Bon état</option><option>À remplacer</option><option>À acquérir</option>
            </select>
          </div>
        ))}
      </Section>
    </div>
  );
}
