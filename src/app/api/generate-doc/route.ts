import { NextResponse } from "next/server";
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, LevelFormat,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
} from "docx";

// ============ COULEURS ============
const C = {
  primary: "0D6B4E", secondary: "1B6B8A", accent: "D4AC0D",
  green: "27AE60", red: "E74C3C", light: "F0FAF6",
  dark: "1C2833", gray: "5D6D7E", white: "FFFFFF",
  lightGray: "F2F3F4", border: "BDC3C7",
};

const noBorder = { style: BorderStyle.NONE, size: 0, color: C.white };

// ============ HELPERS ============
function banner(title: string, color = C.primary) {
  return new Paragraph({
    spacing: { before: 240, after: 0 },
    shading: { fill: color, type: ShadingType.CLEAR },
    children: [new TextRun({ text: "   " + title, bold: true, size: 22, font: "Calibri", color: C.white })],
  });
}

function fieldRow(label: string, value: string, shading?: string) {
  return new TableRow({
    children: [
      new TableCell({
        borders: { top: noBorder, bottom: { style: BorderStyle.DOTTED, size: 1, color: C.border }, left: noBorder, right: noBorder },
        width: { size: 3200, type: WidthType.DXA },
        margins: { top: 50, bottom: 50, left: 100, right: 40 },
        shading: shading ? { fill: shading, type: ShadingType.CLEAR } : undefined,
        children: [new Paragraph({ children: [new TextRun({ text: label + " :", bold: true, size: 18, font: "Calibri", color: C.primary })] })],
      }),
      new TableCell({
        borders: { top: noBorder, bottom: { style: BorderStyle.DOTTED, size: 1, color: C.border }, left: noBorder, right: noBorder },
        width: { size: 6306, type: WidthType.DXA },
        margins: { top: 50, bottom: 50, left: 40, right: 100 },
        shading: shading ? { fill: shading, type: ShadingType.CLEAR } : undefined,
        children: [new Paragraph({ children: [new TextRun({ text: value || "—", size: 18, font: "Calibri", color: C.dark })] })],
      }),
    ],
  });
}

function fieldTable(rows: TableRow[]) {
  return new Table({ width: { size: 9506, type: WidthType.DXA }, columnWidths: [3200, 6306], rows });
}

function h1(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 180 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: C.accent, space: 4 } },
    children: [new TextRun({ text, bold: true, size: 30, font: "Calibri", color: C.primary })],
  });
}

function h2(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, font: "Calibri", color: C.secondary })],
  });
}

function para(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string; size?: number }) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, size: opts?.size || 20, font: "Calibri", color: opts?.color || C.dark, bold: opts?.bold, italics: opts?.italic })],
  });
}

function bullet(text: string) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, size: 20, font: "Calibri", color: C.dark })],
  });
}

function empty() { return new Paragraph({ spacing: { before: 40, after: 40 }, children: [] }); }
function pb() { return new Paragraph({ children: [new PageBreak()] }); }

type D = Record<string, string>;

