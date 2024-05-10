import ProductsList from "@/components/productsList";
import { orderDao, productInfo } from "@/lib/dao/orders";
import { ProductsData, productDao } from "@/lib/dao/products";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

const OrderProductsPage = () => {
  const { id }: { id: string } = useLocalSearchParams();

  const [productsInfo, setProductsInfo] = useState<productInfo[]>([]);
  const [products, setProducts] = useState<(ProductsData | undefined)[]>([]);

  const transferProductInfoToProduct = async (productsInfo: productInfo[]) => {
    const products = await Promise.all(
      productsInfo.map(async (item) => {
        return await productDao.getById(item.id);
      })
    );
    return products;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const order = orderDao.getById(id);
      if (order) {
        const productInfoArray = order.productList;
        setProductsInfo(productInfoArray);
        const products = await transferProductInfoToProduct(productInfoArray);
        setProducts(products);
      }
    };
    fetchProducts();
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      <ProductsList products={products} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default OrderProductsPage;
