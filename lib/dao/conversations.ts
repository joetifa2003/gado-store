import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import { User, Users } from "./users";
import { db } from "../firebase";

export type Conversation = {
  id: string;
  users: User[];
  lastMessageTime?: Timestamp;
};

export type Message = {
  id: string;
  senderUID: string;
  content: string;
  timestamp: Timestamp;
};

export class Conversations {
  constructor(private users: Users) {}

  getAll(uid: string, f: (c: Conversation[]) => void | Promise<void>) {
    const conversationsSnap = query(
      collection(db, "conversations"),
      where("users", "array-contains", uid),
      orderBy("lastMessageTime", "desc"),
    );

    const unsub = onSnapshot(conversationsSnap, async (snap) => {
      const res = [];

      for (const conversationSnap of snap.docs) {
        const conversation = conversationSnap.data();
        const userIds = conversation.users as string[];
        const users = await Promise.all(
          userIds.map(async (id) => {
            const u = await this.users.get(id);
            return u;
          }),
        );

        res.push({ users, id: conversationSnap.id });
      }

      await f(res);
    });

    return unsub;
  }

  async getOne(id: string) {
    const snap = await getDoc(doc(db, "conversations", id));
    const userIds = snap.data()!.users as string[];
    const users = await Promise.all(
      userIds.map(async (id) => {
        const u = await this.users.get(id);
        return u;
      }),
    );
    return { users, id } as Conversation;
  }

  messages(id: string, f: (msgs: Message[]) => void | Promise<void>) {
    const q = query(
      collection(db, "conversations", id, "messages"),
      orderBy("timestamp", "desc"),
    );

    const unsub = onSnapshot(q, async (snap) => {
      const res = [];

      for (const messageSnap of snap.docs) {
        const message = messageSnap.data() as Message;
        message.id = messageSnap.id;

        res.push(message);
      }

      await f(res);
    });

    return unsub;
  }

  async sendMessage(id: string, sender: string, content: string) {
    await runTransaction(db, async (tx) => {
      const msgDoc = doc(collection(db, "conversations", id, "messages"));
      tx.set(msgDoc, {
        senderUID: sender,
        content,
        timestamp: Timestamp.now(),
      });

      const convDoc = doc(db, "conversations", id);
      tx.update(convDoc, {
        lastMessageTime: Timestamp.now(),
      });
    });
  }

  async deleteMessage(id: string, messageId: string) {
    await deleteDoc(doc(db, "conversations", id, "messages", messageId));
  }
}
