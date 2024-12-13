import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DeleteConfirmationModal = ({
  visible,
  itemName,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text
            style={{ fontSize: 22, marginBottom: 10 }}
          >{`Siz ${itemName}ni o'chirib tashlamoqchimisiz?`}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Orqaga</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>O'chirish</Text>
            </TouchableOpacity>
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
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginRight: 20,
  },
  saveButton: {
    backgroundColor: "#1B9C85",
    padding: 5,
    borderRadius: 5,
  },
});

export default DeleteConfirmationModal;
