import { NextRequest } from "next/server";
import { GroqConfigError, GroqMessage, GroqRequestError, streamGroqChat } from "@/lib/groq";
import { TRAVEL_ASSISTANT_SYSTEM_PROMPT } from "@/lib/travel-assistant-prompt";

export const runtime = "nodejs";

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ChatTurn[];
  /** data: URL for an attached image, vision-analyzed on the latest user turn only. */
  image?: string;
  /** Extracted plain text from an uploaded document, folded into the latest user turn. */
  documentText?: string;
  documentName?: string;
  /** Free-text location, either typed or reverse-geocoded from geolocation coordinates. */
  location?: string;
}

const MAX_MESSAGES = 40;
const MAX_TEXT_LENGTH = 8000;
const MAX_DOCUMENT_LENGTH = 20000;
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

export async function POST(request: NextRequest) {
  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return badRequest("Request body must be JSON.");
  }

  const { messages, image, documentText, documentName, location } = body;
  if (!Array.isArray(messages) || messages.length === 0) return badRequest("messages must be a non-empty array.");
  if (messages.length > MAX_MESSAGES) return badRequest("Conversation is too long for a single request.");
  for (const turn of messages) {
    if (turn.role !== "user" && turn.role !== "assistant") return badRequest("Each message needs role 'user' or 'assistant'.");
    if (typeof turn.content !== "string" || turn.content.length === 0) return badRequest("Each message needs non-empty text content.");
    if (turn.content.length > MAX_TEXT_LENGTH) return badRequest("A message is too long.");
  }
  if (image !== undefined) {
    if (typeof image !== "string" || !image.startsWith("data:image/")) return badRequest("image must be a data:image/... URL.");
    if (image.length > MAX_IMAGE_BYTES * 1.4) return badRequest("Image is too large (max 8MB).");
  }
  if (documentText !== undefined && (typeof documentText !== "string" || documentText.length > MAX_DOCUMENT_LENGTH)) {
    return badRequest("documentText is invalid or too long.");
  }

  const groqMessages: GroqMessage[] = [{ role: "system", content: TRAVEL_ASSISTANT_SYSTEM_PROMPT }];
  if (location) {
    groqMessages.push({ role: "system", content: `The traveler's current location, for distance/routing/nearby-destination context only: ${location.slice(0, 300)}` });
  }

  const priorTurns = messages.slice(0, -1);
  const lastTurn = messages[messages.length - 1];
  for (const turn of priorTurns) groqMessages.push({ role: turn.role, content: turn.content });

  let lastUserText = lastTurn.content;
  if (documentText) {
    lastUserText += `\n\n[Attached document${documentName ? ` "${documentName}"` : ""}, extracted text below — use it to ground your answer, and note if it looks unrelated to travel]\n${documentText}`;
  }

  if (image) {
    groqMessages.push({
      role: lastTurn.role,
      content: [
        { type: "text", text: lastUserText },
        { type: "image_url", image_url: { url: image } },
      ],
    });
  } else {
    groqMessages.push({ role: lastTurn.role, content: lastUserText });
  }

  try {
    const stream = await streamGroqChat(groqMessages, { hasImage: Boolean(image) });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error instanceof GroqConfigError) {
      console.error("[travel-assistant] config error:", error.message);
      return Response.json({ error: "The AI assistant isn't configured yet (missing GROQ_API_KEY on the server)." }, { status: 500 });
    }
    if (error instanceof GroqRequestError) {
      console.error("[travel-assistant] Groq request failed:", error.status, error.message);
      const status = error.status === 401 || error.status === 403 ? 500 : 502;
      const message = status === 500 ? "The AI assistant's API key was rejected by Groq. Check GROQ_API_KEY." : "The AI assistant is temporarily unavailable. Please try again.";
      return Response.json({ error: message }, { status });
    }
    console.error("[travel-assistant] unexpected error:", error);
    return Response.json({ error: "Something went wrong reaching the AI assistant." }, { status: 502 });
  }
}
