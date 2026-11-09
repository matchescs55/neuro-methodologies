import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { SYNTHIA_INSTRUCTIONS } from "../../../lib/synthia-prompt";

/**
 * SERVER-ONLY route: POST /api/chat
 * The OpenAI key is read from process.env here and never reaches the browser.
 * Written for AI SDK 7 (instructions, result.stream, toUIMessageStream).
 */

export const maxDuration = 60;

const MAX_MESSAGES = 20; // how many recent messages we send to the model
const MAX_USER_CHARS = 2000; // max length of a single student message
const MAX_OUTPUT_TOKENS = 700; // caps the length (and cost) of each answer

function textResponse(message: string, status: number) {
  return new Response(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function userTextLength(message: UIMessage): number {
  let total = 0;
  for (const part of message.parts) {
    if (part.type === "text") total += part.text.length;
  }
  return total;
}

/**
 * Health check: open /api/chat in your browser.
 * It only says whether the variables exist. It never shows their values.
 */
export async function GET() {
  return Response.json({
    apiKeyConfigured: Boolean(process.env.OPENAI_API_KEY),
    modelConfigured: Boolean(process.env.OPENAI_MODEL),
  });
}

export async function POST(req: Request) {
  const modelId = process.env.OPENAI_MODEL;

  if (!process.env.OPENAI_API_KEY || !modelId) {
    console.error("Missing OPENAI_API_KEY or OPENAI_MODEL environment variable.");
    return textResponse(
      "SYNTHIA's AI connection is not set up yet. Please try again later.",
      500,
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return textResponse("Invalid request.", 400);
  }

  const raw = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(raw) || raw.length === 0) {
    return textResponse("Please send a message.", 400);
  }

  // The browser is untrusted: keep only user/assistant TEXT, drop anything else
  // (for example fake "system" messages), and limit the history size.
  const messages: UIMessage[] = (raw as UIMessage[])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        Array.isArray(m.parts),
    )
    .map((m) => ({ ...m, parts: m.parts.filter((p) => p.type === "text") }))
    .slice(-MAX_MESSAGES);

  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") {
    return textResponse("Please send a message.", 400);
  }

  if (messages.some((m) => m.role === "user" && userTextLength(m) > MAX_USER_CHARS)) {
    return textResponse(
      "That message is too long. Please shorten it and try again.",
      400,
    );
  }

  const result = streamText({
    model: openai(modelId),
    instructions: SYNTHIA_INSTRUCTIONS,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    abortSignal: req.signal,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      // Real error stays in the server logs; the student sees a safe message.
      onError: (error) => {
        console.error("SYNTHIA stream error:", error);
        return "SYNTHIA could not answer right now. Please try again in a moment.";
      },
    }),
  });
}
