// app/api/upload-image/route.ts

import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames
import { NextResponse } from 'next/server';
import {Readable} from "node:stream"; // For App Router API responses

// This is the App Router API route handler for POST requests
export async function POST(request: Request) {
    try {
        // 1. Parse the incoming form data directly from the Request object
        const formData = await request.formData();
        const file = formData.get('image') as File; // 'image' must match the key used in your frontend's formData.append('image', ...)

        if (!file) {
            return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
        }

        // 2. Get Azure Storage Account details from environment variables
        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
        const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'post-images'; // Your container name

        if (!accountName || !accountKey) {
            console.error('Azure Storage credentials not configured for App Router API.');
            return NextResponse.json({ error: 'Azure Storage credentials not configured.' }, { status: 500 });
        }

        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
        const blobServiceClient = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net`,
            sharedKeyCredential
        );
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // 3. Ensure the container exists (optional, good for first-time setup)
        await containerClient.createIfNotExists({ access: 'blob' }); // 'blob' means public read access to blobs

        // 4. Generate a unique filename and upload to Azure Blob Storage
        const fileExtension = file.name?.split('.').pop() || 'png';
        const blobName = `${uuidv4()}.${fileExtension}`; // Generate a unique name for the blob
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const readableStream = Readable.from(buffer);

        const bufferSize = 4 * 1024 * 1024;
        const maxConcurrency = 5;

        await blockBlobClient.uploadStream(
            readableStream, // Cast to any to satisfy TypeScript, as File.stream() is a Web ReadableStream
            bufferSize,
            maxConcurrency,
            {
                blobHTTPHeaders: {
                    blobContentType: file.type || 'application/octet-stream',
                },
            }
        );

        // 5. Construct the public URL and return it
        const imageUrl = blockBlobClient.url;
        return NextResponse.json({ url: imageUrl }, { status: 200 });

    } catch (error: unknown) {
        console.error('Error uploading image to Azure Blob Storage via App Router API:', error);
        return NextResponse.json({ error: `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
    }
}