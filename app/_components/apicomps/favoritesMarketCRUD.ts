
const API_BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL;

const favoritesMarketAPI = {
    // GET all favorite market IDs for a user
    getFavoriteMarketIds: async (userId: number): Promise<number[]> => {
        const res = await fetch(`${API_BASE_URL}/favorites/markets/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch favorites");
        return await res.json(); // should be an array of IDs
    },

    // ADD a favorite
    addFavoriteMarket: async (userId: number, marketId: number): Promise<void> => {
        await fetch(`${API_BASE_URL}/favorites/markets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, market_id: marketId }),
        });
    },

    // REMOVE a favorite
    removeFavoriteMarket: async (userId: number, marketId: number): Promise<void> => {
        await fetch(`${API_BASE_URL}/favorites/markets/${userId}/${marketId}`, {
            method: "DELETE",
        });
    },
};

export default favoritesMarketAPI;
