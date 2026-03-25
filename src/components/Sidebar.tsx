"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DOCUMENTS } from "@/lib/documents";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const formation = DOCUMENTS.filter((d) => d.group === "formation");
  const qualite = DOCUMENTS.filter((d) => d.group === "qualite");
  const dossier = DOCUMENTS.filter((d) => d.group === "dossier");

  function isActive(id: string) {
    return pathname === `/doc/${id}`;
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

      {open && <div className="lg:hidden fixed inset-0 bg-black/40 z-30" onClick={() => setOpen(false)} />}

      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-40 overflow-y-auto
        transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:shrink-0
      `}>
        {/* Header */}
        <Link href="/" onClick={() => setOpen(false)}>
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-5">
            <h2 className="font-bold text-xl leading-tight">MyQualio</h2>
            <p className="text-sm text-green-200 mt-1">Campus Excellence — TP AMIS</p>
          </div>
        </Link>

        <nav className="p-3 text-[13px]">
          {/* Dossiers principaux */}
          <p className="text-[10px] font-bold text-gray-text uppercase tracking-wider px-3 mb-1.5">Dossiers</p>
          {dossier.map((d) => (
            <NavItem key={d.id} doc={d} active={isActive(d.id)} onClick={() => setOpen(false)} />
          ))}

          <div className="border-b border-gray-200 my-2"></div>

          {/* Documents de formation */}
          <p className="text-[10px] font-bold text-gray-text uppercase tracking-wider px-3 mb-1.5">Formation</p>
          {formation.map((d) => (
            <NavItem key={d.id} doc={d} active={isActive(d.id)} onClick={() => setOpen(false)} />
          ))}

          <div className="border-b border-gray-200 my-2"></div>

          {/* Qualité & Moyens */}
          <p className="text-[10px] font-bold text-gray-text uppercase tracking-wider px-3 mb-1.5">Qualité & Moyens</p>
          {qualite.map((d) => (
            <NavItem key={d.id} doc={d} active={isActive(d.id)} onClick={() => setOpen(false)} />
          ))}
        </nav>
      </aside>
    </>
  );
}

function NavItem({ doc, active, onClick }: { doc: typeof DOCUMENTS[0]; active: boolean; onClick: () => void }) {
  const numColor = doc.group === "dossier" ? "bg-accent text-dark" : doc.group === "formation" ? "bg-secondary text-white" : "bg-primary text-white";

  return (
    <Link
      href={`/doc/${doc.id}`}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-2 py-1.5 rounded-md mb-0.5 transition-colors
        ${active
          ? "bg-primary text-white font-semibold"
          : "text-dark hover:bg-primary-light hover:text-primary"
        }
      `}
    >
      <span className={`
        w-6 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0
        ${active ? "bg-accent text-dark" : numColor}
      `}>
        {doc.num}
      </span>
      <span className="truncate">{doc.shortTitle}</span>
    </Link>
  );
}
