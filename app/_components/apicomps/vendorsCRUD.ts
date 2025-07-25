import { VendorsInterface } from "@/app/_types/interfaces";

const API_BASE_URL = process.env.EXPRESS_BACKEND_URL;

// check to ensure the environment variable is defined
if (!API_BASE_URL) {
  throw new Error('EXPRESS_BACKEND_URL is not defined in your environment variables.');
}


const vendorsAPI = {
    /**
     * Fetches all vendors.
     * @returns A Promise that resolves to an array of VendorsInterface.
     */
    getVendors: async (): Promise<VendorsInterface[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/vendors`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            const data: VendorsInterface[] = await response.json();
            return data;
        } catch (err) {
            console.error("Error fetching vendors:", err);
            throw new Error(`Failed to fetch vendor data: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    },

    /**
     * Creates a new vendor.
     * @param vendorData The data for the new vendor, excluding the 'id'.
     * @returns A Promise that resolves to the newly created VendorsInterface object (including its generated id).
     */
    // Changed 'VendorDataForCreate' to 'Omit<VendorsInterface, 'id'>' directly
    createVendor: async (vendorData: Omit<VendorsInterface, 'id'>): Promise<VendorsInterface> => {
        try {
            const response = await fetch(`${API_BASE_URL}/vendors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vendorData), // vendorData will now correctly include 'markets' array
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            // Assuming your API returns the created vendor object directly (or under a 'vendor' key)
            const responseData = await response.json();
            // If your API returns { message: "...", vendor: {...} }, uncomment the next line:
            // return responseData.vendor; 
            return responseData; // If API returns the vendor object directly
        } catch (err) {
            console.error("Error creating vendor:", err);
            throw new Error(`Failed to create vendor: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    },

    /**
     * Updates an existing vendor.
     * @param id The ID of the vendor to update.
     * @param vendorData The updated data for the vendor. Using Partial as not all fields might be updated.
     * @returns A Promise that resolves to the updated VendorsInterface object.
     */
    // Changed 'VendorDataForUpdate' to 'Partial<VendorsInterface>' directly
    updateVendor: async (id: number, vendorData: Partial<VendorsInterface>): Promise<VendorsInterface> => {
        try {
            const response = await fetch(`${API_BASE_URL}/vendors/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vendorData), // vendorData will now correctly include 'markets' array
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            // Assuming your API returns the updated vendor object directly (or under a 'vendor' key)
            const responseData = await response.json();
            // If your API returns { message: "...", vendor: {...} }, uncomment the next line:
            // return responseData.vendor; 
            return responseData; // If API returns the vendor object directly
        } catch (err) {
            console.error(`Error updating vendor with ID ${id}:`, err);
            throw new Error(`Failed to update vendor: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    },

    /**
     * Deletes a vendor by ID.
     * @param id The ID of the vendor to delete.
     * @returns A Promise that resolves when the deletion is successful.
     */
    deleteVendor: async (id: number): Promise<void> => {
        try {
            const response = await fetch(`${API_BASE_URL}/vendors/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            // No content expected for a successful DELETE
        } catch (err) {
            console.error(`Error deleting vendor with ID ${id}:`, err);
            throw new Error(`Failed to delete vendor: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    },
};

export default vendorsAPI;