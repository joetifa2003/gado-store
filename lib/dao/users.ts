import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export type User = {
  uid: string;
  name: string;
};

export class Users {
  async get(uid: string) {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.data() as User;
  }
}
