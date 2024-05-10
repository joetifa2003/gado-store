import { UserData, UserType } from "@/lib/dao/user";
import { Text, StyleSheet } from "react-native";

export const ProfileName = ({ user }: { user: UserData }) => {
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
