import { AzureKeyCredential } from "@azure/core-auth";
import { NextResponse } from "next/server";
import ContentSafetyClient, {AnalyzeTextResultOutput} from "@azure-rest/ai-content-safety";


// -- configuration --
//access env variables securely
const endpoint = process.env.AZURE_CONTENT_SAFETY_ENDPOINT;
const key = process.env.AZURE_CONTENT_SAFETY_KEY;

//validate environment variables
if(!endpoint || !key) {
    console.error('Missing azure content safety environment variables!');
}

//initialize content safety client once
const credential = new AzureKeyCredential(key || "");
const client = ContentSafetyClient(endpoint || "", credential);

// -- API route handler (Post Request)
//handles the POST request to /api/moderate-content
export async function POST(req: Request) {
    try {
        const { textToModerate } = await req.json();

        if(!textToModerate || typeof textToModerate !== "string") {
            return NextResponse.json({ message: 'Invalid or missing text to moderate'}, { status: 400 });
        }
        const analyzeTextOptions = {
            body: {
                text: textToModerate,
                categories: ["Hate", "Sexual", "SelfHarm", "Violence"],
                outputType: "FourSeverityLevels",
            }
        };
        const result = await client.path("/text:analyze").post(analyzeTextOptions);

        if(result.status === "200") {
            const moderationResults = result.body as AnalyzeTextResultOutput;
            console.log("Moderation Results:", moderationResults);
            let allowPost = true;
            const violationReasons: string[] = [];
            const SEVERITY_THRESHOLD = 3;

            moderationResults.categoriesAnalysis?.forEach(category => {
                if(category.severity !== undefined && category.severity >= SEVERITY_THRESHOLD) {
                    allowPost = false;
                    violationReasons.push(`${category.category} content detected with severity ${category.severity}.`);
                }
            });

            if(allowPost) {
                return NextResponse.json({
                    status: "allowed",
                    message: "Content is safe."
                });
            } else {
                return NextResponse.json({
                    status: "disallowed",
                    message: "Content violates community guidelines.",
                    reasons: violationReasons,
                },
                    { status: 403}
                );
            }
        } else {
            const errorBody = result.body;
            console.error("Azure content safety API error response:", errorBody);
            const errorMessage = errorBody && 'error' in errorBody && errorBody.error?.message ? errorBody.error.message : "Unknown Error from content safety service.";
            return NextResponse.json({
                message: 'Error Performing content safety check.',
                details: errorMessage
            },
                { status: parseInt(result.status) }
            );
        }
    } catch (error) {
        console.error('Unexpected error during content moderation:', error);
        return NextResponse.json(
            { message: 'An internal server error occurred.'},
            { status: 500 }
        );
    }
}
