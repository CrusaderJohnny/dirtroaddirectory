import { ContactMessageInterface } from '@/app/_types/interfaces';

/**
 * Fetch all contact messages
 */
export async function fetchContactMessages(): Promise<ContactMessageInterface[]> {
  try {
    const response = await fetch(`/api/contact`);
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
    const res = await fetch(`/api/contact/${id}`, {
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

/**
 * Fetch a list of IDs for all starred contact messages
 */
export async function fetchStarredMessageIds(): Promise<number[]> {
  try {
    const response = await fetch(`/api/contact/starred`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `Failed to fetch starred message IDs: HTTP error! Status: ${response.status}`);
    }
    const data: number[] = await response.json();
    return data;
  } catch (err) {
    console.warn("Error fetching starred message IDs:", err);
    throw new Error(
      `Failed to fetch starred message IDs: ${err instanceof Error ? err.message : 'Network error'}`
    );
  }
}

/**
 * Star a contact message by ID
 */
export async function starMessage(id: number): Promise<void> {
  try {
    const response = await fetch(`/api/contact/${id}/star`, {
      method: 'PUT',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `Failed to star message with ID ${id}`);
    }
  } catch (err) {
    console.error("Error starring message:", err);
    throw new Error(
      err instanceof Error ? err.message : `Network error occurred while starring message with ID ${id}`
    );
  }
}

/**
 * Unstar a contact message by ID
 */
export async function unstarMessage(id: number): Promise<void> {
  try {
    const response = await fetch(`/api/contact/${id}/star`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `Failed to unstar message with ID ${id}`);
    }
  } catch (err) {
    console.error("Error unstarring message:", err);
    throw new Error(
      err instanceof Error ? err.message : `Network error occurred while unstarring message with ID ${id}`
    );
  }
}

// Add these functions to your existing file:
// apicomps/fetchContactMessages.ts

/**
 * Fetch a list of IDs for all read contact messages
 */
export async function fetchReadMessageIds(): Promise<number[]> {
  try {
    const response = await fetch(`/api/contact/read`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `Failed to fetch read message IDs: HTTP error! Status: ${response.status}`);
    }
    const data: number[] = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching read message IDs:", err);
    throw new Error(
      `Failed to fetch read message IDs: ${err instanceof Error ? err.message : 'Network error'}`
    );
  }
}

/**
 * Mark a contact message as read by ID
 */
export async function markMessageAsRead(id: number): Promise<void> {
  try {
    const response = await fetch(`/api/contact/${id}/read`, {
      method: 'PUT',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `Failed to mark message with ID ${id} as read`);
    }
  } catch (err) {
    console.error("Error marking message as read:", err);
    throw new Error(
      err instanceof Error ? err.message : `Network error occurred while marking message with ID ${id} as read`
    );
  }
}

/**
 * Mark a contact message as unread by ID
 */
export async function markMessageAsUnread(id: number): Promise<void> {
  try {
    const response = await fetch(`/api/contact/${id}/read`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `Failed to mark message with ID ${id} as unread`);
    }
  } catch (err) {
    console.error("Error marking message as unread:", err);
    throw new Error(
      err instanceof Error ? err.message : `Network error occurred while marking message with ID ${id} as unread`
    );
  }
}
