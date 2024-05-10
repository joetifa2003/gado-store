import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ProductCard from "./productCard";
import { ProductsData } from "@/lib/dao/products";

const ProductsList = ({
  products,
  deleteProduct,
}: {
  products: ProductsData[];
  deleteProduct?: () => void;
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <ProductCard productData={item} deleteProduct={deleteProduct} />
          );
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
    justifyContent: "flex-start",
    gap: 32,
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export default ProductsList;
