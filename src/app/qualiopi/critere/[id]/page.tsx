"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useOrganisme } from "@/lib/OrganismeContext";
import { PageSection, StatusBadge, ProgressBar } from "@/components/ui";
import { CRITERE_TITLES, CRITERE_DESCRIPTIONS, CRITERE_INDICATEURS, type StatutIndicateur } from "@/lib/types";
import { INDICATEURS } from "@/lib/indicateurs";

export default function CriterePage() {
  const params = useParams();
  const critereId = Number(params.id);
  const { suivis, updateSuivi, loading } = useOrganisme();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const titre = CRITERE_TITLES[critereId] || "Critère inconnu";
  const description = CRITERE_DESCRIPTIONS[critereId] || "";
  const indicateurIds = CRITERE_INDICATEURS[critereId] || [];
  const indicateurs = INDICATEURS.filter((i) => indicateurIds.includes(i.numero));

  const conformes = suivis.filter(
    (s) => indicateurIds.includes(s.indicateur_id) && s.statut === "conforme"
  ).length;

  return (
    <PageSection
      title={`Critère ${critereId} - ${titre}`}
      action={
        <Link href="/qualiopi" className="text-sm text-secondary hover:underline">
          Retour au dashboard
        </Link>
      }
    >
      <div className="bg-primary-light rounded-lg p-4 mb-6">
        <p className="text-sm text-primary">{description}</p>
        <div className="mt-3 max-w-xs">
          <ProgressBar value={conformes} max={indicateurIds.length} />
        </div>
      </div>

      <div className="space-y-3">
        {indicateurs.map((ind) => {
          const suivi = suivis.find((s) => s.indicateur_id === ind.numero);
          const statut: StatutIndicateur = suivi?.statut || "non_evalue";

          return (
            <div key={ind.numero} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {ind.numero}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="font-bold text-dark text-sm">{ind.titre}</h3>
                    <StatusBadge statut={statut} />
                  </div>
                  <p className="text-xs text-gray-text line-clamp-2 mb-3">{ind.description}</p>

                  <div className="flex items-center gap-3 flex-wrap">
                    <select
                      value={statut}
                      onChange={(e) => updateSuivi(ind.numero, { statut: e.target.value as StatutIndicateur })}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-primary"
                    >
                      <option value="non_evalue">Non évalué</option>
                      <option value="conforme">Conforme</option>
                      <option value="non_conforme">Non conforme</option>
                      <option value="en_cours">En cours</option>
                      <option value="na">Non applicable</option>
                    </select>

                    <Link
                      href={`/qualiopi/indicateur/${ind.numero}`}
                      className="text-xs text-secondary hover:underline font-medium"
                    >
                      Détails & documents →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageSection>
  );
}
