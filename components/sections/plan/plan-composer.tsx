"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Loader2, MapPin, Paperclip, RotateCcw, X } from "lucide-react";
import { Popover } from "radix-ui";
import { formatAssistantMessage } from "@/lib/format-message";

// Chip widths, left paddings, icon gaps and icon widths are reference-frame
// units from the design (1u = 1px on a 1560×1008 screen); see app/styles/plan.css.
const chips = [
  { key: "photo", label: "Attach photos", width: 107, paddingLeft: 12, iconGap: 3.7, iconWidth: 15.06, Icon: PhotoIcon },
  { key: "dates", label: "Trip dates", width: 108, paddingLeft: 16, iconGap: 3.9, iconWidth: 11.8, Icon: CalendarIcon },
  { key: "vibe", label: "Trip vibe", width: 107, paddingLeft: 15.8, iconGap: 2.9, iconWidth: 12.13, Icon: SparkleIcon },
] as const;

const VIBES = ["Adventure", "Relaxation", "Culture", "Food", "Nature", "Luxury", "Family", "Nightlife", "Shopping", "Mixed"];

type ChatRole = "user" | "assistant";
type Attachment = { kind: "image"; name: string; previewUrl: string } | { kind: "document"; name: string };
interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  attachment?: Attachment;
  isError?: boolean;
}

const MAX_FILE_BYTES = 8 * 1024 * 1024;

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

