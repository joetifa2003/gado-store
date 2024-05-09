import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { UserData, UserType, userDao } from "@/lib/dao/user";
import LoadingScreen from "@/components/loadingScreen";
import Avatar from "@/components/avatar";
import colors from "@/lib/colors";

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

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: colors.white,
          padding: 8,
          gap: 8,
        }}
      >
        <Avatar src={user.avatar} size={100} />
        <View>
          <ProfileName user={user} />
          <Text>{user.address}</Text>
        </View>
      </View>
    </View>
  );
};

const ProfileName = ({ user }: { user: UserData }) => {
  if (user.type === UserType.CUSTOMER) {
    return (
      <Text style={styles.profileName}>
        {user.firstName} {user.lastName}
      </Text>
    );
  }

  return <Text style={styles.profileName}>{user.storeName}</Text>;
};

const styles = StyleSheet.create({
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
