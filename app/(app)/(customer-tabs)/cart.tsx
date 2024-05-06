import ProductsList from "@/components/productsList";
import { productDao } from "@/lib/dao/products";
import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

const Cart = () => {
  const products = productDao.getAll();

  const deleteProducts = () => {};

  return (
    <View style={styles.container}>
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
});

export default Cart;
