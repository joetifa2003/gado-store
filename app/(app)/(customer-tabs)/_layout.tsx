import { Tabs } from "expo-router";
import React, { useCallback } from "react";
import colors from "@/lib/colors";
import Button from "@/components/button";
import { auth } from "@/lib/firebase";
import { View } from "react-native";

const Layout = () => {
  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  const logoutBtn = () => {
    return (
      <View style={{ marginRight: 20 }}>
        <Button title="logout" onPress={logout} />
      </View>
    );
  };

  return (
    <Tabs screenOptions={{ headerStyle: { backgroundColor: colors.accent } }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Products",
          tabBarLabel: "Home",
          headerTitleAlign: "center",
          headerRight: () => logoutBtn(),
        }}
      />
    </Tabs>
  );
};

export default Layout;