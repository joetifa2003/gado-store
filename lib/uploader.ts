import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import uuid from "react-native-uuid";

export function urlToBlob(url: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.open("GET", url);
    xhr.responseType = "blob"; // convert type
    xhr.send();
  });
}

export async function uploadFile(uri: string) {
  const file = await urlToBlob(uri);
  const id = uuid.v4().toString();
  const r = ref(storage, id);
  const res = await uploadBytes(r, file);
  return await getDownloadURL(res.ref);
}
