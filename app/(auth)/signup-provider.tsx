import Button from "@/components/button";
import Input from "@/components/input";
import { UserType, userDao } from "@/lib/dao/user";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View, Image, Text } from "react-native";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "@/lib/uploader";

export default function SignUpCustomer() {
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const signUp = useCallback(() => {
    for (const f of [
      storeName,
      email,
      password,
      confirmPassword,
      address,
      photoUrl,
    ]) {
      if (!f) {
        Toast.show({
          text1: "Please fill all the required fields",
          type: "error",
        });
        return;
      }

      if (password != confirmPassword) {
        Toast.show({
          text1: "Passwords is not matching",
          type: "error",
        });
        setPassword("");
        setConfirmPassword("");

        return;
      }

      userDao
        .create(
          {
            type: UserType.PROVIDER,
            email: email,
            storeName: storeName,
            address: address,
            avatar: photoUrl,
          },
          password,
        )
        .then(() => {
          router.replace("/");
        })
        .catch((e) => {
          Toast.show({
            text1: e.message,
            type: "error",
          });
        });
    }
  }, [storeName, email, password, confirmPassword, address, photoUrl]);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (result.canceled) {
      return;
    }

    setUploading(true);

    try {
      if (result.assets) {
        const url = await uploadFile(result.assets[0].uri);
        setPhotoUrl(url);
      }
    } catch (e) {
      Toast.show({
        text1: "Upload failed",
        type: "error",
      });
      console.log(e);
    } finally {
      setUploading(false);
    }
  }, []);

  return (
    <View>
      <View>
        {photoUrl && (
          <Image
            src={photoUrl}
            style={{ height: 200, width: 200, borderRadius: 9999 }}
          />
        )}
        <Button
          title="Chose profile picture"
          onPress={pickImage}
          disabled={uploading}
        />
        <Input
          placeholder="Store name"
          value={storeName}
          onChangeText={setStoreName}
        />
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Input
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        <Input
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />

        <Button title="Sign up" onPress={signUp} />
      </View>
    </View>
  );
}
