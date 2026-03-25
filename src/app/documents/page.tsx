"use client";
import { useState, useEffect } from "react";
import { useOrganisme } from "@/lib/OrganismeContext";
import { getSupabase } from "@/lib/supabase";
import { PageSection, SectionBanner, EmptyState } from "@/components/ui";
import { INDICATEURS } from "@/lib/indicateurs";
import type { Document } from "@/lib/types";

export default function DocumentsPage() {
  const { organisme } = useOrganisme();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filterIndicateur, setFilterIndicateur] = useState<number | "all">("all");
  const [filterCategorie, setFilterCategorie] = useState<string>("all");

  useEffect(() => {
    if (!organisme) return;
    async function load() {
      const { data } = await getSupabase()
        .from("documents")
        .select("*")
        .eq("organisme_id", organisme!.id)
        .order("created_at", { ascending: false });
      setDocuments(data || []);
      setLoading(false);
    }
    load();
  }, [organisme]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !organisme) return;
    setUploading(true);

    for (const file of Array.from(e.target.files)) {
      const path = `${organisme.id}/${filterIndicateur !== "all" ? filterIndicateur : "general"}/${Date.now()}_${file.name}`;
      const sb = getSupabase();

      const { error: uploadError } = await sb.storage
        .from("documents")
        .upload(path, file);

      if (!uploadError) {
        const { data } = await sb.from("documents").insert({
          organisme_id: organisme.id,
          indicateur_id: filterIndicateur !== "all" ? filterIndicateur : null,
          nom: file.name,
          categorie: filterCategorie !== "all" ? filterCategorie : "preuve",
          storage_path: path,
          taille: file.size,
          mime_type: file.type,
        }).select().single();

        if (data) setDocuments((prev) => [data, ...prev]);
      }
    }

    setUploading(false);
    e.target.value = "";
  }

  async function handleDelete(doc: Document) {
    const sb = getSupabase();
    await sb.storage.from("documents").remove([doc.storage_path]);
    await sb.from("documents").delete().eq("id", doc.id);
    setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
  }

  const filtered = documents.filter((d) => {
    if (filterIndicateur !== "all" && d.indicateur_id !== filterIndicateur) return false;
    if (filterCategorie !== "all" && d.categorie !== filterCategorie) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <PageSection title="Gestion documentaire">
      {/* Filters & Upload */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={filterIndicateur}
          onChange={(e) => setFilterIndicateur(e.target.value === "all" ? "all" : Number(e.target.value))}
          className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
        >
          <option value="all">Tous les indicateurs</option>
          {INDICATEURS.map((ind) => (
            <option key={ind.numero} value={ind.numero}>I{ind.numero} - {ind.titre.substring(0, 40)}</option>
          ))}
        </select>
        <select
          value={filterCategorie}
          onChange={(e) => setFilterCategorie(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
        >
          <option value="all">Toutes catégories</option>
          <option value="preuve">Preuve</option>
          <option value="modele">Modèle</option>
          <option value="procedure">Procédure</option>
          <option value="autre">Autre</option>
        </select>
        <label className={`bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors ${uploading ? "opacity-50" : ""}`}>
          {uploading ? "Upload..." : "Uploader un document"}
          <input type="file" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {/* Document list */}
      {filtered.length === 0 ? (
        <EmptyState
          title="Aucun document"
          description="Uploadez vos premières preuves et documents pour vos indicateurs Qualiopi."
        />
      ) : (
        <div className="space-y-2">
          <SectionBanner title={`${filtered.length} document(s)`} color="bg-secondary" />
          {filtered.map((doc) => {
            const ind = INDICATEURS.find((i) => i.numero === doc.indicateur_id);
            return (
              <div key={doc.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:shadow-sm transition-shadow">
                <div className="text-2xl">
                  {doc.mime_type?.includes("pdf") ? "📕" : doc.mime_type?.includes("image") ? "🖼" : "📄"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-dark text-sm truncate">{doc.nom}</p>
                  <p className="text-xs text-gray-text">
                    {ind ? `I${ind.numero} - ${ind.titre.substring(0, 30)}` : "Général"}
                    {" · "}
                    {doc.categorie}
                    {" · "}
                    {doc.taille ? `${(doc.taille / 1024).toFixed(0)} Ko` : ""}
                    {" · "}
                    {new Date(doc.created_at).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(doc)}
                  className="text-red hover:text-red/70 text-xs font-medium"
                >
                  Supprimer
                </button>
              </div>
            );
          })}
        </div>
      )}
    </PageSection>
  );
}
