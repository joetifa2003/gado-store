import { productDao } from "@/lib/dao/products";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import colors from "@/lib/colors";
import LoadingScreen from "@/components/loadingScreen";

const SingleProductPage = () => {
  // Todo: getById() in productDao
  const products = productDao.getAll();

  const { id }: { id: string } = useLocalSearchParams();

  const getById = (id: string) => {
    return products.find((product) => product.id === id);
  };
  const product = getById(id);

  if (!product) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.productImg} source={{ uri: product.productImage }} />
      <View style={styles.spacingElements}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}L.E</Text>
      </View>
      <View style={styles.spacingElements}>
        <Text>store name (id for now) {product.ownerId}</Text>
        <Pressable>
          <Fontisto name="shopping-basket-add" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
  },
  productImg: {
    width: "100%",
    height: 300,
  },
  spacingElements: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 32,
  },
  productName: {
    maxWidth: 350,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "600",
  },
});

export default SingleProductPage;