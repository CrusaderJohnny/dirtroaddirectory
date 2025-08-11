// This file should be placed at `app/api/articles/[id]/route.ts`
import { NextResponse } from "next/server";

const EXPRESS_BACKEND_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL;

if (!process.env.EXPRESS_BACKEND_URL) {
    console.warn(`EXPRESS_BACKEND_URL is not set, defaulting to http://localhost:8080`);
    console.warn(`Ensure this variable is set in your .env.local for production deployments.`);
}

/**
 * Handles GET requests for a single article by its ID.
 * The URL will be in the format: /api/articles/123
 * @param req The incoming Next.js request object.
 * @param context An object containing route parameters.
 */
// This function signature provides an explicit type for the 'context' parameter,
// which should satisfy the strict Next.js build-time type checker.
export async function GET(
    req: Request,
    context: { params: { id: string } }
) {
    try {
        // Extract the article ID from the context object.
        const { id } = context.params;

        // Construct the full backend URL for a single article.
        const backendUrl = `${EXPRESS_BACKEND_URL}/articles/${id}`;
        console.log(`Proxying GET request to ${backendUrl}`);

        const response = await fetch(backendUrl, {
            method: "GET",
            headers: { "content-type": "application/json" },
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({ message: `Unknown error from backend` }));
            console.error(`Backend GET /articles/${id} error: `, response.status, errorBody);
            return NextResponse.json(
                { message: `Failed to fetch article from backend: ${errorBody.message || response.statusText}` },
                { status: response.status }
            );
        }

        const article = await response.json();
        return NextResponse.json(article, { status: 200 });
    } catch (error) {
        console.error(`Error in Next.js API proxy to GET /api/articles/[id]: `, error);
        return NextResponse.json(
            { message: `Internal server error in Next.js proxy while fetching article.` },
            { status: 500 }
        );
    }
}
