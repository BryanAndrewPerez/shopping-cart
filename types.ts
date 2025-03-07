import { StackNavigationProp } from "@react-navigation/stack";
import { Dispatch, SetStateAction } from "react";

// Define the Product type
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number; // Ensure quantity is included
}

// Define navigation types
export type RootStackParamList = {
  Home: undefined;
  Cart: { cart: Product[]; setCart: Dispatch<SetStateAction<Product[]>> };
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;
