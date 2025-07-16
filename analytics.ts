interface AnalyticsEvent{
    name: Gtag.EventNames | string;
    properties?: {  [key: string]: string | number };
}

export const trackEvent = (event: AnalyticsEvent) => {
    if(typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', event.name, event.properties);
    } else {
        console.warn('Google analytics gtag not available, event not tracked:', event);
    }
};