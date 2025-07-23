'use client';

export async function AnalyticsTracker(event_type: string, event_name: string) {
    try {
        const response = await fetch('../api/events', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({event_type, event_name}),
        });
        if(!response.ok) {
            console.error(`Failed to track event ${event_type}:`, response.statusText);
        } else {
            console.log('Tracking event', event_type);
        }
    } catch (error) {
        console.error(`Failed to track event ${event_type}:`, error);
    }

    return null;
}