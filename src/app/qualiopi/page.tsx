"use client";
import Link from "next/link";
import { useOrganisme } from "@/lib/OrganismeContext";
import { PageSection, ProgressGauge, StatCard, ProgressBar, EmptyState } from "@/components/ui";
import { CRITERE_TITLES, CRITERE_DESCRIPTIONS, CRITERE_INDICATEURS } from "@/lib/types";
import { useState } from "react";

export default function QualiopiDashboard() {
  const { organisme, suivis, loading, createOrganisme } = useOrganisme();
  const [newOrgName, setNewOrgName] = useState("");
  const [creating, setCreating] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!organisme) {
    return (
      <PageSection title="Bienvenue sur MyQualio">
        <EmptyState
          title="Aucun organisme configuré"
          description="Créez votre premier organisme de formation pour commencer."
          action={
            <div className="flex items-center gap-2 justify-center max-w-md mx-auto">
              <input
                type="text"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
                placeholder="Nom de votre CFA"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
              />
              <button
                onClick={async () => {
                  if (!newOrgName.trim()) return;
                  setCreating(true);
                  await createOrganisme(newOrgName.trim());
                  setCreating(false);
                }}
                disabled={creating || !newOrgName.trim()}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 text-sm"
              >
                {creating ? "..." : "Créer"}
              </button>
            </div>
          }
        />
      </PageSection>
    );
  }

  // Calculate stats
  const totalIndicateurs = 32;
  const conformes = suivis.filter((s) => s.statut === "conforme").length;
  const nonConformes = suivis.filter((s) => s.statut === "non_conforme").length;
  const enCours = suivis.filter((s) => s.statut === "en_cours").length;
  const nonEvalues = totalIndicateurs - conformes - nonConformes - enCours - suivis.filter((s) => s.statut === "na").length;

  return (
    <PageSection title={`Dashboard Qualiopi - ${organisme.nom}`}>
      {/* Global stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="md:col-span-2 lg:col-span-1 flex justify-center">
          <ProgressGauge value={conformes} max={totalIndicateurs} size={140} />
        </div>
        <StatCard label="Conformes" value={conformes} color="text-green" bg="bg-green/5" />
        <StatCard label="Non conformes" value={nonConformes} color="text-red" bg="bg-red/5" />
        <StatCard label="En cours" value={enCours} color="text-orange" bg="bg-orange/5" />
        <StatCard label="Non évalués" value={nonEvalues} color="text-gray-text" bg="bg-light-gray" />
      </div>

      {/* 7 Critères */}
      <h2 className="text-lg font-bold text-primary mb-4">Les 7 critères du RNQ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map((c) => {
          const indicateurIds = CRITERE_INDICATEURS[c];
          const total = indicateurIds.length;
          const conf = suivis.filter(
            (s) => indicateurIds.includes(s.indicateur_id) && s.statut === "conforme"
          ).length;

          return (
            <Link key={c} href={`/qualiopi/critere/${c}`}>
              <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    {c}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-primary text-sm">{CRITERE_TITLES[c]}</h3>
                    <p className="text-xs text-gray-text mt-1 line-clamp-2">{CRITERE_DESCRIPTIONS[c]}</p>
                    <div className="mt-3">
                      <ProgressBar value={conf} max={total} />
                    </div>
                    <p className="text-xs text-gray-text mt-1">{conf}/{total} indicateurs conformes</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </PageSection>
  );
}
