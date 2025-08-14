import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_URL;

// Ensure the backend URL is set
if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable BACKEND_URL is not set for users ID API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles PUT requests to /api/users/:id (updates an existing user).
 * Corresponds to the old usersAPI.updateUser().
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'id' from the URL.
 */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // Validate if the ID is a valid number format
    if (isNaN(parseInt(id))) {
        return NextResponse.json({ message: 'Invalid user ID format.' }, { status: 400 });
    }

    try {
        const body = await request.json(); // Get the JSON body from the frontend request (e.g., { username, email })

        const response = await fetch(`${BACKEND_API_BASE_URL}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body), // Forward the request body to your backend
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error(`Error in Next.js API route (PUT /api/users/${id}):`, error);
        return NextResponse.json({ message: "Internal Server Error while updating user." }, { status: 500 });
    }
}

/**
 * Handles DELETE requests to /api/users/:id (deletes a user).
 * Corresponds to the old usersAPI.deleteUser().
 * @param request The NextRequest object.
 * @param params Contains the dynamic 'id' from the URL.
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // Validate if the ID is a valid number format
    if (isNaN(parseInt(id))) {
        return NextResponse.json({ message: 'Invalid user ID format.' }, { status: 400 });
    }

    try {
        const response = await fetch(`${BACKEND_API_BASE_URL}/users/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }

        // Return a success response, often 204 No Content for DELETE
        // If your backend returns a body, you can parse and return it; otherwise, 204 is common.
        return new NextResponse(null, { status: response.status });
    } catch (error) {
        console.error(`Error in Next.js API route (DELETE /api/users/${id}):`, error);
        return NextResponse.json({ message: "Internal Server Error while deleting user." }, { status: 500 });
    }
}
