// src/app/api/users/[userId]/favourite-markets/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_URL;

if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable BACKEND_URL is not set for favorite markets API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles GET requests to /api/users/:userId/favourite-markets
 * Fetches all favorite market IDs for a user.
 */

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: userId } = await params;

    // console.log(`[Market Route GET] Received userId from params: "${userId}"`);

    if (!userId) {
        // console.error("[Market Route GET] User ID is missing after parsing params.");
        return NextResponse.json({ message: 'User ID is missing.' }, { status: 400 });
    }

    try {
        const backendUrl = new URL(`${BACKEND_API_BASE_URL}/users/${userId}/favourite-markets`);
        // console.log(`[Market Route GET] Attempting to fetch from backend URL: ${backendUrl.toString()}`);
        const response = await fetch(backendUrl.toString());

        console.log(`[Market Route GET] Backend response status: ${response.status}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend (non-JSON)' }));
            console.error(`[Market Route GET] Backend response not OK. Error details:`, errorData);
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        // console.log(`[Market Route GET] Raw data received from backend:`, data);

        const favoriteMarketIds = data.map((market: { id: number }) => market.id.toString());
        // console.log(`[Market Route GET] Mapped favoriteMarketIds (as strings):`, favoriteMarketIds);
        return NextResponse.json(favoriteMarketIds);
    } catch (error) {
        console.error(`[Market Route GET] Caught an error during backend fetch:`, error);
        return NextResponse.json({ message: "Internal Server Error while fetching favorite markets." }, { status: 500 });
    }
}

/**
 * Handles POST requests to /api/users/:userId/favourite-markets
 * Adds a new favorite market for a user.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: userId } = await params;

    // console.log(`[Market Route POST] Received userId from params: "${userId}"`);

    if (!userId) {
        // console.error("[Market Route POST] User ID is missing after parsing params.");
        return NextResponse.json({ message: 'User ID is missing.' }, { status: 400 });
    }

    try {
        const body = await request.json();
        // console.log(`[Market Route POST] Request body received:`, body);

        if (!body.market_id) {
            // console.error("[Market Route POST] market_id is missing in request body.");
            return NextResponse.json({ message: 'market_id is required in the request body.' }, { status: 400 });
        }

        const marketIdAsNumber = Number(body.market_id);
        if (isNaN(marketIdAsNumber)) {
            // console.error("[Market Route POST] market_id is not a valid number.");
            return NextResponse.json({ message: 'market_id must be a valid number.' }, { status: 400 });
        }

        const requestBody = {
            user_id: Number(userId),
            market_id: marketIdAsNumber,
        };
        // console.log(`[Market Route POST] Sending request body to backend:`, requestBody);

        const response = await fetch(`${BACKEND_API_BASE_URL}/users/${userId}/favourite-markets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        // console.log(`[Market Route POST] Backend response status: ${response.status}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend (non-JSON)' }));
            // console.error(`[Market Route POST] Backend response not OK. Error details:`, errorData);
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        // console.log(`[Market Route POST] Data received from backend after POST:`, data);
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error(`[Market Route POST] Caught an error during backend fetch:`, error);
        return NextResponse.json({ message: "Internal Server Error while adding favorite market." }, { status: 500 });
    }
}
