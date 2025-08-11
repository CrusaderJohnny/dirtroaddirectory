// app/api/markets/route.ts
import { NextResponse } from 'next/server';

type RouteContext = {
    params: {
        id: string; // The dynamic segment from the file name, e.g., [id]
    };
};

const BACKEND_API_BASE_URL = process.env.EXPRESS_BACKEND_URL;

// Ensure the backend URL is set
if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable EXPRESS_BACKEND_URL is not set for markets API route.");

    throw new Error("Backend API URL not configured.");
}

/**
 * Handles GET requests to /api/markets (fetches all markets).
 */
export async function GET() {
    try {
        const response = await fetch(`${BACKEND_API_BASE_URL}/markets`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in Next.js API route (GET /api/markets):", error);
        return NextResponse.json({ message: "Internal Server Error while fetching markets." }, { status: 500 });
    }
}

/**
 * Handles POST requests to /api/markets (creates a new market).
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const response = await fetch(`${BACKEND_API_BASE_URL}/markets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("Error in Next.js API route (POST /api/markets):", error);
        return NextResponse.json({ message: "Internal Server Error while creating market." }, { status: 500 });
    }
}