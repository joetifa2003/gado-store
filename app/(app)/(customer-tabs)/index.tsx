import React from "react";
import { StyleSheet, View } from "react-native";
import { productDao } from "@/lib/dao/products";
import ProductsList from "@/components/productsList";
const Home = () => {
  const products = productDao.getAll();
  return (
    <View style={styles.container}>
      <ProductsList products={products} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default Home;
