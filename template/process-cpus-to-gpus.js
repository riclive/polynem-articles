/**
 * process-cpus-to-gpus.js
 * "From CPUs to GPUs: Positioning Canada in the Accelerated AI Era"
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
  makeHeader, makeFooter, categoryColor,
} = T;

function bpRef(segments) {
  const runs = [];
  for (const seg of segments) {
    runs.push(bodyRun(seg[0]));
    for (let i = 1; i < seg.length; i++) runs.push(footnoteRef(seg[i]));
  }
  return bodyParaWithRuns(runs);
}

const TITLE = "From CPUs to GPUs: Positioning Canada in the Accelerated AI Era";
const SHORT_TITLE = "From CPUs to GPUs: Canada in the Accelerated AI Era";
const VERSION = "v260318";
const SLUG = "from-cpus-to-gpus-accelerated-ai-era";
const CATEGORY = "Technology";

const children = [
  // ── PAGE 1: COVER / HEADER BLOCK ──
  categoryTag(CATEGORY),
  titleBlock(TITLE),
  abstractBlock(
    "The global computing industry is at an inflection point. As general-purpose CPU computing " +
    "gives way to GPU-accelerated AI, trillions of dollars in legacy infrastructure face overhaul. " +
    "Inference demand alone is projected to grow by orders of magnitude \u2014 yet Canada holds the " +
    "lowest AI compute capacity in the G7, roughly half the UK\u2019s. This briefing maps the " +
    "transition\u2019s phases through 2035 and makes the case for Canada to become a high-volume, " +
    "clean compute exporter \u2014 leveraging 80%+ non-emitting electricity to turn an infrastructure " +
    "gap into a strategic trade advantage worth up to $187 billion annually by 2030."
  ),
  rule(C.primary, 2),
  authorEntry("Richard St-Pierre", "Senior Digital Sovereignty Advisor, Levio"),
  dateLine(VERSION),
  spacer(16),

  // ══════════════════════════════════════════════════════════════════
  // H2: Introduction
  // ══════════════════════════════════════════════════════════════════
  sectionHeading("Introduction"),

  bpRef([
    ["The computing industry stands at a generational inflection point. Nvidia CEO Jensen Huang " +
    "has argued that the era of general-purpose CPU computing is ending, replaced by " +
    "GPU-accelerated architectures purpose-built for artificial intelligence.", 1],
    [" This briefing examines the CPU-to-GPU transition, its impact on global data centre " +
    "infrastructure, the phases of build-out through 2035, and the strategic opportunity for " +
    "Canada to position itself as a clean compute powerhouse in the accelerated AI era."],
  ]),

  // KEY FINDING #1
  spacer(4),
  highlightBox(
    "Key finding:",
    "AI inference isn\u2019t going to 100\u00D7 or 1,000\u00D7\u2026 it\u2019s going to " +
    "1,000,000,000\u00D7 (one billion\u00D7). Inference, not training, will be the dominant " +
    "consumer of global compute by 2030, with approximately 40% of Nvidia\u2019s data center " +
    "revenue already from inference deployment."
  ),
  spacer(8),

  // ══════════════════════════════════════════════════════════════════
  // H2: The CPU-to-GPU Transition
  // ══════════════════════════════════════════════════════════════════
  sectionHeading("The CPU-to-GPU Transition: A New Era of Accelerated Computing"),

  bpRef([
    ["For decades, Moore\u2019s Law drove exponential gains in general-purpose CPU performance. " +
    "That trajectory has stalled. Clock speeds, transistor density, and instruction-level " +
    "parallelism have all reached practical limits.", 1],
    [" The result is a fundamental shift: workloads that once ran on CPUs are migrating to " +
    "massively parallel GPU architectures designed for the matrix mathematics underlying " +
    "modern AI."],
  ]),

  bodyPara(
    "Huang has compared this transition to an industrial revolution. Just as steam power and " +
    "electrification transformed manufacturing by replacing manual processes with mechanised " +
    "ones, accelerated computing replaces sequential instruction execution with parallel " +
    "processing at scale. The analogy extends beyond hardware \u2014 entirely new workflows, " +
    "supply chains, and economic models emerge around the new paradigm."
  ),

  bpRef([
    ["The productivity implications are significant. AI co-pilots and inference engines act " +
    "as force multipliers across knowledge work \u2014 automating code generation, accelerating " +
    "drug discovery, and compressing analytical tasks from hours to seconds.", 1],
    [" Huang\u2019s framing positions GPUs not merely as faster chips but as the foundational " +
    "technology of a new computing era."],
  ]),

  bpRef([
    ["Through extreme co-design of hardware, networking, and software, Nvidia claims a " +
    "100,000\u00D7 performance increase in AI inference over the past decade.", 1],
    [" The company has shifted to an annual GPU cadence \u2014 Hopper in 2022, Blackwell in " +
    "2024, Rubin and Feynman on the roadmap \u2014 compressing innovation cycles that previously " +
    "spanned two to three years into twelve-month intervals."],
  ]),

  // ══════════════════════════════════════════════════════════════════
  // H2: Impact on Legacy Data Center Infrastructure
  // ══════════════════════════════════════════════════════════════════
  sectionHeading("Impact on Legacy Data Center Infrastructure"),

  bodyPara(
    "The shift to GPU-accelerated computing does not simply swap one chip for another. It " +
    "requires a wholesale rethinking of data centre design across five dimensions."
  ),

  boldLeadInPara(
    "Compute Hardware Upgrades.",
    "Legacy servers built around multi-core CPUs lack the parallel processing throughput " +
    "required for AI training and inference. Organisations must deploy GPU clusters \u2014 " +
    "thousands of accelerators connected in tightly coupled configurations \u2014 alongside " +
    "new motherboard architectures, memory systems, and firmware stacks optimised for tensor " +
    "operations."
  ),

  boldLeadInPara(
    "Networking and Interconnects.",
    "AI workloads demand ultra-low-latency, high-bandwidth interconnects between GPUs. " +
    "Traditional Ethernet fabrics are giving way to specialised links such as NVLink and " +
    "InfiniBand, capable of moving terabytes per second across racks. Spine-leaf network " +
    "topologies must be redesigned to handle the east\u2013west traffic patterns characteristic " +
    "of distributed training."
  ),

  boldLeadInPara(
    "Power and Cooling.",
    "A single GPU rack can consume 40\u201370 kW \u2014 four to seven times the power density " +
    "of a conventional server rack. This surge demands upgraded electrical distribution, backup " +
    "generation, and cooling systems. Many operators are moving to liquid cooling and rear-door " +
    "heat exchangers to manage thermal loads that air cooling alone cannot address."
  ),

  boldLeadInPara(
    "Storage and Data.",
    "AI models require massive, high-throughput storage for training datasets and model " +
    "checkpoints. Legacy SAN and NAS systems cannot sustain the I/O rates needed to keep GPU " +
    "clusters fed. Parallel file systems and NVMe-over-fabric architectures are becoming " +
    "the baseline for AI-ready facilities."
  ),

  boldLeadInPara(
    "Capital Investment Cycle.",
    "Each of these upgrades carries significant capital cost and multi-year lead times for " +
    "permitting, construction, and commissioning. Facilities designed five years ago for " +
    "cloud-native CPU workloads may require near-complete retrofits to support AI at scale."
  ),

  bpRef([
    ["Taken together, these requirements represent the largest wave of data centre capital " +
    "expenditure in the industry\u2019s history. Huang has estimated that $1 trillion of " +
    "installed data centre infrastructure worldwide must be upgraded or replaced, with total " +
    "investment reaching $5 trillion over the coming decade.", 1],
  ]),

  // ══════════════════════════════════════════════════════════════════
  // H2: Global Trends and Phases Through 2035
  // ══════════════════════════════════════════════════════════════════
  sectionHeading("Global Trends and Phases Through 2035"),

  bodyPara(
    "The transition from CPU-centric to GPU-accelerated computing is unfolding in four " +
    "overlapping phases, each amplifying demand for compute infrastructure."
  ),

  // H3: Soaring Inference Demand
  subHeading("Soaring Inference Demand"),

  bpRef([
    ["The explosion in inference workloads is the single largest driver of near-term compute " +
    "demand. Every chatbot response, image generation, recommendation engine query, and " +
    "autonomous vehicle decision requires GPU inference cycles.", 1],
    [" Approximately 40% of Nvidia\u2019s data center revenue already comes from inference " +
    "deployment, and this share is rising as production AI systems scale.", 3],
  ]),

  bpRef([
    ["Meta\u2019s deployment of 350,000 GPUs for its Llama model family illustrates the " +
    "magnitude.", 3],
    [" As AI becomes embedded in every application, search query, and enterprise workflow, " +
    "inference demand is projected to grow by orders of magnitude through the end of the " +
    "decade \u2014 dwarfing training compute in aggregate volume."],
  ]),

  // H3: Build-Out of AI Factories
  subHeading("Build-Out of AI Factories"),

  bpRef([
    ["Hyperscale operators are building what Huang calls \u201CAI factories\u201D \u2014 " +
    "purpose-built facilities designed from the ground up for GPU workloads.", 1],
    [" Individual campuses are reaching 1 GW of power capacity, equivalent to a mid-sized " +
    "city\u2019s electricity consumption.", 3],
  ]),

  bpRef([
    ["Aschenbrenner projects that by the late 2020s, individual AI training clusters could " +
    "require $100 billion or more in capital, with trillion-dollar cluster concepts under " +
    "active discussion.", 4],
    [" These facilities represent a new category of critical infrastructure \u2014 industrial " +
    "plants producing intelligence rather than physical goods."],
  ]),

  // H3: Rapid Hardware Iteration
  subHeading("Rapid Hardware Iteration"),

  bpRef([
    ["Nvidia\u2019s shift to an annual GPU cadence compresses the hardware upgrade cycle. " +
    "The Blackwell architecture delivered a 30\u00D7 inference performance jump over its " +
    "predecessor.", 1],
    [" Rubin and Feynman architectures are already on the roadmap, each promising further " +
    "generational leaps in performance per watt."],
  ]),

  bodyPara(
    "This rapid iteration creates a treadmill effect for data centre operators: facilities " +
    "must be designed for continuous hardware refresh rather than five-year static " +
    "deployments. Modular construction, standardised rack formats, and hot-swappable " +
    "infrastructure become essential to keep pace."
  ),

  // H3: Emergence of Agentic AI
  subHeading("Emergence of Agentic AI"),

  bpRef([
    ["The next phase of AI deployment moves beyond single-model inference to multi-model " +
    "agentic systems \u2014 autonomous agents that plan, reason, use tools, and coordinate " +
    "with other agents to accomplish complex tasks.", 1],
  ]),

  bpRef([
    ["Aschenbrenner projects that automated AI research could emerge by 2027\u20132028, " +
    "where AI systems themselves design and train successor models.", 4],
    [" This recursive improvement loop would drive compute demand to levels difficult to " +
    "project using current baselines, potentially requiring infrastructure build-out at a " +
    "pace not seen since rural electrification."],
  ]),

  bodyPara(
    "Collectively, these four phases \u2014 inference explosion, AI factory build-out, rapid " +
    "hardware iteration, and agentic AI \u2014 define a decade-long infrastructure supercycle. " +
    "Nations and firms that position early will capture outsized economic returns; those " +
    "that delay will face escalating costs and diminishing options."
  ),

  // ══════════════════════════════════════════════════════════════════
  // H2: Canada's Opportunity
  // ══════════════════════════════════════════════════════════════════
  sectionHeading("Canada\u2019s Opportunity: Becoming a Clean Compute Powerhouse"),

  bpRef([
    ["Canada punches well above its weight in AI research \u2014 home to pioneers like " +
    "Geoffrey Hinton, Yoshua Bengio, and a network of world-class labs. Yet when it comes " +
    "to compute infrastructure, the country lags badly.", 6],
    [" The gap between research excellence and deployment capacity represents both a " +
    "vulnerability and an opportunity."],
  ]),

  // KEY FINDING #2
  spacer(4),
  highlightBox(
    "Key finding:",
    "Canada has the lowest amount of available AI compute among G7 countries \u2014 roughly " +
    "half that of the UK. Canadian AI startups and researchers must rent compute from foreign " +
    "cloud providers because domestic options are limited."
  ),
  spacer(8),

  // H3: Specializing in High-Volume AI Inference
  subHeading("Specializing in High-Volume AI Inference"),

  bpRef([
    ["Canada\u2019s electricity grid is over 80% non-emitting, powered predominantly by " +
    "hydroelectric and nuclear generation.", 7],
    [" In an era where hyperscalers face mounting pressure to meet sustainability commitments, " +
    "this clean energy endowment positions Canada as a natural home for high-volume AI " +
    "inference \u2014 the most energy-intensive and fastest-growing segment of the compute " +
    "market."],
  ]),

  bodyPara(
    "Rather than competing head-to-head with the United States on frontier model training, " +
    "Canada can specialise in the inference layer: running production AI workloads at scale " +
    "with a lower carbon footprint than any G7 peer. Cold northern climates further reduce " +
    "cooling costs, compounding the energy advantage into a durable economic moat."
  ),

  // H3: Boosting Economic Productivity
  subHeading("Boosting Economic Productivity"),

  bpRef([
    ["The economic stakes are substantial. Accenture and Microsoft estimate that generative " +
    "AI could add up to $187 billion annually to Canada\u2019s economy by 2030.", 5],
    [" This figure comprises $180 billion in productivity gains across existing industries " +
    "and $7 billion in entirely new products and services \u2014 equivalent to an 8% boost in " +
    "labour productivity.", 8],
  ]),

  bodyPara(
    "Realising these gains requires domestic compute capacity. When Canadian firms must " +
    "export their data to foreign cloud regions for AI processing, they face higher latency, " +
    "data sovereignty concerns, and reduced ability to customise models for local markets. " +
    "Building inference capacity at home keeps the economic multiplier within Canadian borders."
  ),

  // KEY FINDING #3
  spacer(4),
  highlightBox(
    "Key finding:",
    "Generative AI could add up to $187 billion annually to Canada\u2019s economy by 2030 " +
    "\u2014 comprising $180 billion in productivity gains and $7 billion in new products and " +
    "services, equivalent to an 8% boost in labour productivity."
  ),
  spacer(8),

  // H3: Exporting Clean Compute as a Strategic Asset
  subHeading("Exporting Clean Compute as a Strategic Asset"),

  bpRef([
    ["Compute is emerging as a strategic resource on par with energy and semiconductors. " +
    "As Foreign Policy has noted, the ability to provide reliable, secure, and clean compute " +
    "capacity confers geopolitical leverage.", 7],
    [" Nations that can export compute become indispensable partners in an AI-dependent " +
    "world order."],
  ]),

  bodyPara(
    "Canada is uniquely positioned to play this role. A clean compute export strategy would " +
    "leverage the country\u2019s energy surplus, democratic governance, and allied relationships " +
    "to attract foreign AI workloads. This is not merely an economic opportunity but a " +
    "trade and foreign policy instrument \u2014 converting electrons and cold air into strategic " +
    "influence."
  ),

  // ══════════════════════════════════════════════════════════════════
  // H2: Public Investment and Policy Support
  // ══════════════════════════════════════════════════════════════════
  sectionHeading("Public Investment and Policy Support"),

  bodyPara(
    "Capturing Canada\u2019s AI compute opportunity requires coordinated public policy across " +
    "six priority areas."
  ),

  bpRef([
    ["Invest in National AI Infrastructure.", 10],
    [" The federal government\u2019s $2 billion AI Compute Access Fund represents an important " +
    "first step, but sovereign compute capacity must scale to match the 15 GW application " +
    "backlog. Public investment should crowd in private capital through co-investment " +
    "frameworks, accelerated permitting, and long-term power purchase agreements."],
  ]),

  bpRef([
    ["Leverage Clean Energy.", 9],
    [" Canada\u2019s non-emitting grid is a generational asset. Policy should fast-track grid " +
    "interconnection for data centre corridors, invest in transmission capacity to northern " +
    "regions with surplus hydroelectric power, and establish carbon-accounting frameworks " +
    "that let operators monetise their clean energy advantage in international markets."],
  ]),

  boldLeadInPara(
    "Support Skills and Talent.",
    "Reversing the brain drain requires competitive domestic opportunities. Expanded AI " +
    "graduate fellowships, industry co-op programmes, and immigration pathways for specialised " +
    "talent should be paired with incentives for Canadian firms to offer compensation packages " +
    "that narrow the gap with US employers."
  ),

  bpRef([
    ["Foster AI Adoption.", 5],
    [" The $187 billion opportunity materialises only if Canadian businesses adopt AI at scale. " +
    "Sector-specific AI Centres of Excellence, SME compute vouchers funded through the AI " +
    "Compute Access Fund, and procurement reform to embed AI in government operations can " +
    "drive adoption from the current low base."],
  ]),

  boldLeadInPara(
    "Position as Trusted Exporter.",
    "Canada should market itself internationally as a trusted, clean, and allied compute " +
    "destination. Bilateral agreements with like-minded nations \u2014 particularly Five Eyes " +
    "and NATO partners \u2014 can establish Canada as a preferred location for sovereign AI " +
    "workloads that cannot be processed in jurisdictions with weaker governance frameworks."
  ),

  boldLeadInPara(
    "Economic and Fiscal Returns.",
    "Public investment in AI infrastructure generates returns through tax revenue from data " +
    "centre operations, employment in construction and operations, downstream productivity " +
    "gains across the economy, and reduced dependency on foreign compute providers. A rigorous " +
    "cost\u2013benefit framework should accompany each phase of investment to ensure " +
    "accountability and course correction."
  ),

  boldLeadInPara(
    "Innovation and Global Leadership.",
    "Canada\u2019s AI research ecosystem \u2014 anchored by MILA, the Vector Institute, and " +
    "Amii \u2014 provides a foundation that few nations can match. Linking this research " +
    "excellence to domestic compute infrastructure creates a virtuous cycle: researchers get " +
    "access to capacity, firms get access to talent, and the country builds a globally " +
    "competitive AI industry rather than exporting its best minds to build one elsewhere."
  ),

  // ══════════════════════════════════════════════════════════════════
  // H2: Conclusion
  // ══════════════════════════════════════════════════════════════════
  sectionHeading("Conclusion"),

  bodyPara(
    "The CPU-to-GPU transition is not a technology upgrade \u2014 it is an economic " +
    "restructuring. Trillions of dollars in legacy infrastructure must be replaced, new " +
    "categories of industrial facility must be built, and the nations that move fastest will " +
    "capture the largest share of the AI economy\u2019s value. Canada\u2019s combination of " +
    "clean energy, cold climate, research talent, and democratic governance gives it a " +
    "distinctive hand to play."
  ),

  bodyPara(
    "But advantages are perishable. Hyperscalers are making decade-long infrastructure " +
    "commitments now. Grid interconnection decisions taken in 2025\u20132027 will determine " +
    "compute geography through the 2030s. Canada must act with urgency \u2014 investing in " +
    "sovereign infrastructure, accelerating permitting, building skills, and positioning " +
    "itself as the world\u2019s preferred clean compute exporter. The window is open, but it " +
    "will not remain so indefinitely."
  ),

  // ── NOTES ──
  notesHeading(),
  noteEntry(1, "Nvidia CEO Jensen Huang, remarks on accelerated computing, AI inference demand, and infrastructure transition, CES/GTC conferences, 2024\u20132025."),
  noteEntry(2, "Nvidia GPU roadmap: Hopper (2022), Blackwell (2024), Rubin and Feynman architectures announced for annual cadence."),
  noteEntry(3, "Leopold Aschenbrenner, \u201CSituational Awareness,\u201D June 2024. (Data on global AI investments, Meta 350k GPUs, trillion-dollar cluster projections.)"),
  noteEntry(4, "Ibid. (Projections on automated AI research, agentic systems, and superintelligence timeline.)"),
  noteEntry(5, "Accenture and Microsoft, \u201CCanada\u2019s Generative AI Opportunity,\u201D 2024. ($187B economic impact, $180B productivity gains, 8% labour productivity boost by 2030.)"),
  noteEntry(6, "The Dais (Toronto Metropolitan University), \u201CCanada\u2019s AI Compute Gap,\u201D 2024. (Canada lowest G7 compute, ~50% of UK capacity.)"),
  noteEntry(7, "SETA, \u201CHidden Cost of AI: Energy Crisis,\u201D 2023. (Clean compute hubs, UAE and Canada positioning as exporters.)"),
  noteEntry(8, "Microsoft Canada, remarks on $187B economic opportunity and AI adoption urgency, 2024."),
  noteEntry(9, "RBC Climate Action Institute, \u201CPower Struggle: How AI Is Challenging Canada\u2019s Electricity Grid,\u201D 2025."),
  noteEntry(10, "Government of Canada, AI Compute Access Fund ($2B) and sovereign compute strategy announcements, 2024."),
];

const accentColor = categoryColor(CATEGORY);

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
    headers: makeHeader(SHORT_TITLE),
    footers: makeFooter("\u00A9 2026 Richard St-Pierre", "me@richardstpierre.com"),
    children,
  }],
});

const outputPath = process.argv[2] || `${SLUG}-${VERSION}.docx`;
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`\u2713 Generated: ${outputPath}`);
});
