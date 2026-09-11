"use client";

import { useId, useState, type CSSProperties } from "react";
import { Paperclip } from "lucide-react";

// Chip widths, left paddings, icon gaps and icon widths are reference-frame
// units from the design (1u = 1px on a 1560×1008 screen); see app/styles/plan.css.
const chips = [
  { label: "Attach photos", width: 107, paddingLeft: 12, iconGap: 3.7, iconWidth: 15.06, Icon: PhotoIcon },
  { label: "Trip dates", width: 108, paddingLeft: 16, iconGap: 3.9, iconWidth: 11.8, Icon: CalendarIcon },
  { label: "Trip vibe", width: 107, paddingLeft: 15.8, iconGap: 2.9, iconWidth: 12.13, Icon: SparkleIcon },
];

export function PlanComposer() {
  const inputId = useId();
  const [sent, setSent] = useState(false);

  return (
    <form
      className="plan-card"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label htmlFor={inputId} className="sr-only">Describe your trip</label>
      <input
        id={inputId}
        name="prompt"
        className="plan-ph"
        autoComplete="off"
        required
        placeholder="Three days in Mostar this October, mostly on foot, with the old town and a day at Kravice falls..."
      />

      <div className="plan-tools">
        <div className="plan-chips" aria-hidden="true">
          {chips.map(({ label, width, paddingLeft, iconGap, iconWidth, Icon }) => (
            <span
              key={label}
              className="plan-chip"
              style={{ "--cw": width, "--pl": paddingLeft, "--ig": iconGap, "--iw": iconWidth } as CSSProperties}
            >
              <Icon />
              <span>{label}</span>
            </span>
          ))}
        </div>

        <div className="plan-right">
          <span className="plan-model" aria-hidden="true">
            Mostar
            <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 1l4 4 4-4" />
            </svg>
          </span>
          <span className="plan-attach" aria-hidden="true">
            <Paperclip strokeWidth={1.8} />
          </span>
          <button type="submit" className="plan-send" aria-label="Plan it">
            <svg viewBox="0 0 12 14" aria-hidden="true">
              <path d="M6 0 12 6.1l-1.4 1.4L7 3.9V14H5V3.9L1.4 7.5 0 6.1 6 0Z" />
            </svg>
          </button>
        </div>
      </div>

      <p role="status" className="plan-status">{sent ? "Got it, a ROAMI route for that trip is on its way." : ""}</p>
    </form>
  );
}

function PhotoIcon() {
  return (
    <svg viewBox="0 0 16 13" fillRule="evenodd" aria-hidden="true">
      <path d="M2 0h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2Zm9 5.4a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8ZM2.5 10.5 6 6.3l2.3 2.6 1.6-1.7 3.6 3.3Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 12 13" fillRule="evenodd" aria-hidden="true">
      <path d="M3 0h1.3v1.4h3.4V0H9v1.4h1a2 2 0 0 1 2 2V11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3.4a2 2 0 0 1 2-2h1V0Zm-1.7 5v6a.7.7 0 0 0 .7.7h8a.7.7 0 0 0 .7-.7V5H1.3ZM3 6.5h2v2H3Z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M6 0c.45 3 1.5 4.9 6 6-4.5 1.1-5.55 3-6 6-.45-3-1.5-4.9-6-6 4.5-1.1 5.55-3 6-6Z" />
    </svg>
  );
}
