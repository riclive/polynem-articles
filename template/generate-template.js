/**
 * generate-template.js
 *
 * Polynem house style builder library for Word documents.
 *
 * Usage:
 *   As a standalone demo:  node generate-template.js [output.docx]
 *   As a library:          const T = require("./generate-template");
 *                          T.bodyPara("Hello world");
 *
 * This serves as both:
 * 1. A visual reference (.docx) you can open in Word to see the house style
 * 2. The reusable builder functions imported by document-specific scripts
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Header, Footer,
  AlignmentType, HeadingLevel, LevelFormat, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak,
  Table, TableRow, TableCell, TabStopType, PositionalTab,
  PositionalTabAlignment, PositionalTabRelativeTo, PositionalTabLeader,
  ExternalHyperlink, FootnoteReferenceRun, ImageRun,
} = require("docx");

// ── Page dimensions (DXA) ──
const PAGE = {
  width: 12240,       // 8.5"
  height: 15840,      // 11"
  marginTop: 2520,    // 1.75" (first page)
  marginTopDefault: 2160, // 1.5" (pages 2+, effective via header space)
  marginBottom: 1440, // 1"
  marginLeft: 3600,   // 2.5"
  marginRight: 1440,  // 1"
};
PAGE.contentWidth = PAGE.width - PAGE.marginLeft - PAGE.marginRight; // 7200 = 5"

// ── Color palette ──
const C = {
  primary: "111111",
  body: "333333",
  secondary: "666666",
  tertiary: "666666",
  muted: "999999",
  accent: "005237",
  accentLight: "F2F8F5",
  border: "E0E0E0",
  rule: "CCCCCC",
  white: "FFFFFF",
  // Category-specific colors
  categoryPolicy: "005237",
  categoryOpinion: "8E3700",
  categoryAnalysis: "003378",
  categoryTechnology: "580078",
  categorySecurity: "780014",
  categoryStrategy: "3A3A00",
};

/** Look up category accent color. Falls back to default accent green. */
function categoryColor(category) {
  const key = "category" + category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  return C[key] || C.accent;
}

// ── Reusable builders ──

function spacer(pts = 12) {
  return new Paragraph({ spacing: { before: pts * 20 } });
}

function rule(color = C.border, size = 1) {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size, color, space: 1 } },
    spacing: { after: 300 },
  });
}

function categoryTag(text) {
  return new Paragraph({
    spacing: { after: 240 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: C.accent, space: 4 } },
    children: [
      new TextRun({
        text: text,
        font: "Arial",
        size: 17, // 8.5pt
        color: C.accent,
      }),
    ],
  });
}

function titleBlock(title) {
  return new Paragraph({
    spacing: { after: 200 },
    children: [
      new TextRun({
        text: title,
        font: "Arial",
        size: 60, // 30pt — large, light-weight
        color: C.primary,
      }),
    ],
  });
}

function abstractBlock(text) {
  return new Paragraph({
    spacing: { after: 300 },
    children: [
      new TextRun({
        text: text,
        font: "Arial",
        size: 22, // 11pt
        color: C.secondary,
      }),
    ],
  });
}

function authorEntry(name, affiliation) {
  return new Paragraph({
    spacing: { after: 20 },
    children: [
      new TextRun({
        text: name,
        font: "Arial",
        size: 20, // 10pt
        bold: true,
        color: C.primary,
      }),
      new TextRun({
        text: `  ${affiliation}`,
        font: "Arial",
        size: 17, // 8.5pt
        color: C.muted,
      }),
    ],
  });
}

/**
 * Version date stamp line.
 * @param {string} versionStamp – e.g. "v260318" (YYMMDD format)
 */
function dateLine(versionStamp) {
  return new Paragraph({
    spacing: { before: 60, after: 100 },
    children: [
      new TextRun({
        text: versionStamp,
        font: "Arial",
        size: 17, // 8.5pt
        color: C.muted,
      }),
    ],
  });
}

function sectionHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 520, after: 180 },
    children: [
      new TextRun({
        text: text,
        font: "Arial",
        size: 32, // 16pt
        bold: true,
        color: C.primary,
      }),
    ],
  });
}

function subHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 400, after: 120 },
    children: [
      new TextRun({
        text: text,
        font: "Arial",
        size: 24, // 12pt
        color: C.primary,
      }),
    ],
  });
}

function bodyPara(text) {
  return new Paragraph({
    spacing: { after: 120, line: 300 }, // 1.25 line spacing
    children: [
      new TextRun({
        text: text,
        font: "Arial",
        size: 21, // 10.5pt
        color: C.body,
      }),
    ],
  });
}

