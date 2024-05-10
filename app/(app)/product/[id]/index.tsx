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
import Toast from "react-native-toast-message";

const SingleProductPage = () => {
  const { id, storeName }: { id: string; storeName: string } =
    useLocalSearchParams();
  const [product, setProduct] = useState<ProductsData>();
  const [loading, setLoading] = useState(true);
  const user = useContext(userContext);

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
          {user.UID !== product.ownerId && (
            <Pressable
              onPress={() => {
                if (currentUser.UID) {
                  productDao.addToCart(product.id, currentUser.UID);
                  Toast.show({
                    type: "success",
                    text1: "Added to Cart",
                  });
                }
              }}
            >
              <Fontisto name="shopping-basket-add" size={24} color="black" />
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text>{product.description}</Text>
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
