"use client";

import { useId, useState } from "react";

export function EmailRouteForm({ placeholder, cta }: { placeholder: string; cta: string }) {
  const inputId = useId();
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
      className="mt-6 flex flex-col gap-3 sm:mt-8 sm:inline-flex sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:bg-paper sm:p-1.5 sm:focus-within:ring-2 sm:focus-within:ring-paper/60"
    >
      <label htmlFor={inputId} className="sr-only">Email address</label>
      <input
        id={inputId}
        name="email"
        type="email"
        required
        placeholder={placeholder}
        className="rounded-full bg-paper px-5 py-3 text-sm text-ink outline-none placeholder:text-ink/45 focus:ring-2 focus:ring-ink/30 sm:w-64 sm:rounded-none sm:bg-transparent sm:px-4 sm:py-2 sm:focus:ring-0"
      />
      <button
        type="submit"
        className="ink-gradient rounded-full px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 sm:py-2.5"
      >
        {sent ? "On its way" : cta}
      </button>
      <p role="status" className="sr-only">{sent ? "Thanks, your old-town route is on its way." : ""}</p>
    </form>
  );
}