// ============ LIVRET D'ACCUEIL ============
function buildLivretAccueil(d: D) {
  const children: (Paragraph | Table)[] = [];

  // Page de couverture
  children.push(
    new Paragraph({ spacing: { before: 2000 } }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: d.raison_sociale || "Organisme de Formation", bold: true, size: 56, font: "Calibri", color: C.primary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "Centre de Formation en Alternance", size: 24, font: "Calibri", color: C.gray })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [new TextRun({ text: d.adresse || "", size: 20, font: "Calibri", color: C.gray })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: d.email_contact || "", size: 20, font: "Calibri", color: C.gray })] }),
    new Paragraph({ spacing: { before: 600 } }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "LIVRET D'ACCUEIL", bold: true, size: 48, font: "Calibri", color: C.secondary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "de l'apprenant", size: 28, font: "Calibri", color: C.secondary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [new TextRun({ text: d.formation_titre || "Formation", bold: true, size: 24, font: "Calibri", color: C.primary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${d.formation_rncp || ""} — ${d.formation_niveau || ""}`, size: 20, font: "Calibri", color: C.gray })] }),
    pb(),
  );

  // 1. Présentation
  children.push(h1("1. Présentation de l'organisme"));
  children.push(fieldTable([
    fieldRow("Raison sociale", d.raison_sociale || ""),
    fieldRow("Forme juridique", d.forme_juridique || ""),
    fieldRow("Président", d.president || ""),
    fieldRow("Responsable pédagogique", d.responsable_peda || ""),
    fieldRow("Adresse", d.adresse || ""),
    fieldRow("Téléphone", d.telephone || ""),
    fieldRow("Email", d.email_contact || ""),
    fieldRow("Site internet", d.site_web || ""),
    fieldRow("LinkedIn", d.linkedin || ""),
  ]));

  // 2. Formation
  children.push(empty(), h1("2. La formation"));
  children.push(fieldTable([
    fieldRow("Intitulé", d.formation_titre || ""),
    fieldRow("RNCP", d.formation_rncp || ""),
    fieldRow("Niveau", d.formation_niveau || ""),
    fieldRow("Certificateur", d.formation_certificateur || ""),
    fieldRow("Durée totale", d.formation_duree || ""),
    fieldRow("Heures CFA", d.formation_heures || ""),
    fieldRow("Rythme d'alternance", d.formation_rythme || ""),
  ]));

  // Blocs de compétences
  children.push(empty(), h2("Blocs de compétences"));
  for (let i = 0; i < 3; i++) {
    const code = d[`bloc_${i}_code`];
    const titre = d[`bloc_${i}_titre`];
    const heures = d[`bloc_${i}_heures`];
    if (code || titre) {
      children.push(banner(`${code || `BC0${i+1}`} — ${heures || "?"}h`, C.secondary));
      children.push(para(titre || "", { italic: true }));
    }
  }

  // 3. Infos pratiques
  children.push(empty(), h1("3. Informations pratiques"));
  children.push(fieldTable([
    fieldRow("Horaires du CFA", d.horaires_cfa || ""),
    fieldRow("Jour de formation", d.jour_cfa || ""),
    fieldRow("Accès transports", d.acces_transports || ""),
    fieldRow("Restauration", d.restauration || ""),
  ]));

  // 4. Référent handicap
  children.push(empty(), h1("4. Référent handicap"));
  children.push(fieldTable([
    fieldRow("Nom du référent", d.referent_handicap || ""),
    fieldRow("Email", d.referent_handicap_email || ""),
    fieldRow("Téléphone", d.referent_handicap_tel || ""),
  ]));

  // 5. Contacts utiles
  children.push(empty(), h1("5. Contacts utiles"));
  children.push(fieldTable([
    fieldRow("Urgence", d.urgence_tel || "15 (SAMU), 17 (Police), 18 (Pompiers)"),
    fieldRow("Médecine du travail", d.medecine_travail || ""),
  ]));

  // 6. Règlement intérieur
  if (d.reglement) {
    children.push(pb(), h1("6. Règlement intérieur"));
    d.reglement.split("\n").forEach((line) => {
      if (line.trim()) children.push(bullet(line.trim()));
    });
  }

  return children;
}

// ============ ROUTE ============
export async function POST(req: Request) {
  try {
    const { docId, docTitle, data } = await req.json() as { docId: string; docTitle: string; data: D };

    let children: (Paragraph | Table)[];

    switch (docId) {
      case "livret-accueil":
        children = buildLivretAccueil(data);
        break;
      default:
        // Fallback générique : génère un doc avec tous les champs remplis
        children = buildGeneric(docTitle, data);
        break;
    }

    const doc = new Document({
      numbering: {
        config: [{
          reference: "bullets",
          levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
        }],
      },
      sections: [{
        headers: {
          default: new Header({
            children: [new Paragraph({
              children: [
                new TextRun({ text: `${data.raison_sociale || "MyQualio"} — ${docTitle}`, size: 16, font: "Calibri", color: C.gray }),
              ],
            })],
          }),
        },
        footers: {
          default: new Footer({
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Page ", size: 16, font: "Calibri", color: C.gray }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, font: "Calibri", color: C.gray }),
              ],
            })],
          }),
        },
        children,
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    const uint8 = new Uint8Array(buffer);
    const filename = `${docId}-${(data.raison_sociale || "document").replace(/\s+/g, "-").toLowerCase()}.docx`;

    return new NextResponse(uint8, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Erreur génération doc:", err);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}

// Fallback générique : liste tous les champs remplis dans un tableau
function buildGeneric(title: string, data: D): (Paragraph | Table)[] {
  const children: (Paragraph | Table)[] = [];

  children.push(
    new Paragraph({ spacing: { before: 1000 } }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: data.raison_sociale || "Organisme de Formation", bold: true, size: 40, font: "Calibri", color: C.primary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300 }, children: [new TextRun({ text: title, bold: true, size: 36, font: "Calibri", color: C.secondary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [new TextRun({ text: `Généré le ${new Date().toLocaleDateString("fr-FR")}`, size: 20, font: "Calibri", color: C.gray })] }),
    pb(),
    h1(title),
  );

  const rows = Object.entries(data)
    .filter(([, v]) => v && v.trim())
    .map(([k, v], i) => {
      const label = k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return fieldRow(label, v, i % 2 === 0 ? C.light : undefined);
    });

  if (rows.length > 0) {
    children.push(fieldTable(rows));
  } else {
    children.push(para("Aucune donnée saisie.", { italic: true, color: C.gray }));
  }

  return children;
}
