"use client";
import React from "react";
import { STATUT_COLORS, STATUT_LABELS, type StatutIndicateur } from "@/lib/types";

/* ========= SECTION BANNER ========= */
export function SectionBanner({ title, color = "bg-primary" }: { title: string; color?: string }) {
  return (
    <div className={`${color} text-white font-bold text-lg px-5 py-3 rounded-sm`}>
      {title}
    </div>
  );
}

/* ========= INFO CARD ========= */
export function InfoCard({ color = "border-secondary", children }: { color?: string; children: React.ReactNode }) {
  return (
    <div className={`border-l-4 ${color} pl-5 py-4 my-2`}>{children}</div>
  );
}

/* ========= ALERT BOX ========= */
export function AlertBox({ children, bg = "bg-primary-light", textColor = "text-primary" }: { children: React.ReactNode; bg?: string; textColor?: string }) {
  return (
    <div className={`${bg} ${textColor} px-5 py-3 rounded-sm my-3 text-sm`}>{children}</div>
  );
}

/* ========= STAT CARD ========= */
export function StatCard({ label, value, color = "text-primary", bg = "bg-white" }: { label: string; value: string | number; color?: string; bg?: string }) {
  return (
    <div className={`${bg} rounded-lg border border-gray-200 p-5 text-center shadow-sm`}>
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-text mt-1">{label}</div>
    </div>
  );
}

/* ========= STATUS BADGE ========= */
export function StatusBadge({ statut }: { statut: StatutIndicateur }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${STATUT_COLORS[statut]}`}>
      {STATUT_LABELS[statut]}
    </span>
  );
}

/* ========= PROGRESS BAR ========= */
export function ProgressBar({ value, max, color = "bg-green", height = "h-2.5" }: { value: number; max: number; color?: string; height?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="w-full">
      <div className={`w-full bg-light-gray rounded-full ${height} overflow-hidden`}>
        <div className={`${color} ${height} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-text mt-0.5 block text-right">{pct}%</span>
    </div>
  );
}

/* ========= PROGRESS GAUGE (circular) ========= */
export function ProgressGauge({ value, max, size = 120, strokeWidth = 10 }: { value: number; max: number; size?: number; strokeWidth?: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 80 ? "#27AE60" : pct >= 50 ? "#E67E22" : "#E74C3C";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F2F3F4" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-700" />
      </svg>
      <div className="absolute text-center">
        <span className="text-2xl font-bold" style={{ color }}>{pct}%</span>
        <span className="block text-xs text-gray-text">{value}/{max}</span>
      </div>
    </div>
  );
}

/* ========= PAGE SECTION ========= */
export function PageSection({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b-2 border-accent pb-2 mb-6">
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* ========= EMPTY STATE ========= */
export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-4">📋</div>
      <h3 className="text-lg font-semibold text-dark mb-2">{title}</h3>
      <p className="text-sm text-gray-text mb-4">{description}</p>
      {action}
    </div>
  );
}

/* ========= DATA TABLE ========= */
export function DataTable({ headers, rows, headerBg = "bg-primary" }: { headers: string[]; rows: React.ReactNode[][]; headerBg?: string }) {
  return (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className={`${headerBg} text-white font-bold px-3 py-2 text-left`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`${i % 2 === 0 ? "bg-primary-light/30" : "bg-white"} hover:bg-primary-light/50 transition-colors`}>
              {row.map((cell, j) => (
                <td key={j} className={`px-3 py-2.5 border-b border-gray-200 ${j === 0 ? "font-semibold" : ""}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
