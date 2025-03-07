import React from "react";
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Product, NavigationProp } from "../types";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart: React.FC<CartProps> = ({ cart, setCart }) => {
  const navigation = useNavigation<NavigationProp>();

  const updateQuantity = (id: string, change: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          if (item.quantity === 1 && change === -1) {
            Alert.alert(
              "Remove Item",
              "Are you sure you want to remove this item from your cart?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", onPress: () => setCart(prevCart.filter((i) => i.id !== id)) }
              ]
            );
            return item;
          }
          return { ...item, quantity: Math.max(1, item.quantity + change) };
        }
        return item;
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      ) : (
<FlatList
  data={cart}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.image} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>₱{item.price * item.quantity}</Text>
      </View>

      {/* Quantity Controls */}
      <View style={styles.quantityControls}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.button}>
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{item.quantity}</Text>

        <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
/>

      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button1} 
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Go Back to Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button2} 
          onPress={() => navigation.navigate("Checkout", { cart, setCart })}
        >
          <Text style={styles.buttonText}>Proceed to Checkout</Text>
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
    emptyCart: {
      fontSize: 16,
      textAlign: "center",
      marginTop: 20,
      color: "gray",
    },
    cartItem: {
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
      fontWeight:"bold",
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", 
        minWidth: 130,
        gap: 20,
        fontWeight: "bold" 
      },
      button: {
        backgroundColor: "#27ae60",
        paddingVertical: 8,  
        paddingHorizontal: 12,
        borderRadius: 6,  
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,  
        width: 40,  
        height: 40,  
    },
      
    button2: {
      flex: 1,
      backgroundColor: "#27ae60",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginHorizontal: 5,
    },
    button1: {
      flex: 1,
      backgroundColor: "#009eff",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginHorizontal: 5,
    },
    buttonText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    quantity: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        minWidth: 30, 
        textAlignVertical: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      bottom: 20,
      left: 20,
      right: 20,
    },
  });
  

export default Cart;
