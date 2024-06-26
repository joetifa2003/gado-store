import colors from "@/lib/colors";
import { auth } from "@/lib/firebase";
import { Redirect, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { userContext } from "@/lib/userContext";
import { UserData, userDao } from "@/lib/dao/user";
import LoadingScreen from "@/components/loadingScreen";

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        userDao.get(authUser.uid).then((user) => {
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
    return <LoadingScreen />;
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
      >
        <Stack.Screen name="(customer-tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="product/[id]/index"
          options={{
            headerTitle: "Product",
            headerStyle: { backgroundColor: colors.accent },
          }}
        />
        <Stack.Screen
          name="product/create"
          options={{
            headerTitle: "Create Product",
            headerStyle: { backgroundColor: colors.accent },
          }}
        />
        <Stack.Screen
          name="profile/[id]/index"
          options={{
            headerTitle: "Profile",
            headerStyle: { backgroundColor: colors.accent },
          }}
        />
      </Stack>
    </userContext.Provider>
  );
}
