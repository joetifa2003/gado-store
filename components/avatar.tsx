import { Image } from "react-native";
import defaultAvatar from "@/assets/images/avatar.jpg";

export default function Avatar({ size, src }: { size: number; src?: string }) {
  return (
    <Image
      source={src ? { uri: src } : defaultAvatar}
      style={{ width: size, height: size, borderRadius: 9999 }}
    />
  );
}
