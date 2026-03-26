import { NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

type D = Record<string, string>;

// ============ COULEURS ============
const PRIMARY: [number, number, number] = [13, 107, 78];
const SECONDARY: [number, number, number] = [27, 107, 138];
const ACCENT: [number, number, number] = [212, 172, 13];
const DARK: [number, number, number] = [28, 40, 51];
const GRAY: [number, number, number] = [93, 109, 126];
const LIGHT: [number, number, number] = [240, 250, 246];
const WHITE: [number, number, number] = [255, 255, 255];

// ============ HELPERS ============
function addBanner(pdf: jsPDF, text: string, y: number, color: [number, number, number] = PRIMARY): number {
  pdf.setFillColor(...color);
  pdf.rect(15, y, 180, 8, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(...WHITE);
  pdf.text("   " + text, 17, y + 5.5);
  pdf.setTextColor(...DARK);
  return y + 12;
}

function addH1(pdf: jsPDF, text: string, y: number): number {
  if (y > 260) { pdf.addPage(); y = 20; }
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(...PRIMARY);
  pdf.text(text, 15, y);
  // ligne accent sous le titre
  pdf.setDrawColor(...ACCENT);
  pdf.setLineWidth(0.5);
  pdf.line(15, y + 2, 195, y + 2);
  pdf.setTextColor(...DARK);
  return y + 8;
}

function addField(pdf: jsPDF, label: string, value: string, y: number, shade = false): number {
  if (y > 275) { pdf.addPage(); y = 20; }
  if (shade) {
    pdf.setFillColor(...LIGHT);
    pdf.rect(15, y - 3.5, 180, 7, "F");
  }
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(...PRIMARY);
  pdf.text(label + " :", 17, y);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...DARK);
  // Wrap long values
  const maxWidth = 120;
  const lines = pdf.splitTextToSize(value || "—", maxWidth);
  pdf.text(lines, 70, y);
  const lineHeight = lines.length > 1 ? lines.length * 4 : 0;
  // Ligne pointillée
  pdf.setDrawColor(189, 195, 199);
  pdf.setLineWidth(0.2);
  pdf.line(17, y + 2 + lineHeight, 193, y + 2 + lineHeight);
  return y + 6 + lineHeight;
}

function addPara(pdf: jsPDF, text: string, y: number, opts?: { bold?: boolean; italic?: boolean; size?: number; color?: [number, number, number] }): number {
  if (y > 270) { pdf.addPage(); y = 20; }
  const style = opts?.bold ? "bold" : opts?.italic ? "italic" : "normal";
  pdf.setFont("helvetica", style);
  pdf.setFontSize(opts?.size || 10);
  pdf.setTextColor(...(opts?.color || DARK));
  const lines = pdf.splitTextToSize(text, 170);
  pdf.text(lines, 17, y);
  return y + lines.length * 4.5 + 2;
}

function addFooter(pdf: jsPDF, organisme: string) {
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor(...GRAY);
    pdf.text(`${organisme} — MyQualio`, 15, 290);
    pdf.text(`Page ${i}/${pageCount}`, 185, 290);
  }
}

