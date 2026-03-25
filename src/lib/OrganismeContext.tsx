"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { getSupabase } from "./supabase";
import type { Organisme, IndicateurSuivi } from "./types";

interface OrganismeContextType {
  organisme: Organisme | null;
  organismes: Organisme[];
  suivis: IndicateurSuivi[];
  loading: boolean;
  switchOrganisme: (id: string) => void;
  reloadSuivis: () => Promise<void>;
  updateSuivi: (indicateurId: number, updates: Partial<IndicateurSuivi>) => Promise<void>;
  createOrganisme: (nom: string) => Promise<Organisme | null>;
}

const Ctx = createContext<OrganismeContextType | null>(null);

export function useOrganisme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOrganisme doit être utilisé dans OrganismeProvider");
  return ctx;
}

export function OrganismeProvider({ userId, children }: { userId: string; children: ReactNode }) {
  const [organismes, setOrganismes] = useState<Organisme[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [suivis, setSuivis] = useState<IndicateurSuivi[]>([]);
  const [loading, setLoading] = useState(true);

  const organisme = organismes.find((o) => o.id === activeId) || null;

  // Load organismes for the user
  useEffect(() => {
    async function load() {
      const sb = getSupabase();
      const { data: links } = await sb
        .from("user_organismes")
        .select("organisme_id")
        .eq("user_id", userId);

      if (links && links.length > 0) {
        const ids = links.map((l: { organisme_id: string }) => l.organisme_id);
        const { data: orgs } = await sb
          .from("organismes")
          .select("*")
          .in("id", ids);
        if (orgs) {
          setOrganismes(orgs);
          const saved = typeof window !== "undefined" ? localStorage.getItem("myqualio_org") : null;
          const first = saved && ids.includes(saved) ? saved : ids[0];
          setActiveId(first);
        }
      }
      setLoading(false);
    }
    load();
  }, [userId]);

  // Load suivis when organisme changes
  const reloadSuivis = useCallback(async () => {
    if (!activeId) return;
    const sb = getSupabase();
    const { data } = await sb
      .from("indicateur_suivis")
      .select("*")
      .eq("organisme_id", activeId);
    setSuivis(data || []);
  }, [activeId]);

  useEffect(() => {
    reloadSuivis();
  }, [reloadSuivis]);

  function switchOrganisme(id: string) {
    setActiveId(id);
    if (typeof window !== "undefined") localStorage.setItem("myqualio_org", id);
  }

  async function updateSuivi(indicateurId: number, updates: Partial<IndicateurSuivi>) {
    if (!activeId) return;
    const sb = getSupabase();
    const existing = suivis.find((s) => s.indicateur_id === indicateurId);

    if (existing) {
      await sb
        .from("indicateur_suivis")
        .update({ ...updates, updated_at: new Date().toISOString(), updated_by: userId })
        .eq("id", existing.id);
    } else {
      await sb.from("indicateur_suivis").insert({
        organisme_id: activeId,
        indicateur_id: indicateurId,
        ...updates,
        updated_by: userId,
      });
    }
    await reloadSuivis();
  }

  async function createOrganisme(nom: string): Promise<Organisme | null> {
    const sb = getSupabase();
    const { data: org, error } = await sb
      .from("organismes")
      .insert({ nom })
      .select()
      .single();
    if (error || !org) return null;

    await sb.from("user_organismes").insert({
      user_id: userId,
      organisme_id: org.id,
      role: "admin",
    });

    setOrganismes((prev) => [...prev, org]);
    setActiveId(org.id);
    if (typeof window !== "undefined") localStorage.setItem("myqualio_org", org.id);
    return org;
  }

  return (
    <Ctx.Provider value={{ organisme, organismes, suivis, loading, switchOrganisme, reloadSuivis, updateSuivi, createOrganisme }}>
      {children}
    </Ctx.Provider>
  );
}
