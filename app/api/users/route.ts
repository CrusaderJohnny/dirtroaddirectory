import { NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_URL;

// Ensure the backend URL is set
if (!BACKEND_API_BASE_URL) {
    console.error("Environment variable BACKEND_URL is not set for users API route.");
    throw new Error("Backend API URL not configured.");
}

/**
 * Handles GET requests to /api/users (fetches all users).
 * Corresponds to the old usersAPI.getAllUsers().
 */
export async function GET() { // No NextRequest needed here
    try {
        const response = await fetch(`${BACKEND_API_BASE_URL}/users`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error from backend' }));
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in Next.js API route (GET /api/users):", error);
        return NextResponse.json({ message: "Internal Server Error while fetching users." }, { status: 500 });
    }
}