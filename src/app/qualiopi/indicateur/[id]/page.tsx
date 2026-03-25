"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useOrganisme } from "@/lib/OrganismeContext";
import { PageSection, StatusBadge, SectionBanner, InfoCard } from "@/components/ui";
import { INDICATEURS } from "@/lib/indicateurs";
import { type StatutIndicateur } from "@/lib/types";

export default function IndicateurDetailPage() {
  const params = useParams();
  const numero = Number(params.id);
  const { suivis, updateSuivi, organisme, loading } = useOrganisme();

  const indicateur = INDICATEURS.find((i) => i.numero === numero);
  const suivi = suivis.find((s) => s.indicateur_id === numero);

  const [statut, setStatut] = useState<StatutIndicateur>("non_evalue");
  const [notes, setNotes] = useState("");
  const [planAction, setPlanAction] = useState("");
  const [responsable, setResponsable] = useState("");
  const [dateEcheance, setDateEcheance] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (suivi) {
      setStatut(suivi.statut);
      setNotes(suivi.notes || "");
      setPlanAction(suivi.plan_action || "");
      setResponsable(suivi.responsable || "");
      setDateEcheance(suivi.date_echeance || "");
    }
  }, [suivi]);

  if (loading || !indicateur) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  async function handleSave() {
    setSaving(true);
    await updateSuivi(numero, {
      statut,
      notes: notes || null,
      plan_action: planAction || null,
      responsable: responsable || null,
      date_echeance: dateEcheance || null,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <PageSection
      title={`Indicateur ${numero} - ${indicateur.titre}`}
      action={
        <Link href={`/qualiopi/critere/${indicateur.critere}`} className="text-sm text-secondary hover:underline">
          Retour au critère {indicateur.critere}
        </Link>
      }
    >
      {/* Description */}
      <InfoCard color="border-primary">
        <p className="text-sm text-dark">{indicateur.description}</p>
      </InfoCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <InfoCard color="border-secondary">
          <p className="text-xs font-bold text-secondary uppercase mb-1">Niveau attendu</p>
          <p className="text-sm text-dark">{indicateur.niveau_attendu}</p>
        </InfoCard>
        <InfoCard color="border-accent">
          <p className="text-xs font-bold text-accent uppercase mb-1">Exemples de preuves</p>
          <p className="text-sm text-dark">{indicateur.exemples_preuves}</p>
        </InfoCard>
      </div>

      {/* Evaluation form */}
      <div className="mt-6">
        <SectionBanner title="Évaluation" />
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-5 space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-bold text-primary w-32">Statut :</label>
            <div className="flex items-center gap-3">
              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value as StatutIndicateur)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
              >
                <option value="non_evalue">Non évalué</option>
                <option value="conforme">Conforme</option>
                <option value="non_conforme">Non conforme</option>
                <option value="en_cours">En cours</option>
                <option value="na">Non applicable</option>
              </select>
              <StatusBadge statut={statut} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-primary mb-1">Notes / Observations :</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light resize-none"
              placeholder="Vos observations sur cet indicateur..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary mb-1">Plan d&apos;action :</label>
            <textarea
              value={planAction}
              onChange={(e) => setPlanAction(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light resize-none"
              placeholder="Actions à mettre en place pour atteindre la conformité..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-primary mb-1">Responsable :</label>
              <input
                type="text"
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
                placeholder="Nom du responsable"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-primary mb-1">Date d&apos;échéance :</label>
              <input
                type="date"
                value={dateEcheance}
                onChange={(e) => setDateEcheance(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
            {saved && (
              <span className="text-green text-sm font-medium">Enregistré avec succès !</span>
            )}
          </div>
        </div>
      </div>

      {/* Documents section */}
      <div className="mt-6">
        <SectionBanner title="Documents & Preuves" color="bg-secondary" />
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-5">
          <p className="text-sm text-gray-text text-center py-8">
            La gestion documentaire sera disponible prochainement.
            <br />
            Vous pourrez uploader vos preuves directement ici.
          </p>
        </div>
      </div>
    </PageSection>
  );
}
