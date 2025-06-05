// Interface for how an Item is represented in your application (includes id from Firestore)
export interface Item {
    id: string; // This will be the Firestore document ID
    title: string;
    date: string;
    content: string;
    imgLink: string;
}

// Interface for the data structure you send to Firestore (does NOT include id)
export interface ItemDataForFirestore {
    title: string;
    date: string;
    content: string;
    imgLink: string;
}