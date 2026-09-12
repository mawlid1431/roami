import type { ReactNode } from "react";

// Renders the assistant's plain-text itinerary format (see
// TRAVEL_ASSISTANT_SYSTEM_PROMPT) — section headings, "**bold**" spans, and
// "- " bullet lists — without pulling in a full markdown dependency, since
// the model only ever produces this small, controlled subset.
const HEADING_RE = /^#{1,3}\s*(.+)$/;
const ALL_CAPS_HEADING_RE = /^[A-Z][A-Z0-9 /&'()-]{2,58}$/;
const BULLET_RE = /^[-*]\s+(.*)$/;
const DIVIDER_RE = /^[-=_*]{3,}$/;
const TABLE_ROW_RE = /^\|(.+)\|$/;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={`${keyPrefix}-${index}`}>{part.slice(2, -2)}</strong>;
    }
    return <span key={`${keyPrefix}-${index}`}>{part}</span>;
  });
}

export function formatAssistantMessage(content: string): ReactNode {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let bulletBuffer: string[] = [];
  let paragraphBuffer: string[] = [];

  function flushBullets() {
    if (bulletBuffer.length === 0) return;
    blocks.push(
      <ul className="plan-msg-list" key={`ul-${blocks.length}`}>
        {bulletBuffer.map((item, index) => (
          <li key={index}>{renderInline(item, `li-${blocks.length}-${index}`)}</li>
        ))}
      </ul>,
    );
    bulletBuffer = [];
  }

  function flushParagraph() {
    if (paragraphBuffer.length === 0) return;
    const text = paragraphBuffer.join(" ").trim();
    if (text) blocks.push(<p key={`p-${blocks.length}`}>{renderInline(text, `p-${blocks.length}`)}</p>);
    paragraphBuffer = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushBullets();
      flushParagraph();
      continue;
    }
    if (DIVIDER_RE.test(line)) {
      flushBullets();
      flushParagraph();
      continue;
    }
    // Defensive: the model is told not to emit Markdown tables, but if one
    // slips through, render each row as readable text instead of raw pipes.
    const tableMatch = line.match(TABLE_ROW_RE);
    if (tableMatch) {
      flushBullets();
      flushParagraph();
      const cells = tableMatch[1].split("|").map((cell) => cell.trim()).filter(Boolean);
      if (cells.length > 0 && !cells.every((cell) => DIVIDER_RE.test(cell))) {
        blocks.push(<p key={`t-${blocks.length}`}>{renderInline(cells.join(" — "), `t-${blocks.length}`)}</p>);
      }
      continue;
    }
    const headingMatch = line.match(HEADING_RE);
    const isAllCapsHeading = ALL_CAPS_HEADING_RE.test(line) && line === line.toUpperCase();
    if (headingMatch || isAllCapsHeading) {
      flushBullets();
      flushParagraph();
      blocks.push(<h4 key={`h-${blocks.length}`}>{headingMatch ? headingMatch[1] : line}</h4>);
      continue;
    }
    const bulletMatch = line.match(BULLET_RE);
    if (bulletMatch) {
      flushParagraph();
      bulletBuffer.push(bulletMatch[1]);
      continue;
    }
    flushBullets();
    paragraphBuffer.push(line);
  }
  flushBullets();
  flushParagraph();

  return blocks;
}
