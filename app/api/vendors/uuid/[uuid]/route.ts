import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.EXPRESS_BACKEND_URL;

if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable EXPRESS_BACKEND_URL is not set for vendors API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles GET requests to /api/vendors/uuid/:uuid (fetches a single vendor by UUID).
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'uuid' from the URL.
 */
export async function GET(request: NextRequest, { params }: { params: { uuid: string } }) {

    const vendorUuid = params.uuid;

    try {
        

        // Removed regex as this version is out of date and the api handles it now

        // Validate UUID format using a regex
        /*
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(vendorUuid)) {
            return NextResponse.json({ message: 'Invalid UUID format.' }, { status: 400 });
        }
        */

        const response = await fetch(`${BACKEND_API_BASE_URL}/vendors/uuid/${vendorUuid}`); // Call your backend's UUID endpoint
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`Error in Next.js API route (GET /api/vendors/uuid/${vendorUuid}):`, error);
        return NextResponse.json({ message: "Internal Server Error while fetching vendor by UUID." }, { status: 500 });
    }
}