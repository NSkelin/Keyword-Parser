import {NextRequest, NextResponse} from "next/server";

// In-memory store for active connections
const connections = new Map<string, WritableStreamDefaultWriter>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function broadcast(data: any) {
  const message = `data: ${JSON.stringify(data)}\n\n`;
  const encoder = new TextEncoder();
  const encodedMessage = encoder.encode(message);

  for (const [id, writer] of connections.entries()) {
    try {
      await writer.write(encodedMessage);
    } catch {
      connections.delete(id);
    }
  }
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://ca.indeed.com",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export function GET(request: NextRequest) {
  const {readable, writable} = new TransformStream();
  const writer = writable.getWriter();
  const id = crypto.randomUUID();

  connections.set(id, writer);

  request.signal.addEventListener("abort", () => {
    connections.delete(id);
    writer.close().catch((err) => console.error("Error closing writer:", err));
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}

export async function POST(request: NextRequest) {
  const data: unknown = await request.json();
  void broadcast(data);

  return NextResponse.json(
    {message: "Broadcast successful"},
    {
      headers: {
        "Access-Control-Allow-Origin": "https://ca.indeed.com",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    },
  );
}
