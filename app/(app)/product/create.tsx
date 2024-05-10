import Button from "@/components/button";
import Input from "@/components/input";
import { userContext } from "@/lib/userContext";
import { useCallback, useContext, useState } from "react";
import { View, Text, Image } from "react-native";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "@/lib/uploader";
import { productDao } from "@/lib/dao/products";
import { useRouter } from "expo-router";

export default function ProductCreate() {
  const user = useContext(userContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const createProduct = useCallback(async () => {
    try {
      for (const f of [name, price, image]) {
        if (!f) {
          Toast.show({
            text1: "Please complete all the form data.",
            type: "error",
          });
          return;
        }
      }

      const priceNum = +price;
      if (!priceNum) {
        Toast.show({
          text1: "Price must be a number.",
          type: "error",
        });
        return;
      }

      await productDao.create({
        image,
        name,
        price: priceNum,
        ownerId: user.UID!,
      });

      router.back();
    } catch (e) {
      Toast.show({
        text1: "Product creation failed",
        type: "error",
      });
      return;
    } finally {
    }
  }, [name, price, image]);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (result.canceled) {
      return;
    }

    setUploading(true);

    try {
      if (result.assets) {
        const url = await uploadFile(result.assets[0].uri);
        setImage(url);
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
    <View style={{ padding: 8, gap: 8 }}>
      {image && <Image source={{ uri: image }} height={200} />}
      <Button title="Upload Image" onPress={pickImage} disabled={uploading} />
      <Input placeholder="Product Name" value={name} onChangeText={setName} />
      <Input
        placeholder="Product Price"
        value={price}
        onChangeText={setPrice}
        keyBoardType="numeric"
      />
      <Button title="Create Product" onPress={createProduct} />
      
      
    </View>
  );
}
