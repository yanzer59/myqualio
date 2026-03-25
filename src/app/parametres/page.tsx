"use client";
import { useState, useEffect } from "react";
import { useOrganisme } from "@/lib/OrganismeContext";
import { getSupabase } from "@/lib/supabase";
import { PageSection, SectionBanner } from "@/components/ui";

export default function ParametresPage() {
  const { organisme, createOrganisme } = useOrganisme();
  const [form, setForm] = useState({
    nom: "",
    siret: "",
    adresse: "",
    code_postal: "",
    ville: "",
    telephone: "",
    email: "",
    responsable_nom: "",
    responsable_prenom: "",
    responsable_qualite: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");

  useEffect(() => {
    if (organisme) {
      setForm({
        nom: organisme.nom || "",
        siret: organisme.siret || "",
        adresse: organisme.adresse || "",
        code_postal: organisme.code_postal || "",
        ville: organisme.ville || "",
        telephone: organisme.telephone || "",
        email: organisme.email || "",
        responsable_nom: organisme.responsable_nom || "",
        responsable_prenom: organisme.responsable_prenom || "",
        responsable_qualite: organisme.responsable_qualite || "",
      });
    }
  }, [organisme]);

  async function handleSave() {
    if (!organisme) return;
    setSaving(true);
    await getSupabase()
      .from("organismes")
      .update({ ...form, updated_at: new Date().toISOString() })
      .eq("id", organisme.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!organisme) return null;

  const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light";
  const labelCls = "block text-sm font-bold text-primary mb-1";

  return (
    <PageSection title="Paramètres">
      <SectionBanner title="Informations de l'organisme" />
      <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelCls}>Nom de l&apos;organisme :</label>
            <input type="text" className={inputCls} value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>SIRET :</label>
            <input type="text" className={inputCls} value={form.siret} onChange={(e) => setForm({ ...form, siret: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Téléphone :</label>
            <input type="tel" className={inputCls} value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Adresse :</label>
            <input type="text" className={inputCls} value={form.adresse} onChange={(e) => setForm({ ...form, adresse: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Code postal :</label>
            <input type="text" className={inputCls} value={form.code_postal} onChange={(e) => setForm({ ...form, code_postal: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Ville :</label>
            <input type="text" className={inputCls} value={form.ville} onChange={(e) => setForm({ ...form, ville: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Email :</label>
            <input type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SectionBanner title="Responsable" />
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nom :</label>
              <input type="text" className={inputCls} value={form.responsable_nom} onChange={(e) => setForm({ ...form, responsable_nom: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Prénom :</label>
              <input type="text" className={inputCls} value={form.responsable_prenom} onChange={(e) => setForm({ ...form, responsable_prenom: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Qualité (fonction) :</label>
              <input type="text" className={inputCls} value={form.responsable_qualite} onChange={(e) => setForm({ ...form, responsable_qualite: e.target.value })} placeholder="Gérant, Président, Directeur..." />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 text-sm"
        >
          {saving ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
        {saved && <span className="text-green text-sm font-medium">Enregistré !</span>}
      </div>

      {/* Ajouter un organisme */}
      <div className="mt-8">
        <SectionBanner title="Ajouter un organisme" color="bg-secondary" />
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-5">
          <p className="text-sm text-gray-text mb-3">Vous gérez plusieurs CFA ? Ajoutez un nouvel organisme.</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              placeholder="Nom du nouvel organisme"
              className={inputCls + " max-w-sm"}
            />
            <button
              onClick={async () => {
                if (!newOrgName.trim()) return;
                await createOrganisme(newOrgName.trim());
                setNewOrgName("");
              }}
              className="bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-2.5 rounded-lg text-sm"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
