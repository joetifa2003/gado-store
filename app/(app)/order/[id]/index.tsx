import ProductsList from "@/components/productsList";
import { OrderData, orderDao, productInfo } from "@/lib/dao/orders";
import { ProductsData, productDao } from "@/lib/dao/products";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

const OrderProductsPage = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <Text>{id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default OrderProductsPage;
