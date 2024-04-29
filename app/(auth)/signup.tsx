import Button from "@/components/button";
import Input from "@/components/input";
import { auth, db } from "@/lib/firebase";
import { Stack, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function SingUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = useCallback(() => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        const user = userCred.user;
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
        });

        router.replace("/");
      })
      .then(() => {
        Toast.show({
          text1: "Sign up successful",
          visibilityTime: 3000,
        });
      })
      .catch((e) => {
        Toast.show({
          text1: e.message,
          type: "error",
        });
      });
  }, [email, password, name]);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Stack.Screen options={{ title: "Sign up" }} />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Input placeholder="Name" value={name} onChangeText={setName} />
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={{
            textDecorationStyle: "dotted",
          }}
          secureTextEntry={true}
        />
        <Button title="Sign Up" onPress={register} />
      </View>
    </View>
  );
}
