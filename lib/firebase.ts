import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
  apiKey: "AIzaSyClMpsYvPfJBSnMo4R4D2b9DfW8u5paDNI",
  authDomain: "chat-app-b219f.firebaseapp.com",
  projectId: "chat-app-b219f",
  storageBucket: "chat-app-b219f.appspot.com",
  messagingSenderId: "652215155211",
  appId: "1:652215155211:web:fc3962cee16a6385a0650e",
  measurementId: "G-RK7G47NCTJ",
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

export { auth, db };
