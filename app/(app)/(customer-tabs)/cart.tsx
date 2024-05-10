import Button from "@/components/button";
import ProductsList from "@/components/productsList";
import { orderDao } from "@/lib/dao/orders";
import { CartItem, productDao } from "@/lib/dao/products";
import { userContext } from "@/lib/userContext";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

const Cart = () => {
  const currentUser = useContext(userContext);
  const [cartItem, setProducts] = useState<CartItem[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchAllCartProduct = async () => {
        const allProducts = await productDao.getAllCartProducts(
          currentUser.UID!,
        );
        setProducts(allProducts);
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
      setProducts([]);
    } catch {
    } finally {
      setCheckoutLoading(false);
    }
  };

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
        <Button
          title="Checkout"
          onPress={checkout}
          disabled={checkoutLoading}
        />
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
