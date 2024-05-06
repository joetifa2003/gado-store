import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  //@ts-ignore
  getReactNativePersistence,
  Auth,
  browserLocalPersistence,
} from "firebase/auth";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBctvsYSGFc26h_rTvHLyeO3GebKZpRI5A",
  authDomain: "gado-stores.firebaseapp.com",
  projectId: "gado-stores",
  storageBucket: "gado-stores.appspot.com",
  messagingSenderId: "893346293358",
  appId: "1:893346293358:web:6ae4f479f587e9a820a87f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth: Auth;
if (Platform.OS != "web") {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
  });
}
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
