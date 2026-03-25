"use client";
import type { CfaData } from "@/lib/cfa-fields";

interface Props {
  data: CfaData;
  update: (field: keyof CfaData, value: unknown) => void;
}

export default function StepQualiopi({ data, update }: Props) {
  const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light";
  const labelCls = "block text-sm font-bold text-primary mb-1";

  return (
    <div className="space-y-6">
      <div className="bg-primary-light rounded-lg p-4 text-sm text-primary">
        <strong>Préparation Qualiopi</strong><br />
        Informations sur votre cible d&apos;audit et l&apos;organisme certificateur.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={labelCls}>Cible d&apos;audit (période visée)</label>
          <input type="text" className={inputCls} value={data.qualiopi_cible_audit} onChange={(e) => update("qualiopi_cible_audit", e.target.value)} placeholder="Ex: Fin 2026 — Organisme certificateur accrédité COFRAC" />
        </div>
        <div>
          <label className={labelCls}>Organisme certificateur envisagé</label>
          <select className={inputCls} value={data.qualiopi_organisme_certificateur} onChange={(e) => update("qualiopi_organisme_certificateur", e.target.value)}>
            <option value="">— Sélectionner —</option>
            <option value="AFNOR Certification">AFNOR Certification</option>
            <option value="Bureau Veritas">Bureau Veritas</option>
            <option value="SGS France">SGS France</option>
            <option value="ICPF">ICPF</option>
            <option value="LNE">LNE</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Budget prévisionnel audit</label>
          <input type="text" className={inputCls} value={data.qualiopi_budget_previsionnel} onChange={(e) => update("qualiopi_budget_previsionnel", e.target.value)} placeholder="1 500 à 3 500 € HT" />
        </div>
      </div>

      {/* Récapitulatif */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mt-6">
        <h3 className="font-bold text-primary text-base mb-3">Récapitulatif de votre CFA</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <RecapLine label="Raison sociale" value={data.raison_sociale} />
          <RecapLine label="SIRET" value={data.siret} />
          <RecapLine label="Adresse" value={`${data.adresse} ${data.code_postal} ${data.ville}`} />
          <RecapLine label="Président" value={`${data.president_prenom} ${data.president_nom}`} />
          <RecapLine label="Resp. pédagogique" value={`${data.responsable_peda_prenom} ${data.responsable_peda_nom}`} />
          <RecapLine label="Formation" value={data.formation_intitule} />
          <RecapLine label="RNCP" value={data.formation_rncp} />
          <RecapLine label="Volume horaire" value={data.formation_volume_heures_cfa ? `${data.formation_volume_heures_cfa}h` : ""} />
          <RecapLine label="Blocs" value={`${data.blocs_competences.length} blocs`} />
          <RecapLine label="Formateurs" value={`${data.formateurs.length} formateur(s)`} />
          <RecapLine label="Partenaires" value={`${data.partenaires.length} partenaire(s)`} />
          <RecapLine label="Salles" value={`${data.salles.length} salle(s)`} />
        </div>
      </div>
    </div>
  );
}

function RecapLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2 py-0.5">
      <span className="font-medium text-gray-text w-36 shrink-0">{label} :</span>
      <span className="text-dark">{value || "—"}</span>
    </div>
  );
}
