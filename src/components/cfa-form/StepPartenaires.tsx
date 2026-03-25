"use client";
import type { CfaData, Partenaire, ContactHandicap } from "@/lib/cfa-fields";

interface Props {
  data: CfaData;
  update: (field: keyof CfaData, value: unknown) => void;
}

export default function StepPartenaires({ data, update }: Props) {
  const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light";
  const labelCls = "block text-sm font-bold text-primary mb-1";

  function addPartenaire() {
    update("partenaires", [...data.partenaires, { nom: "", type: "Entreprise", contact: "", convention: false, description: "" }]);
  }
  function updateP(i: number, field: keyof Partenaire, value: unknown) {
    const p = [...data.partenaires];
    p[i] = { ...p[i], [field]: value };
    update("partenaires", p);
  }
  function removeP(i: number) { update("partenaires", data.partenaires.filter((_, j) => j !== i)); }

  function addContact() {
    update("contacts_handicap", [...data.contacts_handicap, { organisme: "", interlocuteur: "", telephone: "", email: "", mission: "" }]);
  }
  function updateC(i: number, field: keyof ContactHandicap, value: string) {
    const c = [...data.contacts_handicap];
    c[i] = { ...c[i], [field]: value };
    update("contacts_handicap", c);
  }
  function removeC(i: number) { update("contacts_handicap", data.contacts_handicap.filter((_, j) => j !== i)); }

  return (
    <div className="space-y-6">
      {/* Partenaires */}
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-accent">
          <h3 className="font-bold text-primary text-base">Partenaires & Entreprises</h3>
          <button onClick={addPartenaire} className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors">+ Partenaire</button>
        </div>
        {data.partenaires.length === 0 && <p className="text-sm text-gray-text text-center py-4">Aucun partenaire.</p>}
        {data.partenaires.map((p, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-dark">{p.nom || `Partenaire ${i + 1}`}</span>
              <button onClick={() => removeP(i)} className="text-red text-xs">✕</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Nom *</label>
                <input type="text" className={inputCls} value={p.nom} onChange={(e) => updateP(i, "nom", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Type</label>
                <select className={inputCls} value={p.type} onChange={(e) => updateP(i, "type", e.target.value)}>
                  <option>Entreprise</option>
                  <option>Association</option>
                  <option>Institution</option>
                  <option>Collectivité</option>
                  <option>OPCO</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Contact</label>
                <input type="text" className={inputCls} value={p.contact} onChange={(e) => updateP(i, "contact", e.target.value)} placeholder="Nom / email / téléphone" />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Description</label>
                <input type="text" className={inputCls} value={p.description} onChange={(e) => updateP(i, "description", e.target.value)} placeholder="Nature du partenariat" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer self-end pb-2">
                <input type="checkbox" checked={p.convention} onChange={(e) => updateP(i, "convention", e.target.checked)} className="accent-primary w-4 h-4" />
                <span className="text-sm">Convention signée</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Contacts Handicap */}
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-accent">
          <h3 className="font-bold text-primary text-base">Contacts Handicap (AGEFIPH, Cap Emploi...)</h3>
          <button onClick={addContact} className="bg-secondary hover:bg-secondary/90 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors">+ Contact</button>
        </div>
        {data.contacts_handicap.length === 0 && <p className="text-sm text-gray-text text-center py-4">Aucun contact handicap.</p>}
        {data.contacts_handicap.map((c, i) => (
          <div key={i} className="bg-light-gray rounded-lg p-3 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-text">{c.organisme || `Contact ${i + 1}`}</span>
              <button onClick={() => removeC(i)} className="text-red text-xs">✕</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <input type="text" className={inputCls + " text-xs"} value={c.organisme} onChange={(e) => updateC(i, "organisme", e.target.value)} placeholder="Organisme" />
              <input type="text" className={inputCls + " text-xs"} value={c.interlocuteur} onChange={(e) => updateC(i, "interlocuteur", e.target.value)} placeholder="Interlocuteur" />
              <input type="tel" className={inputCls + " text-xs"} value={c.telephone} onChange={(e) => updateC(i, "telephone", e.target.value)} placeholder="Téléphone" />
              <input type="email" className={inputCls + " text-xs"} value={c.email} onChange={(e) => updateC(i, "email", e.target.value)} placeholder="Email" />
              <input type="text" className={inputCls + " text-xs"} value={c.mission} onChange={(e) => updateC(i, "mission", e.target.value)} placeholder="Mission" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