function blockQuote(text) {
  return new Paragraph({
    spacing: { after: 200, line: 300 },
    indent: { left: 540 },
    border: {
      left: { style: BorderStyle.SINGLE, size: 4, color: C.accent, space: 8 },
    },
    children: [
      new TextRun({
        text: text,
        font: "Arial",
        size: 21,
        italics: true,
        color: C.secondary,
      }),
    ],
  });
}

function highlightBox(leadIn, text) {
  // C1 style: green shading + left accent bar, no other borders
  const w = PAGE.contentWidth;
  const noBorder = { style: BorderStyle.NONE, size: 0, color: C.white };
  const children = [];
  if (leadIn) {
    children.push(new TextRun({ text: leadIn + "  ", font: "Arial", size: 20, bold: true, color: C.accent }));
  }
  children.push(new TextRun({ text: text, font: "Arial", size: 20, color: C.body }));
  return new Table({
    width: { size: w, type: WidthType.DXA },
    columnWidths: [w],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top: noBorder,
              bottom: noBorder,
              left: { style: BorderStyle.SINGLE, size: 4, color: C.accent },
              right: noBorder,
            },
            shading: { fill: C.accentLight, type: ShadingType.CLEAR },
            margins: { top: 180, bottom: 180, left: 320, right: 320 },
            width: { size: w, type: WidthType.DXA },
            children: [new Paragraph({ children })],
          }),
        ],
      }),
    ],
  });
}

function exhibitLabel(number, caption) {
  return new Paragraph({
    spacing: { before: 240, after: 80 },
    children: [
      new TextRun({
        text: `Exhibit ${number}: `,
        font: "Arial",
        size: 20,
        bold: true,
        color: C.body,
      }),
      new TextRun({
        text: caption,
        font: "Arial",
        size: 17,
        italics: true,
        color: C.muted,
      }),
    ],
  });
}

function footnoteRef(number) {
  return new TextRun({
    text: `${number}`,
    font: "Arial",
    size: 16,
    superScript: true,
    color: C.accent,
  });
}

function notesHeading() {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 600, after: 180 },
    border: {
      top: { style: BorderStyle.SINGLE, size: 1, color: C.rule, space: 8 },
    },
    children: [
      new TextRun({
        text: "Notes",
        font: "Arial",
        size: 32, // 16pt — matches H2 section heading
        bold: true,
        color: C.primary,
      }),
    ],
  });
}

function noteEntry(number, text) {
  return new Paragraph({
    spacing: { after: 60 },
    indent: { left: 360, hanging: 360 },
    children: [
      new TextRun({
        text: `${number}  `,
        font: "Arial",
        size: 12, // 6pt
        superScript: true,
        color: C.muted,
      }),
      new TextRun({
        text: text,
        font: "Arial",
        size: 12, // 6pt
        color: C.muted,
      }),
    ],
  });
}

/** Bullet list item with optional bold lead-in. Uses en-dash bullet. */
function bulletItem(text, boldLeadIn) {
  const children = [];
  if (boldLeadIn) {
    children.push(new TextRun({ text: boldLeadIn + " ", font: "Arial", size: 21, bold: true, color: C.body }));
  }
  children.push(new TextRun({ text: text, font: "Arial", size: 21, color: C.body }));
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80, line: 300 },
    children,
  });
}

/** Numbered list item. */
function numberedItem(text, boldLeadIn) {
  const children = [];
  if (boldLeadIn) {
    children.push(new TextRun({ text: boldLeadIn + " ", font: "Arial", size: 21, bold: true, color: C.body }));
  }
  children.push(new TextRun({ text: text, font: "Arial", size: 21, color: C.body }));
  return new Paragraph({
    numbering: { reference: "numbers", level: 0 },
    spacing: { after: 80, line: 300 },
    children,
  });
}

/** Bold lead-in paragraph (no bullet). Used for appendix-style numbered recommendations. */
function boldLeadInPara(leadIn, text) {
  return new Paragraph({
    spacing: { after: 120, line: 300 },
    children: [
      new TextRun({ text: leadIn, font: "Arial", size: 21, bold: true, color: C.primary }),
      new TextRun({ text: " " + text, font: "Arial", size: 21, color: C.body }),
    ],
  });
}

/** Body paragraph with inline footnote reference(s). Pass runs array for mixed content. */
function bodyParaWithRuns(runs) {
  return new Paragraph({
    spacing: { after: 120, line: 300 },
    children: runs,
  });
}

