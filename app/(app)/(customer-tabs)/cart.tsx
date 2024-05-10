import ProductsList from "@/components/productsList";
import { ProductsData, productDao } from "@/lib/dao/products";
import { userContext } from "@/lib/userContext";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

const Cart = () => {
  const currentUser = useContext(userContext);
  const [products, setProducts] = useState<ProductsData[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchAllCartProduct = async () => {
        if (currentUser.UID) {
          const allProducts = await productDao.getAllCartProducts(
            currentUser.UID,
          );
          setProducts(allProducts);
        }
      };
      fetchAllCartProduct();
    }, []),
  );

  const deleteProducts = async (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    await productDao.deleteFromCart(id, currentUser.UID!);
  };

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
