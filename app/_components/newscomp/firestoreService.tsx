// import { db } from './firebaseConfig';
// import { collection, addDoc, getDocs, query, orderBy, getDoc, doc } from 'firebase/firestore';
// import { Item, ItemDataForFirestore } from './types'; // Import your types
//
// const ITEMS_COLLECTION = 'items'; // Define collection name for consistency
//
// /**
//  * Posts new item data to Firestore.
//  * Firestore will automatically generate a unique ID for the document.
//  * @param itemData The item data to store (without an 'id' field).
//  * @returns The Firestore-generated document ID.
//  */
// export const postItemToFirebase = async (itemData: ItemDataForFirestore): Promise<string> => {
//     try {
//         const docRef = await addDoc(collection(db, ITEMS_COLLECTION), itemData);
//         console.log('Document written with ID: ', docRef.id);
//         return docRef.id;
//     } catch (e) {
//         console.error('Error adding document: ', e);
//         // You might want to throw a custom error or more specific message here
//         throw new Error(`Failed to post item: ${e instanceof Error ? e.message : String(e)}`);
//     }
// };
//
// /**
//  * Fetches all items from Firestore, ordered by date descending.
//  * @returns A promise that resolves to an array of Item objects.
//  */
// export const getItemsFromFirebase = async (): Promise<Item[]> => {
//     try {
//         const itemsRef = collection(db, ITEMS_COLLECTION);
//         const q = query(itemsRef, orderBy('date', 'desc')); // Order by date descending
//
//         const querySnapshot = await getDocs(q);
//
//         const items: Item[] = [];
//         querySnapshot.forEach((document) => {
//             // Get the raw data from Firestore
//             const data = document.data();
//             // Combine Firestore's document ID with the rest of the data
//             items.push({ id: document.id, ...data } as Item); // Cast to Item interface
//         });
//         return items;
//     } catch (e) {
//         console.error('Error fetching documents: ', e);
//         throw new Error(`Failed to fetch items: ${e instanceof Error ? e.message : String(e)}`);
//     }
// };
//
// /**
//  * Fetches a single item by its Firestore document ID.
//  * @param id The Firestore document ID of the item.
//  * @returns A promise that resolves to the Item object or null if not found.
//  */
// export const getItemByIdFromFirebase = async (id: string): Promise<Item | null> => {
//     try {
//         const docRef = doc(db, ITEMS_COLLECTION, id);
//         const docSnap = await getDoc(docRef);
//
//         if (docSnap.exists()) {
//             return { id: docSnap.id, ...docSnap.data() } as Item;
//         } else {
//             console.log("No such document!");
//             return null;
//         }
//     } catch (e) {
//         console.error('Error fetching single document: ', e);
//         throw new Error(`Failed to fetch item by ID: ${e instanceof Error ? e.message : String(e)}`);
//     }
// };
