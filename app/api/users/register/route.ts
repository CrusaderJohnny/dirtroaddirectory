import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_URL;

// Ensure the backend URL is set
if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable BACKEND_URL is not set for users API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles POST requests to /api/users (creates a new user).
 * This route specifically targets the /users/register endpoint on your backend,
 * mirroring the old usersAPI.createUser().
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // Get the JSON body from the frontend request (should contain username and email)

        // Note: The old usersAPI used '/users/register' for creating a user.
        // We'll maintain this convention to match your backend.
        const response = await fetch(`${BACKEND_API_BASE_URL}/users/register`, {
            method: 'POST',
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
        console.error("Error in Next.js API route (POST /api/users):", error);
        return NextResponse.json({ message: "Internal Server Error while creating user." }, { status: 500 });
    }
}
