"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

// Styles partagés
export const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light";
export const inputErrorCls = "w-full border border-red rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red focus:ring-2 focus:ring-red/20";
export const labelCls = "block text-sm font-bold text-primary mb-1";

// Champ texte simple
export function Field({ label, field, data, onUpdate, placeholder, type = "text", required }: {
  label: string; field: string; data: Record<string, string>; onUpdate: (f: string, v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  const isEmpty = required && !data[field]?.trim();
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="text-red ml-1">*</span>}
      </label>
      <input
        type={type}
        className={isEmpty ? inputErrorCls : inputCls}
        value={data[field] || ""}
        onChange={(e) => onUpdate(field, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

// Champ téléphone avec formatage auto (06 12 34 56 78)
export function PhoneField({ label, field, data, onUpdate, required, placeholder }: {
  label: string; field: string; data: Record<string, string>; onUpdate: (f: string, v: string) => void;
  required?: boolean; placeholder?: string;
}) {
  const isEmpty = required && !data[field]?.trim();

  function formatPhone(value: string) {
    // Garder uniquement les chiffres et le +
    const cleaned = value.replace(/[^\d+]/g, "");
    // Format français : 06 12 34 56 78
    if (cleaned.startsWith("+")) {
      // International
      const digits = cleaned.slice(1);
      const parts = digits.match(/.{1,2}/g) || [];
      return "+" + parts.join(" ");
    }
    const parts = cleaned.match(/.{1,2}/g) || [];
    return parts.join(" ");
  }

  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="text-red ml-1">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text text-sm">📞</span>
        <input
          type="tel"
          className={(isEmpty ? inputErrorCls : inputCls) + " pl-9"}
          value={data[field] || ""}
          onChange={(e) => onUpdate(field, formatPhone(e.target.value))}
          placeholder={placeholder || "06 12 34 56 78"}
          maxLength={17}
        />
      </div>
    </div>
  );
}

// Champ email avec validation
export function EmailField({ label, field, data, onUpdate, required, placeholder }: {
  label: string; field: string; data: Record<string, string>; onUpdate: (f: string, v: string) => void;
  required?: boolean; placeholder?: string;
}) {
  const value = data[field] || "";
  const isEmpty = required && !value.trim();
  const isInvalid = value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="text-red ml-1">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text text-sm">✉️</span>
        <input
          type="email"
          className={((isEmpty || isInvalid) ? inputErrorCls : inputCls) + " pl-9"}
          value={value}
          onChange={(e) => onUpdate(field, e.target.value.toLowerCase())}
          placeholder={placeholder || "contact@exemple.fr"}
        />
      </div>
      {isInvalid && <p className="text-red text-xs mt-1">Adresse email invalide</p>}
    </div>
  );
}

// Champ adresse avec autocomplétion API Adresse gouv.fr
export function AddressField({ label, field, data, onUpdate, required }: {
  label: string; field: string; data: Record<string, string>; onUpdate: (f: string, v: string) => void;
  required?: boolean;
}) {
  const [suggestions, setSuggestions] = useState<{ label: string; context: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isEmpty = required && !data[field]?.trim();

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 3) { setSuggestions([]); return; }
    try {
      const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&limit=5`);
      const json = await res.json();
      const results = (json.features || []).map((f: { properties: { label: string; context: string } }) => ({
        label: f.properties.label,
        context: f.properties.context,
      }));
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } catch {
      setSuggestions([]);
    }
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    onUpdate(field, value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => fetchSuggestions(value), 300);
  }

  function selectSuggestion(s: { label: string }) {
    onUpdate(field, s.label);
    setQuery(s.label);
    setShowSuggestions(false);
    setSuggestions([]);
  }

  // Fermer les suggestions si on clique ailleurs
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <label className={labelCls}>
        {label}
        {required && <span className="text-red ml-1">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text text-sm">📍</span>
        <input
          type="text"
          className={(isEmpty ? inputErrorCls : inputCls) + " pl-9"}
          value={data[field] || query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Commencez à taper l'adresse..."
          autoComplete="off"
        />
      </div>
      {showSuggestions && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => selectSuggestion(s)}
              className="w-full text-left px-4 py-2.5 hover:bg-primary-light transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="text-sm font-medium text-dark">{s.label}</div>
              <div className="text-xs text-gray-text">{s.context}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Champ textarea
export function TextArea({ label, field, data, onUpdate, placeholder, rows = 3, required }: {
  label: string; field: string; data: Record<string, string>; onUpdate: (f: string, v: string) => void;
  placeholder?: string; rows?: number; required?: boolean;
}) {
  const isEmpty = required && !data[field]?.trim();
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="text-red ml-1">*</span>}
      </label>
      <textarea
        className={(isEmpty ? inputErrorCls : inputCls) + " resize-none"}
        rows={rows}
        value={data[field] || ""}
        onChange={(e) => onUpdate(field, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

// Menu déroulant
export function Select({ label, field, data, onUpdate, options, placeholder, required }: {
  label: string; field: string; data: Record<string, string>; onUpdate: (f: string, v: string) => void;
  options: string[]; placeholder?: string; required?: boolean;
}) {
  const isEmpty = required && !data[field]?.trim();
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="text-red ml-1">*</span>}
      </label>
      <select
        className={isEmpty ? inputErrorCls : inputCls}
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
