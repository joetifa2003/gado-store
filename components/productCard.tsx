import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { ProductsData } from "@/lib/dao/products";
import colors from "@/lib/colors";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProductCard = ({
  productData,
  deleteProduct,
}: {
  productData: ProductsData;
  deleteProduct?: () => void;
}) => {
  return (
    <Pressable style={styles.container}>
      <Image source={{ uri: productData.productImage }} style={styles.image} />
      <View style={styles.productInfo}>
        <View style={styles.spacingElements}>
          <Text style={styles.productName}>{productData.name}</Text>
          <Text style={styles.productPrice}>{productData.price} L.E</Text>
        </View>
        <View style={styles.spacingElements}>
          <Text>Gado Stores</Text>
          {deleteProduct && (
            <Pressable>
              <AntDesign name="delete" size={24} color="black" />
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.dark,
    display: "flex",
    flexDirection: "column",
    borderRadius: 8,
    shadowColor: colors.dark,
    shadowRadius: 16,
  },
  image: {
    width: "100%",
    height: 200,
  },
  productInfo: {
    flex: 1,
    padding: 10,
  },
  spacingElements: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProductCard;
