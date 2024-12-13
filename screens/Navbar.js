import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView,StatusBar } from "react-native";

const Navbar = ({ downloadFromData }) => {
  return (
    <SafeAreaView>
    <StatusBar
        backgroundColor="black"
      />
       <View style={styles.nav}>
      <View style={styles.navWrapper}>
        <View style={styles.navContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.brandLogo}>Debt Book</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={downloadFromData}>
                <Image
                  source={require('../assets/sd.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "#35A29F",
  },
  navWrapper: {
    padding: 20,
  },
  navContainer: {
    alignItems: "center",
    padding: 10,
  },
  rowContainer: {
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandLogo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  textContainer: {
    marginHorizontal:50
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default Navbar;
