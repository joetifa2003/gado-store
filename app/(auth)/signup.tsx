import Button from "@/components/button";
import { Stack, useRouter } from "expo-router";
import { View } from "react-native";

export default function SingUp() {
  const router = useRouter();
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Stack.Screen options={{ title: "Sign up" }} />

      <Button
        title="Provider"
        onPress={() => router.navigate("/signup-provider")}
      />
      <Button
        title="Customer"
        onPress={() => router.navigate("/signup-customer")}
      />
    </View>
  );
}
