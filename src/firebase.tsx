import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export default db;
export { app, storage };
