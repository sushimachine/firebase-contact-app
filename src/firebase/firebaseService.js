import { db } from "./firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export class FirebaseService {
  constructor() {
    this.collectionRef = collection(db, "contacts"); // 👈 change collection name as needed
  }

    async createContact({ name, email }) {
    try {
      const docRef = await addDoc(this.collectionRef, {
        name,
        email,
        createdAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("FirebaseService :: createContact :: error", error);
      throw error;
    }
  }

    async updateContact(id, { name, email }) {
    try {
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, { name, email });
      return true;
    } catch (error) {
      console.error("FirebaseService :: updateContact :: error", error);
      throw error;
    }
  }

    async deleteContact(id) {
    try {
      const docRef = doc(db, "contacts", id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("FirebaseService :: deleteContact :: error", error);
      return false;
    }
  }

    async getContact(id) {
    try {
      const docRef = doc(db, "contacts", id);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    } catch (error) {
      console.error("FirebaseService :: getContact :: error", error);
      return null;
    }
  }

     async getContacts() {
    try {
      const q = query(this.collectionRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("FirebaseService :: getContacts :: error", error);
      return [];
    }
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;
