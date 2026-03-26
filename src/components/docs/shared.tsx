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

// Domaines email courants
const EMAIL_DOMAINS = [
  "gmail.com", "outlook.fr", "outlook.com", "hotmail.fr", "hotmail.com",
  "yahoo.fr", "yahoo.com", "orange.fr", "sfr.fr", "free.fr",
  "laposte.net", "icloud.com", "wanadoo.fr", "live.fr", "protonmail.com",
];

// Champ email avec validation + suggestions de domaines
export function EmailField({ label, field, data, onUpdate, required, placeholder }: {
  label: string; field: string; data: Record<string, string>; onUpdate: (f: string, v: string) => void;
  required?: boolean; placeholder?: string;
}) {
  const value = data[field] || "";
  const isEmpty = required && !value.trim();
  const isInvalid = value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const [showDomains, setShowDomains] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Détecter si on vient de taper "@" ou si on est après "@" sans point
  const atIndex = value.indexOf("@");
  const hasAt = atIndex !== -1;
  const afterAt = hasAt ? value.slice(atIndex + 1) : "";
  const beforeAt = hasAt ? value.slice(0, atIndex) : value;
  const needsSuggestion = hasAt && !afterAt.includes(".") && beforeAt.length > 0;

  // Filtrer les domaines qui matchent ce qui est tapé après @
  const filteredDomains = needsSuggestion
    ? EMAIL_DOMAINS.filter((d) => d.startsWith(afterAt.toLowerCase()) || afterAt === "")
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDomains(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function selectDomain(domain: string) {
    onUpdate(field, beforeAt + "@" + domain);
    setShowDomains(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
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
          onChange={(e) => {
            onUpdate(field, e.target.value.toLowerCase());
            setShowDomains(e.target.value.includes("@"));
          }}
          onFocus={() => { if (needsSuggestion) setShowDomains(true); }}
          placeholder={placeholder || "contact@exemple.fr"}
          autoComplete="off"
        />
      </div>
      {showDomains && filteredDomains.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filteredDomains.map((domain) => (
            <button
              key={domain}
              type="button"
              onClick={() => selectDomain(domain)}
              className="w-full text-left px-4 py-2 hover:bg-primary-light transition-colors border-b border-gray-100 last:border-0 text-sm"
            >
              <span className="text-gray-text">{beforeAt}@</span>
              <span className="font-medium text-primary">{domain}</span>
            </button>
          ))}
        </div>
      )}
      {isInvalid && !showDomains && <p className="text-red text-xs mt-1">Adresse email invalide</p>}
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

// Recherche d'entreprise via API gouv.fr — remplit automatiquement les infos organisme
interface CompanyResult {
  nom: string;
  siret: string;
  siren: string;
  adresse: string;
  cp: string;
  ville: string;
  forme_juridique: string;
  naf: string;
  dirigeant: string;
  date_creation: string;
  tranche_effectif: string;
}

const FORMES_MAP: Record<string, string> = {
  "SAS": "SAS (Société par Actions Simplifiée)",
  "SASU": "SASU (Société par Actions Simplifiée Unipersonnelle)",
  "SARL": "SARL (Société à Responsabilité Limitée)",
  "EURL": "EURL (Entreprise Unipersonnelle à Responsabilité Limitée)",
  "SA": "SA (Société Anonyme)",
  "SCI": "SCI (Société Civile Immobilière)",
  "Association": "Association loi 1901",
};

export function CompanySearch({ onSelect }: {
  onSelect: (company: CompanyResult) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CompanyResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const res = await fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(q)}&per_page=6`);
      const json = await res.json();
      const companies: CompanyResult[] = (json.results || []).map((r: Record<string, unknown>) => {
        const siege = r.siege as Record<string, unknown> || {};
        const dirigeants = (r.dirigeants as Array<Record<string, unknown>>) || [];
        const dirigeant = dirigeants.length > 0
          ? `${dirigeants[0].prenom || ""} ${dirigeants[0].nom || ""}`.trim()
          : "";
        const natureJuridique = (r.nature_juridique as string) || "";
        let forme = "";
        for (const [key, val] of Object.entries(FORMES_MAP)) {
          if (natureJuridique.toLowerCase().includes(key.toLowerCase())) { forme = val; break; }
        }
        if (!forme && natureJuridique) forme = natureJuridique;

        return {
          nom: (r.nom_complet as string) || (r.nom_raison_sociale as string) || "",
          siret: (siege.siret as string) || "",
          siren: (r.siren as string) || "",
          adresse: (siege.adresse as string) || "",
          cp: (siege.code_postal as string) || "",
          ville: (siege.libelle_commune as string) || "",
          forme_juridique: forme,
          naf: (siege.activite_principale as string) || "",
          dirigeant,
          date_creation: (r.date_creation as string) || "",
          tranche_effectif: (r.tranche_effectif_salarie as string) || "",
        };
      });
      setResults(companies);
      setShowResults(companies.length > 0);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(value), 400);
  }

  function selectCompany(c: CompanyResult) {
    setQuery(c.nom);
    setShowResults(false);
    onSelect(c);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative sm:col-span-2">
      <label className={labelCls}>
        🔍 Rechercher une entreprise <span className="text-gray-text font-normal">(auto-remplissage)</span>
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text text-sm">🏢</span>
        <input
          type="text"
          className={inputCls + " pl-9"}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder="Tapez le nom de la société (ex: Campus Excellence, APEN...)"
          autoComplete="off"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin inline-block"></span>
          </span>
        )}
      </div>
      {showResults && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-72 overflow-y-auto">
          {results.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => selectCompany(c)}
              className="w-full text-left px-4 py-3 hover:bg-primary-light transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm text-primary">{c.nom}</div>
                {c.forme_juridique && (
                  <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded">{c.forme_juridique.split("(")[0].trim()}</span>
                )}
              </div>
              <div className="text-xs text-gray-text mt-0.5">
                {c.siret && <span>SIRET {c.siret} · </span>}
                {c.adresse && <span>{c.adresse} </span>}
                {c.cp && c.ville && <span>— {c.cp} {c.ville}</span>}
              </div>
              {c.dirigeant && (
                <div className="text-xs text-dark mt-0.5">Dirigeant : {c.dirigeant}</div>
              )}
            </button>
          ))}
        </div>
      )}
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
