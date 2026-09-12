import { NextRequest } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TEXT_LENGTH = 20000;
const TEXT_TYPES = new Set(["text/plain", "text/markdown"]);

export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Expected multipart/form-data with a 'file' field." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "No file attached." }, { status: 400 });
  if (file.size === 0) return Response.json({ error: "That file is empty." }, { status: 400 });
  if (file.size > MAX_FILE_BYTES) return Response.json({ error: "That file is larger than 8MB." }, { status: 400 });

  try {
    let text: string;
    if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
      const { PDFParse } = await import("pdf-parse");
      const buffer = Buffer.from(await file.arrayBuffer());
      const parser = new PDFParse({ data: buffer });
      try {
        const result = await parser.getText();
        text = result.text;
      } finally {
        await parser.destroy();
      }
    } else if (TEXT_TYPES.has(file.type) || /\.(txt|md)$/i.test(file.name)) {
      text = await file.text();
    } else {
      return Response.json({ error: "Unsupported document type. Upload a PDF, .txt, or .md file." }, { status: 400 });
    }

    text = text.trim();
    if (!text) return Response.json({ error: "Couldn't find any readable text in that document." }, { status: 400 });

    const truncated = text.length > MAX_TEXT_LENGTH;
    return Response.json({ text: text.slice(0, MAX_TEXT_LENGTH), name: file.name, truncated });
  } catch (error) {
    console.error("[extract-document] failed:", error);
    return Response.json({ error: "Couldn't read that document — it may be corrupted, password-protected, or scanned images without embedded text." }, { status: 422 });
  }
}
