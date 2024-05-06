import ProductsList from "@/components/productsList";
import { productDao } from "@/lib/dao/products";
import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

const Cart = () => {
  const products = productDao.getAll();

  const deleteProducts = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24 }}>My Cart</Text>
        <Pressable>
          <Text style={{ color: "red", fontSize: 16 }}>Clear All</Text>
        </Pressable>
      </View>
      <ProductsList products={products} deleteProduct={deleteProducts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});

export default Cart;
