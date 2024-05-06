import colors from "@/lib/colors";
import { Pressable, Text } from "react-native";

export default function Button({
  onPress,
  title,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? colors.white : colors.primary,
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
