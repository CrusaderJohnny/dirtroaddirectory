
const API_BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL;

const favoriteVendorsAPI = {
    // GET all favorite vendor IDs for a user
    getFavoriteVendorIds: async (userId: number): Promise<number[]> => {
        const res = await fetch(`${API_BASE_URL}/favorites/vendors/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch favorite vendors");
        const data = await res.json();
        return data.map((vendor: { id: number }) => vendor.id.toString());
    },

    // ADD a favorite vendor
    addFavoriteVendor: async (userId: number, vendorId: number): Promise<void> => {
        await fetch(`${API_BASE_URL}/favorites/vendors`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, vendor_id: vendorId }),
        });
    },

    // REMOVE a favorite vendor
    removeFavoriteVendor: async (userId: number, vendorId: number): Promise<void> => {
        await fetch(`${API_BASE_URL}/favorites/vendors/${userId}/${vendorId}`, {
            method: "DELETE",
        });
    },
};

export default favoriteVendorsAPI;
