import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { UserData, userDao } from "@/lib/dao/user";
import LoadingScreen from "@/components/loadingScreen";

const Profile = () => {
  const params = useLocalSearchParams();
  const [user, setUser] = useState<UserData>(null as any);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userDao.get(params.id as string).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return <Text>{user.type}</Text>;
};

export default Profile;