export function PlanComposer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [pendingImage, setPendingImage] = useState<{ dataUrl: string; name: string } | null>(null);
  const [pendingDocument, setPendingDocument] = useState<{ text: string; name: string } | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [locationDraft, setLocationDraft] = useState("");
  const [locationStatus, setLocationStatus] = useState<"idle" | "locating" | "error">("idle");

  const hasStarted = messages.length > 0;

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages]);

  function clearAttachments() {
    setPendingImage(null);
    setPendingDocument(null);
  }

  async function onPickImage(file: File | undefined) {
    if (!file) return;
    setAttachmentError(null);
    if (!file.type.startsWith("image/")) return setAttachmentError("Please attach an image file (PNG, JPG, WEBP).");
    if (file.size > MAX_FILE_BYTES) return setAttachmentError("That image is larger than 8MB.");
    try {
      const dataUrl = await readFileAsDataURL(file);
      setPendingDocument(null);
      setPendingImage({ dataUrl, name: file.name });
    } catch {
      setAttachmentError("Couldn't read that image — try a different file.");
    }
  }

  async function onPickDocument(file: File | undefined) {
    if (!file) return;
    setAttachmentError(null);
    const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    const isText = file.type === "text/plain" || /\.(txt|md)$/i.test(file.name);
    if (!isPdf && !isText) return setAttachmentError("Please attach a PDF, .txt, or .md file.");
    if (file.size > MAX_FILE_BYTES) return setAttachmentError("That document is larger than 8MB.");
    setPendingImage(null);

    if (isText) {
      const content = await file.text();
      if (!content.trim()) return setAttachmentError("That document looks empty.");
      setPendingDocument({ text: content.slice(0, 20000), name: file.name });
      return;
    }

    setStatusText("Reading document…");
    try {
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/travel-assistant/extract-document", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) {
        setAttachmentError(data.error ?? "Couldn't read that document.");
        return;
      }
      setPendingDocument({ text: data.text, name: data.name });
    } catch {
      setAttachmentError("Couldn't reach the server to read that document.");
    } finally {
      setStatusText("");
    }
  }

  function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setLocationStatus("error");
      return;
    }
    setLocationStatus("locating");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`/api/travel-assistant/reverse-geocode?lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          if (response.ok && data.label) {
            setLocation(data.label);
            setLocationDraft(data.label);
            setLocationStatus("idle");
          } else {
            setLocationStatus("error");
          }
        } catch {
          setLocationStatus("error");
        }
      },
      () => setLocationStatus("error"),
      { timeout: 8000 },
    );
  }

  function applyLocationDraft() {
    const trimmed = locationDraft.trim();
    setLocation(trimmed || null);
    setLocationStatus("idle");
  }

  async function runAssistant(history: ChatMessage[], attachment: { image?: string; documentText?: string; documentName?: string }) {
    setIsBusy(true);
    setStatusText("Thinking…");
    const assistantId = newId();

    try {
      const response = await fetch("/api/travel-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
          image: attachment.image,
          documentText: attachment.documentText,
          documentName: attachment.documentName,
          location: location ?? undefined,
        }),
      });

      if (!response.ok || !response.body) {
        let message = "The AI assistant is temporarily unavailable. Please try again.";
        try {
          const data = await response.json();
          if (data.error) message = data.error;
        } catch {
          // Non-JSON error body — keep the generic message.
        }
        setMessages((current) => [...current, { id: assistantId, role: "assistant", content: message, isError: true }]);
        setStatusText(message);
        return;
      }

      setStatusText("");
      setMessages((current) => [...current, { id: assistantId, role: "assistant", content: "" }]);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages((current) => current.map((message) => (message.id === assistantId ? { ...message, content: full } : message)));
      }
      if (!full.trim()) {
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? { ...message, content: "I didn't get a response that time — could you try sending that again?", isError: true }
              : message,
          ),
        );
      }
    } catch {
      setMessages((current) => [
        ...current,
        { id: assistantId, role: "assistant", content: "Network error reaching the AI assistant. Check your connection and try again.", isError: true },
      ]);
      setStatusText("Network error.");
    } finally {
      setIsBusy(false);
    }
  }

  async function sendMessage(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed || isBusy) return;

    const attachment: Attachment | undefined = pendingImage
      ? { kind: "image", name: pendingImage.name, previewUrl: pendingImage.dataUrl }
      : pendingDocument
        ? { kind: "document", name: pendingDocument.name }
        : undefined;

    const userMessage: ChatMessage = { id: newId(), role: "user", content: trimmed, attachment };
    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setText("");
    const imageToSend = pendingImage?.dataUrl;
    const documentToSend = pendingDocument;
    clearAttachments();
    setAttachmentError(null);
    await runAssistant(nextHistory, { image: imageToSend, documentText: documentToSend?.text, documentName: documentToSend?.name });
  }

  function retryLast() {
    const cleaned = messages.filter((message) => !(message.role === "assistant" && message.isError));
    const lastUser = [...cleaned].reverse().find((message) => message.role === "user");
    if (!lastUser) return;
    setMessages(cleaned);
    void runAssistant(cleaned, {});
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(text);
  }

  function insertHelperIfEmpty(helper: string) {
    if (!text.trim()) setText(helper);
    inputRef.current?.focus();
  }

  function insertVibe(vibe: string) {
    setText((current) => (current.trim() ? `${current.trim()}, ${vibe.toLowerCase()} vibe` : `I'm looking for a ${vibe.toLowerCase()} trip.`));
    inputRef.current?.focus();
  }

  return (
    <form className={`plan-card${hasStarted ? " is-chat" : ""}`} onSubmit={handleSubmit}>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          void onPickImage(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      <input
        ref={documentInputRef}
        type="file"
        accept="application/pdf,.pdf,.txt,.md,text/plain,text/markdown"
        className="sr-only"
        onChange={(event) => {
          void onPickDocument(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      {hasStarted && (
        <div className="plan-transcript" aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={`plan-msg plan-msg-${message.role}${message.isError ? " plan-msg-error" : ""}`}>
              {message.attachment?.kind === "image" && (
                // eslint-disable-next-line @next/next/no-img-element -- local object/data URL preview, not a remote asset.
                <img src={message.attachment.previewUrl} alt="" className="plan-msg-attachment-image" />
              )}
              {message.attachment?.kind === "document" && (
                <p className="plan-msg-attachment-doc">📄 {message.attachment.name}</p>
              )}
              <div className="plan-msg-body">
                {message.content ? formatAssistantMessage(message.content) : <Loader2 className="plan-msg-spinner" aria-hidden="true" />}
              </div>
              {message.isError && (
                <button type="button" className="plan-msg-retry" onClick={retryLast}>
                  <RotateCcw aria-hidden="true" /> Retry
                </button>
              )}
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>
      )}

      <label htmlFor="plan-prompt" className="sr-only">Describe your trip</label>
      <input
        id="plan-prompt"
        ref={inputRef}
        name="prompt"
        className="plan-ph"
        autoComplete="off"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={
          hasStarted
            ? "Ask a follow-up, or say what to change…"
            : "Three days in Mostar this October, mostly on foot, with the old town and a day at Kravice falls..."
        }
      />

      {(pendingImage || pendingDocument || attachmentError) && (
        <div className="plan-pending-row">
          {pendingImage && (
            <span className="plan-pending-chip">
              {/* eslint-disable-next-line @next/next/no-img-element -- local data URL preview. */}
              <img src={pendingImage.dataUrl} alt="" />
              {pendingImage.name}
              <button type="button" aria-label="Remove attached image" onClick={() => setPendingImage(null)}><X aria-hidden="true" /></button>
            </span>
          )}
          {pendingDocument && (
            <span className="plan-pending-chip">
              📄 {pendingDocument.name}
              <button type="button" aria-label="Remove attached document" onClick={() => setPendingDocument(null)}><X aria-hidden="true" /></button>
            </span>
          )}
          {attachmentError && <span className="plan-pending-error">{attachmentError}</span>}
        </div>
      )}

      <div className="plan-tools">
        <div className="plan-chips">
          {chips.map(({ key, label, width, paddingLeft, iconGap, iconWidth, Icon }) => {
            const style = { "--cw": width, "--pl": paddingLeft, "--ig": iconGap, "--iw": iconWidth } as CSSProperties;
            if (key === "photo") {
              return (
                <button key={key} type="button" className="plan-chip" style={style} onClick={() => imageInputRef.current?.click()}>
                  <Icon /><span>{label}</span>
                </button>
              );
            }
            if (key === "dates") {
              return (
                <button key={key} type="button" className="plan-chip" style={style} onClick={() => insertHelperIfEmpty("My travel dates are ")}>
                  <Icon /><span>{label}</span>
                </button>
              );
            }
            return (
              <Popover.Root key={key}>
                <Popover.Trigger asChild>
                  <button type="button" className="plan-chip" style={style}>
                    <Icon /><span>{label}</span>
                  </button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content className="language-popover plan-vibe-popover" sideOffset={10} align="start">
                    {VIBES.map((vibe) => (
                      <Popover.Close asChild key={vibe}>
                        <button type="button" className="plan-vibe-option" onClick={() => insertVibe(vibe)}>{vibe}</button>
                      </Popover.Close>
                    ))}
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            );
          })}
        </div>

        <div className="plan-right">
          <Popover.Root>
            <Popover.Trigger asChild>
              <button type="button" className="plan-model" aria-label="Set your current location">
                <MapPin aria-hidden="true" />
                {location ?? "Anywhere"}
                <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="language-popover plan-location-popover" sideOffset={10} align="end">
                <p className="plan-location-label">Current location</p>
                <p className="plan-location-hint">Used to suggest nearby destinations, routes, and departure airports.</p>
                <button type="button" className="plan-location-geo" onClick={useMyLocation} disabled={locationStatus === "locating"}>
                  {locationStatus === "locating" ? <Loader2 className="plan-msg-spinner" aria-hidden="true" /> : <MapPin aria-hidden="true" />}
                  Use my current location
                </button>
                {locationStatus === "error" && <p className="plan-location-error">Couldn&apos;t get your location — type it in instead.</p>}
                <input
                  type="text"
                  className="plan-location-input"
                  placeholder="e.g. Kuala Lumpur, Malaysia"
                  value={locationDraft}
                  onChange={(event) => setLocationDraft(event.target.value)}
                  onBlur={applyLocationDraft}
                  onKeyDown={(event) => event.key === "Enter" && applyLocationDraft()}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
          <button type="button" className="plan-attach" aria-label="Attach a document" onClick={() => documentInputRef.current?.click()}>
            <Paperclip strokeWidth={1.8} />
          </button>
          <button type="submit" className="plan-send" aria-label="Send" disabled={isBusy || !text.trim()}>
            {isBusy ? (
              <Loader2 className="plan-msg-spinner" aria-hidden="true" />
            ) : (
              <svg viewBox="0 0 12 14" aria-hidden="true">
                <path d="M6 0 12 6.1l-1.4 1.4L7 3.9V14H5V3.9L1.4 7.5 0 6.1 6 0Z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <p role="status" className="plan-status">{statusText}</p>
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
