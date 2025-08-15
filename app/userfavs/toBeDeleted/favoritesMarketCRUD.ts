
const API_BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL;

const favoritesMarketAPI = {
    // GET all favorite market IDs for a user
    getFavoriteMarketIds: async (userId: string): Promise<string[]> => {
        const res = await fetch(`${API_BASE_URL}/users/${userId}/favourite-markets`);
        if (!res.ok) throw new Error("Failed to fetch favorite markets");
        const data = await res.json();
        return data.map((market: { id: number }) => market.id.toString());
    },

    // ADD a favorite
    addFavoriteMarket: async (userId: string, marketId: string): Promise<void> => {
        await fetch(`${API_BASE_URL}/users/${userId}/favourite-markets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, market_id: marketId }),
        });
    },

    // REMOVE a favorite
    removeFavoriteMarket: async (userId: string, marketId: string): Promise<void> => {
        await fetch(`${API_BASE_URL}/users/${userId}/favourite-markets/${marketId}`, {
            method: "DELETE",
        });
    },
};

export default favoritesMarketAPI;
