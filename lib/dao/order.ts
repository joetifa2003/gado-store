import { runTransaction } from "firebase/firestore";
import { db } from "../firebase";
import { productDao } from "./products";

export class Orders {
  async checkout(userID: string) {
    await runTransaction(db, async (tx) => {
      const products = await productDao.getAllCartProducts(userID);

      // for (const p of products) {
      //   tx.delete(doc)
      // }
    });
  }
}
