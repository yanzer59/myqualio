"use client";
import type { CfaData, Salle, Equipement } from "@/lib/cfa-fields";

interface Props {
  data: CfaData;
  update: (field: keyof CfaData, value: unknown) => void;
}

export default function StepLocaux({ data, update }: Props) {
  const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light";
  const labelCls = "block text-sm font-bold text-primary mb-1";

  function addSalle() {
    update("salles", [...data.salles, { nom: "", surface: "", capacite: 0, usage: "" }]);
  }
  function updateSalle(i: number, field: keyof Salle, value: unknown) {
    const s = [...data.salles];
    s[i] = { ...s[i], [field]: value };
    update("salles", s);
  }
  function removeSalle(i: number) { update("salles", data.salles.filter((_, j) => j !== i)); }

  function addEquipement() {
    update("equipements", [...data.equipements, { categorie: "", description: "", quantite: 1, etat: "Bon état" }]);
  }
  function updateEquipement(i: number, field: keyof Equipement, value: unknown) {
    const e = [...data.equipements];
    e[i] = { ...e[i], [field]: value };
    update("equipements", e);
  }
  function removeEquipement(i: number) { update("equipements", data.equipements.filter((_, j) => j !== i)); }

  return (
    <div className="space-y-6">
      {/* Adresse et conformité */}
      <div>
        <h3 className="font-bold text-primary text-base mb-3 pb-2 border-b border-accent">Lieu de formation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelCls}>Adresse du centre de formation</label>
            <input type="text" className={inputCls} value={data.locaux_adresse || data.adresse} onChange={(e) => update("locaux_adresse", e.target.value)} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={data.locaux_conformite_erp} onChange={(e) => update("locaux_conformite_erp", e.target.checked)} className="accent-primary w-4 h-4" />
            <span className="text-sm font-medium text-dark">Conformité ERP (Établissement Recevant du Public)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={data.locaux_accessibilite_pmr} onChange={(e) => update("locaux_accessibilite_pmr", e.target.checked)} className="accent-primary w-4 h-4" />
            <span className="text-sm font-medium text-dark">Accessibilité PMR</span>
          </label>
        </div>
      </div>

      {/* Salles */}
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-accent">
          <h3 className="font-bold text-primary text-base">Salles de formation</h3>
          <button onClick={addSalle} className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors">+ Salle</button>
        </div>
        {data.salles.length === 0 && <p className="text-sm text-gray-text text-center py-3">Aucune salle. Cliquez sur &quot;+ Salle&quot;.</p>}
        {data.salles.map((s, i) => (
          <div key={i} className="bg-light-gray rounded-lg p-3 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-text">Salle {i + 1}</span>
              <button onClick={() => removeSalle(i)} className="text-red text-xs">✕</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <input type="text" className={inputCls + " text-xs"} value={s.nom} onChange={(e) => updateSalle(i, "nom", e.target.value)} placeholder="Nom" />
              <input type="text" className={inputCls + " text-xs"} value={s.surface} onChange={(e) => updateSalle(i, "surface", e.target.value)} placeholder="Surface (m²)" />
              <input type="number" className={inputCls + " text-xs"} value={s.capacite || ""} onChange={(e) => updateSalle(i, "capacite", Number(e.target.value))} placeholder="Capacité" />
              <input type="text" className={inputCls + " text-xs"} value={s.usage} onChange={(e) => updateSalle(i, "usage", e.target.value)} placeholder="Usage" />
            </div>
          </div>
        ))}
      </div>

      {/* Équipements */}
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-accent">
          <h3 className="font-bold text-primary text-base">Équipements pédagogiques</h3>
          <button onClick={addEquipement} className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors">+ Équipement</button>
        </div>
        {data.equipements.length === 0 && <p className="text-sm text-gray-text text-center py-3">Aucun équipement.</p>}
        {data.equipements.map((e, i) => (
          <div key={i} className="bg-light-gray rounded-lg p-3 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-text">Équipement {i + 1}</span>
              <button onClick={() => removeEquipement(i)} className="text-red text-xs">✕</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <input type="text" className={inputCls + " text-xs"} value={e.categorie} onChange={(ev) => updateEquipement(i, "categorie", ev.target.value)} placeholder="Catégorie" />
              <input type="text" className={inputCls + " text-xs"} value={e.description} onChange={(ev) => updateEquipement(i, "description", ev.target.value)} placeholder="Description" />
              <input type="number" className={inputCls + " text-xs"} value={e.quantite || ""} onChange={(ev) => updateEquipement(i, "quantite", Number(ev.target.value))} placeholder="Qté" />
              <select className={inputCls + " text-xs"} value={e.etat} onChange={(ev) => updateEquipement(i, "etat", ev.target.value)}>
                <option value="Bon état">Bon état</option>
                <option value="À remplacer">À remplacer</option>
                <option value="À acquérir">À acquérir</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Moyens pédagogiques */}
      <div>
        <label className={labelCls}>Moyens pédagogiques (description libre)</label>
        <textarea className={inputCls + " resize-none"} rows={3} value={data.moyens_pedagogiques} onChange={(e) => update("moyens_pedagogiques", e.target.value)} placeholder="Supports pédagogiques, outils numériques, bibliothèque..." />
      </div>
    </div>
  );
}
