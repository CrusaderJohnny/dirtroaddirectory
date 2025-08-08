import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.EXPRESS_BACKEND_URL;

if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable EXPRESS_BACKEND_URL is not set for markets API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles GET requests to /api/markets/:id (fetches a single market by ID).
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'id' from the URL.
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) { // Promise here???
    const marketId = params.id;

    // Number validation for ID
    if (isNaN(parseInt(marketId))) {
        return NextResponse.json({ message: 'Invalid market ID format.' }, { status: 400 });
    }

    try {
        const response = await fetch(`${BACKEND_API_BASE_URL}/markets/${marketId}`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`Error in Next.js API route (GET /api/markets/${marketId}):`, error);
        return NextResponse.json({ message: "Internal Server Error while fetching market by ID." }, { status: 500 });
    }
}

/**
 * Handles PUT requests to /api/markets/:id (updates an existing market).
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'id' from the URL.
 */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const marketId = params.id;

    if (isNaN(parseInt(marketId))) {
        return NextResponse.json({ message: 'Invalid market ID format.' }, { status: 400 });
    }

    try {
        const body = await request.json();

        const response = await fetch(`${BACKEND_API_BASE_URL}/markets/${marketId}`, {
            method: 'PUT',
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
        console.error(`Error in Next.js API route (PUT /api/markets/${marketId}):`, error);
        return NextResponse.json({ message: "Internal Server Error while updating market." }, { status: 500 });
    }
}

/**
 * Handles DELETE requests to /api/markets/:id (deletes a market).
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'id' from the URL.
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const marketId = params.id;

    if (isNaN(parseInt(marketId))) {
        return NextResponse.json({ message: 'Invalid market ID format.' }, { status: 400 });
    }

    try {
        const response = await fetch(`${BACKEND_API_BASE_URL}/markets/${marketId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }

        // If backend returns a message, forward it.
        return new NextResponse(null, { status: response.status }); // Or NextResponse.json({ message: 'Deleted' }, { status: 200 });
    } catch (error) {
        console.error(`Error in Next.js API route (DELETE /api/markets/${marketId}):`, error);
        return NextResponse.json({ message: "Internal Server Error while deleting market." }, { status: 500 });
    }
}