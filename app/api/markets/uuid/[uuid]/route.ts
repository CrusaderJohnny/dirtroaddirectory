// app/api/markets/uuid/[uuid]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.EXPRESS_BACKEND_URL;

if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable EXPRESS_BACKEND_URL is not set for markets API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles GET requests to /api/markets/uuid/:uuid (fetches a single market by UUID).
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'uuid' from the URL.
 */
export async function GET(request: NextRequest, { params }: { params: { uuid: string } }) {
    const marketUuid = params.uuid;

    // Validate UUID format using a regex
    /*
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(marketUuid)) {
        return NextResponse.json({ message: 'Invalid UUID format.' }, { status: 400 });
    }
    */

    try {
        const response = await fetch(`${BACKEND_API_BASE_URL}/markets/uuid/${marketUuid}`); // Call your backend's UUID endpoint
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`Error in Next.js API route (GET /api/markets/uuid/${marketUuid}):`, error);
        return NextResponse.json({ message: "Internal Server Error while fetching market by UUID." }, { status: 500 });
    }
}