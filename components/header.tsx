import { userContext } from "@/lib/userContext";
import { useContext } from "react";
import Avatar from "./avatar";
import { View } from "react-native";
import { useRouter } from "expo-router";

export default function Header() {
  const user = useContext(userContext);
  const router = useRouter();

  return (
    <View style={{ padding: 8 }}>
      <Avatar
        size={40}
        src={user?.avatar}
        onPress={() => {
          router.navigate(`profile/${user.UID}`);
        }}
      />
    </View>
  );
}
