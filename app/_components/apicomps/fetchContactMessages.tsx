import { ContactMessageInterface } from '@/app/_types/interfaces';

const API_BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL;

/**
 * Fetch all contact messages
 */
export async function fetchContactMessages(): Promise<ContactMessageInterface[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    const data: ContactMessageInterface[] = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    throw new Error(
      `Failed to fetch contact messages: ${err instanceof Error ? err.message : 'Network error'}`
    );
  }
}

/**
 * Delete a contact message by ID
 */
export async function deleteContactMessage(id: number): Promise<void> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `Failed to delete message with ID ${id}`);
    }
  } catch (err) {
    console.error("Error deleting contact message:", err);
    throw new Error(
      err instanceof Error ? err.message : "Network error occurred while deleting"
    );
  }
}
