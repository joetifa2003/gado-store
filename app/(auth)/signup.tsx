import Button from "@/components/button";
import { Stack, useRouter } from "expo-router";
import { View, Image, Pressable, StyleSheet } from "react-native";
import colors from "@/lib/colors";

export default function SingUp() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />

      <Pressable onPress={() => router.navigate("/signup-provider")}>
        <View style={styles.component}>
          <Image
            style={styles.image}
            source={require("@/assets/images/businessman-icon-png-12.png")}
          ></Image>
          <Button
            title="Provider"
            onPress={() => router.navigate("/signup-provider")}
          ></Button>
        </View>
      </Pressable>

      <Pressable onPress={() => router.navigate("/signup-customer")}>
        <View style={styles.component}>
          <Image
            style={styles.image}
            source={require("@/assets/images/Customer.jpg")}
          ></Image>
          <Button
            title="Customer"
            onPress={() => router.navigate("/signup-customer")}
          ></Button>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  image: {
    width: 170,
    height: 170,
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 30,
  },
  component: {
    backgroundColor: colors.dark,
    borderRadius: 20,
    paddingBottom: 20,
    padding:10
    
  },
});
