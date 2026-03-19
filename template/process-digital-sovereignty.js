/**
 * process-digital-sovereignty.js
 *
 * Document-specific processing script for:
 * "Digital Sovereignty in the National Context: A Multi-Axis Strategic Framework"
 *
 * Uses generate-template.js builder functions to produce the polished .docx.
 * Run: node process-digital-sovereignty.js [output.docx]
 */

const fs = require("fs");
const T = require("./generate-template");

// ── Destructure what we need ──
const {
  C, PAGE,
  Document, Packer, Paragraph, TextRun, Header, Footer,
  AlignmentType, HeadingLevel, LevelFormat, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak,
  ExternalHyperlink,
  spacer, rule, categoryTag, titleBlock, abstractBlock,
  authorEntry, dateLine, sectionHeading, subHeading,
  bodyPara, bodyParaWithRuns, bodyRun, blockQuote,
  highlightBox, exhibitLabel, footnoteRef,
  notesHeading, noteEntry,
  bulletItem, numberedItem, boldLeadInPara,
  makeHeader, makeFooter,
} = T;

// ── Helper: body paragraph with embedded footnote refs ──
function bpRef(segments) {
  // segments: array of [text] or [text, refNum] or [text, refNum, refNum2]
  const runs = [];
  for (const seg of segments) {
    runs.push(bodyRun(seg[0]));
    for (let i = 1; i < seg.length; i++) {
      runs.push(footnoteRef(seg[i]));
    }
  }
  return bodyParaWithRuns(runs);
}

// ── Document metadata ──
const TITLE = "Digital Sovereignty in the National Context: A Multi-Axis Strategic Framework";
const SHORT_TITLE = "Digital Sovereignty: A Multi-Axis Strategic Framework";
const SLUG = "digital-sovereignty-multi-axis-framework";
const VERSION = "v260318";
const CATEGORY = "Strategy";

