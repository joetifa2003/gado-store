import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const SearchBar = ({
  setSearchFor,
  handleSearch,
}: {
  setSearchFor: (val: string) => void;
  handleSearch: (val: string) => void;
}) => {
  return (
    <TextInput
      style={styles.searchBarInput}
      placeholder="Search bar"
      onChangeText={(val) => {
        setSearchFor(val);
        handleSearch(val);
      }}
    />
  );
};

const styles = StyleSheet.create({
  searchBarInput: {
    width: "100%",
    padding: 16,
    margin: 8,
  },
});

export default SearchBar;
