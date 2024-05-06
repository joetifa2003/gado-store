import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { ProductsData } from "@/lib/dao/products";
import colors from "@/lib/colors";

const ProductCard = ({ productData }: { productData: ProductsData }) => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: productData.productImage }}
          style={styles.image}
        />
      </View>
      <View style={styles.productInfo}>
        <Text>{productData.name}</Text>
        <Text>{productData.price}$</Text>
        <Text>store name (id for now) : {productData.ownerId}</Text>
        <Text>Release date</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.dark,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderRadius: 8,
  },
  imageContainer: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    padding: 10,
  },
  productName: {
    fontSize: 16,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
  },
});

export default ProductCard;
