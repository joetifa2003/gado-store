import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  Settings,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";

import colors from "@/lib/colors";

const Customer = ({
  first,
  last,
  address,
  image,
}: {
  first: string;
  last: string;
  address: string;
  image: string;
}) => {
  const [press, isPress] = useState(true);
  const [ads, setAds] = useState("Address");
  const [szAddress, setSzAdress] = useState(22);
  const addressForm = () => {
    if (press) {
      isPress(false);
    } else {
      isPress(true);
    }

    if (press) {
      setAds(address);
      setSzAdress(14);
    } else {
      setAds("Address");
      setSzAdress(22);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.image} source={{ uri: image }}></Image>
        <Entypo
          name="camera"
          size={24}
          color="black"
          style={{ marginTop: 120, marginLeft: -10 }}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}> {first + " " + last + " "}</Text>
        <Feather name="edit-2" size={22} color="black" />
      </View>

      <View style={{ marginTop: 50, flexDirection: "column", rowGap: 10 }}>
        <Pressable onPress={addressForm}>
          <View style={styles.component}>
            <FontAwesome6 name="location-dot" size={22} color="blue" />
            <Text style={{ fontSize: szAddress }}> {ads}</Text>
            <Entypo
              name="chevron-right"
              size={24}
              color="black"
              style={{ direction: "rtl" }}
            />
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.component}>
            <Feather name="settings" size={28} color="black" />
            <Text style={{ fontSize: 22 }}> Settings</Text>
            <Entypo
              name="chevron-right"
              size={24}
              color="black"
              style={{ flexDirection: "column-reverse" }}
            />
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.component}>
            <Entypo name="info" size={24} color="red" />
            <Text style={{ fontSize: 22 }}> About</Text>
            <Entypo
              name="chevron-right"
              size={24}
              color="black"
              style={{ flexDirection: "column-reverse" }}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  text: {},
  image: { width: 168, height: 168, borderRadius: 100 },
  component: {
    maxWidth: 400,
    minWidth: 400,
    marginLeft: 4,
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderBlockColor: "#d00ffff",
    borderColor: "#d3d3d3",
    borderWidth: 2,
    borderRadius: 10,
    height: 60,
    margin: 10,
    alignItems: "center",
  },
});
