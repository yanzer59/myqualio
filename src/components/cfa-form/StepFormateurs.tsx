"use client";
import type { CfaData, Formateur } from "@/lib/cfa-fields";
import { STATUTS_FORMATEUR } from "@/lib/cfa-fields";

interface Props {
  data: CfaData;
  update: (field: keyof CfaData, value: unknown) => void;
}

export default function StepFormateurs({ data, update }: Props) {
  const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light";
  const labelCls = "block text-sm font-bold text-primary mb-1";

  function add() {
    update("formateurs", [...data.formateurs, {
      nom: "", prenom: "", qualification: "", experience: "", specialite: "",
      statut: "salarie" as const, blocs_enseignes: [], competences_enseignees: [],
    }]);
  }

  function updateF(i: number, field: keyof Formateur, value: unknown) {
    const f = [...data.formateurs];
    f[i] = { ...f[i], [field]: value };
    update("formateurs", f);
  }

  function remove(i: number) {
    update("formateurs", data.formateurs.filter((_, j) => j !== i));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-text">Ajoutez les formateurs et intervenants de votre CFA.</p>
        <button onClick={add} className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors">
          + Formateur
        </button>
      </div>

      {data.formateurs.length === 0 && (
        <p className="text-sm text-gray-text text-center py-8">Aucun formateur ajouté. Cliquez sur &quot;+ Formateur&quot;.</p>
      )}

      {data.formateurs.map((f, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-primary text-sm">Formateur {i + 1}{f.nom ? ` — ${f.prenom} ${f.nom}` : ""}</h4>
            <button onClick={() => remove(i)} className="text-red text-xs hover:underline">Supprimer</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Nom *</label>
              <input type="text" className={inputCls} value={f.nom} onChange={(e) => updateF(i, "nom", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Prénom *</label>
              <input type="text" className={inputCls} value={f.prenom} onChange={(e) => updateF(i, "prenom", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Qualification / Diplôme</label>
              <input type="text" className={inputCls} value={f.qualification} onChange={(e) => updateF(i, "qualification", e.target.value)} placeholder="Master, Licence, TP..." />
            </div>
            <div>
              <label className={labelCls}>Statut</label>
              <select className={inputCls} value={f.statut} onChange={(e) => updateF(i, "statut", e.target.value)}>
                {STATUTS_FORMATEUR.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Expérience professionnelle</label>
              <textarea className={inputCls + " resize-none"} rows={2} value={f.experience} onChange={(e) => updateF(i, "experience", e.target.value)} placeholder="Résumé de l'expérience..." />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Spécialité(s)</label>
              <input type="text" className={inputCls} value={f.specialite} onChange={(e) => updateF(i, "specialite", e.target.value)} placeholder="Médiation sociale, SST, droit..." />
            </div>
            {data.blocs_competences.length > 0 && (
              <div className="sm:col-span-2">
                <label className={labelCls}>Blocs enseignés</label>
                <div className="flex flex-wrap gap-2">
                  {data.blocs_competences.map((bloc) => (
                    <label key={bloc.code} className="flex items-center gap-1.5 text-xs cursor-pointer bg-light-gray rounded px-2 py-1">
                      <input
                        type="checkbox"
                        checked={f.blocs_enseignes.includes(bloc.code)}
                        onChange={(e) => {
                          const list = e.target.checked
                            ? [...f.blocs_enseignes, bloc.code]
                            : f.blocs_enseignes.filter((b) => b !== bloc.code);
                          updateF(i, "blocs_enseignes", list);
                        }}
                        className="accent-primary"
                      />
                      {bloc.code} — {bloc.intitule.substring(0, 40)}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
