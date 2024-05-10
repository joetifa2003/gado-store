import Button from "@/components/button";
import LoadingScreen from "@/components/loadingScreen";
import ProductsList from "@/components/productsList";
import { OrderData, orderDao, productInfo } from "@/lib/dao/orders";
import { ProductsData, productDao } from "@/lib/dao/products";
import { Tabs, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

const OrderProductsPage = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    const order = await orderDao.getOrderByID(id);
    const products: ProductsData[] = [];

    for (const productInfo of order.products) {
      const product = await productDao.getById(productInfo.productID);
      if (product) {
        product.price = productInfo.price;
        products.push(product);
      }
    }

    console.log(products);

    setProducts(products);
    setOrder(order);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrder();
    }, [id]),
  );

  const cancelOrder = async () => {
    await orderDao.cancelOrder(order!.id);
    await fetchOrder();
  };

  if (loading || !order) {
    return (
      <>
        <Tabs.Screen options={{ title: `Loading order` }} />
        <LoadingScreen />
      </>
    );
  }

  return (
    <>
      <Tabs.Screen options={{ title: `Order ${order.id.split("-")[0]}` }} />
      <View style={{ flex: 1 }}>
        <View style={{ padding: 8 }}>
          <Text style={styles.info}>
            Order number: {order.id.split("-")[0]}
          </Text>
          <Text style={styles.info}>Total price: {order.totalPrice}</Text>
          <Text style={styles.info}>Status: {order.status}</Text>
        </View>
        <ProductsList products={products} />
        <Button title="Cancel order" onPress={cancelOrder} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  info: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderProductsPage;
