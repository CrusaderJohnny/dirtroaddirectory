import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_URL;

if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable BACKEND_URL is not set for vendors API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles GET requests to /api/vendors/:id (fetches a single vendor by ID).
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'id' from the URL.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Number validation for ID
    if (isNaN(parseInt(id))) {
        return NextResponse.json({ message: 'Invalid vendor ID format.' }, { status: 400 });
    }

    try {
        const response = await fetch(`${BACKEND_API_BASE_URL}/vendors/${id}`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`Error in Next.js API route (GET /api/vendors/${id}):`, error);
        return NextResponse.json({ message: "Internal Server Error while fetching vendor by ID." }, { status: 500 });
    }
}

/**
 * Handles PUT requests to /api/vendors/:id (updates an existing vendor).
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'id' from the URL.
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (isNaN(parseInt(id))) {
        return NextResponse.json({ message: 'Invalid vendor ID format.' }, { status: 400 });
    }

    try {
        const body = await request.json();

        const response = await fetch(`${BACKEND_API_BASE_URL}/vendors/${id}`, {
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
        console.error(`Error in Next.js API route (PUT /api/vendors/${id}):`, error);
        return NextResponse.json({ message: "Internal Server Error while updating vendor." }, { status: 500 });
    }
}

/**
 * Handles DELETE requests to /api/vendors/:id (deletes a vendor).
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'id' from the URL.
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (isNaN(parseInt(id))) {
        return NextResponse.json({ message: 'Invalid vendor ID format.' }, { status: 400 });
    }

    try {
        const response = await fetch(`${BACKEND_API_BASE_URL}/vendors/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }
        // no content is returned, just a 204 status.
        return new NextResponse(null, { status: response.status });
    } catch (error) {
        console.error(`Error in Next.js API route (DELETE /api/vendors/${id}):`, error);
        return NextResponse.json({ message: "Internal Server Error while deleting vendor." }, { status: 500 });
    }
}