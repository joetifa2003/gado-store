import { doc, runTransaction } from "firebase/firestore";
import { db } from "../firebase";
import { productDao } from "./products";
import uuid from "react-native-uuid";

export type productInfo = {
  id: string;
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
  productList: productInfo[];
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

  async checkout(userID: string) {
    await runTransaction(db, async (tx) => {
      const cartItems = await productDao.getAllCartProducts(userID);
      const sellerProducts = new Map<string, string[]>();

      for (const item of cartItems) {
        if (!sellerProducts.has(item.ownerId)) {
          sellerProducts.set(item.ownerId, []);
        }

        sellerProducts.get(item.ownerId)?.push(item.productID);
        tx.delete(doc(db, "users", userID, "cart", item.cartItemID));
      }

      for (const [sellerID, productIDs] of sellerProducts) {
        tx.set(doc(db, "users", sellerID, "orders", uuid.v4().toString()), {
          productIDs,
          userID,
          status: OrderStatus.PENDING,
        });
      }
    });
  }
}

export const orderDao = new OrdersDao();
