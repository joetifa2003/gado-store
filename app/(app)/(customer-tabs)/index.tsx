import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ProductsData, productDao } from "@/lib/dao/products";
import ProductsList from "@/components/productsList";
import SearchBar from "@/components/searchBar";
import SortingMenu from "@/components/sortingMenu";

const Home = () => {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [shownProducts, setShownProducts] = useState<ProductsData[]>([]);
  const [searchFor, setSearchFor] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const [direction, setDirection] = useState<string>("");

  const handleSearch = (searchFor: string) => {
    if (searchFor.trim() === "") {
      setShownProducts(products);
    } else if (products) {
      setShownProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchFor.toLowerCase())
        )
      );
    }
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);

    switch (option) {
      case "price_asc":
        setOrder("price");
        setDirection("asc");
        break;
      case "price_desc":
        setOrder("price");
        setDirection("desc");
        break;
      default:
        setOrder("name");
        setDirection("asc");
    }
  };

  useEffect(() => {
    const fetchAllProduct = async () => {
      const allProducts = await productDao.getAll(order, direction);
      setProducts(allProducts);
      setShownProducts(allProducts);
    };
    fetchAllProduct();
  }, [order, direction]);

  return (
    <View style={styles.container}>
      <SearchBar
        handleSearch={handleSearch}
        setSearchFor={(val: string) => setSearchFor(val)}
      />
      <SortingMenu
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
      />
      <ProductsList products={shownProducts} />
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
