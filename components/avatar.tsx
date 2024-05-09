import React from "react";
import { Image, Pressable } from "react-native";
import defaultAvatar from "@/assets/images/avatar.jpg";

export default function Avatar({
  size,
  src,
  onPress,
}: {
  size: number;
  src?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={src ? { uri: src } : defaultAvatar}
        style={{ width: size, height: size, borderRadius: 9999 }}
      />
    </Pressable>
  );
}
