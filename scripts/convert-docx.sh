#!/bin/bash
# convert-docx.sh — Convert a Word document to MDX with frontmatter
#
# Usage: ./scripts/convert-docx.sh <path-to-docx> "<title>" "<category>"
#
# Prerequisites: Install Pandoc (https://pandoc.org/installing.html)
#   macOS:   brew install pandoc
#   Ubuntu:  sudo apt install pandoc
#
# Example:
#   ./scripts/convert-docx.sh ~/Documents/sovereignty-article.docx \
#     "Sovereignty That Can Take a Punch" "Opinion"

set -e

if [ $# -lt 2 ]; then
  echo "Usage: $0 <path-to-docx> \"<title>\" [\"<category>\"]"
  echo ""
  echo "Categories: Policy, Opinion, Analysis, Technology, Security, Strategy"
  echo ""
  echo "Example:"
  echo "  $0 ~/Documents/article.docx \"My Article Title\" \"Policy\""
  exit 1
fi

DOCX_PATH="$1"
TITLE="$2"
CATEGORY="${3:-Opinion}"
AUTHOR="${4:-Richard St-Pierre}"

# Validate input file
if [ ! -f "$DOCX_PATH" ]; then
  echo "Error: File not found: $DOCX_PATH"
  exit 1
fi

# Check for pandoc
if ! command -v pandoc &> /dev/null; then
  echo "Error: Pandoc is not installed."
  echo "  macOS:  brew install pandoc"
  echo "  Ubuntu: sudo apt install pandoc"
  exit 1
fi

# Generate slug from title
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')

# Set output path
CONTENT_DIR="$(dirname "$0")/../content/articles"
mkdir -p "$CONTENT_DIR"
OUTPUT_PATH="$CONTENT_DIR/$SLUG.mdx"

# Get today's date
TODAY=$(date +%Y-%m-%d)

# Convert docx to markdown
BODY=$(pandoc "$DOCX_PATH" -t markdown --wrap=none 2>/dev/null)

# Estimate read time (~250 words per minute)
WORD_COUNT=$(echo "$BODY" | wc -w | tr -d ' ')
READ_MINUTES=$(( (WORD_COUNT + 249) / 250 ))

# Build the MDX file
cat > "$OUTPUT_PATH" << FRONTMATTER
---
title: "$TITLE"
date: "$TODAY"
category: "$CATEGORY"
author: "$AUTHOR"
publication: ""
summary: ""
readTime: "$READ_MINUTES min read"
featured: false
---

FRONTMATTER

echo "$BODY" >> "$OUTPUT_PATH"

echo ""
echo "✓ Created: $OUTPUT_PATH"
echo "  Slug:      $SLUG"
echo "  Words:     $WORD_COUNT"
echo "  Read time: ~$READ_MINUTES min"
echo ""
echo "→ Next steps:"
echo "  1. Edit $OUTPUT_PATH"
echo "  2. Fill in 'publication' and 'summary' in the frontmatter"
echo "  3. Review the converted markdown for formatting issues"
echo "  4. git add, commit, and push to deploy"
