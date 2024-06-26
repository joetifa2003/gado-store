import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { ProductsData, productDao } from "@/lib/dao/products";
import colors from "@/lib/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { userDao } from "@/lib/dao/user";
import { userContext } from "@/lib/userContext";

const ProductCard = ({
  productData,
  deleteProduct,
}: {
  productData: ProductsData;
  deleteProduct?: (item: any) => void;
}) => {
  const user = useContext(userContext);
  const [storeName, setStoreName] = useState<string | undefined>("");
  const [products, setProducts] = useState<ProductsData[] | undefined>([]);

  userDao.get(productData.ownerId).then((user) => {
    try {
      setStoreName(user.storeName);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    userDao.get(productData.ownerId).then((user) => {
      try {
        setStoreName(user.storeName);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        router.navigate({
          pathname: `/product/${productData.id as string}`,
          params: { storeName },
        });
      }}
    >
      <Image source={{ uri: productData.image }} style={styles.image} />
      <View style={styles.productInfo}>
        <View style={styles.spacingElements}>
          <Text style={styles.productName}>{productData.name}</Text>
          <Text style={styles.productPrice}>{productData.price} L.E</Text>
        </View>
        <View style={styles.spacingElements}>
          <Pressable
            onPress={() => {
              router.navigate(`profile/${productData.ownerId}`);
            }}
          >
            <Text>{storeName}</Text>
          </Pressable>
          {deleteProduct && (
            <Pressable
              onPress={() => {
                deleteProduct(productData);
              }}
            >
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
