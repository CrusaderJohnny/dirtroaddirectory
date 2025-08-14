
const API_BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL;

const favoriteVendorsAPI = {
    // GET all favorite vendor IDs for a user
    getFavoriteVendorIds: async (userId: string): Promise<string[]> => {
        const res = await fetch(`${API_BASE_URL}/users/${userId}/favourite-vendors`);
        if (!res.ok) throw new Error("Failed to fetch favorite vendors");
        const data = await res.json();
        return data.map((vendor: { id: string }) => vendor.id.toString());
    },

    // ADD a favorite vendor
    addFavoriteVendor: async (userId: string, vendorId: string): Promise<void> => {
        await fetch(`${API_BASE_URL}/users/${userId}/favourite-vendors`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, vendor_id: vendorId }),
        });
    },

    // REMOVE a favorite vendor
    removeFavoriteVendor: async (userId: string, vendorId: string): Promise<void> => {
        await fetch(`${API_BASE_URL}/users/${userId}/favourite-vendors/${vendorId}`, {
            method: "DELETE",
        });
    },
};

export default favoriteVendorsAPI;
