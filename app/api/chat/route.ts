import { AzureOpenAI } from "openai";
import { NextRequest, NextResponse } from 'next/server';

const AZURE_OPENAI_API_KEY = process.env.SHAZBOT;
const AZURE_OPENAI_ENDPOINT = process.env.SHAZBOT_ENDPOINT;
const AZURE_OPENAI_MODEL_NAME = process.env.SHAZBOT_MODELNAME || 'model-router';
const AZURE_OPENAI_DEPLOYMENT = process.env.SHAZBOT_DEPLOYMENT;
const AZURE_OPENAI_API_VERSION = process.env.SHAZBOT_VERSION;

// Validate that the API key is set
if (!AZURE_OPENAI_API_KEY || !AZURE_OPENAI_ENDPOINT || !AZURE_OPENAI_MODEL_NAME || !AZURE_OPENAI_DEPLOYMENT || !AZURE_OPENAI_API_VERSION) {
    throw new Error("One or more Azure OpenAI environment variables are not set. Please check your .env.local file.");
}

// Initialize the AzureOpenAI client on the server-side
const client = new AzureOpenAI({
    endpoint: AZURE_OPENAI_ENDPOINT,
    apiKey: AZURE_OPENAI_API_KEY,
    apiVersion: AZURE_OPENAI_API_VERSION,
    deployment: AZURE_OPENAI_DEPLOYMENT,
});

// Define the POST handler for the API route
export async function POST(req: NextRequest) {
    try {
        // Parse the request body to get the messages from the client
        const { messages } = await req.json();

        // Ensure messages are provided
        if (!messages) {
            return NextResponse.json({ error: "Messages are required" }, { status: 400 });
        }

        // Call the Azure OpenAI API with the received messages
        const response = await client.chat.completions.create({
            messages: messages,
            stream: true, // Keep streaming enabled for real-time updates to the client
            max_tokens: 8192,
            temperature: 0.7,
            top_p: 0.95,
            frequency_penalty: 0,
            presence_penalty: 0,
            model: AZURE_OPENAI_MODEL_NAME,
        });

        // Create a ReadableStream to send the streamed response back to the client
        const readableStream = new ReadableStream({
            async start(controller) {
                for await (const part of response) {
                    const content = part.choices[0]?.delta?.content || '';
                    if (content) {
                        controller.enqueue(content); // Enqueue each content chunk
                    }
                }
                controller.close(); // Close the stream when done
            },
        });

        // Return the stream as a Response
        return new Response(readableStream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8', // Use text/plain for streaming text
                'Transfer-Encoding': 'chunked',
            },
            status: 200,
        });

    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
