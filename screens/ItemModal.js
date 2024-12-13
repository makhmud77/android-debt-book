// ItemModal.js
import React from "react";
import { View, Text, Button, Modal, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const currentDate = new Date();

const ItemModal = ({ modalVisible, selectedItem, closeModal }) => {
  const renderImage = () => {
    if (!selectedItem || selectedItem.image === null) {
      return (
        <View style={styles.todoImage}>
          <Icon name="user" size={25} color="#000" />
        </View>
      );
    }

    return (
      <Image source={{ uri: selectedItem.image }} style={styles.todoImage} />
    );
  };
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.popup}>
        {renderImage()}
          <Text style={styles.title}>Malumot</Text>
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.dataText}>
              <Text style={styles.label}>Ismi:</Text>{" "}
              {selectedItem ? selectedItem.name : ""}
            </Text>
            <Text style={styles.dataText}>
              <Text style={styles.label}>Summa:</Text>{" "}
              {selectedItem ? selectedItem.amount : ""}
            </Text>
            <Text style={styles.dataText}>
              <Text style={styles.label}>Mahsulot:</Text>{" "}
              {selectedItem ? selectedItem.product : ""}
            </Text>
            <Text style={styles.dataText}>
              <Text style={styles.label}>Sana:</Text>{" "}
              {selectedItem ? selectedItem.date : ""}
            </Text>
            <Text style={styles.dataText}>
              <Text style={styles.label}>Vaqt:</Text>{" "}
              {selectedItem ? selectedItem.time : ""}
            </Text>
          </View>

          <View>
            <Button color="red" title="Orqaga" onPress={closeModal} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#35A29F",
  },
  popup: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 5,
    width: "80%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  dataText: {
    fontSize: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
  },

  todoImage: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "#000",
     borderRadius: 50,
    marginHorizontal:80,
    marginBottom:20
    
  },

});

export default ItemModal;
