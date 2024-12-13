import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ErrorMassage from "./ErrorMessage";

const TotalSumma = ({ calculateTotal }) => {
  return (
    <>
      {isNaN(calculateTotal()) ? (
        <ErrorMassage />
      ) : (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Umumiy summa:</Text>
          <Text style={styles.totalAmount}>
            {calculateTotal()
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            so'm
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  totalText: {
    fontSize: 23,
  },
  totalAmount: {
    fontSize: 23,
    color: "red",
    marginLeft: 5,
  },
});

export default TotalSumma;
