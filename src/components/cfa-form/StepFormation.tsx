"use client";
import type { CfaData, BlocCompetence, CompetenceDetail } from "@/lib/cfa-fields";
import { NIVEAUX_FORMATION, TYPES_FORMATION } from "@/lib/cfa-fields";

interface Props {
  data: CfaData;
  update: (field: keyof CfaData, value: unknown) => void;
}

export default function StepFormation({ data, update }: Props) {
  const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light";
  const labelCls = "block text-sm font-bold text-primary mb-1";

  function addBloc() {
    const blocs = [...data.blocs_competences, {
      code: `BC0${data.blocs_competences.length + 1}`,
      code_rncp: "",
      intitule: "",
      volume_heures: 0,
      competences: [],
    }];
    update("blocs_competences", blocs);
  }

  function updateBloc(index: number, field: keyof BlocCompetence, value: unknown) {
    const blocs = [...data.blocs_competences];
    blocs[index] = { ...blocs[index], [field]: value };
    update("blocs_competences", blocs);
  }

  function removeBloc(index: number) {
    update("blocs_competences", data.blocs_competences.filter((_, i) => i !== index));
  }

  function addCompetence(blocIndex: number) {
    const blocs = [...data.blocs_competences];
    const bloc = blocs[blocIndex];
    bloc.competences = [...bloc.competences, {
      code: `C${bloc.competences.length + 1}`,
      intitule: "",
    }];
    update("blocs_competences", blocs);
  }

  function updateCompetence(blocIndex: number, compIndex: number, field: keyof CompetenceDetail, value: string) {
    const blocs = [...data.blocs_competences];
    blocs[blocIndex].competences[compIndex] = { ...blocs[blocIndex].competences[compIndex], [field]: value };
    update("blocs_competences", blocs);
  }

  function removeCompetence(blocIndex: number, compIndex: number) {
    const blocs = [...data.blocs_competences];
    blocs[blocIndex].competences = blocs[blocIndex].competences.filter((_, i) => i !== compIndex);
    update("blocs_competences", blocs);
  }

  return (
    <div className="space-y-6">
      {/* Infos générales formation */}
      <div>
        <h3 className="font-bold text-primary text-base mb-3 pb-2 border-b border-accent">Formation principale</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelCls}>Intitulé de la formation *</label>
            <input type="text" className={inputCls} value={data.formation_intitule} onChange={(e) => update("formation_intitule", e.target.value)} placeholder="Ex: Titre Professionnel Agent de Médiation, Information et Services (AMIS)" />
          </div>
          <div>
            <label className={labelCls}>Code RNCP *</label>
            <input type="text" className={inputCls} value={data.formation_rncp} onChange={(e) => update("formation_rncp", e.target.value)} placeholder="RNCP 37722" />
          </div>
          <div>
            <label className={labelCls}>Niveau *</label>
            <select className={inputCls} value={data.formation_niveau} onChange={(e) => update("formation_niveau", e.target.value)}>
              <option value="">— Sélectionner —</option>
              {NIVEAUX_FORMATION.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Certificateur</label>
            <input type="text" className={inputCls} value={data.formation_certificateur} onChange={(e) => update("formation_certificateur", e.target.value)} placeholder="Ministère du Travail..." />
          </div>
          <div>
            <label className={labelCls}>Type de prestation</label>
            <select className={inputCls} value={data.formation_type} onChange={(e) => update("formation_type", e.target.value)}>
              {TYPES_FORMATION.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Date d&apos;enregistrement RNCP</label>
            <input type="date" className={inputCls} value={data.formation_date_enregistrement} onChange={(e) => update("formation_date_enregistrement", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Date d&apos;échéance RNCP</label>
            <input type="date" className={inputCls} value={data.formation_date_echeance} onChange={(e) => update("formation_date_echeance", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Durée totale (mois)</label>
            <input type="number" className={inputCls} value={data.formation_duree_mois || ""} onChange={(e) => update("formation_duree_mois", Number(e.target.value))} />
          </div>
          <div>
            <label className={labelCls}>Volume horaire CFA (heures)</label>
            <input type="number" className={inputCls} value={data.formation_volume_heures_cfa || ""} onChange={(e) => update("formation_volume_heures_cfa", Number(e.target.value))} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Rythme d&apos;alternance</label>
            <input type="text" className={inputCls} value={data.formation_rythme} onChange={(e) => update("formation_rythme", e.target.value)} placeholder="Ex: 1 jour/semaine au CFA — 4 jours/semaine en entreprise" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Financement</label>
            <input type="text" className={inputCls} value={data.formation_financement} onChange={(e) => update("formation_financement", e.target.value)} placeholder="Contrat d'apprentissage — Prise en charge OPCO" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Prérequis d&apos;entrée</label>
            <textarea className={inputCls + " resize-none"} rows={2} value={data.formation_prerequis} onChange={(e) => update("formation_prerequis", e.target.value)} placeholder="Ex: Maîtrise du français oral et écrit..." />
          </div>
        </div>
      </div>

      {/* Blocs de compétences */}
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-accent">
          <h3 className="font-bold text-primary text-base">Blocs de compétences</h3>
          <button onClick={addBloc} className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors">
            + Ajouter un bloc
          </button>
        </div>

        {data.blocs_competences.length === 0 && (
          <p className="text-sm text-gray-text text-center py-4">Aucun bloc de compétences. Cliquez sur &quot;+ Ajouter un bloc&quot; pour commencer.</p>
        )}

        {data.blocs_competences.map((bloc, bi) => (
          <div key={bi} className="bg-light-gray rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-primary text-sm">{bloc.code}</span>
              <button onClick={() => removeBloc(bi)} className="text-red text-xs hover:underline">Supprimer</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="text-xs font-bold text-primary">Code RNCP</label>
                <input type="text" className={inputCls + " text-xs"} value={bloc.code_rncp} onChange={(e) => updateBloc(bi, "code_rncp", e.target.value)} placeholder="RNCP37722BC01" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-primary">Intitulé</label>
                <input type="text" className={inputCls + " text-xs"} value={bloc.intitule} onChange={(e) => updateBloc(bi, "intitule", e.target.value)} />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs font-bold text-primary">Volume horaire</label>
              <input type="number" className={inputCls + " text-xs max-w-32"} value={bloc.volume_heures || ""} onChange={(e) => updateBloc(bi, "volume_heures", Number(e.target.value))} />
            </div>

            {/* Compétences du bloc */}
            <div className="ml-4 border-l-2 border-primary/20 pl-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-text">Compétences</span>
                <button onClick={() => addCompetence(bi)} className="text-primary text-xs hover:underline font-medium">+ Compétence</button>
              </div>
              {bloc.competences.map((comp, ci) => (
                <div key={ci} className="flex items-center gap-2 mb-1">
                  <input type="text" className="w-14 border border-gray-300 rounded px-2 py-1 text-xs" value={comp.code} onChange={(e) => updateCompetence(bi, ci, "code", e.target.value)} />
                  <input type="text" className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs" value={comp.intitule} onChange={(e) => updateCompetence(bi, ci, "intitule", e.target.value)} placeholder="Intitulé de la compétence" />
                  <button onClick={() => removeCompetence(bi, ci)} className="text-red text-xs">✕</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modules transversaux */}
      <div>
        <h3 className="font-bold text-primary text-base mb-3 pb-2 border-b border-accent">Modules transversaux</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-3">
            <label className={labelCls}>Description</label>
            <input type="text" className={inputCls} value={data.modules_transversaux} onChange={(e) => update("modules_transversaux", e.target.value)} placeholder="Numérique, insertion professionnelle, préparation examen..." />
          </div>
          <div>
            <label className={labelCls}>Heures</label>
            <input type="number" className={inputCls} value={data.modules_transversaux_heures || ""} onChange={(e) => update("modules_transversaux_heures", Number(e.target.value))} />
          </div>
        </div>
      </div>
    </div>
  );
}
