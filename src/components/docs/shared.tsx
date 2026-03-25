"use client";
import { CAMPUS } from "@/lib/campus-data";
import React from "react";

// Styles partagés
export const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light";
export const labelCls = "block text-sm font-bold text-primary mb-1";
export const sectionCls = "bg-primary text-white font-bold text-sm px-4 py-2.5 rounded-t-lg";
export const boxCls = "bg-white border border-gray-200 border-t-0 rounded-b-lg p-5 space-y-4";

// Champ texte simple
export function Field({ label, field, data, onUpdate, placeholder, type = "text", required }: {
  label: string; field: string; data: Record<string, string>; onUpdate: (f: string, v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className={labelCls}>{label}{required && " *"}</label>
      <input
        type={type}
        className={inputCls}
        value={data[field] || ""}
        onChange={(e) => onUpdate(field, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

// Champ textarea
export function TextArea({ label, field, data, onUpdate, placeholder, rows = 3 }: {
  label: string; field: string; data: Record<string, string>; onUpdate: (f: string, v: string) => void;
  placeholder?: string; rows?: number;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <textarea
        className={inputCls + " resize-none"}
        rows={rows}
        value={data[field] || ""}
        onChange={(e) => onUpdate(field, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

// Section avec titre
export function Section({ title, color = "bg-primary", children }: { title: string; color?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className={`${color} text-white font-bold text-sm px-4 py-2.5 rounded-t-lg`}>{title}</div>
      <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-5 space-y-4">
        {children}
      </div>
    </div>
  );
}

// Info pré-remplie (non éditable)
export function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2 text-sm py-0.5">
      <span className="font-medium text-gray-text w-44 shrink-0">{label} :</span>
      <span className="text-dark font-medium">{value || "—"}</span>
    </div>
  );
}

// En-tête Campus Excellence (utilisé dans chaque document)
export function CampusHeader() {
  return (
    <div className="bg-primary-light rounded-lg p-4 mb-4 text-sm">
      <div className="font-bold text-primary">{CAMPUS.nom}</div>
      <div className="text-gray-text">Centre de Formation en Alternance — Groupe APEN</div>
      <div className="text-gray-text">{CAMPUS.adresse} — {CAMPUS.cp} {CAMPUS.ville}</div>
      <div className="text-gray-text">{CAMPUS.email}</div>
    </div>
  );
}
