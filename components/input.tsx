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
  multiline,
  maxlines,
}: {
  placeholder: string;
  value: string;
  onChangeText: (e: string) => void;
  style?: TextStyle;
  secureTextEntry?: boolean;
  onSubmit?: () => void;
  keyBoardType?: KeyboardTypeOptions;
  multiline?: boolean;
  maxlines?: number;
}) {
  return (
    <TextInput
      placeholder={placeholder}
      style={{
        backgroundColor: colors.accent,
        width: "100%",
        height: multiline ? undefined : 40,
        ...style,
      }}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmit}
      keyboardType={keyBoardType}
      multiline={multiline}
      numberOfLines={maxlines}
    />
  );
}
