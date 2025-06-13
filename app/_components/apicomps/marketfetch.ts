import {MarketsInterface} from "@/app/_types/interfaces";

// Define your backend API base URL
const API_BASE_URL = 'http://localhost:8080';

/**
 * Fetches market data from the API and returns it as a JSON array.
 * Throws an error if the fetch operation fails or the response is not OK.
 * @returns A Promise that resolves to an array of MarketsInterface.
 */
export async function fetchMarketsAsJson(): Promise<MarketsInterface[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/markets`);

        // Manually check if the HTTP response was successful (status 2xx)
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' })); // Attempt to parse error body, fallback if it's not JSON
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response body
        const data: MarketsInterface[] = await response.json();
        return data;
    } catch (err: any) {
        console.error("Error fetching markets as JSON:", err);
        // Re-throw the error so the caller can handle it
        throw new Error(`Failed to fetch market data: ${err.message || 'Network error'}`);
    }
}

// Example of how you might use this function (for demonstration/testing, not part of the exported module)
/*
(async () => {
  console.log("Attempting to fetch markets...");
  try {
    const markets = await fetchMarketsAsJson();
    console.log("Successfully fetched markets:", JSON.stringify(markets, null, 2));
  } catch (error) {
    console.error("Failed to get markets:", error);
  }
})();
*/