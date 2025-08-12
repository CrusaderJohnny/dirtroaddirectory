import {NextResponse} from "next/server";

const EXPRESS_BACKEND_URL = process.env.BACKEND_URL;

//Get request
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
    try {
        const backendUrl = `${EXPRESS_BACKEND_URL}/articles`;

        const response = await fetch(backendUrl, {
            method: "GET",
            headers: { "content-type": "application/json" },
        });

        if(!response.ok) {
            const errorBody = await response.json().catch(() => ({ message: `Unknown error from backend`}));
            console.error(`Backend GET /articles error: `, response.status, errorBody);
            return NextResponse.json(
                { message: `Failed to fetch articles from backend: ${errorBody.message || response.statusText}` },
                { status: response.status }
            );
        }

        const articles = await response.json();
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        console.error(`Error in Next.js API proxy to GET /api/articles: `, error);
        return NextResponse.json(
            { message: `Internal server error in Next.js proxy while fetching articles.` },
            { status: 500 }
            );
    }
}

export async function POST(req: Request) {
    try {
        const requestBody = await req.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {title, content, userId, market_id, image, is_featured, summary} = requestBody;

        if (!userId || !title || !content) {
            return NextResponse.json(
                {message: `User ID, title, and content are required for an article.`},
                {status: 400}
            );
        }
        const backendUrl = `${EXPRESS_BACKEND_URL}/articles`;

        const response = await fetch(backendUrl, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        if(!response.ok) {
            const errorBody = await response.json().catch(() => ({ message: `Unknown error from backend`}));
            console.error(`Backend POST /articles error: `, response.status, errorBody);
            return NextResponse.json(
                { message: `Failed to create article via backend: ${errorBody.message || response.statusText}` },
                { status: response.status }
            );
        }

        const newArticle = await response.json();
        return NextResponse.json(newArticle, {status: 201});
    } catch (error) {
        console.error(`Error in Next.js API proxy for POST /api/articles: `, error);
        return NextResponse.json(
            { message: `Internal server error in Next.js proxy while creating article.`},
            { status: 500 }
        );
    }
}