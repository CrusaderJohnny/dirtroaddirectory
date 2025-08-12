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
    const res = await fetch(`${BACKEND}/contact/read`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await json(res);
  } catch (err) {
    console.error("Proxy GET /contact/read failed:", err);
    return NextResponse.json(
      { message: "Proxy error: failed to fetch read IDs." },
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
    const res = await fetch(`${BACKEND}/contact/${id}/read`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await json(res);
  } catch (err) {
    console.error("Proxy PUT /contact/read failed:", err);
    return NextResponse.json(
      { message: "Proxy error: failed to mark as read." },
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
    const res = await fetch(`${BACKEND}/contact/${id}/read`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await json(res);
  } catch (err) {
    console.error("Proxy DELETE /contact/read failed:", err);
    return NextResponse.json(
      { message: "Proxy error: failed to mark as unread." },
      { status: 500 }
    );
  }
}
