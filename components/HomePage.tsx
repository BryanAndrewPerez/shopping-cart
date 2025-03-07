import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Product, NavigationProp } from "../types";

const red = require("../assets/c2red.webp");
const green = require("../assets/c2green.webp");
const yellow = require("../assets/c2yellow.webp");

interface HomeProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const products: Product[] = [
  { id: "1", name: "C2 RED", price: 35, image: red, quantity: 1 },
  { id: "2", name: "C2 GREEN", price: 500, image: green, quantity: 1 },
  { id: "3", name: "C2 YELLOW", price: 500, image: yellow, quantity: 1 },
];

const Home: React.FC<HomeProps> = ({ cart, setCart }) => {
  const navigation = useNavigation<NavigationProp>();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalVisible(true);
  };

  const addToCart = () => {
    if (!selectedProduct) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === selectedProduct.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === selectedProduct.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...selectedProduct, quantity }];
      }
    });

    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List</Text>

      <FlatList
  data={products}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>₱{item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => openModal(item)} style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  )}
/>

      <View style={styles.cartButtonContainer}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart", { cart, setCart })}
        >
          <Text style={styles.cartButtonText}>
            Go to Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Text style={styles.modalTitle}>Add {selectedProduct.name} to Cart</Text>
                <Text style={styles.modalText}>Price: ₱{selectedProduct.price}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity
                    onPress={() => setQuantity((prev) => prev + 1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.confirmButton} onPress={addToCart}>
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#8af4c2",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cartButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  cartButton: {
    backgroundColor: "#27ae60",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  cartButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
});

export default Home;
