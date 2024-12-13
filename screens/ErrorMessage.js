import { View, Text,StyleSheet } from "react-native";
import React from "react";

const ErrorMassage = () => {
  return (
    <>
      <Text style={styles.errorText}>To'gri malumot kiriting!</Text>
    </>
  );
};
const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 20,
    textAlign: "center"
  },
});

export default ErrorMassage;