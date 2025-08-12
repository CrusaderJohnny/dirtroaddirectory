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
    const res = await fetch(`${BACKEND}/contact/starred`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await json(res);
  } catch (err) {
    console.error("Proxy GET /contact/starred failed:", err);
    return NextResponse.json(
      { message: "Proxy error: failed to fetch starred IDs." },
      { status: 500 }
    );
  }
}

// PUT 
export async function PUT(req: Request) {
  try {
    const { id } = await req.json().catch(() => ({}));
    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }
    const res = await fetch(`${BACKEND}/contact/${id}/star`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await json(res);
  } catch (err) {
    console.error("Proxy PUT /contact/starred failed:", err);
    return NextResponse.json(
      { message: "Proxy error: failed to star message." },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json().catch(() => ({}));
    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }
    const res = await fetch(`${BACKEND}/contact/${id}/star`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await json(res);
  } catch (err) {
    console.error("Proxy DELETE /contact/starred failed:", err);
    return NextResponse.json(
      { message: "Proxy error: failed to unstar message." },
      { status: 500 }
    );
  }
}
