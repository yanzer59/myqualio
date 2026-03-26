"use client";
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

// Menu déroulant
export function Select({ label, field, data, onUpdate, options, placeholder }: {
  label: string; field: string; data: Record<string, string>; onUpdate: (f: string, v: string) => void;
  options: string[]; placeholder?: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <select
        className={inputCls}
        value={data[field] || ""}
        onChange={(e) => onUpdate(field, e.target.value)}
      >
        <option value="">{placeholder || "— Sélectionner —"}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
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

