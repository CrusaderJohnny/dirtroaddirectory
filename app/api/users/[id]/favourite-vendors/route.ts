import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_URL;

if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable BACKEND_URL is not set for favorite vendors API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles GET requests to /api/users/:id/favourite-vendors (fetches all favorite vendor IDs for a user).
 * Corresponds to the old favoriteVendorsAPI.getFavoriteVendorIds().
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'id' (user ID) from the URL.
 */

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: userId } = await params;

    if (!userId) {
        return NextResponse.json({ message: 'User ID is missing.' }, { status: 400 });
    }

    try {
        const response = await fetch(`${BACKEND_API_BASE_URL}/users/${userId}/favourite-vendors`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }

        const data: { id: number }[] = await response.json();
        const favoriteVendorIds = data.map((vendor) => vendor.id);
        return NextResponse.json(favoriteVendorIds);
    } catch (error) {
        console.error(`Error in Next.js API route (GET /api/users/${userId}/favourite-vendors):`, error);
        return NextResponse.json({ message: "Internal Server Error while fetching favorite vendors." }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: userId } = await params;

    if (!userId) {
        return NextResponse.json({ message: 'User ID is missing.' }, { status: 400 });
    }

    try {
        const body = await request.json();
        const vendorIdAsNumber = Number(body.vendor_id);
        if (isNaN(vendorIdAsNumber)) {
            return NextResponse.json({ message: 'vendor_id must be a valid number.' }, { status: 400 });
        }

        const requestBody = {
            user_id: Number(userId),
            vendor_id: vendorIdAsNumber,
        };

        const response = await fetch(`${BACKEND_API_BASE_URL}/users/${userId}/favourite-vendors`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            throw new Error(errorData.message || `Failed to add favorite: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error(`Error in Next.js API route (POST /api/users/${userId}/favourite-vendors):`, error);
        return NextResponse.json({ message: "Internal Server Error while adding favorite vendor." }, { status: 500 });
    }
}