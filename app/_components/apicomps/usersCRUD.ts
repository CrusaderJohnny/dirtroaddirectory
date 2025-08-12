const API_BASE_URL = process.env.BACKEND_URL;

const usersAPI = {
    // CREATE user
    createUser: async (username: string, email: string): Promise<void> => {
        const res = await fetch(`${API_BASE_URL}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email }),
        });

        if (!res.ok) throw new Error("Failed to create user");
    },

    // GET all users
    getAllUsers: async (): Promise<{ id: string; username: string; email: string }[]> => {
        const res = await fetch(`${API_BASE_URL}/users`);
        if (!res.ok) throw new Error("Failed to fetch users");
        return await res.json();
    },

    // UPDATE user
    updateUser: async (userId: string, username: string, email: string): Promise<void> => {
        const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email }),
        });

        if (!res.ok) throw new Error("Failed to update user");
    },

    // DELETE user
    deleteUser: async (userId: string): Promise<void> => {
        const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete user");
    },
};

export default usersAPI;