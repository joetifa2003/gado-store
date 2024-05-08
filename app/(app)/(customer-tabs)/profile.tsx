import React from "react";
import { StyleSheet, View, Image, Text, ImageBackground } from "react-native";
import Customer from "@/components/Details/Customer";

import { useContext } from "react";
import { userContext } from "@/lib/userContext";
import colors from "@/lib/colors";

const Profile = () => {
  const user = useContext(userContext);
  const image = user.avatar
    ? user.avatar
    : "https://static.vecteezy.com/system/resources/previews/026/966/960/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg";

  return (
    <Customer
      first={user.firstName!}
      last={user.lastName!}
      address={user.address}
      image={image}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  text: {},
  image: { width: 168, height: 168 },
});

export default Profile;