/** Standard text run for use inside bodyParaWithRuns. */
function bodyRun(text) {
  return new TextRun({ text, font: "Arial", size: 21, color: C.body });
}

/**
 * Running header for pages 2+. Displays article title right-aligned.
 * @param {string} articleTitle – title shown in the header
 */
function makeHeader(articleTitle) {
  return {
    default: new Header({
      children: [
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: C.rule, space: 8 } },
          children: [
            new TextRun({
              text: articleTitle,
              font: "Arial",
              size: 15,
              color: C.muted,
            }),
          ],
        }),
      ],
    }),
    first: new Header({ children: [] }), // No header on first page
  };
}

/**
 * Three-part footer: copyright (left) · email (center) · page N of M (right).
 * @param {string} copyrightText – e.g. "© 2026 Richard St-Pierre"
 * @param {string} email – e.g. "me@richardstpierre.com"
 */
function makeFooter(copyrightText, email) {
  return {
    default: new Footer({
      children: [
        new Paragraph({
          border: {
            top: { style: BorderStyle.SINGLE, size: 1, color: C.rule, space: 8 },
          },
          children: [
            // Left: copyright
            new TextRun({
              text: copyrightText,
              font: "Arial",
              size: 14,
              color: C.muted,
            }),
            // Center: email
            new TextRun({
              children: [
                new PositionalTab({
                  alignment: PositionalTabAlignment.CENTER,
                  relativeTo: PositionalTabRelativeTo.MARGIN,
                  leader: PositionalTabLeader.NONE,
                }),
                email,
              ],
              font: "Arial",
              size: 14,
              color: C.muted,
            }),
            // Right: page N / M
            new TextRun({
              children: [
                new PositionalTab({
                  alignment: PositionalTabAlignment.RIGHT,
                  relativeTo: PositionalTabRelativeTo.MARGIN,
                  leader: PositionalTabLeader.NONE,
                }),
              ],
              font: "Arial",
              size: 14,
              color: C.muted,
            }),
            new TextRun({
              children: [PageNumber.CURRENT],
              font: "Arial",
              size: 14,
              color: C.muted,
            }),
            new TextRun({
              text: " / ",
              font: "Arial",
              size: 14,
              color: C.muted,
            }),
            new TextRun({
              children: [PageNumber.TOTAL_PAGES],
              font: "Arial",
              size: 14,
              color: C.muted,
            }),
          ],
        }),
      ],
    }),
  };
}

