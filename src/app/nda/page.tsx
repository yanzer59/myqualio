"use client";
import Link from "next/link";
import { useOrganisme } from "@/lib/OrganismeContext";
import { PageSection, StatCard, InfoCard, AlertBox } from "@/components/ui";

export default function NdaPage() {
  const { organisme, loading } = useOrganisme();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!organisme) return null;

  const ndaStatut = organisme.nda_statut || "non_demande";
  const statusLabels: Record<string, string> = {
    non_demande: "Non demandé",
    en_preparation: "En préparation",
    envoye: "Envoyé",
    recepisse_recu: "Récépissé reçu",
    obtenu: "Obtenu",
  };

  return (
    <PageSection title="Déclaration d'Activité (NDA)">
      <AlertBox bg="bg-secondary-light" textColor="text-secondary">
        <strong>Qu&apos;est-ce que la NDA ?</strong> Le Numéro de Déclaration d&apos;Activité est obligatoire pour tout
        organisme de formation. Il s&apos;obtient auprès de la DREETS (anciennement DIRECCTE) de votre région.
      </AlertBox>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <StatCard label="Statut actuel" value={statusLabels[ndaStatut]} color="text-secondary" />
        <StatCard label="N° NDA" value={organisme.nda_numero || "—"} color="text-primary" />
        <StatCard label="Organisme" value={organisme.nom} color="text-dark" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/nda/formulaire">
          <div className="bg-white border-2 border-primary/20 rounded-lg p-6 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="font-bold text-primary text-lg mb-2">Formulaire de déclaration</h3>
            <p className="text-sm text-gray-text">
              Remplissez le formulaire Cerfa n°10782*05 de manière guidée, étape par étape.
            </p>
          </div>
        </Link>

        <Link href="/nda/suivi">
          <div className="bg-white border-2 border-secondary/20 rounded-lg p-6 hover:border-secondary/50 hover:shadow-md transition-all cursor-pointer">
            <div className="text-3xl mb-3">📌</div>
            <h3 className="font-bold text-secondary text-lg mb-2">Suivi du dossier</h3>
            <p className="text-sm text-gray-text">
              Suivez l&apos;avancement de votre dossier NDA auprès de la DREETS.
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-6">
        <InfoCard color="border-accent">
          <p className="text-xs font-bold text-accent uppercase mb-2">Pièces à fournir pour la déclaration</p>
          <ul className="text-sm text-dark space-y-1 list-disc list-inside">
            <li>Formulaire Cerfa n°10782*05 complété et signé</li>
            <li>Copie de la première convention ou du premier contrat de formation</li>
            <li>Bulletin n°3 du casier judiciaire du dirigeant</li>
            <li>Justificatif d&apos;attribution du numéro SIREN</li>
          </ul>
        </InfoCard>
      </div>
    </PageSection>
  );
}
