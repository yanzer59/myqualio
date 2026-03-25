"use client";
import type { CfaData } from "@/lib/cfa-fields";

interface Props {
  data: CfaData;
  update: (field: keyof CfaData, value: unknown) => void;
}

export default function StepDirection({ data, update }: Props) {
  const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light";
  const labelCls = "block text-sm font-bold text-primary mb-1";

  return (
    <div className="space-y-6">
      {/* Président / Dirigeant */}
      <div>
        <h3 className="font-bold text-primary text-base mb-3 pb-2 border-b border-accent">Président / Dirigeant</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nom *</label>
            <input type="text" className={inputCls} value={data.president_nom} onChange={(e) => update("president_nom", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Prénom *</label>
            <input type="text" className={inputCls} value={data.president_prenom} onChange={(e) => update("president_prenom", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Qualité / Titre *</label>
            <input type="text" className={inputCls} value={data.president_qualite} onChange={(e) => update("president_qualite", e.target.value)} placeholder="Président, Gérant..." />
          </div>
          <div>
            <label className={labelCls}>Date de naissance *</label>
            <input type="date" className={inputCls} value={data.president_date_naissance} onChange={(e) => update("president_date_naissance", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Lieu de naissance</label>
            <input type="text" className={inputCls} value={data.president_lieu_naissance} onChange={(e) => update("president_lieu_naissance", e.target.value)} placeholder="Lille (59)" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Adresse personnelle</label>
            <input type="text" className={inputCls} value={data.president_adresse} onChange={(e) => update("president_adresse", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Responsable pédagogique */}
      <div>
        <h3 className="font-bold text-primary text-base mb-3 pb-2 border-b border-accent">Responsable pédagogique</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nom *</label>
            <input type="text" className={inputCls} value={data.responsable_peda_nom} onChange={(e) => update("responsable_peda_nom", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Prénom *</label>
            <input type="text" className={inputCls} value={data.responsable_peda_prenom} onChange={(e) => update("responsable_peda_prenom", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Fonction</label>
            <input type="text" className={inputCls} value={data.responsable_peda_fonction} onChange={(e) => update("responsable_peda_fonction", e.target.value)} placeholder="Directeur du Centre de Formation" />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" className={inputCls} value={data.responsable_peda_email} onChange={(e) => update("responsable_peda_email", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Téléphone</label>
            <input type="tel" className={inputCls} value={data.responsable_peda_telephone} onChange={(e) => update("responsable_peda_telephone", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Référent handicap */}
      <div>
        <h3 className="font-bold text-primary text-base mb-3 pb-2 border-b border-accent">Référent handicap</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Nom</label>
            <input type="text" className={inputCls} value={data.referent_handicap_nom} onChange={(e) => update("referent_handicap_nom", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" className={inputCls} value={data.referent_handicap_email} onChange={(e) => update("referent_handicap_email", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Téléphone</label>
            <input type="tel" className={inputCls} value={data.referent_handicap_telephone} onChange={(e) => update("referent_handicap_telephone", e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}
