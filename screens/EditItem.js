import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";




const EditItem = ({ item, onCancel, onSave }) => {
  const [name, setName] = useState(item ? item.name : "");
  const [amount, setAmount] = useState(item ? item.amount : "");
  const [product, setProduct] = useState(item ? item.product : "");

  const handleSave = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    onSave({ name, amount, product,date: formattedDate, time: formattedTime });
    setName("");
    setAmount("");
    setProduct("");
    
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.popup}>
        <Text style={styles.title}>Tahrirlash</Text>
        <TextInput
          style={styles.input}
          placeholder="Ismi"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Summa"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mahsulot"
          value={product}
          onChangeText={(text) => setProduct(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.buttonText}>Orqaga</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Saqlash</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    padding: 30,
    borderRadius: 5,
    width: "80%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 60,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 4,
    fontWeight: "700",
    fontSize: 20,
    color: "#000",
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
  },
  saveButton: {
    backgroundColor: "#1B9C85",
    padding: 5,
    borderRadius: 5,
  },
});

export default EditItem;
