import { NextResponse } from "next/server";

const EXPRESS_BACKEND_URL = process.env.BACKEND_URL;

/**
 * Handles GET requests for a single article by its ID.
 * The URL will be in the format: /api/articles/123
 * @param req The incoming Next.js request object.
 * @param context An object containing route parameters.
 */
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Extract the article ID from the context object.
        const { id } = await params;

        // Construct the full backend URL for a single article.
        const backendUrl = `${EXPRESS_BACKEND_URL}/articles/${id}`;

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

/**
 * Handles PUT requests to update a single article by its ID.
 * The URL will be in the format: /api/articles/123
 * @param req The incoming Next.js request object.
 * @param context An object containing route parameters.
 */
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const requestBody = await req.json();

        // Validate the request body here if necessary

        const backendUrl = `${EXPRESS_BACKEND_URL}/articles/${id}`;
        console.log(`Proxying PUT request to ${backendUrl}`);

        const response = await fetch(backendUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({ message: `Unknown error from backend` }));
            console.error(`Backend PUT /articles/${id} error: `, response.status, errorBody);
            return NextResponse.json(
                { message: `Failed to update article via backend: ${errorBody.message || response.statusText}` },
                { status: response.status }
            );
        }

        const updatedArticle = await response.json();
        return NextResponse.json(updatedArticle, { status: 200 });
    } catch (error) {
        console.error(`Error in Next.js API proxy for PUT /api/articles/[id]: `, error);
        return NextResponse.json(
            { message: `Internal server error in Next.js proxy while updating article.` },
            { status: 500 }
        );
    }
}
