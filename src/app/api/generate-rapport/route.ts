import { NextResponse } from "next/server";
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, HeadingLevel, BorderStyle, PageBreak,
  Header, Footer, PageNumber,
} from "docx";
import { INDICATEURS } from "@/lib/indicateurs";
import { CRITERE_TITLES, CRITERE_INDICATEURS, STATUT_LABELS, type StatutIndicateur } from "@/lib/types";

interface SuiviData {
  indicateur_id: number;
  statut: StatutIndicateur;
  notes: string | null;
  plan_action: string | null;
  responsable: string | null;
  date_echeance: string | null;
}

const PRIMARY = "0D6B4E";
const SECONDARY = "1B6B8A";
const GREEN = "27AE60";
const RED = "E74C3C";
const ORANGE = "E67E22";
const GRAY = "5D6D7E";

function statusColor(statut: StatutIndicateur): string {
  return { conforme: GREEN, non_conforme: RED, en_cours: ORANGE, na: "999999", non_evalue: "CCCCCC" }[statut];
}

function para(text: string, opts: { bold?: boolean; size?: number; color?: string; alignment?: typeof AlignmentType.CENTER } = {}) {
  return new Paragraph({
    alignment: opts.alignment,
    children: [new TextRun({ text, bold: opts.bold, size: opts.size || 22, color: opts.color || "333333", font: "Calibri" })],
    spacing: { after: 100 },
  });
}

function h1(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true, size: 32, color: PRIMARY, font: "Calibri" })],
    spacing: { before: 300, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: PRIMARY } },
  });
}

function h2(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, size: 26, color: SECONDARY, font: "Calibri" })],
    spacing: { before: 200, after: 100 },
  });
}

function statusCell(statut: StatutIndicateur) {
  return new TableCell({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: STATUT_LABELS[statut], bold: true, size: 18, color: "FFFFFF", font: "Calibri" })],
    })],
    shading: { fill: statusColor(statut) },
    width: { size: 1500, type: WidthType.DXA },
  });
}

function textCell(text: string, width?: number) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, size: 18, font: "Calibri" })] })],
    width: width ? { size: width, type: WidthType.DXA } : undefined,
  });
}

export async function POST(req: Request) {
  try {
    const { organisme_nom, type, suivis } = await req.json() as {
      organisme_id: string;
      organisme_nom: string;
      type: "dossier_complet" | "etat_avancement" | "plan_action";
      suivis: SuiviData[];
    };

    const date = new Date().toLocaleDateString("fr-FR");
    const sections: Paragraph[] = [];
    const tables: (Paragraph | Table)[] = [];

    // Cover page
    sections.push(
      new Paragraph({ spacing: { before: 3000 } }),
      para("MyQualio", { bold: true, size: 56, color: PRIMARY, alignment: AlignmentType.CENTER }),
      para(organisme_nom, { bold: true, size: 36, color: SECONDARY, alignment: AlignmentType.CENTER }),
      new Paragraph({ spacing: { after: 400 } }),
    );

    const titles: Record<string, string> = {
      dossier_complet: "Dossier Qualiopi Complet",
      etat_avancement: "État d'Avancement",
      plan_action: "Plan d'Action",
    };
    sections.push(
      para(titles[type], { bold: true, size: 40, color: PRIMARY, alignment: AlignmentType.CENTER }),
      para(`Généré le ${date}`, { size: 20, color: GRAY, alignment: AlignmentType.CENTER }),
      new Paragraph({ children: [new PageBreak()] }),
    );

    // Stats summary
    const totalInd = 32;
    const conformes = suivis.filter((s) => s.statut === "conforme").length;
    const nonConformes = suivis.filter((s) => s.statut === "non_conforme").length;
    const enCours = suivis.filter((s) => s.statut === "en_cours").length;

    tables.push(
      h1("Synthèse"),
      para(`Conformes : ${conformes}/${totalInd} | Non conformes : ${nonConformes} | En cours : ${enCours}`),
    );

    if (type === "dossier_complet" || type === "etat_avancement") {
      // Table per critère
      for (let c = 1; c <= 7; c++) {
        const indIds = CRITERE_INDICATEURS[c];
        tables.push(
          h1(`Critère ${c} - ${CRITERE_TITLES[c]}`),
        );

        const headerRow = new TableRow({
          children: [
            new TableCell({ children: [para("N°", { bold: true, color: "FFFFFF", size: 18 })], shading: { fill: PRIMARY }, width: { size: 600, type: WidthType.DXA } }),
            new TableCell({ children: [para("Indicateur", { bold: true, color: "FFFFFF", size: 18 })], shading: { fill: PRIMARY } }),
            new TableCell({ children: [para("Statut", { bold: true, color: "FFFFFF", size: 18 })], shading: { fill: PRIMARY }, width: { size: 1500, type: WidthType.DXA } }),
            new TableCell({ children: [para("Observations", { bold: true, color: "FFFFFF", size: 18 })], shading: { fill: PRIMARY } }),
          ],
        });

        const rows = [headerRow];
        for (const num of indIds) {
          const ind = INDICATEURS.find((i) => i.numero === num)!;
          const suivi = suivis.find((s) => s.indicateur_id === num);
          const statut: StatutIndicateur = suivi?.statut || "non_evalue";

          rows.push(new TableRow({
            children: [
              textCell(`I${num}`, 600),
              textCell(ind.titre),
              statusCell(statut),
              textCell(suivi?.notes || ""),
            ],
          }));
        }

        tables.push(new Table({
          rows,
          width: { size: 100, type: WidthType.PERCENTAGE },
        }));
      }
    }

    if (type === "plan_action" || type === "dossier_complet") {
      tables.push(new Paragraph({ children: [new PageBreak()] }));
      tables.push(h1("Plan d'action"));

      const nonConf = suivis.filter((s) => s.statut === "non_conforme" || s.statut === "en_cours");
      if (nonConf.length === 0) {
        tables.push(para("Aucune action corrective requise. Tous les indicateurs évalués sont conformes.", { color: GREEN }));
      } else {
        for (const suivi of nonConf) {
          const ind = INDICATEURS.find((i) => i.numero === suivi.indicateur_id)!;
          tables.push(
            h2(`I${ind.numero} - ${ind.titre}`),
            para(`Statut : ${STATUT_LABELS[suivi.statut]}`, { color: statusColor(suivi.statut) }),
          );
          if (suivi.plan_action) tables.push(para(`Plan d'action : ${suivi.plan_action}`));
          if (suivi.responsable) tables.push(para(`Responsable : ${suivi.responsable}`));
          if (suivi.date_echeance) tables.push(para(`Échéance : ${suivi.date_echeance}`));
        }
      }
    }

    const doc = new Document({
      sections: [{
        headers: {
          default: new Header({
            children: [para(`MyQualio - ${organisme_nom}`, { size: 16, color: GRAY })],
          }),
        },
        footers: {
          default: new Footer({
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Page ", size: 16, color: GRAY, font: "Calibri" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GRAY, font: "Calibri" }),
              ],
            })],
          }),
        },
        children: [...sections, ...tables],
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    const uint8 = new Uint8Array(buffer);

    return new NextResponse(uint8, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="myqualio-${type}-${organisme_nom.replace(/\s+/g, "-")}.docx"`,
      },
    });
  } catch (err) {
    console.error("Erreur génération rapport:", err);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
