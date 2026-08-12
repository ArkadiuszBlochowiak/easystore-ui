import { createContext, useContext, useEffect, useState } from "react";

// const initialCartContext = {
//   cart: [],
//   setCart: () => {},
//   addToCart: (product) => {
//     console.log("Product added to cart: " + product.name);
//   },
//   removeFromCart: () => {},
//   totalQuantity: 0,
// };

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      console.error("Failed to parse cart from localStoreage: " + error);
      return [];
    }
  });

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      console.error("Failed to save cart to localStoreage: " + error);
    }
  });

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === product.productId,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      //   const existingItemIndex = prevCart.findIndex(
      //     (item) => item.productId === productId,
      //   );

      //   if (existingItemIndex) {
      //     return prevCart.splice(existingItemIndex, 1);
      //   }

      //   return prevCart;
      return prevCart.filter((item) => item.productId !== productId);
    });
  };

  return (
    <CartContext
      value={{ cart, setCart, addToCart, removeFromCart, totalQuantity }}
    >
      {children}
    </CartContext>
  );
};
