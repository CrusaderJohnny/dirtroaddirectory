import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_URL;

// Ensure the backend URL is set
if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable BACKEND_URL is not set for vendors API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles GET requests to /api/vendors (fetches all vendors).
 */
export async function GET() {
    try {
        const response = await fetch(`${BACKEND_API_BASE_URL}/vendors`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in Next.js API route (GET /api/vendors):", error);
        return NextResponse.json({ message: "Internal Server Error while fetching vendors." }, { status: 500 });
    }
}

/**
 * Handles POST requests to /api/vendors (creates a new vendor).
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // Get the JSON body from the frontend request

        const response = await fetch(`${BACKEND_API_BASE_URL}/vendors`, {
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
        console.error("Error in Next.js API route (POST /api/vendors):", error);
        return NextResponse.json({ message: "Internal Server Error while creating vendor." }, { status: 500 });
    }
}