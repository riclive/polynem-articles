/**
 * process-ai-value-chain.js
 *
 * Document-specific processing script for:
 * "AI Industry Evolution and Value Chain for Canada"
 *
 * Uses generate-template.js builder functions to produce the polished .docx.
 * Run: node process-ai-value-chain.js [output.docx]
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
const TITLE = "AI Industry Evolution and Value Chain for Canada";
const SHORT_TITLE = "AI Industry Evolution and Value Chain for Canada";
const SLUG = "ai-industry-evolution-value-chain-canada";
const VERSION = "v260318";
const CATEGORY = "Analysis";

// ── Build content ──
const children = [
  // ══════════════════════════════════════════
  // PAGE 1: COVER / HEADER BLOCK
  // ══════════════════════════════════════════
  categoryTag(CATEGORY),
  titleBlock(TITLE),
  abstractBlock(
    "Canada\u2019s AI ambitions face a critical disconnect: while data center investment is booming, " +
    "less than 2% of global AI-grade GPU clusters reside on Canadian soil. This analysis maps the " +
    "full AI value chain \u2014 from energy supply through hardware, algorithms, and applications \u2014 " +
    "and argues that measuring capacity in megawatts rather than GPU petaflops conceals Canada\u2019s " +
    "true competitive position. Five strategic recommendations target the gaps across the stack, " +
    "from treating AI compute as national infrastructure to building sovereign language models and " +
    "modernizing procurement for AI-era realities."
  ),
  rule(C.primary, 2),
  authorEntry("Richard St-Pierre", "Senior Digital Sovereignty Advisor, Levio"),
  dateLine(VERSION),
  spacer(16),

  // ── KEY FINDING #1 ──
  highlightBox(
    "Key finding:",
    "Less than 2% of global AI-grade GPU clusters are located in Canada. Despite a rapidly " +
    "growing data center market, raw megawatts is a misleading metric \u2014 GPU-equipped capacity " +
    "is what determines a nation\u2019s true AI competitiveness."
  ),
  spacer(8),

  // ══════════════════════════════════════════
  // SECTION: The AI Landscape Before 2022
  // ══════════════════════════════════════════
  sectionHeading("The AI Landscape Before 2022"),

  bodyPara(
    "Artificial Intelligence has undergone several waves of progress, but the period up to 2022 " +
    "can be seen as a foundational epoch that set the stage for today\u2019s rapid advances. Early " +
    "breakthroughs in machine learning (e.g. deep neural networks, convolutional nets) around the " +
    "2010s demonstrated AI\u2019s potential in labs and niche applications. Critically, this era saw " +
    "GPUs (graphics processing units) emerge as the workhorse for AI computation, enabling the " +
    "training of complex models that CPUs could not handle efficiently. By the late 2010s, major " +
    "tech firms and research institutions were leveraging GPUs to achieve milestone results in " +
    "image recognition, speech recognition, and language modelling."
  ),

  bodyPara(
    "The advent of large-scale deep learning models like transformers (the architecture behind " +
    "modern language models) hinted at the productivity leap AI could provide. However, prior to " +
    "2022, these efforts, while impressive, were limited in industrial-scale deployment. Most AI " +
    "implementations were small-scale or experimental, and the infrastructure supporting AI \u2014 " +
    "from data centers to algorithms \u2014 was still developing."
  ),

  bodyPara(
    "Importantly, the AI value chain was not yet fully recognized as an integrated ecosystem. Many " +
    "organizations viewed AI as a software innovation or research endeavour rather than a sector " +
    "requiring end-to-end infrastructure. Data centers largely remained optimized for traditional " +
    "enterprise and cloud computing (CPU-driven), with only pockets of GPU-centric clusters for " +
    "specialized AI and high-performance computing tasks. AI training of models was typically " +
    "constrained to research labs or tech giants, and real-world inference (using AI models in " +
    "practice) was modest \u2014 think voice assistants or recommendation engines \u2014 impactful, " +
    "but not yet transformative at a national economic scale."
  ),

  bodyPara(
    "This was the epoch of narrow AI applications and foundational research. It ended around 2022 " +
    "with a convergence of factors: the maturation of AI algorithms, the availability of massive " +
    "datasets, and crucially, the impending scale-up of computational power using GPUs and advanced " +
    "chips. These elements would combine to propel AI into a new, industry-shaping phase."
  ),

  bodyPara(
    "In summary, by 2022 AI had proven its promise through research breakthroughs and pilot " +
    "applications, but it had not yet redefined industries or national productivity at scale. The " +
    "stage was set \u2014 with GPUs providing the raw horsepower \u2014 for an explosion in AI " +
    "capabilities and deployment in the years that followed. This context is important for " +
    "understanding the evolution of the AI industry from 2022 onward, and why the next era would " +
    "require viewing AI along two critical axes: (1) the types of AI workloads (training vs. " +
    "inference, generative conversational AI vs. analytic AI, etc.), and (2) the full stack of " +
    "enabling resources (from energy and hardware up through models and applications)."
  ),

  // ══════════════════════════════════════════
  // SECTION: The AI Industry (2022\u20132030)
  // ══════════════════════════════════════════
  sectionHeading("The AI Industry (2022\u20132030): Types of AI and the Full Stack"),

  bodyPara(
    "From 2022 to 2030, the AI industry is experiencing an unprecedented acceleration. This " +
    "section examines its evolution along two dimensions: the types of AI activities (from model " +
    "training to inference and specialized applications like conversational AI), and the AI value " +
    "chain stack (spanning energy supply, data center infrastructure, specialized hardware like " +
    "GPUs, algorithms/models, and end-user applications). Understanding these will illuminate how " +
    "value is created and captured in modern AI \u2014 and what is required for national " +
    "competitiveness."
  ),

  // ── Axis 1 workload types as formatted bullet list ──
  subHeading("Types of AI Workloads: Training, Inference, and Beyond"),

  bodyPara(
    "Six distinct workload categories now define the AI compute landscape, each with different " +
    "infrastructure requirements, cost structures, and scaling dynamics:"
  ),

  bulletItem(
    "Extreme parallelism on GPU clusters; cost levers include accelerator performance, power " +
    "price, and algorithmic efficiency.",
    "AI Model Training (Frontier & Fine-tuning)."
  ),
  bulletItem(
    "Continuous, latency-sensitive serving at scale; cost levers include quantization, batching, " +
    "distillation, and caching.",
    "Inference (Serving at Scale)."
  ),
  bulletItem(
    "Real-time LLM interactions; emphasis on retrieval-augmented generation (RAG), guardrails, " +
    "and small specialized models for cost control.",
    "Conversational and Generative AI."
  ),
  bulletItem(
    "Multi-step planning and tool use; reliability and security gating are essential for " +
    "autonomous operation.",
    "Agentic and Autonomous AI."
  ),
  bulletItem(
    "Vision, speech, embeddings, and recommendations; often mid-scale with compression and " +
    "pruning opportunities.",
    "Perception and Analytics."
  ),
  bulletItem(
    "Privacy and latency benefits; compact models on NPUs/GPUs with compiled kernels and " +
    "on-device caching.",
    "Edge and On-Device AI."
  ),

  spacer(8),

  // ── Training detail ──
  subHeading("AI Model Training at Scale"),

  bodyPara(
    "Training refers to the computationally intensive process of teaching AI models from data. " +
    "Since 2022, the scale of AI training has grown exponentially. Companies now routinely train " +
    "foundation models \u2014 such as large language models (LLMs) or image generation models \u2014 " +
    "that consist of hundreds of billions or even trillions of parameters. Training these models " +
    "demands vast computing resources: it often requires thousands of GPU chips running in " +
    "parallel for weeks or months."
  ),

  bpRef([
    ["Training now sits at the intersection of software innovation and heavy industrial capability. " +
    "It not only requires clever algorithms but also enormous quantities of electricity and highly " +
    "specialized facilities. A top-tier training run might consume millions of watt-hours of energy " +
    "and utilize chips collectively performing on the order of exaFLOPs (10\u00B9\u2078 operations " +
    "per second) during the training period.", 1, 2],
  ]),

  bodyPara(
    "Critically, training workloads push the envelope of hardware architecture. They demand high " +
    "memory bandwidth, fast interconnects between GPUs, and efficient cooling for racks drawing " +
    "tens of kilowatts each. The market has responded with specialized hardware: NVIDIA\u2019s " +
    "high-end A100 and H100 GPU accelerators (and their successors) became the de facto standard " +
    "for training large models in this era, while alternatives like Google\u2019s TPU and various " +
    "AI chips from startups (Graphcore, Cerebras, etc.) also emerged."
  ),

  bodyPara(
    "By 2025, training a frontier model is not just a computer science endeavour but an exercise " +
    "in logistics and engineering, requiring planning of power supply and cooling at data centers, " +
    "procurement of scarce accelerator hardware, and often multi-million-dollar budgets. The era " +
    "2022\u20132030 marks training as a semi-industrial activity \u2014 one that historically only " +
    "a few large companies (and nations) could execute, though trends like open-source models and " +
    "consortium efforts are attempting to democratize it."
  ),

  // ── Inference detail ──
  subHeading("AI Inference and Deployment"),

  bodyPara(
    "If training is akin to building a powerful engine, inference is using that engine to perform " +
    "tasks in real time. Inference involves deploying trained AI models to generate predictions, " +
    "answers, or other outputs for users. This side of AI has exploded since 2022, particularly " +
    "with the rise of generative AI services. Unlike training \u2014 which is a background, " +
    "occasional task \u2014 inference happens continuously as end-users interact with AI models."
  ),

  highlightBox(
    "Key finding:",
    "A single generative AI prompt can consume 10\u00D7 to 100\u00D7 more electricity than a " +
    "typical web search. As AI applications grew, inference demand began driving significant " +
    "expansion in data center capacity."
  ),
  spacer(4),

  bpRef([
    ["The industry quickly realized that serving millions of queries or generative requests to an " +
    "AI model can equal or even exceed the cost of initially training it. Each user query to a " +
    "large language model (like asking ChatGPT a question) might activate billions of calculations " +
    "across multiple GPUs.", 3],
  ]),

  bpRef([
    ["Starting around 2023, major AI providers shifted focus to optimize inference \u2014 making " +
    "it faster and cheaper \u2014 because the volume of usage was skyrocketing. OpenAI\u2019s " +
    "recent initiatives highlight the centrality of inference: OpenAI announced plans for " +
    "large-scale data center capacity devoted largely to inference workloads. One prominent " +
    "example is OpenAI\u2019s \u201CStargate\u201D project expansion to a massive data center in " +
    "the UAE, where OpenAI committed to use about 1 gigawatt of capacity \u2014 with an initial " +
    "200 megawatts dedicated to clusters of NVIDIA\u2019s latest GPUs for high-volume, low-cost " +
    "inference serving.", 4],
  ]),

  bpRef([
    ["To put this in perspective, 200 MW of cutting-edge GPU infrastructure is on the order of " +
    "100,000 top-tier GPUs deployed in one location.", 5],
    [" This reflects how inference has become a large-scale, power-hungry operation in its own " +
    "right."],
  ]),

  bpRef([
    ["Analysts project that as power-intensive AI deployments grow, global data center electricity " +
    "consumption could roughly double between 2025 and 2030, largely due to AI workloads.", 6, 7],
  ]),

  // ── Conversational AI ──
  subHeading("Conversational and Generative AI Applications"),

  bodyPara(
    "The launch of OpenAI\u2019s ChatGPT in late 2022 was a watershed moment \u2014 it showcased " +
    "an AI system conversing at a level close to human-like fluency on an endless array of topics. " +
    "This breakthrough popularized AI to hundreds of millions of users almost overnight and " +
    "demonstrated the disruptive potential of generative AI. Conversational AI is essentially an " +
    "inference workload (running an LLM to produce dialogue), but it triggered unique industry " +
    "dynamics: it created mass consumer demand for AI interactions, forced many industries to " +
    "rethink customer service and knowledge work, and spurred an arms race among AI labs and " +
    "companies to build ever more capable conversational agents."
  ),

  bodyPara(
    "From 2023 onward, virtually every major tech company introduced or integrated LLM-based " +
    "conversational systems \u2014 examples include Google\u2019s Bard, Microsoft\u2019s " +
    "integration of GPT-4 into Bing and Office, Meta\u2019s various AI assistants, and a myriad " +
    "of startup offerings. Conversational AI has put a spotlight on the upper layers of the AI " +
    "stack: algorithms and applications. It\u2019s not just about raw hardware; it\u2019s also " +
    "about model refinement, data control (since these models learn from vast datasets, raising " +
    "data governance and privacy questions), and user interface design for integrating AI into " +
    "workflows."
  ),

  bpRef([
    ["A frequently cited analysis by PwC estimated that AI (including such productivity " +
    "improvements) could contribute around $15.7 trillion to the global economy by 2030.", 8],
    [" Sectors like retail, finance, and healthcare are poised to reap large gains as AI augments " +
    "human labour.", 9, 10],
  ]),

  bodyPara(
    "In summary, along this first axis of \u201Ctype of AI,\u201D the 2022\u20132030 landscape is " +
    "defined by training pushing the frontier of compute scale (and becoming a strategic asset for " +
    "whoever can do it), inference becoming a massive ongoing operational demand (necessitating " +
    "new infrastructure dedicated to AI services), and conversational/generative applications " +
    "driving AI into everyday use (creating new markets and expectations)."
  ),

  // ══════════════════════════════════════════
  // Axis 2: The AI Value Chain
  // ══════════════════════════════════════════
  subHeading("The AI Value Chain: Energy, Infrastructure, GPUs, Models, and Applications"),

  bodyPara(
    "The second axis to consider is the AI industry stack \u2014 the full spectrum of components " +
    "required to deliver AI solutions from raw energy up to user-facing applications. A key " +
    "insight of the current landscape is that AI is not a mere software tool; it\u2019s an entire " +
    "value chain. Weakness or absence in any layer of this chain means a country or company " +
    "cannot capture the full economic value \u2014 instead, value will flow to whoever provides " +
    "the missing pieces."
  ),

  // ── Energy ──
  boldLeadInPara("Energy Supply.",
    "Modern AI, especially at scale, consumes enormous amounts of electricity. Power is the first " +
    "and most fundamental input \u2014 without sufficient, reliable energy, nothing else in the AI " +
    "stack can function."
  ),

  bpRef([
    ["AI data centres require large amounts of electricity to power high-performance hardware " +
    "such as GPUs, and this demand is growing rapidly.", 11],
    [" On average, in conventional data centers, IT equipment accounts for approximately 60% of " +
    "electricity use,", 12],
    [" but in AI-centric facilities this proportion can be even higher due to the power-hungry " +
    "nature of GPUs."],
  ]),

  bpRef([
    ["A single advanced AI chip today can draw 400\u2013700 watts or more", 13],
    [" \u2014 several times a typical server CPU \u2014 and a rack of such chips can demand " +
    "30\u201350 kW or higher. Next-generation 2024 chips are expected to approach 1.2 kilowatts " +
    "each.", 14],
    [" By 2027, average rack power in cutting-edge data centers is anticipated to exceed 50 kW " +
    "per rack (up from approximately 36 kW in 2023).", 15],
  ]),

  bpRef([
    ["Nations rich in affordable, clean energy have a potential competitive advantage for hosting " +
    "AI infrastructure. Canada\u2019s abundance of hydroelectric power and cool climate are " +
    "touted as assets for high-density computing centers.", 16],
    [" On the flip side, places with strained grids are seeing regulatory pushback on new data " +
    "centers \u2014 Ireland and the Netherlands, for instance, temporarily paused data center " +
    "build-outs to assess impacts on electricity supply.", 17, 18],
  ]),

  // ── Data Center Infrastructure ──
  boldLeadInPara("Data Center Infrastructure.",
    "In the AI era, data centers are evolving into \u201CAI factories\u201D \u2014 more akin to " +
    "industrial plants than traditional server rooms. High-performance AI workloads produce " +
    "concentrated heat and require advanced cooling (e.g. liquid cooling for racks, or even " +
    "immersion cooling for the hottest chips). The networking within these data centers is also " +
    "specialized: AI training clusters need ultra-high bandwidth and low latency between GPUs " +
    "(often using InfiniBand or NVLink fabrics) to operate as one giant machine."
  ),

  bpRef([
    ["The UAE\u2019s upcoming 5 gigawatt AI campus is one extreme, aiming to host multiple " +
    "companies\u2019 AI hardware in one gargantuan site.", 20, 21],
  ]),

  bpRef([
    ["For Canada, recent reports indicate the data center market is expanding quickly, with over " +
    "10 GW of total IT capacity either operational or in pipeline.", 22],
    [" Key regions are Toronto, Montreal, and Alberta, which account for about 93% of capacity.", 23],
    [" Major projects, such as Alberta\u2019s Wonder Valley (planned 5.6 GW IT load),", 24],
    [" exemplify ambitions to create GPU-ready mega-sites. The federal government has also " +
    "directed funding \u2014 notably a commitment of C$240 million to support Cohere in " +
    "developing AI data centers, specifically the Bell \u201CAI Fabric\u201D project expected to " +
    "add 500 MW of capacity for AI workloads.", 25],
  ]),

  highlightBox(
    "Key finding:",
    "A 100 MW facility of CPUs is not comparable to a 100 MW facility of AI accelerators in " +
    "terms of AI capability. Canada must measure its data center capacity in terms of \u201CAI " +
    "capacity\u201D (GPU slots or petaflops available) rather than just energy or floor space."
  ),
  spacer(4),

  // ── GPUs and Accelerators ──
  boldLeadInPara("Compute Hardware (GPUs and Accelerators).",
    "This is the core engine of the AI stack. Modern AI progress has been tightly coupled with " +
    "advances in specialized hardware \u2014 predominantly GPUs \u2014 which accelerate the " +
    "linear algebra calculations at the heart of machine learning."
  ),

  bpRef([
    ["GPUs have effectively become the \u201Cbrains\u201D of AI data centers, often contributing " +
    "over 90% of the computational power in servers that have them.", 26],
    [" NVIDIA\u2019s market share and margins are so strong that its data center GPUs carry gross " +
    "margins around 75%, reflecting their strategic value.", 27],
  ]),

  bpRef([
    ["NVIDIA introduced a platform called QODA (Quantum Optimized Device Architecture) in 2022, " +
    "essentially an extension of CUDA to interface with quantum processors,", 28, 29],
    [" enabling hybrid quantum-classical algorithms.", 30, 31],
  ]),

  bpRef([
    ["It has been aptly said that \u201Ccompute is the oil of modern AI\u201D \u2014 without " +
    "sovereign or assured access to it, other advantages (talent, research ideas) cannot be fully " +
    "realized.", 32],
    [" Less than 2% of global AI-grade GPU clusters are located in Canada. Our world-class AI " +
    "researchers and startups will struggle to scale or even retain their IP if they have to " +
    "\u201Cqueue or overpay abroad\u201D for computing time.", 33],
  ]),

  // ── Algorithms and Models ──
  boldLeadInPara("Algorithms and AI Models.",
    "This layer is where much of Canada\u2019s historical strength lies: we are a country that " +
    "has punched above its weight in fundamental AI research. Canadian researchers pioneered " +
    "techniques like backpropagation, contributed to the development of deep learning and " +
    "reinforcement learning, and more recently were key in inventing the Transformer architecture " +
    "(the backbone of today\u2019s LLMs)."
  ),

  bpRef([
    ["We host world-renowned AI institutes (Vector Institute, Mila, AMII) and have educated a " +
    "significant fraction of the global AI talent.", 34],
  ]),

  bodyPara(
    "However, in the industry phase from 2022 onward, algorithms have undergone industrialization. " +
    "What began as academic experiments are now productized models requiring continual engineering. " +
    "The frontier of model development now often involves training runs costing tens of millions " +
    "of dollars. There has been a shift of the AI model development epicentre from universities " +
    "to well-funded industrial labs."
  ),

  bpRef([
    ["Canada\u2019s challenge is to ensure our strong research pipeline translates into applied, " +
    "large-scale model development that happens on Canadian soil or under Canadian control \u2014 " +
    "otherwise we risk remaining an \u201Cintellectual exporter\u201D while others reap the " +
    "commercial rewards.", 35, 36],
  ]),

  bpRef([
    ["One promising development is Cohere, founded by alumni of Google Brain in Toronto, which " +
    "focuses on creating large language models for business and enterprise use. It has raised " +
    "over $1.27 billion in venture funding (the most of any Canadian AI startup),", 37],
    [" differentiating by focusing on enterprises with customizable models.", 38],
    [" Cohere has partnerships with cloud providers and reportedly with NVIDIA/CoreWeave for a " +
    "dedicated data center.", 39, 40],
  ]),

  bpRef([
    ["Policy can encourage this by supporting national compute resources and perhaps by funding " +
    "\u201Csovereign AI\u201D models \u2014 Canadian-pretrained language models that understand " +
    "our bilingual context and values.", 41, 42],
  ]),

  // ── Applications ──
  boldLeadInPara("Applications and Industry Solutions.",
    "At the top of the stack are the applications \u2014 where AI delivers tangible value and " +
    "productivity gains in the economy. This includes consumer applications (chatbots, smart " +
    "assistants, recommendation systems) and an even larger opportunity in enterprise and " +
    "government applications (AI-driven analytics, predictive maintenance, AI-enhanced drug " +
    "discovery, etc.)."
  ),

  bpRef([
    ["Surveys indicate that a majority of Canadian small and mid-size enterprises cite cost, " +
    "expertise, and uncertainty as barriers to AI adoption.", 43],
  ]),

  bodyPara(
    "Canada has a growing ecosystem of applied AI startups tackling various industries \u2014 " +
    "Coveo in Quebec focusing on AI in enterprise search, Waabi in Toronto building AI for " +
    "autonomous trucking, Ada in Toronto for AI customer service chatbots, among others. " +
    "Nurturing these solution-focused companies is as important as the deep tech side, because " +
    "they bring AI to end-users."
  ),

  bodyPara(
    "Government can play a catalytic role at this layer by being a major first adopter. The " +
    "public sector has vast services (from healthcare administration to border services to tax " +
    "and benefits processing) that could be improved with AI, and government procurement or " +
    "sandboxes for AI solutions could both improve services and give Canadian AI firms reference " +
    "projects to springboard from."
  ),

  // ══════════════════════════════════════════
  // The Current Global Landscape
  // ══════════════════════════════════════════
  subHeading("The Current Global Landscape (2022\u20132025)"),

  bpRef([
    ["Globally, an AI arms race is underway across value chain components. The United States " +
    "leads in many areas \u2014 its big tech companies are pouring resources into ever-larger AI " +
    "model training and building new data centers (U.S. hyperscalers alone are projected to spend " +
    "on the order of $1.6\u2013$1.7 trillion on infrastructure between 2025 and 2029).", 45],
    [" The Gulf states are investing petrodollars to become hosting hubs for AI (as seen by the " +
    "UAE\u2019s 5 GW campus and Saudi plans for 500 MW of AI capacity).", 46],
  ]),

  bodyPara(
    "For Canada, which is a mid-sized economy and closely allied with the US, this global " +
    "context means we have partners to leverage but also fierce competition to stay relevant. " +
    "We will not outspend the US or China \u2014 but we can identify niches and strategic " +
    "combinations of our strengths (talent, power, stable environment) to punch above our weight."
  ),

  bodyPara(
    "The misconception that any data center equals AI capacity must be dispelled. Our data " +
    "centers must host significant GPU clusters to count in the AI race. Similarly, the notion " +
    "that having a few AI startups or research labs means we\u2019re set is misleading unless " +
    "those startups can scale at home."
  ),

  bodyPara(
    "Financial flows will follow the full value chain: if we lack GPU hardware, our researchers " +
    "will rent time from US clouds (sending money out). If we lack domestic models, our " +
    "industries will pay API fees to foreign AI firms. If we lack applications companies, our " +
    "businesses will hire foreign consultancies or buy foreign software that embeds AI. Each gap " +
    "is a funnel of economic value leaving Canada, or an opportunity cost of jobs not created here."
  ),

  // ══════════════════════════════════════════
  // SECTION: Beyond 2030
  // ══════════════════════════════════════════
  sectionHeading("Beyond 2030: Outlook for the Next Epoch"),

  bodyPara(
    "Looking beyond 2030, we foresee the AI industry continuing its trajectory as a " +
    "general-purpose technology, increasingly embedded in all facets of economy and society. By " +
    "the early 2030s, AI might become as ubiquitous and assumed in business as computing or " +
    "electricity \u2014 a background capability that every competitive organization uses."
  ),

  boldLeadInPara("Hardware and Architectures.",
    "The 2030s will likely bring more specialized AI hardware. The current dominance of GPUs may " +
    "be challenged by new paradigms: improved AI-specific ASICs (application-specific chips), " +
    "possibly leveraging 3D chip architectures or photonics for faster data transfer, and " +
    "eventually, early quantum accelerators for certain tasks."
  ),

  bpRef([
    ["NVIDIA\u2019s efforts with CUDA-QODA indicate the industry is preparing for hybrid " +
    "quantum-classical computing workflows for AI.", 28, 31],
  ]),

  bodyPara(
    "For Canada, which has strength in semiconductor research and photonics, this could be an " +
    "area to innovate \u2014 for instance, harnessing Canadian photonic computing research for " +
    "AI (companies like Xanadu working on photonic quantum computers could be aligned with our " +
    "AI strategy)."
  ),

  boldLeadInPara("Algorithms and Capabilities.",
    "By 2030+, current large models might evolve into something closer to artificial general " +
    "intelligence (AGI) on certain dimensions. We expect models to keep getting larger up to a " +
    "point, but there will also be efforts to make them more efficient, interpretable, and secure. " +
    "Multi-modal AI (systems that seamlessly integrate vision, language, sound, etc.) will be " +
    "more mature, enabling more human-like understanding of context."
  ),

  boldLeadInPara("Global AI Ecosystem.",
    "Geopolitically, the split between AI \u201Chaves\u201D and \u201Chave-nots\u201D may widen. " +
    "By 2030 the major AI powers (US, China, and possibly a coalition in the EU or others) will " +
    "have integrated AI deeply into their economies and defence. Middle-tier countries will need " +
    "alliances or niches to remain relevant. Canada\u2019s best strategy likely remains aligning " +
    "with trusted partners (US, Europe) for shared resources."
  ),

  bodyPara(
    "There is also the positive scenario where AI becomes a heavily traded service: countries " +
    "with strong AI infrastructure could export AI services globally. Canada could aspire to be " +
    "such a provider in niches like bilingual models, AI for mining (leveraging our mining " +
    "industry expertise), or AI for resource management and climate tech. But that will require " +
    "conscious capacity-building now."
  ),

  // ══════════════════════════════════════════
  // SECTION: Strategic Recommendations
  // ══════════════════════════════════════════
  sectionHeading("Strategic Recommendations for Canada"),

  bodyPara(
    "To ensure Canada can ride the current AI wave and secure a strong position into the next " +
    "decade, a strategic, coordinated approach is needed. Below are five key recommendations " +
    "focusing on bolstering the entire AI value chain domestically and removing bottlenecks that " +
    "currently impede progress."
  ),

  // Rec 1
  subHeading("1. Treat AI Infrastructure as a Strategic National Asset"),

  bpRef([
    ["Canada should recognize AI compute capacity (especially GPU clusters) as critical " +
    "infrastructure on par with our ports, highways, and power grids.", 47],
    [" The recent commitment of $2 billion to a Sovereign AI Compute Strategy (announced in " +
    "late 2024) is a good start,", 48, 39],
    [" but it should be seen as Phase 1."],
  ]),

  bpRef([
    ["Consider establishing a Canadian AI Compute Cloud accessible to researchers, startups, " +
    "and industry with subsidized credits \u2014 similar to a federated GPU cloud targeting 10 " +
    "exaFLOPs by 2027. Alongside this, introduce incentives like a Compute Investment Tax " +
    "Credit to encourage private data center operators to build AI-focused capacity.", 49],
  ]),

  bodyPara(
    "The goal is to dramatically raise Canada\u2019s share of global AI compute from the current " +
    "less than 2% toward a level commensurate with our economic size (for reference, Canada is " +
    "approximately 2\u20133% of global GDP, so a target might be 2\u20135% of global AI compute " +
    "capacity as a medium-term goal)."
  ),

  // Rec 2
  subHeading("2. Align Data Center Expansion with AI Needs"),

  bodyPara(
    "Government and industry should collaborate to ensure data center growth is steered toward " +
    "AI. Concrete actions include: cataloguing the GPU/AI readiness of existing and upcoming data " +
    "centers; targeting incentives or funding support to AI-specific builds; and working with " +
    "utilities and regulators to guarantee power for AI projects."
  ),

  bodyPara(
    "Crucially, reorient our national metrics: begin reporting Canada\u2019s \u201CAI compute " +
    "capacity\u201D in government tech strategy documents (e.g. number of petaflops or GPU count " +
    "available domestically) as a success indicator, rather than just number of data centers or " +
    "IT load in megawatts. The underlying principle is: it\u2019s not a data center if it\u2019s " +
    "not doing significant AI. All major new facilities should be \u201CAI-enabled by design.\u201D"
  ),

  // Rec 3
  subHeading("3. Secure the Semiconductor Supply Chain"),

  bodyPara(
    "Hardware is a choke point. The federal government should make it a priority to secure a " +
    "stable supply of state-of-the-art AI chips for Canadian industry and research. This could " +
    "involve bulk purchase agreements or partnerships with manufacturers, and supporting local " +
    "companies like Tenstorrent (Toronto-based, designing AI chips) or photonics firms (e.g. " +
    "Xanadu) through grants or government procurement commitments."
  ),

  bodyPara(
    "Canada could establish a dedicated program or centre for AI Accelerator research at one of " +
    "our national labs or universities, ensuring we build expertise in the next generation of " +
    "computing (quantum, neuromorphic, etc.). If quantum computing is likely to intersect AI, " +
    "align our Quantum Strategy with our AI Strategy."
  ),

  // Rec 4
  subHeading("4. Double Down on Applied AI Development"),

  bpRef([
    ["Fund a collaboration between AI institutes (Mila, Vector, AMII) and industry to train " +
    "sovereign AI models that understand Canadian official languages and values. Open-source " +
    "these models so Canadian companies and governments can use them without depending on " +
    "foreign APIs.", 41, 42],
  ]),

  bpRef([
    ["The government\u2019s recent funding announcements (like the $240M to Cohere\u2019s data " +
    "center, or $2.4B in Budget 2024 for computing and AI safety research) are positive, but " +
    "these should tie into outcomes: what Canadian-owned IP or platforms will result?", 50],
  ]),

  bodyPara(
    "On the industry solutions side, stimulate adoption and \u201Cmarket pull\u201D through " +
    "Challenge Programs: identify key sectors (mining, agriculture, healthcare, public service " +
    "delivery) and issue grand challenges or pilot funding for integrating AI solutions. " +
    "Implement an AI Adoption Tax Credit for companies investing in AI technologies. Expand " +
    "programs like the Industrial Research Assistance Program (IRAP) to specifically target AI " +
    "solution integration for traditional businesses."
  ),

  bodyPara(
    "Modernize procurement and regulations to not hinder AI deployment. The federal government " +
    "should review procurement rules that currently favour established large vendors and make it " +
    "hard for innovative AI SMEs to win contracts. Set aside a portion of government IT " +
    "procurement specifically for emerging AI solutions."
  ),

  // Rec 5
  subHeading("5. Leverage Canada\u2019s Strengths to Attract Global AI Investment"),

  bodyPara(
    "Canada should market itself as a premier destination for AI projects, given our unique " +
    "advantages: plenty of clean energy, a stable democracy with rule of law, and a reputation " +
    "for trustworthy AI and diversity. Specifically target and attract AI-specific investments: " +
    "encourage foreign hyperscalers to build their next AI cloud region in Canada and negotiate " +
    "conditions such that a portion of that capacity is available to Canadian researchers or " +
    "companies at favourable terms."
  ),

  bpRef([
    ["Two safeguards are essential: first, ensure ownership and IP clauses so the resulting " +
    "intellectual property or a significant share of benefits remain in Canada. Second, prevent " +
    "solely extractive scenarios \u2014 if a big cloud builds here, perhaps 10\u201320% of that " +
    "compute should be earmarked for Canadian startups or government use on preferential terms.", 51],
  ]),

  bodyPara(
    "Canada should also continue to champion multilateral efforts on AI governance and standards. " +
    "By being a thought leader in responsible AI, we can punch above our weight diplomatically " +
    "and ensure international rules don\u2019t unfairly disadvantage smaller players."
  ),

  // ══════════════════════════════════════════
  // SECTION: Conclusion
  // ══════════════════════════════════════════
  sectionHeading("Conclusion"),

  bodyPara(
    "In the coming years, AI will be a key determinant of economic prosperity and strategic " +
    "autonomy. Canada finds itself at a crossroads \u2014 we have enviable assets in this new " +
    "landscape, yet we also face significant gaps. The evolution of the AI industry along the two " +
    "axes described (the variety of AI activities and the stack of enabling resources) teaches us " +
    "that partial measures won\u2019t suffice."
  ),

  bodyPara(
    "Building a few data centers, or funding a few startups, or publishing a strategy document " +
    "\u2014 none of these alone will position Canada to seize the AI opportunity. What\u2019s " +
    "needed is orchestrated action across all fronts: from electrons to algorithms to adoption. " +
    "The federal government has a unique convening power to align policies across energy, " +
    "innovation, skills, and industry development to make this happen."
  ),

  bodyPara(
    "Canada\u2019s vision should be to cultivate a full-stack AI ecosystem at home: one where " +
    "a breakthrough discovered in a Canadian lab can be developed on Canadian compute resources, " +
    "scaled by a Canadian company in a Canadian data center, and then applied to benefit Canadian " +
    "industries and citizens \u2014 all while exporting solutions abroad for revenue. Achieving " +
    "this will boost our productivity and increase our economic resilience and sovereignty in a " +
    "technology-driven world."
  ),

  bodyPara(
    "The recommendation is clear: Canada must ensure all key components of the AI value chain " +
    "are present and robust within our borders. Only then can we truly say we\u2019ve " +
    "\u201Ccovered\u201D the AI industry. Otherwise, money, talent, and data will be diverted to " +
    "jurisdictions that did, and Canada will miss the boat on the greatest productivity engine " +
    "of our time. We have a fleeting chance to catch this wave; with strategic focus and bold " +
    "action, we can \u2014 and in doing so, secure prosperity and technological sovereignty for " +
    "Canadians in the decades ahead."
  ),

  // ══════════════════════════════════════════
  // NOTES
  // ══════════════════════════════════════════
  notesHeading(),
  noteEntry(1, "Deloitte, \u201CTechnology, Media and Telecom Predictions \u2014 Gen AI\u2019s Impact on Power Consumption,\u201D Deloitte Insights, 2024. https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2025/genai-power-consumption-creates-need-for-more-sustainable-data-centers.html"),
  noteEntry(2, "Ibid."),
  noteEntry(3, "Ibid. (Deloitte analysis showing generative AI prompts consume 10\u2013100\u00D7 more electricity than a typical web search.)"),
  noteEntry(4, "The Next Platform, \u201COpenAI Datacenters Follow The Money To Abu Dhabi,\u201D May 2025. https://www.nextplatform.com/2025/05/23/openai-datacenters-follow-the-money-to-abu-dhabi/"),
  noteEntry(5, "Ibid."),
  noteEntry(6, "Deloitte, op. cit."),
  noteEntry(7, "Ibid."),
  noteEntry(8, "World Economic Forum / PwC, \u201CSizing the Prize: What\u2019s the Real Value of AI for Your Business and How Can You Capitalise?\u201D 2017. https://www.weforum.org/stories/2017/06/the-global-economy-will-be-14-bigger-in-2030-because-of-ai/"),
  noteEntry(9, "Ibid."),
  noteEntry(10, "Ibid."),
  noteEntry(11, "RCR Wireless, \u201CFive Reasons AI Data Centers Require Massive Amounts of Power,\u201D March 2025. https://www.rcrwireless.com/20250318/featured/ai-data-centers-power"),
  noteEntry(12, "International Energy Agency (IEA), \u201CEnergy Demand from AI,\u201D 2024. https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai"),
  noteEntry(13, "Deloitte, op. cit."),
  noteEntry(14, "Ibid."),
  noteEntry(15, "Ibid."),
  noteEntry(16, "Data Center Knowledge, \u201CCanada Emerges as Global Data Center Powerhouse,\u201D 2025. https://www.datacenterknowledge.com/data-center-site-selection/canada-emerges-as-global-data-center-powerhouse"),
  noteEntry(17, "Deloitte, op. cit."),
  noteEntry(18, "Ibid."),
  noteEntry(20, "The Next Platform, op. cit. (UAE 5 GW AI campus.)"),
  noteEntry(21, "Ibid."),
  noteEntry(22, "Data Center Knowledge, op. cit."),
  noteEntry(23, "Ibid."),
  noteEntry(24, "Ibid."),
  noteEntry(25, "Ibid. (C$240M to Cohere / Bell AI Fabric.)"),
  noteEntry(26, "The Next Platform, \u201CAs CUDA Is To GPU, QODA Is To Quantum Compute,\u201D July 2022. https://www.nextplatform.com/2022/07/13/as-cuda-is-to-gpu-qoda-is-to-quantum-compute/"),
  noteEntry(27, "Kearney, \u201CBreaking the GPU Stronghold: Emerging Competition in AI Infrastructure,\u201D 2024. https://www.kearney.com/industry/technology/article/breaking-the-gpu-stronghold-emerging-competition-in-ai-infrastructure"),
  noteEntry(28, "Fierce Electronics, \u201CNvidia Continues Quantum Moves with New QODA Framework,\u201D 2022. https://www.fierceelectronics.com/embedded/nvidia-continues-quantum-moves-new-qoda-framework"),
  noteEntry(29, "Ibid."),
  noteEntry(30, "Ibid."),
  noteEntry(31, "The Next Platform, op. cit. (CUDA-QODA hybrid quantum-GPU computing.)"),
  noteEntry(32, "F. Nayebi, \u201CCatalyzing Canada\u2019s AI Advantage: Five Actions to Win the Global AI Race,\u201D TheFutureEconomy.ca, 2025. https://thefutureeconomy.ca/op-eds/catalyzing-canadas-ai-advantage-five-actions-to-win-the-global-ai-race/"),
  noteEntry(33, "Ibid."),
  noteEntry(34, "CVCA Central, \u201CMapping the Growth of AI in Canada Through Investment,\u201D 2024. https://central.cvca.ca/data-analysis/mapping-the-growth-of-ai-in-canada-through-investment/"),
  noteEntry(35, "Nayebi, op. cit."),
  noteEntry(36, "Ibid."),
  noteEntry(37, "CVCA Central, op. cit. (Cohere $1.27B funding.)"),
  noteEntry(38, "Coursera, \u201CCohere vs. OpenAI: What\u2019s the Difference?\u201D https://www.coursera.org/articles/cohere-vs-openai"),
  noteEntry(39, "G. Klockwood, \u201CCanadian Sovereign AI,\u201D https://www.glennklockwood.com/garden/Canadian-sovereign-AI"),
  noteEntry(40, "Ibid."),
  noteEntry(41, "Nayebi, op. cit."),
  noteEntry(42, "Ibid."),
  noteEntry(43, "Ibid."),
  noteEntry(45, "The Next Platform, op. cit. (U.S. hyperscaler spend $1.6\u2013$1.7T projected 2025\u20132029.)"),
  noteEntry(46, "Ibid."),
  noteEntry(47, "Nayebi, op. cit."),
  noteEntry(48, "Klockwood, op. cit."),
  noteEntry(49, "Nayebi, op. cit."),
  noteEntry(50, "Data Center Knowledge, op. cit."),
  noteEntry(51, "Nayebi, op. cit."),
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
