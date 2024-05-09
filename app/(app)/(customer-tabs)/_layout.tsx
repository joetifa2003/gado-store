import { Tabs } from "expo-router";
import React, { useCallback } from "react";
import colors from "@/lib/colors";
import { FontAwesome } from "@expo/vector-icons";
import Header from "@/components/header";

const Layout = () => {
  return (
    <Tabs screenOptions={{ headerStyle: { backgroundColor: colors.accent } }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Products",
          tabBarLabel: "Home",
          headerTitleAlign: "center",
          headerRight: () => <Header />,
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerTitle: "Cart",
          headerTitleAlign: "center",
          headerRight: () => <Header />,
          tabBarIcon: () => (
            <FontAwesome name="shopping-cart" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