// ── Build the document ──

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 21, color: C.body },
      },
    },
    paragraphStyles: [
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: C.primary },
        paragraph: { spacing: { before: 520, after: 180 }, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal",
        quickFormat: true,
        run: { size: 24, font: "Arial", color: C.primary },
        paragraph: { spacing: { before: 400, after: 120 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2013", // en-dash
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 360 } } },
        }],
      },
      {
        reference: "numbers",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 360 } } },
        }],
      },
    ],
  },
  sections: [
    {
      properties: {
        titlePage: true,
        page: {
          size: { width: PAGE.width, height: PAGE.height },
          margin: {
            top: PAGE.marginTop,
            bottom: PAGE.marginBottom,
            left: PAGE.marginLeft,
            right: PAGE.marginRight,
          },
        },
      },
      headers: makeHeader("Digital Sovereignty Is the New Sovereignty"),
      footers: makeFooter("\u00A9 2026 Richard St-Pierre", "me@richardstpierre.com"),
      children: [
        // ── PAGE 1: COVER / HEADER BLOCK ──
        categoryTag("Policy"),
        titleBlock("Digital Sovereignty Is the New Sovereignty: Canada Can Lead the Middle Power Vanguard"),
        abstractBlock(
          "An attractive strategic case is emerging for Canada to architect a coalition of " +
          "technologically sovereign middle powers. This essay examines the three pillars \u2014 " +
          "sovereign infrastructure, cryptographic transition, and coalition architecture \u2014 " +
          "that define the path forward."
        ),
        rule(C.primary, 6),
        authorEntry("Richard St-Pierre", "Senior Digital Sovereignty Advisor, Levio"),
        authorEntry("Stephen Karam", "Systemscope Ottawa"),
        dateLine("v260218"),
        spacer(16),

        // ── KEY FINDING HIGHLIGHT ──
        highlightBox(
          "Key finding:",
          "Canada possesses the raw ingredients \u2014 energy abundance, a skilled workforce, " +
          "allied relationships, and democratic institutions \u2014 to become the architect of a " +
          "middle-power digital sovereignty coalition."
        ),
        spacer(8),

        // ── BODY ──
        sectionHeading("The Sovereignty Imperative"),
        bodyPara(
          "In the twenty-first century, sovereignty is no longer defined solely by borders, " +
          "armies, or treaties. It is defined by data flows, AI inference capacity, and cryptographic " +
          "resilience. The nations that control their digital infrastructure will shape the rules " +
          "of the emerging order. Those that do not will find themselves tenants in someone " +
          "else\u2019s architecture."
        ),
        bodyPara(
          "Canada stands at a crossroads. It possesses the raw ingredients \u2014 energy abundance, " +
          "a skilled workforce, allied relationships, and democratic institutions \u2014 to become " +
          "the architect of a middle-power digital sovereignty coalition. But ingredients alone do " +
          "not make a strategy."
        ),

        sectionHeading("The Middle Power Opportunity"),
        bodyPara(
          "The great powers \u2014 the United States and China \u2014 are building closed " +
          "technological ecosystems designed to maximize their own leverage. For middle powers " +
          "like Canada, Australia, the Nordic states, and others, the choice is not which " +
          "ecosystem to join. It is whether to build an alternative."
        ),
        blockQuote(
          "The question is not whether Canada can afford to pursue digital sovereignty. " +
          "It is whether Canada can afford not to."
        ),

        // ── EXHIBIT EXAMPLE ──
        exhibitLabel(1, "Comparative sovereign cloud capacity among middle powers, 2025\u20132030 (projected)"),
        bodyPara("[Figure placeholder \u2014 insert chart or data visualization here]"),
        spacer(8),

        subHeading("What Must Be Done"),
        bodyPara("Three pillars define the path forward."),

        // Bullet list (using builder function)
        bulletItem("Canada must invest in domestic cloud capacity \u2014 not as a vanity project, but as critical national infrastructure.", "Sovereign infrastructure."),
        bulletItem("The transition to post-quantum cryptography must begin immediately.", "Cryptographic transition."),
        bulletItem("Canada must lead the formation of a sovereignty coalition with like-minded nations.", "Coalition architecture."),

        spacer(8),
        highlightBox(
          "Key finding:",
          "Approximately 60% of the data required to answer ministerial questions originates " +
          "from external sources, reframing sovereign cloud as a bridge rather than a fortress."
        ),
        spacer(8),

        sectionHeading("Conclusion"),
        bodyPara(
          "The window for action is narrow. Every month of inaction deepens dependency on foreign " +
          "infrastructure and increases exposure to strategic risk. Canada has the talent, the " +
          "energy, and the alliances. What it needs now is the will."
        ),

        // ── NOTES ──
        notesHeading(),
        noteEntry(1, "International Energy Agency, \u201CGlobal digital infrastructure energy consumption,\u201D IEA Report, 2025."),
        noteEntry(2, "Richard St-Pierre, \u201CThe Sovereign Bridge,\u201D Polynem Working Paper, November 2025."),
        noteEntry(3, "Government of Canada, \u201CPost-Quantum Cryptography Roadmap,\u201D CSE, 2025."),
      ],
    },
  ],
});

// ── Generate (only when run directly) ──
if (require.main === module) {
  Packer.toBuffer(doc).then((buffer) => {
    const outputPath = process.argv[2] || "polynem-template.docx";
    fs.writeFileSync(outputPath, buffer);
    console.log(`✓ Template generated: ${outputPath}`);
  });
}

// ── Exports for use as a library ──
module.exports = {
  // Constants
  C, PAGE, categoryColor,
  // docx re-exports (convenience)
  Document, Packer, Paragraph, TextRun, Header, Footer,
  AlignmentType, HeadingLevel, LevelFormat, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak,
  Table, TableRow, TableCell, ImageRun,
  PositionalTab, PositionalTabAlignment, PositionalTabRelativeTo, PositionalTabLeader,
  ExternalHyperlink, FootnoteReferenceRun,
  // Builder functions
  spacer, rule, categoryTag, titleBlock, abstractBlock,
  authorEntry, dateLine, sectionHeading, subHeading,
  bodyPara, bodyParaWithRuns, bodyRun, blockQuote,
  highlightBox, exhibitLabel, footnoteRef,
  notesHeading, noteEntry,
  bulletItem, numberedItem, boldLeadInPara,
  makeHeader, makeFooter,
};
