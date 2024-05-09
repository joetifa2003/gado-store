import colors from "@/lib/colors";
import { ActivityIndicator, Pressable, Text } from "react-native";

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
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        gap: 8,
      }}
    >
      {disabled && <ActivityIndicator />}
      <Text>{title}</Text>
    </Pressable>
  );
}
