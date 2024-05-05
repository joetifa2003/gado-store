import Button from "@/components/button";
import Input from "@/components/input";
import { UserType, userDao } from "@/lib/dao/user";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function SignUpCustomer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  const fields = [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    address,
  ];

  const signUp = useCallback(() => {
    for (const f of fields) {
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
            type: UserType.CUSTOMER,
            email: email,
            firstName: firstName,
            lastName: lastName,
            address: address,
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
  }, fields);

  return (
    <View>
      <View>
        <Input
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Input
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
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
