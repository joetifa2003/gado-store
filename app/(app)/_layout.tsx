import colors from "@/lib/colors";
import { auth } from "@/lib/firebase";
import { Redirect, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { usersDao } from "@/lib/dao";
import { User } from "@/lib/dao/users";
import { userContext } from "@/lib/userContext";

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        usersDao.get(user.uid).then((user) => {
          setUser(user);
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <userContext.Provider value={user}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          contentStyle: {
            backgroundColor: colors.base,
          },
        }}
      ></Stack>
    </userContext.Provider>
  );
}