import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={require("../assets/add-icon2.png")} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },

  image: {
    width: 40,
    height: 40,
  },
});

export default AddButton;
