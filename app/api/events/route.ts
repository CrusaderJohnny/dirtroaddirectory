import { NextRequest, NextResponse } from 'next/server';

// Access the backend API URL from environment variables
const ANALYTICS_API_ENDPOINT = process.env.ANALYTICS_API_ENDPOINT;

// --- Handler for GET requests to /api/events ---
export async function GET() {
    if (!ANALYTICS_API_ENDPOINT) {
        console.error("Environment variable ANALYTICS_API_ENDPOINT is not set.");
        return NextResponse.json({ message: "Backend API URL not configured" }, { status: 500 });
    }

    try {
        // Forward the request to your actual backend API
        const backendResponse = await fetch(`${ANALYTICS_API_ENDPOINT}/events`);

        if (!backendResponse.ok) {
            // If backend responds with an error, forward that error
            const errorData = await backendResponse.json();
            return NextResponse.json(errorData, { status: backendResponse.status });
        }

        const data = await backendResponse.json();
        return NextResponse.json(data); // Return data from backend to frontend
    } catch (error) {
        console.error("Error in Next.js API route (GET /api/events):", error);
        return NextResponse.json({ message: "Internal Server Error during GET" }, { status: 500 });
    }
}

// --- Handler for POST requests to /api/events ---
export async function POST(request: NextRequest) {
    if (!ANALYTICS_API_ENDPOINT) {
        console.error("Environment variable ANALYTICS_API_ENDPOINT is not set.");
        return NextResponse.json({ message: "Backend API URL not configured" }, { status: 500 });
    }

    try {
        const body = await request.json(); // Get the JSON body sent from the frontend

        // Optional: Re-validate the input if needed, mirroring your backend's validation
        if (!body.event_type || !body.event_name) {
            return NextResponse.json({ message: "Invalid event analytic (missing type or name)" }, { status: 400 });
        }

        // Forward the POST request to your actual backend API
        const backendResponse = await fetch(`${ANALYTICS_API_ENDPOINT}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body), // Send the received body to the backend
        });

        if (!backendResponse.ok) {
            // If backend responds with an error, forward that error
            const errorData = await backendResponse.json();
            return NextResponse.json(errorData, { status: backendResponse.status });
        }

        const data = await backendResponse.json();
        return NextResponse.json(data, { status: backendResponse.status }); // Forward backend's success status
    } catch (error) {
        console.error("Error in Next.js API route (POST /api/events):", error);
        return NextResponse.json({ message: "Internal Server Error during POST" }, { status: 500 });
    }
}