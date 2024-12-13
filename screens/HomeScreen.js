// HomeScreen.js
import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import Navbar from "./Navbar";
import TotalSumma from "./TotalSumma";
import SearchBox from "./SearchBox";
import TableHead from "./TableHeader";
import EditItem from "./EditItem";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import FormComponent from "./FormComponent";
import AddButton from "./AddButton";
import TableItems from "./TableItems";
import ItemModal from "./ItemModal";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const DATA_KEY = "items";

const HomeScreen = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const [image, setImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showInputs, setShowInputs] = useState(false);
  const [showOtherComponents, setShowOtherComponents] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const currentDate = new Date();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredItems(filteredItems);
  }, [searchTerm, items]);
  useEffect(() => {
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === "granted") {
            setCameraPermission(true);
        } else {
            console.warn("Camera permission denied.");
            setCameraPermission(false);
        }
    })();
}, []);


  const handleImagePicker = async () => {
    if (!cameraPermission) {
        console.warn("Camera permission is not granted.");
        return;
    }

    try {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use updated syntax
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled && result.assets?.length > 0) {
            const selectedImage = result.assets[0];
            setImage(selectedImage.uri);
        } else {
            console.log("Image selection was canceled.");
        }
    } catch (error) {
        console.error("Error accessing camera:", error);
    }
};

  

  const fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem(DATA_KEY);
      if (data) {
        setItems(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  const createAndPrintPDF = async () => {
   
    try {
      const htmlContent = `
        <html>
        <head>
        <style>
        
          h1 {
            text-align: center;
            color: #333; 
          }
          h2 {
            text-align: center;
            color: red;
            font-size: 30px;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            margin-bottom: 10px;
            font-size: 30px;
            color: #666;
            border-bottom: 1px solid black;
          }
        </style>
      </head>
          <body>
            <h1>Malumotlar</h1>
           <h2>Umumiy summa: ${calculateTotal()} so'm</h2>
            <ul>
            
              ${items
                .map(
                  (item, index) =>
                    `<li>${index + 1}. ${item.name} =  ${item.amount} </li>`
                )
                .join(" ")}
            </ul>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
      });

      await Print.printAsync({
        uri,
      });
    } catch (error) {
      console.error("Error generating or printing PDF:", error);
    }
  };

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };

  function calculateTotal() {
    const total = items.reduce((acc, user) => {
      const str = user.amount;
      if (str) {
        const numbers = str.replace(/\+/g, " ").split(" ").map(Number);
        const sum = numbers.reduce((a, b) => a + b);
        return acc + sum;
      }
      return acc;
    }, 0);

    return total;
  }

  const addItem = () => {
    if (name.trim() !== "" && amount.trim() !== "") {
      const newItem = {
        id: Date.now().toString(),
        name,
        amount,
        product,
        image,
        date: currentDate.toLocaleDateString(),
        time: currentDate.toLocaleTimeString(),
      };
      const updatedItems = [newItem, ...items];
      setItems(updatedItems);
      saveData(updatedItems);
      setName("");
      setAmount("");
      setProduct("");
      setShowInputs(false);
      setShowOtherComponents(true);
      setImage(null);
    }
  };

  const toggleInputs = () => {
    setShowInputs(true);
    setShowOtherComponents(false);
  };

  const cancelInputs = () => {
    setShowInputs(false);
    setShowOtherComponents(true);
    setName("");
    setAmount("");
    setProduct("");
  };

  const deleteItem = (id, itemName) => {
    setItemToDelete({ id, itemName });
    setDeleteConfirmationVisible(true);
  };

  const confirmDeleteItem = () => {
    if (itemToDelete) {
      const { id } = itemToDelete;
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      saveData(updatedItems);
      setDeleteConfirmationVisible(false);
    }
  };

  const showItemDetails = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const openEditItemModal = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
  };

  const closeEditItemModal = () => {
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const saveEditedItem = (editedData) => {
    if (editingItem) {
      const updatedItems = items.map((item) =>
        item.id === editingItem.id ? { ...item, ...editedData } : item
      );
      setItems(updatedItems);
      saveData(updatedItems);
      closeEditItemModal();
    }
  };
  const parseAndSumSumma = (summa) => {
    if (summa) {
      const sumParts = summa.split("+").map(Number);
      return sumParts.reduce((acc, part) => acc + part, 0);
    }
    return 0;
  };

  return (
    <>
      <Navbar downloadFromData={createAndPrintPDF} />
      <View style={styles.container}>
        {showOtherComponents && (
          <>
            <TotalSumma calculateTotal={calculateTotal} />
            <View style={styles.fixedBlock}>
              <SearchBox
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <AddButton onPress={toggleInputs} />
            </View>

            <TableHead />
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <TableItems
                  item={item}
                  index={index}
                  showItemDetails={showItemDetails}
                  openEditItemModal={openEditItemModal}
                  deleteItem={deleteItem}
                  parseAndSumSumma={parseAndSumSumma}
                />
              )}
            />
          </>
        )}

        <DeleteConfirmationModal
          visible={deleteConfirmationVisible}
          itemName={itemToDelete ? itemToDelete.itemName : ""}
          onCancel={() => setDeleteConfirmationVisible(false)}
          onConfirm={confirmDeleteItem}
        />
        {showInputs && (
          <>
            <FormComponent
              name={name}
              amount={amount}
              product={product}
              setName={setName}
              setAmount={setAmount}
              setProduct={setProduct}
              cancelInputs={cancelInputs}
              addItem={addItem}
              handleImagePicker={handleImagePicker}
              cameraPermission={cameraPermission}
            />
          </>
        )}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <EditItem
            visible={isModalVisible}
            item={editingItem}
            onCancel={closeEditItemModal}
            onSave={saveEditedItem}
          />
        </Modal>
        <ItemModal
          modalVisible={modalVisible}
          selectedItem={selectedItem}
          closeModal={() => setModalVisible(false)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 16,
    marginTop: 16,
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
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
  fixedBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
 
});

export default HomeScreen;
