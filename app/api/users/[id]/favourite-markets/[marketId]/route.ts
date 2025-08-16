// src/app/api/users/[id]/favourite-markets/[marketId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_URL;

if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable BACKEND_URL is not set for favorite markets API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles DELETE requests to /api/users/:userId/favourite-markets/:marketId (removes a favorite market).
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string; marketId: string }> }) {

    const { id: userId, marketId } = await params;

    // console.log(`[Market DELETE Route] Received userId: "${userId}", marketId: "${marketId}"`);

    if (!userId || !marketId) {
        // console.error("[Market DELETE Route] User ID or Market ID is missing after parsing params.");
        return NextResponse.json({ message: 'User ID or Market ID is missing.' }, { status: 400 });
    }

    try {
        const requestUrl = `${BACKEND_API_BASE_URL}/users/${userId}/favourite-markets/${marketId}`;
        // console.log(`[Market DELETE Route] Sending DELETE request to backend: ${requestUrl}`);

        const response = await fetch(requestUrl, {
            method: 'DELETE',
        });

        // console.log(`[Market DELETE Route] Backend response status: ${response.status}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend (non-JSON)' }));
            // console.error(`[Market DELETE Route] Backend response not OK. Error details:`, errorData);
            return NextResponse.json(errorData, { status: response.status });
        }

        // console.log(`[Market DELETE Route] Successfully deleted favorite market.`);
        // Return a success response, typically 204 No Content for successful deletion
        return new NextResponse(null, { status: 204 });

    } catch (error) {
        console.error(`[Market DELETE Route] Caught an error during backend fetch:`, error);
        return NextResponse.json({ message: "Internal Server Error while deleting favorite market." }, { status: 500 });
    }
}
