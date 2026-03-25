"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useOrganisme } from "@/lib/OrganismeContext";
import { sections } from "@/lib/sections";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { organisme, organismes, switchOrganisme } = useOrganisme();

  const qualiopiSections = sections.filter((s) => s.group === "qualiopi");
  const ndaSections = sections.filter((s) => s.group === "nda");
  const outilsSections = sections.filter((s) => s.group === "outils");

  function isActive(id: string) {
    return pathname === `/${id}` || (id !== "qualiopi" && pathname.startsWith(`/${id}`));
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-md shadow-lg"
        aria-label="Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {open && <div className="lg:hidden fixed inset-0 bg-black/40 z-30" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-40 overflow-y-auto
        transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:shrink-0
      `}>
        {/* Header */}
        <Link href="/qualiopi" onClick={() => setOpen(false)}>
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-5">
            <h2 className="font-bold text-xl leading-tight">MyQualio</h2>
            <p className="text-sm text-green-200 mt-1">Qualiopi & NDA</p>
          </div>
        </Link>

        {/* Organisme switcher */}
        {organismes.length > 1 && (
          <div className="px-3 py-2 border-b border-gray-200">
            <select
              value={organisme?.id || ""}
              onChange={(e) => switchOrganisme(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-primary"
            >
              {organismes.map((o) => (
                <option key={o.id} value={o.id}>{o.nom}</option>
              ))}
            </select>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-3">
          {/* Qualiopi group */}
          <p className="text-xs font-bold text-gray-text uppercase tracking-wider px-3 mb-2">Qualiopi</p>
          {qualiopiSections.map((s) => (
            <NavItem key={s.id} section={s} active={isActive(s.id)} onClick={() => setOpen(false)} />
          ))}

          <div className="border-b border-gray-200 my-3"></div>

          {/* NDA group */}
          <p className="text-xs font-bold text-gray-text uppercase tracking-wider px-3 mb-2">Déclaration d&apos;activité</p>
          {ndaSections.map((s) => (
            <NavItem key={s.id} section={s} active={isActive(s.id)} onClick={() => setOpen(false)} />
          ))}

          <div className="border-b border-gray-200 my-3"></div>

          {/* Outils group */}
          {outilsSections.map((s) => (
            <NavItem key={s.id} section={s} active={isActive(s.id)} onClick={() => setOpen(false)} />
          ))}
        </nav>
      </aside>
    </>
  );
}

function NavItem({ section, active, onClick }: { section: typeof sections[0]; active: boolean; onClick: () => void }) {
  return (
    <Link
      href={`/${section.id}`}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-0.5 transition-colors
        ${active
          ? "bg-primary text-white font-semibold"
          : "text-dark hover:bg-primary-light hover:text-primary"
        }
      `}
    >
      <span className={`
        w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
        ${active ? "bg-accent text-dark" : "bg-light-gray text-gray-text"}
      `}>
        {section.icon}
      </span>
      <span className="truncate">{section.shortTitle}</span>
    </Link>
  );
}
