import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { UserData, UserType, userDao } from "@/lib/dao/user";
import LoadingScreen from "@/components/loadingScreen";
import Avatar from "@/components/avatar";
import colors from "@/lib/colors";
import { auth } from "@/lib/firebase";
import Button from "@/components/button";
import { userContext } from "@/lib/userContext";

const Profile = () => {
  const params = useLocalSearchParams();
  const [user, setUser] = useState<UserData>(null as any);
  const [loading, setLoading] = useState(true);
  const loggedInUser = useContext(userContext);

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
        <View style={{ flex: 1 }}>
          <ProfileName user={user} />
          <Text>{user.address}</Text>
          {user.UID === loggedInUser?.UID && <LogoutBtn />}
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

const LogoutBtn = () => {
  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  return (
    <View style={{ marginTop: "auto" }}>
      <Button title="logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