// ============ LIVRET D'ACCUEIL ============
function buildLivretAccueil(pdf: jsPDF, d: D) {
  // Page de couverture
  pdf.setFillColor(...PRIMARY);
  pdf.rect(0, 0, 210, 297, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(32);
  pdf.setTextColor(...WHITE);
  pdf.text(d.raison_sociale || "Organisme de Formation", 105, 80, { align: "center" });

  pdf.setFontSize(14);
  pdf.setTextColor(200, 230, 215);
  pdf.text("Centre de Formation en Alternance", 105, 95, { align: "center" });

  pdf.setFontSize(10);
  pdf.text(d.adresse || "", 105, 110, { align: "center" });
  pdf.text(d.email_contact || "", 105, 118, { align: "center" });

  pdf.setFillColor(...ACCENT);
  pdf.rect(80, 140, 50, 1, "F");

  pdf.setFontSize(28);
  pdf.setTextColor(...WHITE);
  pdf.text("LIVRET D'ACCUEIL", 105, 170, { align: "center" });
  pdf.setFontSize(16);
  pdf.text("de l'apprenant", 105, 182, { align: "center" });

  pdf.setFontSize(12);
  pdf.setTextColor(...ACCENT);
  pdf.text(d.formation_titre || "Formation", 105, 210, { align: "center" });
  pdf.setFontSize(10);
  pdf.setTextColor(200, 230, 215);
  pdf.text(`${d.formation_rncp || ""} — ${d.formation_niveau || ""}`, 105, 220, { align: "center" });

  // Page 2
  pdf.addPage();
  let y = 20;

  // 1. Présentation
  y = addH1(pdf, "1. Présentation de l'organisme", y);
  y = addField(pdf, "Raison sociale", d.raison_sociale || "", y, true);
  y = addField(pdf, "Forme juridique", d.forme_juridique || "", y);
  y = addField(pdf, "Président", d.president || "", y, true);
  y = addField(pdf, "Responsable pédagogique", d.responsable_peda || "", y);
  y = addField(pdf, "Adresse", d.adresse || "", y, true);
  y = addField(pdf, "Téléphone", d.telephone || "", y);
  y = addField(pdf, "Email", d.email_contact || "", y, true);
  y = addField(pdf, "Site internet", d.site_web || "", y);
  y = addField(pdf, "LinkedIn", d.linkedin || "", y, true);

  // 2. Formation
  y += 4;
  y = addH1(pdf, "2. La formation", y);
  y = addField(pdf, "Intitulé", d.formation_titre || "", y, true);
  y = addField(pdf, "RNCP", d.formation_rncp || "", y);
  y = addField(pdf, "Niveau", d.formation_niveau || "", y, true);
  y = addField(pdf, "Certificateur", d.formation_certificateur || "", y);
  y = addField(pdf, "Durée totale", d.formation_duree || "", y, true);
  y = addField(pdf, "Heures CFA", d.formation_heures || "", y);
  y = addField(pdf, "Rythme", d.formation_rythme || "", y, true);

  // Blocs de compétences
  y += 4;
  y = addBanner(pdf, "Blocs de compétences", y, SECONDARY);
  for (let i = 0; i < 3; i++) {
    const code = d[`bloc_${i}_code`];
    const titre = d[`bloc_${i}_titre`];
    const heures = d[`bloc_${i}_heures`];
    if (code || titre) {
      if (y > 265) { pdf.addPage(); y = 20; }
      y = addField(pdf, `${code || `BC0${i+1}`} (${heures || "?"}h)`, titre || "", y, i % 2 === 0);
    }
  }

  // 3. Infos pratiques
  y += 4;
  if (y > 240) { pdf.addPage(); y = 20; }
  y = addH1(pdf, "3. Informations pratiques", y);
  y = addField(pdf, "Horaires du CFA", d.horaires_cfa || "", y, true);
  y = addField(pdf, "Jour de formation", d.jour_cfa || "", y);
  y = addField(pdf, "Accès transports", d.acces_transports || "", y, true);
  y = addField(pdf, "Restauration", d.restauration || "", y);

  // 4. Référent handicap
  y += 4;
  if (y > 250) { pdf.addPage(); y = 20; }
  y = addH1(pdf, "4. Référent handicap", y);
  y = addField(pdf, "Nom du référent", d.referent_handicap || "", y, true);
  y = addField(pdf, "Email", d.referent_handicap_email || "", y);
  y = addField(pdf, "Téléphone", d.referent_handicap_tel || "", y, true);

  // 5. Contacts utiles
  y += 4;
  if (y > 250) { pdf.addPage(); y = 20; }
  y = addH1(pdf, "5. Contacts utiles", y);
  y = addField(pdf, "Urgence", d.urgence_tel || "15 (SAMU), 17 (Police), 18 (Pompiers)", y, true);
  y = addField(pdf, "Médecine du travail", d.medecine_travail || "", y);

  // 6. Règlement intérieur
  if (d.reglement) {
    y += 4;
    if (y > 230) { pdf.addPage(); y = 20; }
    y = addH1(pdf, "6. Règlement intérieur", y);
    const lines = d.reglement.split("\n").filter((l) => l.trim());
    for (const line of lines) {
      if (y > 275) { pdf.addPage(); y = 20; }
      y = addPara(pdf, "• " + line.trim(), y);
    }
  }

  addFooter(pdf, d.raison_sociale || "MyQualio");
}

// ============ FALLBACK GÉNÉRIQUE ============
function buildGeneric(pdf: jsPDF, title: string, data: D) {
  // Couverture simple
  pdf.setFillColor(...PRIMARY);
  pdf.rect(0, 0, 210, 60, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(...WHITE);
  pdf.text(data.raison_sociale || "Organisme de Formation", 105, 25, { align: "center" });
  pdf.setFontSize(14);
  pdf.text(title, 105, 40, { align: "center" });
  pdf.setFontSize(9);
  pdf.setTextColor(200, 230, 215);
  pdf.text(`Généré le ${new Date().toLocaleDateString("fr-FR")}`, 105, 52, { align: "center" });

  // Tableau avec tous les champs remplis
  const rows = Object.entries(data)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => {
      const label = k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return [label, v];
    });

  if (rows.length > 0) {
    autoTable(pdf, {
      startY: 70,
      head: [["Champ", "Valeur"]],
      body: rows,
      theme: "grid",
      headStyles: { fillColor: PRIMARY, textColor: WHITE, fontStyle: "bold", fontSize: 9 },
      bodyStyles: { fontSize: 8, textColor: DARK },
      alternateRowStyles: { fillColor: LIGHT },
      margin: { left: 15, right: 15 },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 55 } },
    });
  } else {
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.setTextColor(...GRAY);
    pdf.text("Aucune donnée saisie.", 105, 80, { align: "center" });
  }

  addFooter(pdf, data.raison_sociale || "MyQualio");
}

// ============ ROUTE ============
export async function POST(req: Request) {
  try {
    const { docId, docTitle, data } = await req.json() as { docId: string; docTitle: string; data: D };

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    switch (docId) {
      case "livret-accueil":
        buildLivretAccueil(pdf, data);
        break;
      default:
        buildGeneric(pdf, docTitle, data);
        break;
    }

    const buffer = pdf.output("arraybuffer");
    const uint8 = new Uint8Array(buffer);
    const filename = `${docId}-${(data.raison_sociale || "document").replace(/\s+/g, "-").toLowerCase()}.pdf`;

    return new NextResponse(uint8, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Erreur génération PDF:", err);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
