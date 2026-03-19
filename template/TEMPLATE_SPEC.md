# Polynem Articles — Document Template & Ingestion Specification

## Purpose

This specification defines the complete pipeline for transforming raw Word
documents into polished publications and web content. It covers three stages:

1. **Template & Style** — House style, layout, typography, colors
2. **Content Enhancement** — Analysis, restructuring, metadata generation
3. **Dual Output** — Polished .docx + MDX for the website

When you submit a raw .docx to Claude Code, use this instruction:

```
Read the Polynem template spec at [path]/TEMPLATE_SPEC.md.
Process this raw document through all three stages.
Show me the generated abstract, tags, and key highlights for approval
before producing the final outputs.
```

---

## Design Reference

Minimalist Swiss editorial style: asymmetric margins, generous left gutter,
Arial throughout, hairline rules, en-dash bullets, restrained color palette.
Key finding boxes use a subtle green wash with left accent bar (C1 style).

---

# STAGE 1: TEMPLATE & STYLE

## 1.1 Page Layout

| Property | Value |
|----------|-------|
| Paper size | US Letter (8.5 × 11 inches) |
| Top margin | 1.75 inches (first page), ~1.5 inches (pages 2+ via header space) |
| Bottom margin | 1 inch |
| Left margin | 2.5 inches (wide gutter for readability and margin notes) |
| Right margin | 1 inch |
| Content width | 5 inches (7200 DXA) |
| Line spacing | 1.25 (body), 1.0 (headings) |
| Paragraph spacing | 6pt after body paragraphs |

## 1.2 Typography

All text uses **Arial** throughout. No secondary typeface.

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Document title | 30pt | Regular (light-weight) | #111111 |
| Abstract | 11pt | Regular | #666666 |
| Author names | 10pt | Bold | #111111 |
| Author affiliations | 8.5pt | Regular | #999999 |
| Version date stamp | 8.5pt | Regular | #999999 |
| Category tag | 8.5pt | Regular | #005237 (with accent underline) |
| H2 section heading | 16pt | Bold | #111111 |
| H3 sub-heading | 12pt | Regular | #111111 |
| Body text | 10.5pt | Regular | #333333 |
| Block quote | 10.5pt | Italic | #666666, left border #005237 |
| Key finding label | 10pt | Bold | #005237 |
| Key finding body | 10pt | Regular | #333333 |
| Bullet / numbered list | 10.5pt | Regular | #333333 |
| Bold lead-in (lists) | 10.5pt | Bold | #333333 |
| Footnote text | 8pt | Regular | #999999 |
| Exhibit caption | 8.5pt | Italic | #999999 |
| Header text | 7.5pt | Regular | #999999 |
| Footer text | 7pt | Regular | #999999 |
| Page numbers | 7pt | Regular | #999999 |

## 1.3 Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary text | #111111 | Headings, author names, title |
| Body text | #333333 | Paragraph text, list items |
| Secondary text | #666666 | Abstract, block quotes |
| Muted text | #999999 | Affiliations, date, page numbers, footnotes |
| Accent green | #005237 | Category tag, quote borders, highlight labels, footnote refs |
| Accent green bg | #F2F8F5 | Highlight box background (C1 style) |
| Border | #E0E0E0 | Generic element borders |
| Rule | #CCCCCC | Hairline rules in header/footer, notes separator |
| Category: Policy | #005237 | |
| Category: Opinion | #8E3700 | |
| Category: Analysis | #003378 | |
| Category: Technology | #580078 | |
| Category: Security | #780014 | |
| Category: Strategy | #3A3A00 | |

## 1.4 Document Structure (in order)

### Cover / Header Block (page 1 only)
1. **Category tag** — lowercase label (e.g., "Policy") in 8.5pt Arial, accent color, with a 1pt accent-colored underline
2. **Title** — 30pt Arial Regular (not bold), max 2 lines
3. **Abstract** — 11pt Arial Regular, 2–4 sentences (Claude-generated, see Stage 2), #666666
4. **Horizontal rule** — 1pt line, #111111
5. **Author block** — Name in 10pt Arial Bold, affiliation in 8.5pt inline, #999999
6. **Version date stamp** — "v260318" format (YYMMDD), 8.5pt Arial, #999999
7. **Key finding highlight box** — C1 style: #F2F8F5 background, 4pt #005237 left accent bar, no other borders

