import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCR2T5ndU-X-3xccvvB900BpUiL8zKjSNE",
  authDomain: "dirt-road-directory.firebaseapp.com",
  projectId: "dirt-road-directory",
  storageBucket: "dirt-road-directory.firebasestorage.app",
  messagingSenderId: "462164921196",
  appId: "1:462164921196:web:534e930a4d782eafa70149"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
