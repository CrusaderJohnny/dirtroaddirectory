import { MarketsInterface } from "@/app/_types/interfaces";

// backend API base URL
const API_BASE_URL = 'https://drd-api-azure-dfbbhza6becvhfhn.centralus-01.azurewebsites.net'; // Azure API URL

/**
 * Sends a POST request to add a new market entry.
 *
 * @param marketData The data for the new market, excluding the 'id'.
 * @returns A Promise that resolves to the newly created MarketsInterface object (including its generated id).
 * @throws An error if the POST operation fails or the response is not OK.
 */
export async function postMarket(marketData: Omit<MarketsInterface, 'id'>): Promise<MarketsInterface> {
    try {
        const response = await fetch(`${API_BASE_URL}/markets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(marketData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const newMarket: MarketsInterface = await response.json();
        return newMarket;
    } catch (err) {
        console.error("Error posting new market:", err);
        throw new Error(`Failed to add new market: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
}