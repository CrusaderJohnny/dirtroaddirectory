import { MarketsInterface } from "@/app/_types/interfaces";

const API_BASE_URL = 'https://drd-api-azure-dfbbhza6becvhfhn.centralus-01.azurewebsites.net';

// I AM CURRENTLY CONSOLIDATING ALL MARKET API FUNCTIONS INTO THIS FILE -mace

const marketsAPI = {
    /**
     * Fetches all markets.
     */
    getMarkets: async (): Promise<MarketsInterface[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/markets`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            console.error("Error fetching markets:", err);
            throw new Error(`Failed to fetch market data: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    },

    /**
     * Creates a new market.
     */
    // Use Omit directly here
    createMarket: async (marketData: Omit<MarketsInterface, 'id'>): Promise<MarketsInterface> => {
        try {
            const response = await fetch(`${API_BASE_URL}/markets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(marketData),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            // Assuming the API returns the created market object directly
            const responseData = await response.json(); 
            // If your API returns { message: "...", market: {...} }
            // return responseData.market; 
            return responseData; // If API returns the market object directly
        } catch (err) {
            console.error("Error creating market:", err);
            throw new Error(`Failed to create market: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    },

    /**
     * Updates an existing market.
     */
    // Use Partial<MarketsInterface> directly here, as not all fields might be updated
    updateMarket: async (id: number, marketData: Partial<MarketsInterface>): Promise<MarketsInterface> => {
        try {
            const response = await fetch(`${API_BASE_URL}/markets/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(marketData),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            // Often PUT returns the updated resource or just a success status
            const responseData = await response.json();
            // If your API returns { message: "...", market: {...} }
            // return responseData.market; 
            return responseData; // If API returns the market object directly
        } catch (err) {
            console.error(`Error updating market with ID ${id}:`, err);
            throw new Error(`Failed to update market: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    },

    /**
     * Deletes a market by ID.
     */
    deleteMarket: async (id: number): Promise<void> => {
        try {
            const response = await fetch(`${API_BASE_URL}/markets/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            // No content expected for a successful DELETE
        } catch (err) {
            console.error(`Error deleting market with ID ${id}:`, err);
            throw new Error(`Failed to delete market: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    },
};

export default marketsAPI;