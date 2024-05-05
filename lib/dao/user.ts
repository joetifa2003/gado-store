import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export enum UserType {
  PROVIDER = "PROVIDER",
  CUSTOMER = "CUSTOMER",
}

export type UserData = {
  UID?: string;
  type: UserType;
  email: string;
  address: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  storeName?: string;
};

class UserDao {
  async create(userData: UserData, password: string) {
    const {
      user: { uid },
    } = await createUserWithEmailAndPassword(auth, userData.email, password);
    userData.UID = uid;
    const ref = doc(db, "users", uid);
    await setDoc(ref, userData);
  }

  async get(uid: string) {
    const ref = doc(db, "users", uid);
    const userSnap = await getDoc(ref);
    return userSnap.data() as UserData;
  }
}

export const userDao = new UserDao();
