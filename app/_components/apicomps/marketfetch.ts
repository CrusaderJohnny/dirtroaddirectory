import {MarketsInterface} from "@/app/_types/interfaces";

//backend API base URL
//const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = 'https://drd-api-azure-dfbbhza6becvhfhn.centralus-01.azurewebsites.net'; // Azure API URL

/**
 * Fetches market data from the API and returns it as a JSON array.
 * Throws an error if the fetch operation fails or the response is not OK.
 * @returns A Promise that resolves to an array of MarketsInterface.
 */
export async function fetchMarketsAsJson(): Promise<MarketsInterface[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/markets`);

        // Manually check if the HTTP response was successful
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' })); // Attempt to parse error body, fallback if it's not JSON
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response body
        const data: MarketsInterface[] = await response.json();
        return data;
    } catch (err) {
        console.error("Error fetching markets as JSON:", err);
        // Re-throw the error so the caller can handle it
        throw new Error(`Failed to fetch market data: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
}