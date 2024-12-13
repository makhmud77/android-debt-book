

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  function removeWhitespace(text) {
    return text.replace(/\s/g, "");
  }
  return (
    <View style={styles.searchBox}>
      <TextInput
        style={styles.input}
        placeholder="Qidiruv"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(removeWhitespace(text))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    flex: 1,
    marginRight: 8,
  },
 input: {
    height: 40,
    borderColor: "#E5E5E5",
    borderBottomWidth: 1,
    marginVertical: 16,
    paddingLeft: 8,
    fontSize: 18,
  },
});

export default SearchBox;
