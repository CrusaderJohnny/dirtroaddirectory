import { NextResponse } from "next/server";

const BACKEND =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ?? "http://localhost:8080";

function json(res: Response) {
  return res.text().then((t) =>
    new NextResponse(t, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    })
  );
}

// GET 
export async function GET() {
  try {
    const res = await fetch(`${BACKEND}/contact`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await json(res);
  } catch (err) {
    console.error("Proxy GET /contact failed:", err);
    return NextResponse.json(
      { message: "Proxy error: failed to fetch contact messages." },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: Request) {
  try {
    const body = await req.text(); // pass-through
    const res = await fetch(`${BACKEND}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
    });
    return await json(res);
  } catch (err) {
    console.error("Proxy POST /contact failed:", err);
    return NextResponse.json(
      { message: "Proxy error: failed to create contact message." },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }
    const res = await fetch(`${BACKEND}/contact/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await json(res);
  } catch (err) {
    console.error("Proxy DELETE /contact failed:", err);
    return NextResponse.json(
      { message: "Proxy error: failed to delete contact message." },
      { status: 500 }
    );
  }
}
