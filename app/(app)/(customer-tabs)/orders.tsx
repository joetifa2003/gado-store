import Button from "@/components/button";
import LoadingScreen from "@/components/loadingScreen";
import { ProfileName } from "@/components/profileName";
import colors from "@/lib/colors";
import { OrderData, orderDao } from "@/lib/dao/orders";
import { UserType } from "@/lib/dao/user";
import { userContext } from "@/lib/userContext";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";

const Orders = () => {
  const user = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const [myOrders, setMyOrders] = useState<OrderData[]>([]);
  const [manageOrders, setManageOrders] = useState<OrderData[]>([]);
  const [isMyOrders, setIsMyOrders] = useState(true);

  const fetchOrders = useCallback(() => {
    setLoading(true);
    orderDao.getAll(user.UID!, isMyOrders).then((res) => {
      if (isMyOrders) {
        setMyOrders(res);
      } else {
        setManageOrders(res);
      }
      setLoading(false);
    });
  }, [isMyOrders]);

  useFocusEffect(fetchOrders);

  return (
    <View style={{ flex: 1 }}>
      {user.type === UserType.PROVIDER && (
        <View
          style={{ display: "flex", flexDirection: "row", gap: 8, padding: 8 }}
        >
          <Button
            style={{
              flex: 1,
              backgroundColor: isMyOrders ? colors.primary : colors.dark,
            }}
            title="Manage orders"
            onPress={() => {
              setIsMyOrders(false);
            }}
          />
          <Button
            style={{
              flex: 1,
              backgroundColor: isMyOrders ? colors.dark : colors.primary,
            }}
            title="My orders"
            onPress={() => {
              setIsMyOrders(true);
            }}
          />
        </View>
      )}

      {loading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          contentContainerStyle={styles.container}
          data={isMyOrders ? myOrders : manageOrders}
          renderItem={({ item }) => (
            <Pressable
              style={styles.itemContainer}
              onPress={() => {
                router.navigate(`/order/${item.id}`);
              }}
            >
              <Text style={styles.orderId}>
                Order id : {item.id.split("-")[0]}
              </Text>
              <ProfileName user={isMyOrders ? item.provider : item.customer} />
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Status: {item.status}</Text>
                <Text style={styles.priceText}>Total: {item.totalPrice}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: colors.dark,
    borderRadius: 8,
    shadowColor: colors.dark,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    gap: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 16,
  },
});

export default Orders;
