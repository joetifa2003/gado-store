import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ProductCard from "./productCard";
import { ProductsData } from "@/lib/dao/products";
const ProductsList = ({ products }: { products: ProductsData[] }) => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={products}
        renderItem={({ item }) => {
          return <ProductCard productData={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 40,
  },
});

export default ProductsList;
