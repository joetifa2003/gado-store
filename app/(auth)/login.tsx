import Button from "@/components/button";
import Input from "@/components/input";
import { auth } from "@/lib/firebase";
import { Stack, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = useCallback(async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      Toast.show({
        text1: e.message,
        type: "error",
      });
      return;
    }
    router.replace("/");
  }, [email, password]);

  const signUp = useCallback(() => {
    router.navigate("/signup");
  }, []);

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
      <Stack.Screen options={{ title: "Login" }} />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button title="Login" onPress={login} />
        <Button title="Sign up" onPress={signUp} />
      </View>
    </View>
  );
}
