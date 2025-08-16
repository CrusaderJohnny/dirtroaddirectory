import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_URL;

if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable BACKEND_URL is not set for favorite vendors DELETE API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles DELETE requests to /api/users/:id/favourite-vendors/:vendorId (removes a vendor from a user's favorites).
 * Corresponds to the old favoriteVendorsAPI.removeFavoriteVendor().
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'id' (user ID) and 'vendorId' from the URL.
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string, vendorId: string }> }) {
    const { id: userId, vendorId } = await params;

    if (!userId || !vendorId) {
        return NextResponse.json({ message: 'User ID or Vendor ID is missing.' }, { status: 400 });
    }

    try {
        const vendorIdAsNumber = Number(vendorId);
        if (isNaN(vendorIdAsNumber)) {
            return NextResponse.json({ message: 'Vendor ID must be a valid number.' }, { status: 400 });
        }

        const response = await fetch(`${BACKEND_API_BASE_URL}/users/${userId}/favourite-vendors/${vendorIdAsNumber}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            throw new Error(errorData.message || `Failed to remove favorite: ${response.statusText}`);
        }

        return new NextResponse(null, { status: response.status });
    } catch (error) {
        console.error(`Error in Next.js API route (DELETE /api/users/${userId}/favourite-vendors/${vendorId}):`, error);
        return NextResponse.json({ message: "Internal Server Error while deleting favorite vendor." }, { status: 500 });
    }
}
