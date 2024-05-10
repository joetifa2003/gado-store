import LoadingScreen from "@/components/loadingScreen";
import { ProfileName } from "@/components/profileName";
import colors from "@/lib/colors";
import { OrderData, orderDao } from "@/lib/dao/orders";
import { userContext } from "@/lib/userContext";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";

const Orders = () => {
  const user = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderData[]>([]);

  useFocusEffect(
    useCallback(() => {
      orderDao.myOrders(user.UID!).then((res) => {
        setOrders(res);
        setLoading(false);
      });
    }, []),
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.container}
        data={orders}
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
            <ProfileName user={item.provider} />
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>status : {item.status}</Text>
              <Text style={styles.priceText}>Total: {item.totalPrice}</Text>
            </View>
          </Pressable>
        )}
      />
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
