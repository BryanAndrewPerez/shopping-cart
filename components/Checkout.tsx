import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Product } from "../types";

interface CheckoutProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, setCart }) => {
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert("Cart is empty", "Please add items before checking out.");
      return;
    }

    Alert.alert(
      "Confirm Checkout",
      "Are you sure you want to proceed with the checkout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Yes", 
          onPress: () => {
            setCart([]); 
            Alert.alert("Checkout Successful", "Thank you for your purchase!");
          } 
        },
      ]
    );
  };

return (
  <View style={styles.container}>
    <Text style={styles.title}>Order Summary</Text>

    {cart.length === 0 ? (
      <Text style={styles.emptyText}>Your cart is empty.</Text>
    ) : (
      <View style={styles.listContainer}>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>
                {item.name} x {item.quantity}
              </Text>
              <Text style={styles.itemText}>₱{item.price * item.quantity}</Text>
            </View>
          )}
        />
      </View>
    )}

    
      <Text style={styles.totalText}>Total: ₱{totalAmount}</Text>
      <View style={styles.checkoutButtonContainer}>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
      </View>
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
    emptyText: {
      fontSize: 16,
      textAlign: "center",
      marginTop: 20,
      color: "gray",
    },
    itemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    itemText: {
      fontSize: 16,
      fontWeight:"bold",
    },
    totalText: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 10,
    },
    checkoutButtonContainer: {
      position: "absolute",
      bottom: 20,
      left: 20,
      right: 20,
    },
    checkoutButton: {
      backgroundColor: "#27ae60",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  

export default Checkout;
