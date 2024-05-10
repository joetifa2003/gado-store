import Button from "@/components/button";
import ProductsList from "@/components/productsList";
import { CartItem, productDao } from "@/lib/dao/products";
import { userContext } from "@/lib/userContext";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

const Cart = () => {
  const currentUser = useContext(userContext);
  const [cartItem, setProducts] = useState<CartItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchAllCartProduct = async () => {
        const allProducts = await productDao.getAllCartProducts(
          currentUser.UID!,
        );
        setProducts(allProducts);
        console.log(allProducts);
      };
      fetchAllCartProduct();
    }, []),
  );

  const deleteProducts = async (id: string) => {
    setProducts(cartItem.filter((p) => p.id !== id));
    await productDao.deleteFromCart(id, currentUser.UID!);
  };

  const checkout = async () => {};

  return (
    <View style={styles.container}>
      <ProductsList products={cartItem} deleteProduct={deleteProducts} />
      <View
        style={{
          width: "100%",
          padding: 8,
        }}
      >
        <Button title="Checkout" onPress={() => ""} />
      </View>
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
