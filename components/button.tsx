import colors from "@/lib/colors";
import { Pressable, Text } from "react-native";

export default function Button({
  onPress,
  title,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: colors.primary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
      }}
    >
      <Text>{title}</Text>
    </Pressable>
  );
}
