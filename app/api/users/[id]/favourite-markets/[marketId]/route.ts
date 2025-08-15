import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_URL;

// Ensure the backend URL is set
if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable BACKEND_URL is not set for favorite markets API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles GET requests to /api/users/:id/favourite-markets (fetches all favorite market IDs for a user).
 * Corresponds to the old favoritesMarketAPI.getFavoriteMarketIds().
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'id' (user ID) from the URL.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    // Await params before destructuring
    const { id: userId } = await params;

    // Basic validation for userId format
    if (!userId) {
        return NextResponse.json({ message: 'User ID is missing.' }, { status: 400 });
    }

    try {
        const response = await fetch(`${BACKEND_API_BASE_URL}/users/${userId}/favourite-markets`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        // The old CRUD mapped to string IDs, so we'll maintain that consistency
        const favoriteMarketIds = data.map((market: { id: number }) => market.id.toString());
        return NextResponse.json(favoriteMarketIds);
    } catch (error) {
        console.error(`Error in Next.js API route (GET /api/users/${userId}/favourite-markets):`, error);
        return NextResponse.json({ message: "Internal Server Error while fetching favorite markets." }, { status: 500 });
    }
}

/**
 * Handles POST requests to /api/users/:id/favourite-markets (adds a market to a user's favorites).
 * Corresponds to the old favoritesMarketAPI.addFavoriteMarket().
 * @param request The NextRequest object, used to get the request body.
 * @param params Contains the dynamic 'id' (user ID) from the URL.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    // Await params before destructuring
    const { id: userId } = await params;

    // Basic validation for userId format
    if (!userId) {
        return NextResponse.json({ message: 'User ID is missing.' }, { status: 400 });
    }

    try {
        const body = await request.json(); // Expected to contain { market_id: string }

        // Ensure market_id is present in the request body
        if (!body.market_id) {
            return NextResponse.json({ message: 'market_id is required in the request body.' }, { status: 400 });
        }

        const response = await fetch(`${BACKEND_API_BASE_URL}/users/${userId}/favourite-markets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, market_id: body.market_id }), // Ensure body matches backend expectation
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json(); // Assuming backend returns some success data
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error(`Error in Next.js API route (POST /api/users/${userId}/favourite-markets):`, error);
        return NextResponse.json({ message: "Internal Server Error while adding favorite market." }, { status: 500 });
    }
}
