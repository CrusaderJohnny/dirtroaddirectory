import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL;

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const response = await fetch(`${BACKEND_URL}/contact/${id}/read`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
        });
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }
        return NextResponse.json({ message: 'Message marked as read.' });
    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json({ message: 'Failed to connect to the external API.' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await fetch(`${BACKEND_URL}/contact/${id}/read`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
        });
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }
        return NextResponse.json({ message: 'Message marked as unread.' });
    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json({ message: 'Failed to connect to the external API.' }, { status: 500 });
    }
}