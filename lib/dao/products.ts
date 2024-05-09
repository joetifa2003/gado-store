import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export type ProductsData = {
  id: string;
  ownerId: string;
  name: string;
  price: number;
  image: string;
};

class ProductsDao {
  async create(product: Omit<ProductsData, "id">) {
    await addDoc(collection(db, "products"), product);
  }

  async getAll(){
    const products: ProductsData[] = [];
    const snapshot = await getDocs(collection(db, "products"));

    snapshot.forEach((doc) => {
      const productData = doc.data() as ProductsData;
      products.push({
        ...productData,
        id: doc.id,
      });
    });
    return products;
  }

  async getById(productId: string){
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return undefined;
    }
    const productData = docSnap.data() as ProductsData;
      return {
        ...productData,
        id: docSnap.id,
      }
  }

  async addToCart(productId: string, userId: string) {
    const productRef = doc(db, "products", productId);
    const productDoc = await getDoc(productRef);
    const userRef = doc(db, "users", userId);
    const cartRef = collection(userRef, "cart");
    const productData = productDoc.data() as ProductsData;
    await addDoc(cartRef, {...productData , id: productId});
  }

  async getAllCartProducts(userId: string) {
    const userRef = doc(db, "users", userId);
    const cartCollection = collection(userRef, "cart");
    const snapshot = await getDocs(cartCollection);
    const products: ProductsData[] = [];
    snapshot.forEach((doc) => {
      const productData = doc.data() as ProductsData;
      products.push({
        ...productData,
        id: doc.id,
      });
    });
    return products;
  }

}

export const productDao = new ProductsDao();
