"use client";
import { Section, Field } from "./shared";

interface Props { data: Record<string, string>; onUpdate: (f: string, v: string) => void; }

const POINTS = [
  { cat: "🔥 SÉCURITÉ INCENDIE", items: [
    { id: "extincteur", label: "Extincteur présent, accessible, révisé (< 1 an)", prio: "OBL" },
    { id: "evacuation", label: "Plan d'évacuation affiché et lisible", prio: "OBL" },
    { id: "secours", label: "Issues de secours dégagées et signalisées", prio: "OBL" },
    { id: "registre_secu", label: "Registre de sécurité tenu à jour", prio: "OBL" },
    { id: "detecteur", label: "Détecteur de fumée fonctionnel", prio: "OBL" },
  ]},
  { cat: "♿ ACCESSIBILITÉ PMR", items: [
    { id: "acces_pmr", label: "Accès PMR opérationnel (rampe, ascenseur)", prio: "OBL" },
    { id: "sanitaires_pmr", label: "Sanitaires PMR disponibles", prio: "OBL" },
    { id: "signalisation", label: "Signalisation adaptée (pictogrammes, contraste)", prio: "REC" },
  ]},
  { cat: "🪑 MOBILIER & CONFORT", items: [
    { id: "tables", label: "Tables et chaises en nombre suffisant", prio: "OBL" },
    { id: "eclairage", label: "Éclairage suffisant et fonctionnel", prio: "OBL" },
    { id: "temperature", label: "Température adaptée (chauffage/climatisation)", prio: "REC" },
    { id: "proprete", label: "Propreté générale de la salle", prio: "OBL" },
  ]},
  { cat: "📽 ÉQUIPEMENT PÉDAGOGIQUE", items: [
    { id: "videoproj", label: "Vidéoprojecteur fonctionnel", prio: "OBL" },
    { id: "tableau", label: "Tableau blanc avec marqueurs et effaceur", prio: "OBL" },
    { id: "prises", label: "Prises électriques en nombre suffisant", prio: "REC" },
    { id: "wifi", label: "Connexion internet WiFi opérationnelle", prio: "REC" },
  ]},
];

export default function DocChecklistSalle({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <Section title="Informations du contrôle">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Date du contrôle" field="date_controle" data={data} onUpdate={onUpdate} type="date" />
          <Field label="Contrôleur" field="controleur" data={data} onUpdate={onUpdate} placeholder="Yanis LADJ" />
          <Field label="Salle contrôlée" field="salle" data={data} onUpdate={onUpdate} placeholder="Salle principale" />
        </div>
      </Section>
      {POINTS.map((cat) => (
        <Section key={cat.cat} title={cat.cat} color={cat.cat.includes("SÉCURITÉ") ? "bg-red" : cat.cat.includes("PMR") ? "bg-secondary" : "bg-primary"}>
          {cat.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 mb-1">
              <input type="checkbox" checked={data[`check_${item.id}`] === "oui"} onChange={(e) => onUpdate(`check_${item.id}`, e.target.checked ? "oui" : "")} className="accent-primary w-4 h-4" />
              <span className="text-xs text-dark flex-1">{item.label}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.prio === "OBL" ? "bg-red/10 text-red" : "bg-orange/10 text-orange"}`}>{item.prio === "OBL" ? "🔴 OBL." : "🟡 REC."}</span>
              <input className="border border-gray-300 rounded px-2 py-1 text-xs w-32" value={data[`obs_${item.id}`] || ""} onChange={(e) => onUpdate(`obs_${item.id}`, e.target.value)} placeholder="Observation" />
            </div>
          ))}
        </Section>
      ))}
    </div>
  );
}
