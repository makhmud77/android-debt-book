import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const TableItems = ({
  item,
  index,
  showItemDetails,
  openEditItemModal,
  deleteItem,
  parseAndSumSumma,
}) => {
  return (
    <View style={styles.item}>
      {/* <Text style={styles.infoText}>{index + 1}</Text> */}
      {!item.image ? (
        <View style={styles.todoImage}>
          <Icon name="user" size={25} color="#000" />
        </View>
      ) : (
        <Image source={{ uri: item.image }} style={styles.todoImage} />
      )}

      <Text style={styles.infoText} onPress={() => showItemDetails(item)}>
        {item.name.slice(0, 6)}
      </Text>
      <Text style={styles.infoText}>
        {parseAndSumSumma(item.amount)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => openEditItemModal(item)}
        >
          <Text style={[styles.buttonText, styles.editButtonText]}>
            Tahrirlash
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => deleteItem(item.id, item.name)}
        >
          <Text style={[styles.buttonText, styles.deleteButtonText]}>
            O'chirish
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  editButton: {
    backgroundColor: "#1B9C85",
  },
  buttonText: {
    color: "white",
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#F31559",
  },
  todoImage: {
    alignItems: "center",
    justifyContent:"center",
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth:1,
    borderColor: "#000",
    borderRadius:50,
    
  },
});
export default TableItems;
