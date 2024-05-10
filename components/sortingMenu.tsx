import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "@/lib/colors";

const SortingMenu = ({
  selectedOption,
  handleOptionChange,
}: {
  selectedOption: string;
  handleOptionChange: (option: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sort By:</Text>
      <Picker
        selectedValue={selectedOption}
        style={styles.picker}
        onValueChange={(itemValue: string) => {
          handleOptionChange(itemValue);
        }}
      >
        <Picker.Item label="Alphabetical A to Z" value="alpha_asc" />
        <Picker.Item label="Alphabetical Z to A" value="alpha_desc" />
        <Picker.Item label="Price low to high" value="price_asc" />
        <Picker.Item label="Price high to low" value="price_desc" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
  picker: {
    width: 170,
    height: 40,
  },
});

export default SortingMenu;
