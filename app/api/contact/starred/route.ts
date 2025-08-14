import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET() {
    try {
        const response = await fetch(`${BACKEND_URL}/contact/starred`, {
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
        return NextResponse.json({ message: 'Failed to connect to the external API.' }, { status: 500 });
    }
}