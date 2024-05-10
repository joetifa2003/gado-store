import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  orderBy,
  OrderByDirection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export type ProductsData = {
  id: string;
  ownerId: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type CartItem = ProductsData & {
  cartItemID: string;
  productID: string;
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
    const userRef = doc(db, "users", userId);
    const cartRef = collection(userRef, "cart");
    await addDoc(cartRef, { productID: productId });
  }

  async getAllCartProducts(userId: string) {
    const userRef = doc(db, "users", userId);
    const cartCollection = collection(userRef, "cart");
    const snapshot = await getDocs(cartCollection);

    const products: CartItem[] = [];
    for (const doc of snapshot.docs) {
      const cartItem = doc.data() as CartItem;

      let productData;
      try {
        productData = await this.getById(cartItem.productID);
      } catch {
        continue;
      }
      products.push({
        ...productData!,
        cartItemID: doc.id,
        productID: productData?.id!,
      });
    }

    return products;
  }

  async getProductSpecificProviderId(userId: string , order?: string, direction?: string) {
    //const userRef = doc(db, "users", userId);
    // const cartCollection = collection(userRef, "cart");

    const q = query(collection(db, "products"), where("ownerId", "==", userId) , orderBy(order ? order : "name" , direction ? (direction as OrderByDirection) : "asc"));
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

  async deleteFromCart(cartItemID: string, userId: string) {
    try {
      const userRef = doc(db, "users", userId);
      const cartCollection = doc(userRef, "cart", cartItemID);
      await deleteDoc(cartCollection);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteFromProducts(productId: string , userId: string) {
    await this.deleteFromCart(productId, userId);
    try{
      const cartDocRef = doc(db, "products", productId);
      await deleteDoc(cartDocRef);
      console.log(productId);
    } catch (err) {

      console.log(err);
    }
  }
}

export const productDao = new ProductsDao();
