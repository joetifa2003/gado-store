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
  apiKey: "AIzaSyD2FVuWh0BwcXCYb0AUzj1OaiQrll8eHfE",
  authDomain: "gado-stores-2.firebaseapp.com",
  projectId: "gado-stores-2",
  storageBucket: "gado-stores-2.appspot.com",
  messagingSenderId: "440512696987",
  appId: "1:440512696987:web:f4b2833fab2ff100012c3e",
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
