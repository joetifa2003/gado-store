import { Tabs } from "expo-router";
import React, { useCallback } from "react";
import colors from "@/lib/colors";
import Button from "@/components/button";
import { auth } from "@/lib/firebase";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

const logoutBtn = () => {
  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  return (
    <View style={{ marginRight: 20 }}>
      <Button title="logout" onPress={logout} />
    </View>
  );
};

const Layout = () => {
  return (
    <Tabs screenOptions={{ headerStyle: { backgroundColor: colors.accent } }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Products",
          tabBarLabel: "Home",
          headerTitleAlign: "center",
          headerRight: () => logoutBtn(),
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerTitle: "Cart",
          headerTitleAlign: "center",
          tabBarIcon: () => (
            <FontAwesome name="shopping-cart" size={24} color="black" />
          ),
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarLabel: "Profile",
          headerTitleAlign: "center",
          tabBarIcon:()=><Entypo name="user" size={24} color="black" />,
          headerRight: () => logoutBtn(),
        }}
      />
    </Tabs>
  );
};

export default Layout;
