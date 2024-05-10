
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc ,  orderBy, OrderByDirection, query, where } from "firebase/firestore";
import { db } from "../firebase";

export type ProductsData = {
  id: string;
  ownerId: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

class ProductsDao {
  async create(product: Omit<ProductsData, "id">) {
    await addDoc(collection(db, "products"), product);
  }

  async getAll(order?: string, direction?: string) {
    const products: ProductsData[] = [];
    const collectionRef = collection(db, "products");
    const q = query(
      collectionRef,
      orderBy(
        order ? order : "name",
        direction ? (direction as OrderByDirection) : "asc",
      ),
    );
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      const productData = doc.data() as ProductsData;
      products.push({
        ...productData,
        id: doc.id,
      });
    });
    return products;
  }

  async getById(productId: string) {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return undefined;
    }
    const productData = docSnap.data() as ProductsData;
    return {
      ...productData,
      id: docSnap.id,
    };
  }

  async addToCart(productId: string, userId: string) {
    const productRef = doc(db, "products", productId);
    const productDoc = await getDoc(productRef);
    const userRef = doc(db, "users", userId);
    const cartRef = collection(userRef, "cart");
    const productData = productDoc.data() as ProductsData;
    await addDoc(cartRef, { ...productData, id: productId });
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
  async getProductSpecificProviderId(userId: string) {
    //const userRef = doc(db, "users", userId); 
   // const cartCollection = collection(userRef, "cart");
  
    const q = query(collection(db, "products"), where("ownerId", "==", userId));
    const snapshot = await getDocs(q);
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
  async deleteCartProducts(userId: string) {
    const userRef = doc(db, "users", userId);
    console.log("id is: +" + userId);
    
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

  async deleteFromCart(productId: string, userId: string) {
    try {
      const userRef = doc(db, "users", userId);
      const cartDocRef = doc(userRef, "cart", productId);
      await deleteDoc(cartDocRef);
    } catch (err) {
      console.log(err);
    }
  }
}

export const productDao = new ProductsDao();
