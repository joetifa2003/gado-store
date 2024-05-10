import React, { useState, useEffect, useContext } from "react";
import { userContext } from "@/lib/userContext";
import { ProductsData } from "@/lib/dao/products";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { productDao } from "@/lib/dao/products";
import ProductCard from "@/components/productCard";
import colors from "@/lib/colors";

export default function Listproduct() {
  const product: ProductsData[] = [];

  const [producto, setProduct] = useState<ProductsData[]>();

  const user = useContext(userContext);

  useEffect(() => {
    pro();
  }, []);

  const pro = async () => {
    try {
      const data: ProductsData[] = await productDao.getProductSpecificProviderId(
        user.UID!
      );
      setProduct(data);
    } catch (error) {
      console.log(error);
      
    }
   
  };

  return (
    <View>
      <FlatList
        data={producto}
        contentContainerStyle={{ borderRadius: 25 }}
        renderItem={({ item }) => {
          return (
            <View style={{ margin: 40, width: "80%" }}>
              <ProductCard
                productData={item}
                deleteProduct={() => {
                  ("");
                }}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    width: 500,
    display: "flex",
    flexDirection: "column",
    padding: 16,
  },
  productImg: {
    width: "70%",
    alignItems: "center",
    height: 250,
    borderRadius: 10,
    marginVertical: 16,
    marginHorizontal: 16,
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


