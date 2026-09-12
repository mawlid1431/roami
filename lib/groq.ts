import "server-only";

// Server-only Groq client. GROQ_API_KEY has no NEXT_PUBLIC_ prefix, so Next.js
// never inlines it into client bundles — this module must only be imported
// from Route Handlers / other server code, enforced by the "server-only" import.
const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

// gpt-oss-120b: general reasoning/conversation model, tool + structured-output
// capable, used for every turn that has no image attached.
export const TEXT_MODEL = "openai/gpt-oss-120b";
// qwen3.6-27b: the vision-capable model in Groq's current catalog, used only
// when the user attaches an image (screenshots, destination photos, maps).
export const VISION_MODEL = "qwen/qwen3.6-27b";

export type GroqTextPart = { type: "text"; text: string };
export type GroqImagePart = { type: "image_url"; image_url: { url: string } };
export type GroqMessage = {
  role: "system" | "user" | "assistant";
  content: string | (GroqTextPart | GroqImagePart)[];
};

export class GroqConfigError extends Error {}
export class GroqRequestError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

function getApiKey(): string {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new GroqConfigError("GROQ_API_KEY is not set. Add it to .env and restart the dev server.");
  return key;
}

/** Streams raw assistant-text deltas from Groq's OpenAI-compatible chat endpoint. */
export async function streamGroqChat(messages: GroqMessage[], { hasImage = false }: { hasImage?: boolean } = {}) {
  const apiKey = getApiKey();
  const model = hasImage ? VISION_MODEL : TEXT_MODEL;

  const response = await fetch(GROQ_CHAT_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      temperature: 0.6,
      max_tokens: 3200,
      // Keep the model's hidden chain-of-thought out of the response entirely.
      // gpt-oss-120b accepts low/medium/high; the vision model only accepts
      // none/default and rejects "low" outright (400), which is what was
      // breaking every image-analysis request.
      reasoning_effort: hasImage ? "none" : "low",
    }),
  });

  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => "");
    throw new GroqRequestError(`Groq request failed (${response.status}): ${detail.slice(0, 300)}`, response.status);
  }

  const upstream = response.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await upstream.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") continue;
            try {
              const parsed = JSON.parse(payload);
              const delta: string | undefined = parsed.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // Partial/non-JSON keep-alive line — ignore.
            }
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}
