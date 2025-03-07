import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import Home from "./components/HomePage";
import Cart from "./components/Cart";
import Checkout from "components/Checkout";

// Define the navigation parameters for each screen
export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
};

// Define stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Define Product type
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const App = () => {
  const [cart, setCart] = useState<Product[]>([]); // Manage cart state in App

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerLeft: () => null}}>
          {(props) => <Home {...props} cart={cart} setCart={setCart} />}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {(props) => <Cart {...props} cart={cart} setCart={setCart} />}
        </Stack.Screen>
        <Stack.Screen name="Checkout">
          {(props) => <Checkout {...props} cart={cart} setCart={setCart} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

  
export default App;
