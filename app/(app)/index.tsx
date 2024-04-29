import Button from "@/components/button";
import colors from "@/lib/colors";
import { conversationsDao } from "@/lib/dao";
import { Conversation } from "@/lib/dao/conversations";
import { User } from "@/lib/dao/users";
import { auth, db } from "@/lib/firebase";
import { userContext } from "@/lib/userContext";
import { Stack, useRouter } from "expo-router";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";

export default function Page() {
  const currentUser = useContext(userContext);

  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <Stack.Screen options={{ title: `Home: ${currentUser.name}` }} />
      <Button title="Logout" onPress={logout} />
      <Compose />
      <ConversationList />
    </View>
  );
}

function ConversationList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const router = useRouter();

  useEffect(() => {
    return conversationsDao.getAll(auth.currentUser?.uid!, (conversations) => {
      setConversations(conversations);
    });
  }, []);

  return (
    <FlatList
      data={conversations}
      renderItem={({ item }) => (
        <Pressable
          key={item.id}
          style={{
            backgroundColor: colors.dark,
            margin: 8,
            padding: 8,
            borderRadius: 8,
          }}
          onPress={() => router.navigate(`/conversation/${item.id}`)}
        >
          <Text>{item.users.map((u) => u.name).join(", ")}</Text>
        </Pressable>
      )}
    />
  );
}

function Compose() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button title="Compose" onPress={() => setIsOpen((prev) => !prev)} />
      {isOpen && (
        <View
          style={{
            backgroundColor: colors.white,
            height: "80%",
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 32,
            padding: 16,
            zIndex: 1,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 16,
            }}
          >
            Select User
          </Text>

          <UserList close={() => setIsOpen(false)} />
        </View>
      )}
    </>
  );
}

function UserList({ close }: { close: () => void }) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User[]>([]);

  const compose = useCallback(async () => {
    await addDoc(collection(db, "conversations"), {
      users: [auth.currentUser?.uid, ...selected.map((i) => i.uid)],
      lastMessageTime: Timestamp.now(),
    });
    close();
  }, [selected]);

  useEffect(() => {
    getDocs(
      query(collection(db, "users"), where("uid", "!=", auth.currentUser?.uid)),
    ).then((snap) => {
      setUsers(snap.docs.map((d) => d.data() as User));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Pressable
            key={item.uid}
            style={{
              backgroundColor: selected.some((i) => i.uid === item.uid)
                ? colors.dark
                : colors.primary,
              borderRadius: 8,
              margin: 8,
              padding: 8,
            }}
            onPress={() => {
              if (selected.some((i) => i.uid === item.uid)) {
                setSelected((prev) => prev.filter((i) => i.uid !== item.uid));
                return;
              }

              setSelected((prev) => [...prev, item]);
            }}
          >
            <Text>{item.name}</Text>
          </Pressable>
        )}
      />
      <Button title="Compose" onPress={compose} />
    </>
  );
}
