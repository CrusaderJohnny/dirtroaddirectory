declare global {
    interface Window {
        gtag?: {
            //config command,
            (command: 'config', targetId: string, config?: Gtag.ConfigParams): void;
            //set command
            (command: 'set', config: Gtag.ConfigParams | Gtag.CustomParams | Gtag.EventParams): void;
            //event command
            (command: 'event', eventName: Gtag.EventNames | string, eventParams?: Gtag.EventParams): void;
        }
    }
}

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