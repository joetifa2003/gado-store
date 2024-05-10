import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { productDao } from "./products";
import uuid from "react-native-uuid";
import { UserData, userDao } from "./user";

export type productInfo = {
  productID: string;
  price: number;
};

export enum OrderStatus {
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  PENDING = "PENDING",
}

export type OrderData = {
  id: string;
  totalPrice: number;
  status: OrderStatus;
  products: productInfo[];
  providerID: string;
  customerID: string;
  provider: UserData;
  customer: UserData;
};

class OrdersDao {
  async getOrderByID(id: string) {
    const ref = doc(db, "orders", id);
    const orderSnap = await getDoc(ref);
    const order = orderSnap.data() as OrderData;
    order.provider = await userDao.get(order.providerID);
    order.customer = await userDao.get(order.customerID);
    order.id = orderSnap.id;

    return order;
  }

  async changeStatus(orderID: string, status: OrderStatus) {
    const ref = doc(db, "orders", orderID);
    await updateDoc(ref, { status });
  }

  async getAll(userID: string, myOders: boolean) {
    const q = query(
      collection(db, "orders"),
      where(myOders ? "customerID" : "providerID", "==", userID),
      orderBy("timestamp", "desc"),
    );
    const querySnapshot = await getDocs(q);

    const res: OrderData[] = [];
    for (const doc of querySnapshot.docs) {
      const [provider, customer] = await Promise.all([
        userDao.get(doc.data().providerID),
        userDao.get(doc.data().customerID),
      ]);
      res.push({ ...doc.data(), provider, customer, id: doc.id } as OrderData);
    }

    return res;
  }

  async checkout(userID: string) {
    await runTransaction(db, async (tx) => {
      const cartItems = await productDao.getAllCartProducts(userID);
      const sellerProducts = new Map<
        string,
        { productID: string; price: number }[]
      >();

      for (const item of cartItems) {
        if (!sellerProducts.has(item.ownerId)) {
          sellerProducts.set(item.ownerId, []);
        }

        sellerProducts
          .get(item.ownerId)
          ?.push({ productID: item.productID, price: item.price });
        tx.delete(doc(db, "users", userID, "cart", item.cartItemID));
      }

      for (const [sellerID, products] of sellerProducts) {
        tx.set(doc(db, "orders", uuid.v4().toString()), {
          products,
          customerID: userID,
          providerID: sellerID,
          totalPrice: products
            .map((v) => v.price)
            .reduce((acc, cur) => acc + cur, 0),
          status: OrderStatus.PENDING,
          timestamp: Timestamp.now(),
        });
      }
    });
  }
}

export const orderDao = new OrdersDao();
