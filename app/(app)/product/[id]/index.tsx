import { ProductsData, productDao } from "@/lib/dao/products";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import colors from "@/lib/colors";
import LoadingScreen from "@/components/loadingScreen";
import { userContext } from "@/lib/userContext";

const SingleProductPage = () => {
  const { id, storeName }: { id: string; storeName: string } =
    useLocalSearchParams();
  const [product, setProduct] = useState<ProductsData>();
  const [loading, setLoading] = useState(true);

  const currentUser = useContext(userContext);
  useEffect(() => {
    const fetchProductData = async () => {
      const data = await productDao.getById(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProductData();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!product) {
    return (
      <Text style={{ textAlign: "center" }}>
        This product is not available now
      </Text>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ backgroundColor: colors.dark }}>
        <Image style={styles.productImg} source={{ uri: product.image }} />
        <View style={styles.spacingElements}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}L.E</Text>
        </View>
        <View style={styles.spacingElements}>
          <Text>{storeName}</Text>
          <Pressable
            onPress={() => {
              if (currentUser.UID) {
                productDao.addToCart(product.id, currentUser.UID);
              }
            }}
          >
            <Fontisto name="shopping-basket-add" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Description : </Text>
        <Text>This product is blah blah blaaaaaaaaaaahhhhhhhhhhhhhh blah</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.base,
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
  descriptionContainer: {
    padding: 8,
  },
});

export default SingleProductPage;
