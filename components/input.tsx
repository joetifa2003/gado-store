import colors from "@/lib/colors";
import { KeyboardTypeOptions, TextInput, TextStyle } from "react-native";

export default function Input({
  placeholder,
  value,
  onChangeText,
  style,
  secureTextEntry,
  onSubmit,
  keyBoardType,
}: {
  placeholder: string;
  value: string;
  onChangeText: (e: string) => void;
  style?: TextStyle;
  secureTextEntry?: boolean;
  onSubmit?: () => void;
  keyBoardType?: KeyboardTypeOptions;
}) {
  return (
    <TextInput
      placeholder={placeholder}
      style={{
        backgroundColor: colors.accent,
        width: "100%",
        height: 40,
        ...style,
      }}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmit}
      keyboardType={keyBoardType}
    />
  );
}
