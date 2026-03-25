"use client";
import type { CfaData } from "@/lib/cfa-fields";
import { FORMES_JURIDIQUES } from "@/lib/cfa-fields";

interface Props {
  data: CfaData;
  update: (field: keyof CfaData, value: unknown) => void;
}

export default function StepOrganisme({ data, update }: Props) {
  const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light";
  const labelCls = "block text-sm font-bold text-primary mb-1";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={labelCls}>Raison sociale *</label>
          <input type="text" className={inputCls} value={data.raison_sociale} onChange={(e) => update("raison_sociale", e.target.value)} placeholder="Ex: Campus Excellence" />
        </div>
        <div>
          <label className={labelCls}>Forme juridique *</label>
          <select className={inputCls} value={data.forme_juridique} onChange={(e) => update("forme_juridique", e.target.value)}>
            <option value="">— Sélectionner —</option>
            {FORMES_JURIDIQUES.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>SIRET</label>
          <input type="text" className={inputCls} value={data.siret} onChange={(e) => update("siret", e.target.value)} placeholder="XXX XXX XXX XXXXX" />
        </div>
        <div>
          <label className={labelCls}>Code NAF / APE</label>
          <input type="text" className={inputCls} value={data.code_naf} onChange={(e) => update("code_naf", e.target.value)} placeholder="8559A" />
        </div>
        <div>
          <label className={labelCls}>Téléphone</label>
          <input type="tel" className={inputCls} value={data.telephone} onChange={(e) => update("telephone", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Adresse *</label>
          <input type="text" className={inputCls} value={data.adresse} onChange={(e) => update("adresse", e.target.value)} placeholder="102 Rue de Lannoy" />
        </div>
        <div>
          <label className={labelCls}>Code postal *</label>
          <input type="text" className={inputCls} value={data.code_postal} onChange={(e) => update("code_postal", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Ville *</label>
          <input type="text" className={inputCls} value={data.ville} onChange={(e) => update("ville", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" className={inputCls} value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="contact@monorganisme.fr" />
        </div>
        <div>
          <label className={labelCls}>Site internet</label>
          <input type="url" className={inputCls} value={data.site_internet} onChange={(e) => update("site_internet", e.target.value)} placeholder="www.monorganisme.fr" />
        </div>
        <div>
          <label className={labelCls}>LinkedIn</label>
          <input type="text" className={inputCls} value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="linkedin.com/company/..." />
        </div>
        <div>
          <label className={labelCls}>Date de création</label>
          <input type="date" className={inputCls} value={data.date_creation} onChange={(e) => update("date_creation", e.target.value)} />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="font-bold text-primary text-sm mb-3">Groupe / Entité porteuse (optionnel)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nom du groupe</label>
            <input type="text" className={inputCls} value={data.groupe_nom} onChange={(e) => update("groupe_nom", e.target.value)} placeholder="Ex: APEN" />
          </div>
          <div>
            <label className={labelCls}>SIRET du groupe</label>
            <input type="text" className={inputCls} value={data.groupe_siret} onChange={(e) => update("groupe_siret", e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}
