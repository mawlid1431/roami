import type { ReactNode } from "react";

// Renders the assistant's plain-text itinerary format (see
// TRAVEL_ASSISTANT_SYSTEM_PROMPT) — section headings, "**bold**" spans, and
// "- " bullet lists — without pulling in a full markdown dependency, since
// the model only ever produces this small, controlled subset.
const HEADING_RE = /^#{1,3}\s*(.+)$/;
const ALL_CAPS_HEADING_RE = /^[A-Z][A-Z0-9 /&'()-]{2,58}$/;
const BULLET_RE = /^[-*]\s+(.*)$/;

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
