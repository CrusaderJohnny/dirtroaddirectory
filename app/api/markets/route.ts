// app/api/markets/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.EXPRESS_BACKEND_URL;

// Ensure the backend URL is set
if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable EXPRESS_BACKEND_URL is not set for markets API route.");
    // In a production environment, you might want to throw an error or handle this more gracefully.
    // For now, we'll return a server error.
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
export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // Get the JSON body from the frontend request

        const response = await fetch(`${BACKEND_API_BASE_URL}/markets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body), // Forward the request body to your backend
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