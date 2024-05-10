import Button from "@/components/button";
import LoadingScreen from "@/components/loadingScreen";
import ProductsList from "@/components/productsList";
import { orderDao } from "@/lib/dao/orders";
import { CartItem, productDao } from "@/lib/dao/products";
import { userContext } from "@/lib/userContext";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

const Cart = () => {
  const currentUser = useContext(userContext);
  const [cartItem, setProducts] = useState<CartItem[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchAllCartProduct = async () => {
        const allProducts = await productDao.getAllCartProducts(
          currentUser.UID!,
        );
        setProducts(allProducts);
        setLoading(false);
      };
      fetchAllCartProduct();
    }, []),
  );

  const deleteProducts = async (item: CartItem) => {
    setProducts(cartItem.filter((p) => p.cartItemID !== item.cartItemID));
    await productDao.deleteFromCart(item.cartItemID, currentUser.UID!);
  };

  const checkout = async () => {
    setCheckoutLoading(true);
    try {
      await orderDao.checkout(currentUser.UID!);
      if (cartItem.length > 0) {
        Toast.show({
          type: "success",
          text1: "Checkout Successful",
        });
      }
      setProducts([]);
    } catch {
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ProductsList products={cartItem} deleteProduct={deleteProducts} />
      <View
        style={{
          width: "100%",
          padding: 8,
          zIndex: 99,
        }}
      >
        <Button title="Checkout" onPress={checkout} loading={checkoutLoading} />
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
