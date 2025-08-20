import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET() {
    try {
        const backendUrl = `${BACKEND_URL}/contact`;
        const response = await fetch(backendUrl, {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json(
            { message: 'Failed to connect to the external API.' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const backendUrl = `${BACKEND_URL}/contact`;
        const body = await request.json(); // Get the JSON body from the incoming request

        const response = await fetch(backendUrl, {
            method: 'POST', // Use the POST method
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body), // Forward the request body to the backend
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json(
            { message: 'Failed to connect to the external API.' },
            { status: 500 }
        );
    }
}