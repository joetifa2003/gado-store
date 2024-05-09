import ProductsList from "@/components/productsList";
import { ProductsData, productDao } from "@/lib/dao/products";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

const Cart = () => {
  // for now fetch all products
  const [products, setProducts] = useState<ProductsData[]>([]);

  useEffect(() => {
    const fetchAllProduct = async () => {
      const allProducts = await productDao.getAll();
      setProducts(allProducts);
    };
    fetchAllProduct();
  }, [products]);

  const deleteProducts = () => {};

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
