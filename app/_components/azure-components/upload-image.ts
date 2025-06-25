import type { NextApiRequest, NextApiResponse } from 'next';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames
import formidable from 'formidable'; // For handling multipart/form-data
import fs from 'fs';

// Important: Disable Next.js's body parser to use formidable
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // 1. Get Azure Storage Account details from environment variables
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'post-images';

    if (!accountName || !accountKey) {
        return res.status(500).json({ error: 'Azure Storage credentials not configured.' });
    }

    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
    const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        sharedKeyCredential
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Ensure the container exists (optional, good for first-time setup)
    await containerClient.createIfNotExists({ access: 'blob' }); // 'blob' means public read access to blobs

    try {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                return res.status(500).json({ error: 'Error processing upload.' });
            }

            const file = files.image?.[0]; // Assuming the input field name is 'image'

            if (!file) {
                return res.status(400).json({ error: 'No image file provided.' });
            }

            const fileExtension = file.originalFilename?.split('.').pop() || 'png';
            const blobName = `${uuidv4()}.${fileExtension}`; // Generate a unique name for the blob
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            // Upload the file
            const uploadStream = fs.createReadStream(file.filepath);
            await blockBlobClient.uploadStream(uploadStream, file.size, 5, {
                blobHTTPHeaders: {
                    blobContentType: file.mimetype || 'application/octet-stream',
                },
            });

            // Construct the public URL
            const imageUrl = blockBlobClient.url;

            return res.status(200).json({ url: imageUrl });
        });
    } catch (error) {
        console.error('Error uploading to Azure Blob Storage:', error);
        return res.status(500).json({ error: 'Failed to upload image to storage.' });
    }
}