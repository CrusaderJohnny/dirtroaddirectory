import {VendorsInterface} from "@/app/_types/interfaces";

// Define your backend API base URL
const API_BASE_URL = 'http://localhost:8080';

/**
 * Fetches vendor data from the API and returns it as a JSON array.
 * Throws an error if the fetch operation fails or the response is not OK.
 * @returns A Promise that resolves to an array of VendorsInterface.
 */
export async function fetchVendorsAsJson(): Promise<VendorsInterface[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/vendors`);

        // Manually check if the HTTP response was successful (status 2xx)
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' })); // Attempt to parse error body, fallback if it's not JSON
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response body
        const data: VendorsInterface[] = await response.json();
        return data;
    } catch (err) {
        console.error("Error fetching vendors as JSON:", err);
        // Re-throw the error so the caller can handle it
        throw new Error(`Failed to fetch vendor data: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
}