import Button from "@/components/button";
import { auth } from "@/lib/firebase";
import { userContext } from "@/lib/userContext";
import { useCallback, useContext } from "react";
import { View, Text } from "react-native";

export default function Page() {
  const user = useContext(userContext);

  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <Button title="Logout" onPress={logout} />
      <Text>{JSON.stringify(user)}</Text>
    </View>
  );
}
