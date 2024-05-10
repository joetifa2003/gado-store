import colors from "@/lib/colors";
import { orderDao } from "@/lib/dao/orders";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";

const Orders = () => {
  const orders = orderDao.getAll();
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
            <Text style={styles.orderId}>Order id : {item.id}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>status : {item.status}</Text>
              <Text style={styles.priceText}>
                total Price : {item.totalPrice}
              </Text>
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
    backgroundColor: colors.base,
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
    shadowColor: colors.dark,
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
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