// ── Build content ──
const children = [
  // ══════════════════════════════════════════
  // PAGE 1: COVER / HEADER BLOCK
  // ══════════════════════════════════════════
  categoryTag(CATEGORY),
  titleBlock(TITLE),
  abstractBlock(
    "Digital sovereignty is not a binary state but a multi-layered continuum. This paper defines " +
    "a five-level framework \u2014 from basic data residency (Level 1) to full sovereign cloud " +
    "(Level 5) \u2014 and maps it across three axes: sovereignty depth, data sensitivity, and " +
    "governance maturity. With AI as the central stress test, the framework shows why encryption " +
    "key control is the linchpin of true sovereignty, why the orchestrator and auditor roles must " +
    "be separated, and how international models (France\u2019s SecNumCloud, Germany\u2019s C5, the EU\u2019s " +
    "Gaia-X) inform Canada\u2019s path toward smart sovereignty that balances security with innovation."
  ),
  rule(C.primary, 2),
  authorEntry("Richard St-Pierre", "Senior Digital Sovereignty Advisor, Levio"),
  dateLine(VERSION),
  spacer(16),

  // ══════════════════════════════════════════
  // SECTION: Introduction
  // ══════════════════════════════════════════
  sectionHeading("Introduction: Digital Sovereignty as a Strategic Imperative"),

  bpRef([
    ["In a world where data flows define economic competitiveness, national security, and citizen trust, " +
    "sovereignty has extended irrevocably into the digital realm. Governments can no longer treat cloud " +
    "infrastructure, AI processing, and encryption key management as purely commercial decisions. " +
    "These are strategic assets whose control \u2014 or lack thereof \u2014 determines a nation\u2019s capacity " +
    "to protect its citizens, enforce its laws, and project its values.", 1],
  ]),

  bodyPara(
    "This paper proposes that digital sovereignty is not a binary state \u2014 a country either " +
    "\u201Chas it\u201D or does not \u2014 but rather a multi-layered continuum. The framework presented " +
    "here defines five distinct levels of sovereignty, maps them across three analytical axes, and " +
    "uses artificial intelligence as the central stress test. The goal is to give policymakers, " +
    "procurement leaders, and security professionals a structured tool for matching workloads to " +
    "the appropriate sovereignty posture."
  ),

  spacer(4),

  // ── KEY FINDING #1 ──
  highlightBox(
    "Key finding:",
    "Cloud providers should not be the issuers of encryption keys for sovereign data. Key " +
    "sovereignty is the linchpin \u2014 without it, all other sovereignty investments (data residency, " +
    "local operations, domestic ownership) can be nullified by a single subpoena or insider attack."
  ),
  spacer(8),

  // ══════════════════════════════════════════
  // SECTION: Defining Digital Sovereignty
  // ══════════════════════════════════════════
  sectionHeading("Defining Digital Sovereignty: Key Dimensions"),

  bodyPara(
    "Digital sovereignty encompasses several interrelated dimensions. While definitions vary across " +
    "jurisdictions and academic traditions, four core dimensions emerge consistently in the literature " +
    "and in policy practice."
  ),

  bulletItem(
    "The right and capacity of a state to apply its own laws to data generated, processed, or " +
    "stored within its borders \u2014 and to prevent foreign jurisdictions from compelling disclosure " +
    "without due process.",
    "Jurisdictional Sovereignty."
  ),
  bulletItem(
    "The ability to develop, maintain, and control the technology stack \u2014 hardware, software, " +
    "and algorithms \u2014 on which sovereign operations depend, reducing reliance on foreign " +
    "suppliers for critical capabilities.",
    "Technological Sovereignty."
  ),
  bulletItem(
    "The capacity to operate, monitor, and manage sovereign infrastructure using domestic personnel " +
    "with appropriate clearances, ensuring that day-to-day control remains within the nation\u2019s " +
    "administrative and legal perimeter.",
    "Operational Sovereignty."
  ),
  bulletItem(
    "The strategic interest in ensuring that the economic value generated by digital activities " +
    "\u2014 including AI model training, cloud services, and data analytics \u2014 accrues to domestic " +
    "firms, workers, and taxpayers rather than being extracted by foreign platform monopolies.",
    "Economic Sovereignty."
  ),

  bodyPara(
    "These dimensions do not exist in isolation. A nation may possess strong jurisdictional sovereignty " +
    "through robust data protection laws but lack technological sovereignty if its critical systems " +
    "run on foreign-controlled hardware and software. The multi-axis framework developed in this paper " +
    "captures these overlaps and trade-offs."
  ),

  // ══════════════════════════════════════════
  // SECTION: The Multi-Level Sovereignty Continuum
  // ══════════════════════════════════════════
  sectionHeading("The Multi-Level Sovereignty Continuum"),

  bpRef([
    ["The framework defines five levels of sovereignty, each building on the previous one. " +
    "These levels are not rigid categories but benchmarks along a continuum, allowing organisations " +
    "and governments to position their workloads according to sensitivity, threat exposure, " +
    "and strategic value.", 1],
  ]),

  subHeading("Level 1: Data Residency"),

  bodyPara(
    "At the foundational level, data residency ensures that data is physically stored within the " +
    "national border. This is the most common and least demanding sovereignty measure. Many " +
    "jurisdictions require it for personal data under privacy legislation. However, data residency " +
    "alone provides limited protection: the cloud provider may still hold encryption keys, " +
    "operational control may reside offshore, and foreign legal regimes may compel disclosure."
  ),

  subHeading("Level 2: Operational Control"),

  bodyPara(
    "Level 2 adds a requirement that the infrastructure is operated by personnel within the " +
    "national jurisdiction, typically with security clearances. This addresses the risk that " +
    "offshore administrators could access sensitive workloads. Operational control is a significant " +
    "step beyond residency, but it does not resolve the question of who holds the encryption keys " +
    "or who owns the underlying technology."
  ),

  subHeading("Level 3: Jurisdictional Immunity"),

  bpRef([
    ["At Level 3, the sovereign environment is structured so that no foreign law \u2014 such as the " +
    "U.S. CLOUD Act or similar extraterritorial statutes \u2014 can compel the disclosure of data " +
    "without the host nation\u2019s consent. This typically requires domestic ownership of the operating " +
    "entity, domestic key management, and contractual firewalls that prevent foreign parent companies " +
    "from accessing sovereign data.", 6],
  ]),

  subHeading("Level 4: Technology Sovereignty"),

  bpRef([
    ["Level 4 demands that the hardware, firmware, and software stack itself be verifiable, auditable, " +
    "and ideally domestically produced or sourced from trusted allies. This level addresses supply-chain " +
    "risks: backdoors in chips, compromised firmware updates, or opaque proprietary code that cannot " +
    "be independently reviewed.", 5],
  ]),

  subHeading("Level 5: Full Sovereign Cloud"),

  bpRef([
    ["The highest level represents a fully self-contained sovereign cloud environment. All layers " +
    "\u2014 data residency, operations, legal immunity, technology stack, and key management \u2014 are " +
    "under complete national control. Level 5 is typically reserved for the most sensitive workloads: " +
    "defence, intelligence, and critical national infrastructure.", 1, 5],
  ]),

  bodyPara(
    "Mapping workloads to appropriate levels is a practical exercise. Not every government application " +
    "requires Level 5 protection; indeed, attempting to operate all workloads at the highest level " +
    "would be prohibitively expensive and would impede innovation. The continuum allows policymakers " +
    "to allocate resources where the risk-reward calculus demands them."
  ),

  spacer(4),

  // ── KEY FINDING #2 ──
  highlightBox(
    "Key finding:",
    "The five-level sovereignty continuum (L1 data residency through L5 full sovereign cloud) gives " +
    "policymakers a structured benchmarking tool: each workload maps to an appropriate level based " +
    "on sensitivity, threat exposure, and value."
  ),
  spacer(8),

  // ══════════════════════════════════════════
  // SECTION: The Multi-Axis Blueprint
  // ══════════════════════════════════════════
  sectionHeading("The Multi-Axis Blueprint for Sovereignty"),

  bulletItem(
    "Represents the five sovereignty levels (L1 through L5), capturing the depth of control " +
    "applied to a given workload.",
    "Vertical Axis (Sovereignty Depth)."
  ),
  bulletItem(
    "Captures the sensitivity of the data and workloads being processed, ranging from publicly " +
    "available information to top-secret defence intelligence.",
    "Horizontal Axis (Data Sensitivity)."
  ),
  bulletItem(
    "Assesses the maturity of the governance framework \u2014 policy, auditing, compliance " +
    "certification, and incident response \u2014 that surrounds the sovereign environment.",
    "Governance Overlay (Governance Maturity)."
  ),

  bodyPara(
    "This three-dimensional blueprint allows decision-makers to plot any workload and determine " +
    "whether its current sovereignty posture is adequate. Three illustrative examples:"
  ),

  bulletItem(
    "A tourism promotion website contains only public information. It can operate comfortably " +
    "at L1 (data residency) with basic governance. The sensitivity is low, and the risk of " +
    "foreign-compelled disclosure is negligible.",
    "Tourism site (low sensitivity, L1)."
  ),
  bulletItem(
    "An electronic health records platform processes Protected B data. It requires at minimum " +
    "L2\u2013L3 (operational control and jurisdictional immunity) with mature governance including " +
    "privacy impact assessments and breach notification protocols.",
    "Hospital EHR system (medium-high sensitivity, L2\u2013L3)."
  ),
  bulletItem(
    "A classified AI system for signals intelligence demands L5 (full sovereign cloud) with the " +
    "highest governance maturity, including continuous auditing, red-team testing, and supply-chain " +
    "verification at every layer.",
    "Defence AI platform (extreme sensitivity, L5)."
  ),

  // ══════════════════════════════════════════
  // SECTION: Coexistence of Sovereignty Levels
  // ══════════════════════════════════════════
  sectionHeading("Coexistence of Sovereignty Levels in a National Architecture"),

  bodyPara(
    "A realistic national cloud architecture does not operate at a single sovereignty level. " +
    "Different sectors and workloads coexist across the continuum, each calibrated to its risk profile."
  ),

  bulletItem(
    "Standard citizen-facing services, open data portals, and commercial SaaS applications operate " +
    "at the lower end of the continuum, prioritising cost efficiency and innovation speed.",
    "Public and Commercial Services (L1\u2013L2)."
  ),
  bulletItem(
    "Administrative systems handling personal information, procurement data, and internal " +
    "communications require operational control and, increasingly, jurisdictional protections.",
    "Government Administration (L2\u2013L3)."
  ),
  bulletItem(
    "Energy grids, telecommunications, financial market infrastructure, and health systems demand " +
    "technology-layer assurances and robust governance.",
    "Critical Infrastructure (L3\u2013L4)."
  ),
  bulletItem(
    "Military command-and-control, intelligence fusion centres, and strategic weapons systems " +
    "require the full sovereign cloud stack with no foreign dependencies.",
    "Defence and Intelligence (L5)."
  ),

  bodyPara(
    "Managing this coexistence requires clear policy instruments: a classification scheme that maps " +
    "data sensitivity to sovereignty levels, procurement rules that enforce the required level for " +
    "each contract, and interoperability standards that allow data to move between levels when " +
    "authorised \u2014 for instance, when a declassified intelligence product is shared with a " +
    "law-enforcement partner operating at L3."
  ),

  bulletItem(
    "A national data classification scheme aligned to the five sovereignty levels, providing " +
    "procurement officers with clear guidance on which cloud tier to specify.",
    "Classification-to-level mapping."
  ),
  bulletItem(
    "Contractual and technical standards for passing data between sovereignty tiers, including " +
    "encryption-in-transit requirements and audit logging.",
    "Cross-tier interoperability protocols."
  ),
  bulletItem(
    "A mechanism for periodically reassessing whether a workload\u2019s sovereignty level remains " +
    "appropriate as threat landscapes and technology capabilities evolve.",
    "Periodic reassessment cycles."
  ),

  // ══════════════════════════════════════════
  // SECTION: AI as the Central Axis
  // ══════════════════════════════════════════
  sectionHeading("AI as the Central Axis of Digital Sovereignty"),

  bpRef([
    ["Artificial intelligence serves as the most demanding stress test for any sovereignty framework. " +
    "AI systems consume vast quantities of data, require massive computational infrastructure, and " +
    "produce outputs \u2014 predictions, decisions, generated content \u2014 whose provenance and integrity " +
    "are critical to trust. If a sovereignty architecture can accommodate AI workloads at the " +
    "appropriate level, it can accommodate virtually anything.", 4],
  ]),

  boldLeadInPara(
    "1. Data reliance.",
    "AI models are trained on enormous datasets that may include personal information, proprietary " +
    "business data, government records, and open-source intelligence. The sovereignty of the training " +
    "data \u2014 where it is stored, who can access it, and under whose legal jurisdiction it falls " +
    "\u2014 directly determines the trustworthiness of the resulting model."
  ),

  boldLeadInPara(
    "2. Infrastructure dependency.",
    "Training and inference require GPU clusters, high-bandwidth networking, and specialised cooling " +
    "infrastructure. If these resources are located offshore or controlled by foreign entities, the " +
    "nation\u2019s AI capability is contingent on another government\u2019s goodwill and another corporation\u2019s " +
    "commercial priorities."
  ),

  boldLeadInPara(
    "3. Consequences of losing control.",
    "An AI model trained on sovereign data but hosted in a foreign jurisdiction could be compelled " +
    "to produce outputs under foreign court orders, or the model weights themselves could be " +
    "exfiltrated. The consequences range from privacy breaches to the compromise of strategic " +
    "decision-making tools used by government and military leaders."
  ),

  boldLeadInPara(
    "4. Defence and security applications.",
    "Military AI \u2014 from autonomous threat detection to logistics optimisation and signals " +
    "intelligence analysis \u2014 represents the sharpest edge of the sovereignty challenge. These " +
    "systems must operate under complete national control, with no foreign access to training data, " +
    "model weights, or inference outputs."
  ),

  bpRef([
    ["The centrality of AI to the sovereignty discussion underscores why the five-level continuum " +
    "is necessary. A government chatbot answering routine citizen queries may tolerate L2 sovereignty, " +
    "while a predictive intelligence system requires L5. The framework provides the vocabulary and " +
    "structure to make these distinctions explicit and actionable.", 10],
  ]),

  // ══════════════════════════════════════════
  // SECTION: Defence Sector
  // ══════════════════════════════════════════
  sectionHeading("Defence Sector: The Ultimate Sovereignty Use Case"),

  bpRef([
    ["The defence sector represents the limiting case for digital sovereignty \u2014 the workload " +
    "category where any compromise in control has immediate and potentially catastrophic consequences. " +
    "Understanding defence requirements illuminates the upper bound of what a sovereignty framework " +
    "must support.", 5],
  ]),

  bulletItem(
    "Defence data encompasses signals intelligence, operational plans, personnel records, and " +
    "weapons-system specifications. Any exposure \u2014 even metadata leakage \u2014 can provide " +
    "adversaries with actionable intelligence.",
    "Extreme Sensitivity."
  ),
  bulletItem(
    "Military systems must function during conflict, including scenarios where undersea cables " +
    "are severed, satellites are jammed, and commercial cloud providers are subject to foreign " +
    "government directives to deny service.",
    "Continuity Under Duress."
  ),
  bulletItem(
    "Defence networks are the highest-value targets for state-sponsored cyber operations. " +
    "Supply-chain integrity, zero-trust architectures, and continuous monitoring are not optional " +
    "enhancements but baseline requirements.",
    "Cybersecurity."
  ),
  bulletItem(
    "Sovereign defence cloud must integrate with domestic defence industrial partners, supporting " +
    "classified collaboration on weapons development, intelligence sharing, and joint operations " +
    "without exposing data to foreign platform operators.",
    "Integration with National Industry."
  ),

  bodyPara(
    "Alliance considerations add a layer of complexity. NATO interoperability requirements, Five Eyes " +
    "intelligence-sharing protocols, and bilateral defence agreements create legitimate needs for " +
    "cross-border data flows. The sovereignty framework must accommodate these flows at defined " +
    "trust levels without creating backdoors that undermine the sovereign perimeter."
  ),

  bodyPara(
    "The defence use case confirms that Level 5 sovereignty is not an academic construct but a " +
    "practical necessity for the most sensitive national functions. It also demonstrates that " +
    "sovereignty is not isolationism: a nation can maintain full sovereign control while participating " +
    "in allied data-sharing arrangements, provided the trust architecture is explicit and auditable."
  ),

  // ══════════════════════════════════════════
  // SECTION: Encryption and the Chain of Trust
  // ══════════════════════════════════════════
  sectionHeading("Encryption and the Chain of Trust"),

  bpRef([
    ["Encryption is the mechanism that translates legal and policy sovereignty into technical " +
    "reality. Without control over encryption keys, data residency is a legal fiction: the entity " +
    "that holds the keys can read, copy, or disclose the data regardless of where it is physically " +
    "stored.", 9],
  ]),

  bodyPara(
    "The principle is straightforward: whoever controls the encryption keys controls the data. " +
    "If a cloud provider generates, stores, and manages the keys, the provider \u2014 and any " +
    "jurisdiction with legal authority over the provider \u2014 has effective access to the data. " +
    "True sovereignty requires that key management be performed by a domestically controlled entity " +
    "using hardware security modules (HSMs) that are physically located within the national border."
  ),

  bulletItem(
    "A foreign court order compelling a cloud provider to surrender data is meaningless if the " +
    "provider does not hold the decryption keys. Domestic key control is the most effective " +
    "technical countermeasure against extraterritorial legal reach.",
    "Legal immunity."
  ),
  bulletItem(
    "Keys managed by the sovereign entity cannot be exfiltrated by a compromised cloud provider " +
    "employee or a supply-chain attack on the provider\u2019s key management infrastructure.",
    "Insider threat mitigation."
  ),
  bulletItem(
    "The post-quantum transition will require re-keying vast quantities of encrypted data. " +
    "Sovereign key management ensures that this transition is conducted under national control, " +
    "with algorithms chosen by the nation\u2019s own cryptographic authority.",
    "Cryptographic agility."
  ),

  bpRef([
    ["The concrete policy implication is that cloud procurement contracts for sensitive workloads " +
    "must explicitly require domestic key management with customer-controlled HSMs. Cloud providers " +
    "should not be the issuers of encryption keys for sovereign data. This single requirement, if " +
    "rigorously enforced, would do more to advance practical sovereignty than any amount of data " +
    "residency legislation.", 9],
  ]),

  // ══════════════════════════════════════════
  // SECTION: The Integration Challenge and the Need for an Orchestrator
  // ══════════════════════════════════════════
  sectionHeading("The Integration Challenge and the Need for an Orchestrator"),

  bpRef([
    ["Sovereign cloud is not a single product but an ecosystem of components: compute, storage, " +
    "networking, identity management, key management, AI platforms, and governance tooling. " +
    "Integrating these components into a coherent, secure, and operable environment is the central " +
    "technical challenge. This challenge demands an orchestrator \u2014 a trusted entity that assembles, " +
    "configures, and manages the sovereign stack on behalf of the government.", 10],
  ]),

  bodyPara(
    "The orchestrator role is distinct from both the technology supplier role and the audit role. " +
    "Conflating these functions creates conflicts of interest that undermine trust. The framework " +
    "therefore mandates structural separation."
  ),

  bulletItem(
    "Assembles the sovereign stack from vetted components, manages operations, and provides a " +
    "single point of accountability to the government client.",
    "The orchestrator operates."
  ),
  bulletItem(
    "An independent body continuously verifies that the sovereign environment meets its stated " +
    "security and compliance requirements, with real-time access to telemetry and audit logs.",
    "The audit body monitors."
  ),
  bulletItem(
    "Hardware, software, and service providers deliver components to the orchestrator\u2019s " +
    "specifications but do not have direct access to the sovereign environment or its data.",
    "The suppliers provide."
  ),

  bodyPara(
    "This separation has several policy implications that governments must address in their " +
    "procurement and governance frameworks."
  ),

  bulletItem(
    "The orchestrator must be a domestically owned and operated entity with appropriate security " +
    "clearances. Foreign-controlled systems integrators cannot serve this role for sovereign workloads.",
    "Domestic orchestrator requirement."
  ),
  bulletItem(
    "The audit body must have statutory independence and the technical capability to perform " +
    "continuous, automated compliance verification \u2014 not just periodic paper-based audits.",
    "Audit independence."
  ),
  bulletItem(
    "Component suppliers must meet defined trust standards, including supply-chain transparency, " +
    "code auditability, and vulnerability disclosure commitments.",
    "Supplier trust standards."
  ),

  spacer(4),

  // ── KEY FINDING #3 ──
  highlightBox(
    "Key finding:",
    "The orchestrator and auditor must be structurally separated. The entity operating sovereign " +
    "infrastructure cannot be the one certifying its own compliance \u2014 independent real-time " +
    "auditing is essential for trust."
  ),
  spacer(8),

  // ══════════════════════════════════════════
  // SECTION: International Case Studies
  // ══════════════════════════════════════════
  sectionHeading("International Case Studies and Global Context"),

  bodyPara(
    "Several nations and multilateral initiatives have developed sovereignty frameworks that " +
    "offer instructive lessons for Canada. Three stand out for their maturity and relevance."
  ),

  subHeading("France \u2013 SecNumCloud"),

  bpRef([
    ["France\u2019s SecNumCloud certification, administered by ANSSI (the national cybersecurity " +
    "agency), is among the most rigorous sovereignty standards in the world. It requires that " +
    "certified cloud providers be majority-owned by European entities, that data remain within the EU, " +
    "and that operational staff hold French or EU nationality. SecNumCloud effectively implements " +
    "L3\u2013L4 sovereignty by combining jurisdictional immunity with operational control.", 2],
  ]),

  bodyPara(
    "The French model demonstrates that sovereignty certification can coexist with market " +
    "competition: multiple providers have achieved or are pursuing SecNumCloud status, creating a " +
    "competitive domestic market. However, critics argue that the ownership requirements may limit " +
    "access to the most advanced global technologies."
  ),

  subHeading("Germany \u2013 BSI C5 and Sovereign Cloud Stack"),

  bpRef([
    ["Germany\u2019s C5 (Cloud Computing Compliance Criteria Catalogue), maintained by the BSI " +
    "(Federal Office for Information Security), provides a comprehensive audit framework for cloud " +
    "services. While less prescriptive than SecNumCloud on ownership, C5 sets detailed technical and " +
    "operational requirements that align with L2\u2013L3 sovereignty.", 3],
  ]),

  bodyPara(
    "The German Sovereign Cloud Stack initiative complements C5 by developing open-source " +
    "infrastructure components for sovereign cloud environments. This approach prioritises " +
    "technological sovereignty \u2014 the ability to inspect, modify, and control the software " +
    "layer \u2014 and reduces dependency on proprietary platforms."
  ),

  subHeading("Gaia-X \u2013 European Federated Cloud"),

  bpRef([
    ["Gaia-X is a Franco-German-led initiative to create a federated data infrastructure governed " +
    "by European values of transparency, portability, and interoperability. Rather than building " +
    "a single sovereign cloud, Gaia-X defines rules and standards that enable multiple providers " +
    "to participate in a trust framework.", 7, 8],
  ]),

  bodyPara(
    "Gaia-X\u2019s federated model offers an alternative to the monolithic sovereign cloud approach. " +
    "It allows nations to maintain their own sovereignty tiers while participating in a broader " +
    "ecosystem \u2014 a model particularly relevant for Canada\u2019s allied relationships. However, " +
    "Gaia-X has faced criticism for slow progress and governance complexity."
  ),

  bodyPara(
    "Beyond Europe, other models are emerging. The United Kingdom\u2019s G-Cloud and Crown Hosting " +
    "arrangements reflect a pragmatic approach that relies heavily on contractual protections within " +
    "a trusted legal framework. The United States, as the dominant cloud provider market, treats " +
    "sovereignty primarily through programmes such as FedRAMP and the Intelligence Community\u2019s " +
    "Commercial Cloud Enterprise (C2E). China and Russia pursue autarkic models that prioritise " +
    "complete technological independence, albeit at significant cost to innovation and interoperability."
  ),

  bodyPara(
    "The trade-offs embedded in each model are instructive for Canadian policymakers."
  ),

  bulletItem(
    "The more demanding the sovereignty requirements, the smaller the pool of qualifying " +
    "providers and the higher the unit cost of cloud services.",
    "Sovereignty vs. cost."
  ),
  bulletItem(
    "Restrictive ownership and technology requirements may exclude leading-edge platforms, " +
    "creating a tension between security and access to the best available capabilities.",
    "Security vs. innovation."
  ),
  bulletItem(
    "Interoperability standards must balance the desire for open ecosystems with the need to " +
    "prevent adversarial exploitation of open interfaces.",
    "Openness vs. control."
  ),

  // ══════════════════════════════════════════
  // SECTION: Strategic and Policy Considerations
  // ══════════════════════════════════════════
  sectionHeading("Strategic and Policy Considerations"),

  boldLeadInPara(
    "1. Adopt the five-level sovereignty continuum as a national standard.",
    "The continuum provides a common vocabulary for government, industry, and allies. Embedding it " +
    "in procurement policy, security classification guidelines, and international agreements will " +
    "ensure consistent application across departments and agencies."
  ),

  boldLeadInPara(
    "2. Mandate domestic key management for all workloads at Level 3 and above.",
    "Encryption key sovereignty is the single most impactful technical requirement. Cloud contracts " +
    "for Protected B and above should require customer-controlled HSMs operated by domestically " +
    "cleared personnel, with no foreign access to key material."
  ),

  boldLeadInPara(
    "3. Establish a structurally independent sovereign cloud audit authority.",
    "Continuous, automated compliance monitoring must replace periodic paper-based audits. The audit " +
    "authority must have statutory independence, technical capability, and real-time access to " +
    "telemetry from sovereign environments."
  ),

  boldLeadInPara(
    "4. Invest in a domestic orchestrator capability.",
    "Canada needs at least one domestically owned and operated systems integrator capable of " +
    "assembling and managing the full sovereign stack. This may require targeted industrial policy, " +
    "including procurement preferences and technology transfer agreements."
  ),

  boldLeadInPara(
    "5. Develop a sovereign AI compute strategy.",
    "AI workloads are the most demanding test of sovereignty. A national strategy must address GPU " +
    "cluster capacity, training data governance, model hosting requirements, and the sovereignty " +
    "implications of using foreign-developed foundation models."
  ),

  boldLeadInPara(
    "6. Engage internationally to shape interoperable sovereignty standards.",
    "Canada should actively participate in initiatives like Gaia-X, contribute to NATO\u2019s sovereign " +
    "cloud discussions, and pursue bilateral sovereignty recognition agreements with like-minded " +
    "nations. Smart sovereignty is not isolationism \u2014 it is the assertion of control within a " +
    "network of trusted relationships."
  ),

  // ══════════════════════════════════════════
  // SECTION: Conclusion
  // ══════════════════════════════════════════
  sectionHeading("Conclusion: Sovereignty as a Strategic Asset"),

  bodyPara(
    "Digital sovereignty is neither a luxury nor a protectionist impulse. It is a strategic asset " +
    "that determines a nation\u2019s capacity to protect its citizens, enforce its laws, compete " +
    "economically, and defend its territory. The multi-axis framework presented here \u2014 with its " +
    "five levels, three axes, and structural separation of roles \u2014 provides a practical tool for " +
    "operationalising sovereignty in a world where cloud computing and AI are reshaping every " +
    "dimension of national power."
  ),

  bodyPara(
    "The framework\u2019s central insight is that sovereignty is not all-or-nothing. A nation can " +
    "maintain full sovereign control over its most sensitive workloads while embracing the efficiency " +
    "and innovation of global cloud platforms for lower-sensitivity applications. The key is matching " +
    "the sovereignty posture to the workload \u2014 and enforcing that match through policy, " +
    "procurement, and continuous auditing."
  ),

  bpRef([
    ["Canada has both the opportunity and the obligation to move decisively. The international " +
    "landscape is evolving rapidly: nations that establish their sovereignty frameworks now will " +
    "shape the standards that others follow. Those that delay will find themselves adapting to " +
    "rules written by others, for others\u2019 benefit. The five-level continuum, the multi-axis " +
    "blueprint, and the orchestrator model provide the intellectual architecture. What remains is " +
    "the political will to build.", 10],
  ]),

  // ══════════════════════════════════════════
  // NOTES
  // ══════════════════════════════════════════
  notesHeading(),
  noteEntry(1, "Cloud Sovereignty Framework (confidential framework document outlining levels and dimensions of cloud sovereignty)."),
  noteEntry(2, "ITIF, \u201CFrance\u2019s Cloud Service Restrictions,\u201D 2025."),
  noteEntry(3, "StackIT, \u201CGerman C5 Standard,\u201D 2023."),
  noteEntry(4, "Broadcom, \u201CLocal Rules, Local Clouds: Sovereign AI,\u201D 2025."),
  noteEntry(5, "BCG, \u201CSovereign Clouds Reshaping National Security,\u201D 2025."),
  noteEntry(6, "Cloud Security Alliance, \u201CSovereignty in the Cloud,\u201D 2023."),
  noteEntry(7, "Polytechnique Insights, \u201CGaia-X: A Bid for a Sovereign European Cloud,\u201D 2025."),
  noteEntry(8, "Gaia-X Official Site, mission and overview statements."),
  noteEntry(9, "Cloud Security Alliance Blog, \u201CData Sovereignty\u201D (Thales CPL reference on encryption keys)."),
  noteEntry(10, "Additional sovereignty framework excerpts (multi-axis model, challenges, roadmap elements)."),
];

// ── Assemble document ──
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
          level: 0, format: LevelFormat.BULLET, text: "\u2013",
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
      headers: makeHeader(SHORT_TITLE),
      footers: makeFooter("\u00A9 2026 Richard St-Pierre", "me@richardstpierre.com"),
      children,
    },
  ],
});

// ── Generate ──
const outputPath = process.argv[2] || `${SLUG}-${VERSION}.docx`;
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`\u2713 Generated: ${outputPath}`);
});