### Body Content
- **Section headings (H2)** — 16pt Arial Bold, 26pt space before, 9pt after
- **Sub-headings (H3)** — 12pt Arial Regular (not bold), 20pt space before, 6pt after
- **Body paragraphs** — 10.5pt Arial, 1.25 line spacing, 6pt space after
- **Block quotes** — Indented 0.375 inch left, 4pt green left border (#005237), italic
- **Key finding boxes (C1 style)** — #F2F8F5 background, 4pt #005237 left accent bar, no top/bottom/right borders. Bold lead-in label ("Key finding:") in accent green, regular body text in #333333. Generous internal padding (9pt top/bottom, 16pt left/right).
- **Exhibit labels** — "Exhibit 1: Title" in 10pt Arial Bold + 8.5pt italic caption
- **Bulleted lists** — En-dash (–) marker, 10.5pt Arial, 0.375" indent
- **Numbered lists** — Decimal format, 10.5pt Arial, 0.375" indent
- **Bold lead-in lists** — Bold first phrase + regular continuation (policy-pillar style)

### Footnotes / Endnotes
- Numbered sequentially (superscript in body, accent green color)
- Collected at end of document under "Notes" heading (H2 style, 16pt Arial Bold)
- Separated from body by a 1pt hairline rule (#CCCCCC)
- 8pt Arial, #999999
- Format: `N  Author, "Title," Publication, Date. URL`

### Header (pages 2+)
- **Left-aligned:** Article title in 7.5pt Arial, #999999
- 1pt hairline rule below (#CCCCCC), 8pt space between text and rule
- No header on page 1

### Footer (all pages)
- 1pt hairline rule above (#CCCCCC), 8pt space between rule and text
- **Left:** "© 2026 Richard St-Pierre" in 7pt Arial, #999999
- **Center:** "me@richardstpierre.com" in 7pt Arial, #999999
- **Right:** "N / M" page numbers in 7pt Arial, #999999

---

# STAGE 2: CONTENT ENHANCEMENT

When Claude Code receives a raw document, it performs the following analysis
and enhancement steps BEFORE formatting. This is the editorial intelligence
layer.

## 2.1 Content Analysis (read-only, do not modify yet)

Claude Code reads the entire document and silently determines:

### A. Structural Analysis
- Count total words, paragraphs, and headings
- Map the existing heading hierarchy (what levels are used, are there gaps)
- Identify whether the document has: an introduction, body sections, conclusion
- Detect existing citations/footnotes (inline URLs, parenthetical references, endnotes)
- Detect figures, charts, tables, or image placeholders
- Note the tone: academic, policy brief, opinion/editorial, technical analysis

### B. Content Classification
Classify the document into exactly one category based on these definitions:

| Category | Indicators |
|----------|-----------|
| **Policy** | Proposes specific government actions, references legislation/regulation, addresses institutional frameworks, recommends procurement or investment decisions |
| **Opinion** | Argues a position, uses first person or rhetorical devices, references current events or speeches, is primarily persuasive rather than analytical |
| **Analysis** | Presents data-driven findings, uses exhibits/charts, compares alternatives, quantifies impacts, is primarily descriptive/evaluative |
| **Technology** | Focuses on technical architecture, infrastructure design, protocol specifications, system capabilities, implementation details |
| **Security** | Addresses threats, vulnerabilities, cryptographic methods, defence posture, intelligence implications, incident response |
| **Strategy** | Addresses long-term positioning, coalition-building, competitive dynamics, multi-stakeholder coordination, geopolitical framing |

### C. Key Findings Extraction
Identify 2–3 passages that contain the document's most important and quotable
findings. A key finding is:
- A specific claim backed by data or original analysis
- A novel framing or insight not commonly found elsewhere
- A concrete recommendation with strategic implications
- A statistic, percentage, or quantified comparison

Do NOT select generic statements, cliches, or obvious observations.

### D. Tag Generation
Extract 4–8 keyword tags. Rules:
- Lowercase, hyphenated (e.g., "post-quantum-cryptography")
- Include the primary topic, 1–2 subtopics, geographic scope if relevant, and the policy domain
- Prefer specific terms over broad ones ("sovereign-cloud" over "cloud", "harvest-now-decrypt-later" over "cybersecurity")
- Cross-reference existing tags in the site's content/articles/ directory to maintain consistency
- Consult the tag vocabulary in Appendix B

## 2.2 Content Enhancement (modifications to the raw text)

After analysis, Claude Code applies these editorial enhancements. Each change
should be explainable if the author asks "why did you change this?"

### A. Heading Hierarchy Repair
- **Rule:** The document body uses only H2 and H3. No H1 (reserved for the document title in the cover block). No H4+ (flatten to H3 or convert to bold lead-in paragraphs).
- **Rule:** No skipped levels. An H3 must follow an H2, never appear directly after the title or another H3 without an intervening H2.
- **Rule:** Heading text should be concise (under 60 characters) and descriptive. Convert question-form headings to declarative form where appropriate (e.g., "Why does this matter?" to "The strategic imperative").
- **Action:** If the raw document uses informal or inconsistent headings, restructure them. Report changes to the author.

### B. Abstract Generation
If the raw document does not include an abstract or executive summary:
- Distill the core argument into 2–4 sentences (60–120 words)
- Lead with the primary finding or thesis, not with background context
- Use concrete language: include a number, a named entity, or a specific claim where possible
- Write in third person unless the document is explicitly first-person opinion
- The abstract must stand alone — a reader seeing only the abstract should understand the document's central argument

If the raw document includes an abstract, evaluate it against these criteria and suggest improvements if it falls short.

### C. Citation and Footnote Normalization
Raw documents may contain citations in various formats. Normalize them:

**Step 1 — Detect citation style:**
- Inline URLs — convert to footnotes
- Parenthetical references (Author, Year) — convert to footnotes
- Existing footnotes/endnotes — preserve numbering
- No citations — flag to the author ("This document contains no citations. Should sources be added?")

**Step 2 — Research and verify:**
- For each statistical claim, search for the authoritative source (OECD, Statistics Canada, IEA, academic papers, press releases)
- Verify that the cited numbers match the source
- Flag discrepancies to the author (e.g., "Source says $17.9B for all of Canada, document says $18B for Calgary")

**Step 3 — Format footnotes consistently:**
```
N  Author Last, First, "Article Title," Publication Name, Date. URL
N  Organization Name, "Report Title," Date. URL
N  Author, Title of Book (Publisher, Year), page number.
```

**Step 4 — Renumber sequentially** from 1, in order of first appearance in the text.

### D. Block Quote Identification
Scan for passages that should be presented as block quotes:
- Text explicitly marked with quotation marks attributed to a named person
- Passages the author has indented or italicized to set apart
- Rhetorical statements that deserve visual emphasis (propose to author, do not auto-convert)

Do NOT convert regular paragraphs into block quotes without the author's intent being clear.

### E. Figure and Exhibit Handling
- If the document contains images, charts, or tables, label them sequentially: "Exhibit 1: [descriptive caption]"
- If the document references figures that are not embedded (e.g., "[insert chart here]"), preserve the placeholder and label it
- If a table exists, format it using Arial 10pt, header row with #D5E8F0 background, #CCCCCC borders
- Generate a brief caption for each exhibit if none exists

### F. Paragraph Quality
- **Sentence length:** Flag paragraphs where the average sentence exceeds 35 words. Do not rewrite — flag with a comment for the author.
- **Paragraph length:** If a paragraph exceeds 150 words, consider whether it should be split. Propose a split point but do not force it.
- **Opening paragraph:** The first paragraph after the abstract/header should orient the reader with context. If the document jumps directly into technical detail, suggest adding a 2–3 sentence framing paragraph.
- **Closing paragraph:** The document should end with a clear concluding statement or call to action, not trail off. If missing, flag it.

### G. GEO Optimization (for AI Engine Discoverability)
Apply these enhancements to improve the document's chances of being cited by
AI search engines (ChatGPT, Perplexity, Gemini, Claude):

- **Self-contained paragraphs:** Each paragraph should be comprehensible when read in isolation. Replace references like "as mentioned above" or "this approach" with the specific noun or concept being referenced.
- **Direct-answer openings:** Each H2 section should open with a sentence that directly states the section's key point. Do not build up to the answer — state it first, then elaborate.
- **Entity clarity:** Ensure that people, organizations, and concepts are identified by full name on first reference. E.g., "CSE" should first appear as "Communications Security Establishment (CSE)".
- **Quantified claims:** Where the document makes comparative or evaluative claims, ensure they are specific. Replace "significant increase" with the actual number or percentage if available in the source text.
- **Author attribution:** Ensure the author's name and affiliation appear prominently in the document so that AI systems can clearly attribute the content.

### H. Sensitive Content Review
Before finalizing:
- Check for any information that could be considered classified, proprietary, or pre-decisional (common in defence/government context)
- Flag any unattributed claims about specific companies, officials, or government programs
- Do NOT include API keys, credentials, internal URLs, or personal identifiers beyond the author's published information

## 2.3 Author Review Checkpoint

After analysis and before producing final outputs, Claude Code MUST present
the following to the author for approval:

```
===============================================
CONTENT ANALYSIS — [Document Title]
===============================================

Category:     [Policy / Opinion / Analysis / etc.]
Word count:   [N] words
Read time:    [N] min read
Version:      v[YYMMDD]
Slug:         [suggested-filename]

ABSTRACT (generated):
[2–4 sentence abstract]

TAGS:
[tag-1], [tag-2], [tag-3], [tag-4], [tag-5]

KEY FINDINGS (2–3):
1. [Finding text — will become highlight box]
2. [Finding text — will become highlight box]
3. [Finding text — will become highlight box]

STRUCTURAL CHANGES:
- [List of heading changes, e.g., "Renamed H3 'Why?' to 'The strategic case'"]
- [List of citation normalizations, e.g., "Converted 4 inline URLs to footnotes"]
- [Any paragraph splits or reordering proposed]

CITATION VERIFICATION:
- [N] claims verified against source
- [N] discrepancies flagged (listed below)

QUALITY FLAGS:
- [Any issues found, e.g., "No conclusion paragraph detected"]
- [Any sensitive content flags]

===============================================
Approve, or provide feedback to adjust.
```

The author may:
- Approve as-is — proceed to Stage 3
- Edit the abstract, tags, or findings — Claude Code incorporates changes
- Reject structural changes — Claude Code preserves original structure
- Request additional enhancements — Claude Code applies them

---

# STAGE 3: DUAL OUTPUT

After author approval, Claude Code produces two deliverables from the same
enhanced source.

## 3.1 Output A: Polished Word Document (.docx)

Generated using the generate-template.js builder functions and the
docx npm package. The document matches the Stage 1 template exactly.

### Build process:
1. Construct cover block: category tag, title, abstract, rule, authors, date stamp, version
2. Insert first key finding as highlight box (C1 style) below cover
3. Render body content with all Stage 2 enhancements applied:
   - Repaired heading hierarchy
   - Normalized footnotes with verified sources
   - Labeled exhibits
   - Block quotes formatted
   - Remaining key findings inserted as highlight boxes at their natural positions in the text
4. Append "Notes" section with all footnotes
5. Apply headers (pages 2+: article title, hairline rule) and footers (all pages: copyright, email, page numbers)

### File naming:
```
[slug]-v[YYMMDD].docx
Example: out-deploy-not-out-spend-v260318.docx
```

### Delivery location:
```
~/Downloads/[slug]-v[YYMMDD].docx
```

## 3.2 Output B: MDX File for Website

Generated from the same enhanced content, but formatted for Next.js rendering.

### Build process:
1. Generate YAML frontmatter from metadata (see mapping below)
2. Convert body content to Markdown:
   - H2 becomes ## Heading
   - H3 becomes ### Heading
   - Body paragraphs become plain text with blank line separation
   - Block quotes become > quoted text
   - Bold lead-in lists become **Bold part.** Regular continuation.
   - Bullet lists become - item
   - Numbered lists become 1. item
   - Footnote references become superscript numbers (handled by MDX component)
   - Highlight boxes become a blockquote with bold "Key finding:" label as fallback, or custom MDX component if available
   - Exhibit labels become *Exhibit N: Caption* in italics
3. Append footnotes as numbered Markdown list under ## Notes heading
4. Verify frontmatter completeness

### Frontmatter mapping:
```yaml
---
title: "[Document title — verbatim from cover]"
date: "[Publication date, YYYY-MM-DD]"
category: "[Classified category]"
author: "[Author name(s) — comma-separated if multiple]"
publication: "[Target publication, or 'Polynem Working Paper']"
summary: "[Approved abstract text]"
readTime: "[Calculated, e.g., '12 min read']"
featured: false
tags:
  - [approved-tag-1]
  - [approved-tag-2]
  - [approved-tag-3]
  - [approved-tag-4]
dateModified: "[Today's date if revision, otherwise same as date]"
---
```

### File naming:
```
[slug].mdx
Example: out-deploy-not-out-spend.mdx
```

### Delivery location:
```
~/Downloads/[slug].mdx
```

## 3.3 Output Verification

After producing both files, Claude Code runs these checks:

### Word document checks:
- Title appears on page 1 in 30pt Arial Regular
- Abstract appears in 11pt Arial, #666666
- Author block is present with affiliations
- Header on pages 2+ shows article title with hairline rule below
- Footer shows copyright (left), email (center), page N / M (right)
- All footnotes appear in Notes section
- Highlight boxes render with #F2F8F5 background and #005237 left accent bar (C1 style)
- No orphan headings (heading is not last element before page break)

### MDX checks:
- Frontmatter parses as valid YAML
- title, date, category, author, summary, readTime, tags are all present
- Tags are lowercase, hyphenated, no spaces
- Body renders as valid Markdown (no broken syntax)
- All footnote references have corresponding entries in Notes section
- No raw HTML except approved MDX components
- File is UTF-8 encoded

### Cross-file consistency:
- Title matches exactly between .docx and .mdx
- Abstract/summary matches exactly
- Author matches exactly
- Date matches exactly
- Tags are identical in both files
- Footnote count matches

## 3.4 Delivery Summary

After both files are produced and verified, Claude Code presents:

```
===============================================
DELIVERY — [Document Title]
===============================================

Word document:  ~/Downloads/[slug]-v[YYMMDD].docx
MDX file:       ~/Downloads/[slug].mdx
Validation:     Both files passed

Word count:       [N]
Read time:        [N] min
Category:         [Category]
Tags:             [tag-1], [tag-2], [tag-3]
Footnotes:        [N]
Key highlights:   [N]

NEXT STEPS:
1. Review the Word document in Word/Preview
2. The MDX is ready — commit and push to deploy:
   git add content/articles/[slug].mdx
   git commit -m "Add: [title]"
   git push
3. After deploy, verify at: [site-url]/articles/[slug]

===============================================
```

---

# APPENDIX A: Author Defaults

Unless overridden, these defaults apply to all documents:

| Field | Default |
|-------|---------|
| Author | Richard St-Pierre |
| Affiliation | Senior Digital Sovereignty Advisor, Levio |
| Email | me@richardstpierre.com |
| Publication | Polynem Working Paper |
| Version format | vYYMMDD (e.g., v260318) |
| Featured | false |
| Copyright | © 2026 Richard St-Pierre |

# APPENDIX B: Tag Vocabulary

Preferred tags for consistency across the site. New tags may be added,
but check this list first to avoid near-duplicates.

**Domain tags:**
digital-sovereignty, sovereign-cloud, post-quantum-cryptography,
ai-governance, ai-policy, quantum-technologies, defence-strategy,
cybersecurity, energy-to-compute, critical-infrastructure,
productivity, procurement-reform

**Geopolitical tags:**
canada, middle-powers, coalition-architecture, variable-geometry,
nato, five-eyes, indo-pacific

**Framework tags:**
sovereign-bridge, harvest-now-decrypt-later, q-day,
convergence-driven-innovation, ai-inference, workforce-amplifier

**Institutional tags:**
dnd, cse, csa, shared-services-canada, hydro-quebec,
levio, sovereign-data-alliance

# APPENDIX C: Version History of This Spec

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-17 | Initial spec: template, enhancement, dual output |
| 2.0 | 2026-03-18 | Option C redesign: Arial throughout, asymmetric margins (2.5"/1"), C1 highlight boxes, en-dash bullets, hairline header/footer rules, version date stamp (vYYMMDD), updated author defaults (removed SDA affiliation, updated copyright/email/header) |
