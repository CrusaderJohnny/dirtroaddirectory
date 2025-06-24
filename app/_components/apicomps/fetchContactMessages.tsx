import { ContactMessageInterface } from '@/app/_types/interfaces';

const API_BASE_URL = 'http://localhost:8080'; 

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
        throw new Error(`Failed to fetch contact messages: ${err instanceof Error ? err.message : 'Network error'}`);
    }
}