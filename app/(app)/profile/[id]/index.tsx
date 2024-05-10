import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { UserData, UserType, userDao } from "@/lib/dao/user";
import LoadingScreen from "@/components/loadingScreen";
import Avatar from "@/components/avatar";
import colors from "@/lib/colors";
import { auth } from "@/lib/firebase";
import Button from "@/components/button";
import { userContext } from "@/lib/userContext";
import ProductsList from "@/components/productsList";
import { ProductsData, productDao } from "@/lib/dao/products";
import SearchBar from "@/components/searchBar";
import SortingMenu from "@/components/sortingMenu";
import { ProfileName } from "@/components/profileName";

const Profile = () => {
  const params = useLocalSearchParams();
  const [user, setUser] = useState<UserData>(null as any);
  const [loading, setLoading] = useState(true);
  const loggedInUser = useContext(userContext);
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [shownProducts, setShownProducts] = useState<ProductsData[]>([]);
  const [searchFor, setSearchFor] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [order, setOrder] = useState("");
  const [direction, setDirection] = useState("");

  const router = useRouter();

  useEffect(() => {
    userDao.get(params.id as string).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const fetchProduct = useCallback(() => {
    productDao
      .getProductSpecificProviderId(params.id as string, order, direction)
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);
        setShownProducts(fetchedProducts);
      });
  }, [order, direction]);

  useFocusEffect(fetchProduct);

  if (loading) {
    return <LoadingScreen />;
  }

  const isOwner = user.UID === loggedInUser?.UID;
  const isOwnerProvider = isOwner && user.type === UserType.PROVIDER;

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
      case "alpha_asc":
        setOrder("name");
        setDirection("asc");
        break;
      case "alpha_desc":
        setOrder("name");
        setDirection("desc");
        break;
      default:
        setOrder("name");
        setDirection("asc");
    }
  };

  return (
    <View style={{ gap: 8, flex: 1 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: colors.white,
          padding: 8,
          gap: 8,
        }}
      >
        <Avatar src={user.avatar} size={100} />
        <View style={{ flex: 1 }}>
          <ProfileName user={user} />
          <Text>{user.address}</Text>
          <Text>
            {user.type === UserType.CUSTOMER ? "Customer" : "Provider"}
          </Text>
          {isOwner && <LogoutBtn />}
        </View>
      </View>
      <View style={{ padding: 8 }}>
        {isOwnerProvider && (
          <Button
            title="Create product"
            onPress={() => {
              router.navigate("/product/create");
            }}
          />
        )}
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        <SearchBar
          handleSearch={handleSearch}
          setSearchFor={(val: string) => setSearchFor(val)}
        />
        <SortingMenu
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
        {isOwnerProvider ? (
          <ProductsList products={shownProducts} deleteProduct={()=>{}} />
        ) : (
          <ProductsList products={shownProducts} />
        )}
      </View>
    </View>
  );
};

const LogoutBtn = () => {
  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  return (
    <View style={{ marginTop: "auto" }}>
      <Button title="logout" onPress={logout} />
    </View>
  );
};

export default Profile;
