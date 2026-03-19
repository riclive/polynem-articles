/**
 * process-urgency.js
 * "Urgency: The Window for Action Is Narrowing"
 */
const fs = require("fs");
const T = require("./generate-template");
const {
  C, PAGE, Document, Packer, Paragraph, TextRun, Header, Footer,
  AlignmentType, HeadingLevel, LevelFormat, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak,
  spacer, rule, categoryTag, titleBlock, abstractBlock,
  authorEntry, dateLine, sectionHeading, subHeading,
  bodyPara, bodyParaWithRuns, bodyRun, blockQuote,
  highlightBox, footnoteRef, notesHeading, noteEntry,
  bulletItem, numberedItem, boldLeadInPara,
  makeHeader, makeFooter,
} = T;

function bpRef(segments) {
  const runs = [];
  for (const seg of segments) {
    runs.push(bodyRun(seg[0]));
    for (let i = 1; i < seg.length; i++) runs.push(footnoteRef(seg[i]));
  }
  return bodyParaWithRuns(runs);
}

const TITLE = "Urgency: The Window for Action Is Narrowing";
const VERSION = "v260318";
const SLUG = "urgency-window-for-action-narrowing";

const children = [
  categoryTag("Policy"),
  titleBlock(TITLE),
  abstractBlock(
    "Canada\u2019s competitive position is deteriorating quarterly \u2014 dead last among OECD " +
    "advanced economies for projected GDP per capita growth through 2060. With only 0.7% of " +
    "global AI compute capacity, a 15 GW data center application backlog, and 66% of software " +
    "engineering graduates working abroad, the window to act is closing. This policy brief sets " +
    "out a phased roadmap \u2014 from establishing a Canadian Digital Centre in the first six " +
    "months to commissioning gigawatts of new AI-ready capacity by year five."
  ),
  rule(C.primary, 2),
  authorEntry("Richard St-Pierre", "Senior Digital Sovereignty Advisor, Levio"),
  dateLine(VERSION),
  spacer(16),

  highlightBox(
    "Key finding:",
    "OECD projects Canada dead last among advanced economies through 2060 for GDP per capita " +
    "growth \u2014 with business investment declining 6 of 7 quarters (2022\u20132024) and a " +
    "drop from 5th to 8th in the Tortoise Global AI Index in a single year."
  ),
  spacer(8),

  // ── Competitiveness ──
  sectionHeading("Canada\u2019s Competitive Position Is Deteriorating"),

  bpRef([
    ["Canada\u2019s competitive position deteriorates quarterly. Q2 2025 showed labour " +
    "productivity decline of 1.0% after a modest 2024 recovery (+0.6% annual).", 1],
    [" OECD projects Canada dead last among advanced economies through 2060 for GDP per capita " +
    "growth \u2014 a verdict on current trajectory absent intervention.", 2],
    [" Business investment declined 6 times in 7 quarters (2022\u20132024).", 1],
  ]),

  bpRef([
    ["Canada dropped from 5th to 8th in the Tortoise Global AI Index in a single year " +
    "(2023\u20132024) with only 0.7% of global compute capacity.", 3],
    [" Of 3,162 STEM graduates sampled, 25% work outside Canada rising to 66% for software " +
    "engineers \u2014 84% of Waterloo\u2019s 2020 software engineering class planned US work.", 4],
    [" This talent exodus is accelerating, not stabilising."],
  ]),

  bpRef([
    ["US private AI investment reached $109 billion in 2024 \u2014 12 times China, 24 times " +
    "the UK, and roughly 15 times total Canadian venture capital across all sectors ($7.1B in " +
    "2023).", 5],
    [" The US produced 40 notable AI models in 2024 versus Europe\u2019s 3.", 5],
  ]),

  bodyPara(
    "Singapore deployed S$1B+ over 5 years with a specific target to triple practitioners to " +
    "15,000. France committed \u20AC2.22B over 10 years targeting double specialists and 3 " +
    "institutions in the global top 50. Canada risks permanent structural disadvantage if " +
    "competitors lock in advantages during the current deployment surge."
  ),

  // ── Energy ──
  sectionHeading("The Energy Advantage Is Time-Limited"),

  bpRef([
    ["The energy advantage represents a time-limited opportunity. The current 15 GW application " +
    "backlog (20\u00D7 existing capacity) demonstrates demand exists now.", 6],
    [" Hyperscalers are making multi-decade data center location decisions in the 2024\u20132027 " +
    "period."],
  ]),

  bpRef([
    ["AWS committed $18 billion through 2037 for the Calgary region \u2014 decisions made, " +
    "capital allocated.", 7],
    [" Microsoft\u2019s $80 billion FY2025 global AI data center spend", 8],
    [" and Google\u2019s $75 billion 2025 capex (42% year-over-year increase) represent an " +
    "investment cycle happening in real time.", 9],
  ]),

  highlightBox(
    "Key finding:",
    "15 GW application backlog (20\u00D7 existing capacity) demonstrates demand exists now. " +
    "Hyperscalers are making multi-decade data center location decisions in 2024\u20132027; " +
    "the energy call option expires worthless if not exercised during the capital deployment cycle."
  ),
  spacer(4),

  bodyPara(
    "If Canada fails to solve grid interconnection and establish First Nations partnership " +
    "frameworks during this window, hyperscalers will build capacity elsewhere with 20\u201330 " +
    "year commitments. The energy advantage doesn\u2019t disappear but the call option expires " +
    "worthless if not exercised during the capital deployment cycle."
  ),

  // ── Productivity ──
  sectionHeading("The Productivity Crisis Compounds"),

  bpRef([
    ["Census 2021 found 3 in 5 Canadian workers in occupations with high AI exposure " +
    "potential.", 10],
    [" McKinsey estimates $4.4 trillion in global productivity potential from AI corporate use " +
    "cases with 92% of companies planning increased investment \u2014 yet only 1% report being " +
    "\u201Cmature\u201D in deployment.", 11],
  ]),

  bpRef([
    ["Vanguard projects a 20% automation rate across US jobs by 2035, potentially raising GDP " +
    "growth to 3% in the 2030s \u2014 the fastest since the late 1990s.", 12],
  ]),

  highlightBox(
    "Key finding:",
    "If the US achieves 3% growth through AI deployment while Canada remains at 1\u20131.5%, " +
    "the productivity gap becomes unbridgeable. The current 9-percentage-point decline since " +
    "2000 could accelerate to 20+ points by 2035, creating permanent structural divergence."
  ),
  spacer(4),

  bodyPara(
    "If the US achieves 3% growth through AI deployment while Canada remains at 1\u20131.5%, " +
    "the productivity gap (currently 72% of US levels) will become unbridgeable. The current " +
    "9-percentage-point decline since 2000 (81% to 72%) accelerates to 20+ points by 2035 " +
    "creating permanent structural divergence. At that stage, brain drain becomes brain " +
    "haemorrhage as entire cohorts see no viable Canadian career paths."
  ),

  // ── Roadmap ──
  sectionHeading("Implementation Roadmap"),

  subHeading("Month 1\u20136: Foundation"),
  bodyPara(
    "Establish the Canadian Digital Centre with spend control authority modelled on UK GDS. " +
    "Deputy Minister Committee mandate for AI inference deployment across government " +
    "demonstrating use cases. Treasury Board approval for differentiated data sovereignty " +
    "framework (classified/Protected B/Protected A tiers). Negotiate First Nations " +
    "capacity/equity funding templates with BC, Ontario, Manitoba, Quebec leadership."
  ),

  subHeading("Month 3\u201312: Deployment"),
  bodyPara(
    "Launch fast-track grid interconnection process targeting 12\u201318 months maximum with " +
    "performance guarantees. Identify data center corridors in northern Quebec, northern Ontario, " +
    "Manitoba, BC for transmission co-investment. Deploy first $300M of AI Compute Access Fund " +
    "removing SME capital barriers. Establish 5 sector-specific AI Centres of Excellence " +
    "(agriculture, manufacturing, healthcare, financial services, natural resources)."
  ),

  subHeading("Year 2\u20135: Scale"),
  bodyPara(
    "Scale successful approaches nationally. Achieve 35%+ business AI adoption from current " +
    "12.2%. Commission gigawatts of new data center capacity from 15 GW application backlog. " +
    "Establish Canada as the preferred North American AI inference location leveraging energy " +
    "advantages (5.23\u201312 cents/kWh, 50% cooling cost reduction, 82% non-GHG). Reverse brain " +
    "drain through competitive domestic opportunities. Achieve NATO GDP defence target by 2027 " +
    "with NORAD modernisation deploying cloud-based AI-enabled command systems on sovereign " +
    "compute infrastructure."
  ),

  // ── Closing ──
  sectionHeading("The Choice Is Stark"),

  bodyPara(
    "The choice is stark: orchestrate AI inference ecosystem deployment at scale capturing " +
    "productivity gains and energy advantages, or continue the current trajectory toward " +
    "permanent structural disadvantage relative to peer nations. Government\u2019s role is " +
    "creating conditions for private sector success \u2014 not buying vendor solutions, not " +
    "imposing blanket rules preventing innovation, not nurturing research that never " +
    "commercialises. Platform provision, grid infrastructure, First Nations partnerships, " +
    "procurement transformation, talent retention, and risk-based governance enable the 87.8% " +
    "of businesses not yet using AI to achieve documented 30\u201366% productivity improvements."
  ),

  bodyPara(
    "This is a nation-building project for the 21st century. Just as past generations built " +
    "railways, highways, and power grids to secure Canada\u2019s economic future, our generation " +
    "must build the digital, AI, and productivity infrastructure that will undergird prosperity " +
    "for decades to come. It requires a \u201Cwhole-of-nation\u201D effort \u2014 government " +
    "policy, private sector dynamism, academia\u2019s innovations, and Indigenous and community " +
    "participation all moving in concert. The federal government, under the Privy Council\u2019s " +
    "coordination, is uniquely positioned to spearhead this alignment. We must move with urgency " +
    "and purpose, for the world will not wait."
  ),

  // ── NOTES ──
  notesHeading(),
  noteEntry(1, "Statistics Canada, \u201CLabour Productivity, Quarterly Estimates,\u201D 2025."),
  noteEntry(2, "OECD, \u201CLong-Term Baseline Projections (GDP per Capita),\u201D OECD Economic Outlook, 2024."),
  noteEntry(3, "Tortoise Media, \u201CGlobal AI Index 2024.\u201D"),
  noteEntry(4, "University of Waterloo / Statistics Canada STEM graduate tracking studies."),
  noteEntry(5, "Stanford University HAI, \u201CAI Index Report 2025,\u201D Chapter on Investment."),
  noteEntry(6, "Data Center Knowledge, \u201CCanada Emerges as Global Data Center Powerhouse,\u201D 2025."),
  noteEntry(7, "Amazon Web Services, \u201CAWS Launches Second Infrastructure Region in Canada,\u201D December 2023."),
  noteEntry(8, "Brad Smith, \u201CThe Golden Opportunity for American AI,\u201D Microsoft On the Issues, January 2025."),
  noteEntry(9, "Alphabet Inc., \u201CQ4 and Fiscal Year 2024 Results,\u201D SEC Filing, February 2025."),
  noteEntry(10, "Tahsin Mehdi and Rene Morissette, \u201CExperimental Estimates of Potential AI Occupational Exposure in Canada,\u201D Statistics Canada, September 2024."),
  noteEntry(11, "McKinsey & Company, \u201CThe Economic Potential of Generative AI,\u201D McKinsey Global Institute, 2023."),
  noteEntry(12, "Vanguard, \u201CThe AI Revolution: US Macro Implications,\u201D Vanguard Research, 2024."),
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 21, color: C.body } } },
    paragraphStyles: [
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: C.primary },
        paragraph: { spacing: { before: 520, after: 180 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, font: "Arial", color: C.primary },
        paragraph: { spacing: { before: 400, after: 120 }, outlineLevel: 2 } },
    ],
  },
  numbering: { config: [
    { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2013",
      alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] },
    { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
      alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] },
  ]},
  sections: [{
    properties: {
      titlePage: true,
      page: {
        size: { width: PAGE.width, height: PAGE.height },
        margin: { top: PAGE.marginTop, bottom: PAGE.marginBottom, left: PAGE.marginLeft, right: PAGE.marginRight },
      },
    },
    headers: makeHeader(TITLE),
    footers: makeFooter("\u00A9 2026 Richard St-Pierre", "me@richardstpierre.com"),
    children,
  }],
});

const outputPath = process.argv[2] || `${SLUG}-${VERSION}.docx`;
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`\u2713 Generated: ${outputPath}`);
});
