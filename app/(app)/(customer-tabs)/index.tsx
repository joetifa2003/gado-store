import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ProductsData, productDao } from "@/lib/dao/products";
import ProductsList from "@/components/productsList";
import SearchBar from "@/components/searchBar";

const Home = () => {
  const [products, setProducts] = useState<ProductsData[]>([]);

  const [searchFor, setSearchFor] = useState("");
  // const handleSearch = (searchFor: string) => {
  //   if (searchFor.trim() === "") {
  //     setShownProducts(products);
  //   } else if (products) {
  //     setShownProducts(
  //       products.filter((product) =>
  //         product.name.toLowerCase().includes(searchFor.toLowerCase())
  //       )
  //     );
  //   }
  // };

  useEffect(() => {
    const fetchAllProduct = async () => {
      const allProducts = await productDao.getAll();
      setProducts(allProducts);
    };
    fetchAllProduct();
  }, [products]);

  const handleSearch = () => {};

  return (
    <View style={styles.container}>
      <SearchBar
        handleSearch={handleSearch}
        setSearchFor={(val: string) => setSearchFor(val)}
      />
      <ProductsList products={products} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
