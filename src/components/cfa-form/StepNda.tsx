"use client";
import type { CfaData } from "@/lib/cfa-fields";
import { DOMAINES_FORMATION, PUBLICS_VISES } from "@/lib/cfa-fields";

interface Props {
  data: CfaData;
  update: (field: keyof CfaData, value: unknown) => void;
}

export default function StepNda({ data, update }: Props) {
  const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light";
  const labelCls = "block text-sm font-bold text-primary mb-1";

  return (
    <div className="space-y-6">
      <div className="bg-secondary-light rounded-lg p-4 text-sm text-secondary">
        <strong>NDA — Numéro de Déclaration d&apos;Activité</strong><br />
        Ces informations seront utilisées pour générer votre dossier de déclaration d&apos;activité (Cerfa 10782*05) auprès de la DREETS.
      </div>

      <div>
        <label className={labelCls}>Objet de l&apos;activité de formation</label>
        <textarea className={inputCls + " resize-none"} rows={3} value={data.nda_objet_activite} onChange={(e) => update("nda_objet_activite", e.target.value)} placeholder="Décrivez les prestations de formation que vous proposez..." />
      </div>

      <div>
        <label className={labelCls}>Domaines de formation</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 max-h-60 overflow-y-auto">
          {DOMAINES_FORMATION.map((d) => (
            <label key={d} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={data.nda_domaines_formation.includes(d)}
                onChange={(e) => {
                  const list = data.nda_domaines_formation;
                  update("nda_domaines_formation", e.target.checked ? [...list, d] : list.filter((x) => x !== d));
                }}
                className="accent-primary"
              />
              {d}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Public visé</label>
        <div className="flex flex-wrap gap-3 mt-2">
          {PUBLICS_VISES.map((p) => (
            <label key={p} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={data.nda_public_vise.includes(p)}
                onChange={(e) => {
                  const list = data.nda_public_vise;
                  update("nda_public_vise", e.target.checked ? [...list, p] : list.filter((x) => x !== p));
                }}
                className="accent-primary"
              />
              {p}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-primary text-base mb-3 pb-2 border-b border-accent">Première convention / contrat de formation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelCls}>Intitulé de la formation</label>
            <input type="text" className={inputCls} value={data.nda_premiere_convention_intitule} onChange={(e) => update("nda_premiere_convention_intitule", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Date de la convention</label>
            <input type="date" className={inputCls} value={data.nda_premiere_convention_date} onChange={(e) => update("nda_premiere_convention_date", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Durée (en heures)</label>
            <input type="text" className={inputCls} value={data.nda_premiere_convention_duree} onChange={(e) => update("nda_premiere_convention_duree", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Nombre de stagiaires</label>
            <input type="number" className={inputCls} value={data.nda_premiere_convention_effectif || ""} onChange={(e) => update("nda_premiere_convention_effectif", Number(e.target.value))} />
          </div>
        </div>
      </div>

      <div>
        <label className={labelCls}>Date prévue de démarrage de l&apos;activité</label>
        <input type="date" className={inputCls + " max-w-xs"} value={data.date_demarrage_activite} onChange={(e) => update("date_demarrage_activite", e.target.value)} />
      </div>
    </div>
  );
}
