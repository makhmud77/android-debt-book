import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const FormComponent = ({
  name,
  amount,
  product,
  setName,
  setAmount,
  setProduct,
  cancelInputs,
  addItem,
  handleImagePicker,
  cameraPermission,
}) => {
  
  const isSaveButtonActive = name.trim() !== "" && amount.trim() !== "";

  return (
    <View style={styles.formContainer}>
      <View style={styles.popup}>
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

        <TouchableOpacity
          onPress={handleImagePicker}
          disabled={!cameraPermission}
        >
          <Icon name="camera" size={25} color="#000" />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.cancelButton
            ]}
            onPress={cancelInputs}
          >
            <Text style={styles.buttonText}>Orqaga</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.saveButton,
              isSaveButtonActive ? styles.activeSaveButton : null,
            ]}
            onPress={addItem}
            disabled={!isSaveButtonActive}
          >
            <Text style={styles.buttonText}>Qo'shish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
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
  input: {
    height: 40,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 4,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
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
    backgroundColor: "#ccc",
    padding: 5,
    borderRadius: 5,
  },
  activeSaveButton: {
    backgroundColor: "#1B9C85", // Active button color
  },
});

export default FormComponent;
