"use client";
import { useState, useEffect } from "react";
import { useOrganisme } from "@/lib/OrganismeContext";
import { getSupabase } from "@/lib/supabase";
import { PageSection, SectionBanner } from "@/components/ui";
import type { NdaDossier } from "@/lib/types";
import Link from "next/link";

const ETAPES = [
  { key: "brouillon", label: "Brouillon", desc: "Le formulaire est en cours de rédaction.", icon: "📝" },
  { key: "pret", label: "Prêt à envoyer", desc: "Le dossier est complet et prêt à être envoyé à la DREETS.", icon: "✅" },
  { key: "envoye", label: "Envoyé", desc: "Le dossier a été envoyé à la DREETS.", icon: "📤" },
  { key: "recepisse", label: "Récépissé reçu", desc: "La DREETS a accusé réception de votre dossier.", icon: "📬" },
  { key: "obtenu", label: "NDA obtenu", desc: "Votre numéro de déclaration d'activité a été attribué.", icon: "🎉" },
];

export default function NdaSuiviPage() {
  const { organisme } = useOrganisme();
  const [dossier, setDossier] = useState<NdaDossier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organisme) return;
    async function load() {
      const { data } = await getSupabase()
        .from("nda_dossiers")
        .select("*")
        .eq("organisme_id", organisme!.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      setDossier(data);
      setLoading(false);
    }
    load();
  }, [organisme]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentStatut = dossier?.statut || "brouillon";
  const currentIndex = ETAPES.findIndex((e) => e.key === currentStatut);

  async function updateStatut(newStatut: string) {
    if (!dossier) return;
    const sb = getSupabase();
    const updates: Record<string, unknown> = { statut: newStatut, updated_at: new Date().toISOString() };
    if (newStatut === "envoye") updates.date_envoi = new Date().toISOString().split("T")[0];
    if (newStatut === "recepisse") updates.date_recepisse = new Date().toISOString().split("T")[0];
    if (newStatut === "obtenu") updates.date_obtention = new Date().toISOString().split("T")[0];

    await sb.from("nda_dossiers").update(updates).eq("id", dossier.id);
    setDossier({ ...dossier, ...updates } as NdaDossier);
  }

  return (
    <PageSection
      title="Suivi du dossier NDA"
      action={
        <Link href="/nda" className="text-sm text-secondary hover:underline">
          Retour
        </Link>
      }
    >
      {!dossier ? (
        <div className="text-center py-12">
          <p className="text-gray-text mb-4">Aucun dossier NDA en cours.</p>
          <Link href="/nda/formulaire" className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg text-sm">
            Créer un dossier
          </Link>
        </div>
      ) : (
        <>
          <SectionBanner title="Progression du dossier" color="bg-secondary" />
          <div className="mt-6 space-y-0">
            {ETAPES.map((etape, i) => {
              const isDone = i <= currentIndex;
              const isCurrent = i === currentIndex;
              return (
                <div key={etape.key} className="flex gap-4">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${
                      isDone ? "bg-green text-white" : "bg-light-gray text-gray-text"
                    } ${isCurrent ? "ring-4 ring-green/30" : ""}`}>
                      {isDone ? "✓" : etape.icon}
                    </div>
                    {i < ETAPES.length - 1 && (
                      <div className={`w-0.5 h-12 ${i < currentIndex ? "bg-green" : "bg-light-gray"}`} />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`pb-6 ${isCurrent ? "" : "opacity-60"}`}>
                    <h4 className={`font-bold text-sm ${isDone ? "text-green" : "text-dark"}`}>
                      {etape.label}
                    </h4>
                    <p className="text-xs text-gray-text">{etape.desc}</p>
                    {isCurrent && i < ETAPES.length - 1 && (
                      <button
                        onClick={() => updateStatut(ETAPES[i + 1].key)}
                        className="mt-2 bg-primary hover:bg-primary/90 text-white text-xs font-medium px-4 py-1.5 rounded transition-colors"
                      >
                        Passer à &quot;{ETAPES[i + 1].label}&quot;
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dates */}
          {(dossier.date_envoi || dossier.date_recepisse || dossier.date_obtention || dossier.nda_numero) && (
            <div className="mt-4 bg-light-gray rounded-lg p-4 space-y-1">
              {dossier.date_envoi && <p className="text-sm"><strong>Date d&apos;envoi :</strong> {dossier.date_envoi}</p>}
              {dossier.date_recepisse && <p className="text-sm"><strong>Date récépissé :</strong> {dossier.date_recepisse}</p>}
              {dossier.date_obtention && <p className="text-sm"><strong>Date d&apos;obtention :</strong> {dossier.date_obtention}</p>}
              {dossier.nda_numero && <p className="text-sm"><strong>N° NDA :</strong> {dossier.nda_numero}</p>}
            </div>
          )}
        </>
      )}
    </PageSection>
  );
}
