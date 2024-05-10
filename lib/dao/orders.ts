import {
  collection,
  doc,
  getDoc,
  getDocs,
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
  getAll() {
    return [
      {
        id: "xamc-1kao-liqu",
        totalPrice: 90,
        status: "completed",
        productList: [
          {
            id: "UWFqLTViZM7aJEyZ1ETF",
            price: 40,
          },
          {
            id: "BQEbVrvBGX75cTRctuqM",
            price: 20,
          },
          {
            id: "zpwflkNvLQYVhJcHUAZs",
            price: 30,
          },
        ],
      },
      {
        id: "yund-oqiw-1kao",
        totalPrice: 150,
        status: "completed",
        productList: [
          {
            id: "UWFqLTViZM7aJEyZ1ETF",
            price: 40,
          },
          {
            id: "BQEbVrvBGX75cTRctuqM",
            price: 20,
          },
          {
            id: "zpwflkNvLQYVhJcHUAZs",
            price: 30,
          },
        ],
      },
    ];
  }

  getById(id: string) {
    return this.getAll().find((order) => order.id === id);
  }

  async getOrderByID(id: string) {
    const ref = doc(db, "orders", id);
    const orderSnap = await getDoc(ref);
    const order = orderSnap.data() as OrderData;
    order.provider = await userDao.get(order.providerID);
    order.customer = await userDao.get(order.customerID);
    order.id = orderSnap.id;

    return order;
  }

  async cancelOrder(orderID: string) {
    const ref = doc(db, "orders", orderID);
    await updateDoc(ref, { status: OrderStatus.CANCELLED });
  }

  async myOrders(userID: string) {
    const q = query(
      collection(db, "orders"),
      where("customerID", "==", userID),
    );
    const querySnapshot = await getDocs(q);

    const res: OrderData[] = [];
    for (const doc of querySnapshot.docs) {
      const provider = await userDao.get(doc.data().providerID);
      const customer = await userDao.get(doc.data().providerID);
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
        });
      }
    });
  }
}

export const orderDao = new OrdersDao();
