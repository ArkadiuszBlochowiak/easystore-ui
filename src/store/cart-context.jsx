import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
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
  }, [cart]);

  const addToCart = (product, quantity) => {
    const existingItem = cart.find(
      (item) => item.productId === product.productId,
    );

    dispatch({
      type: existingItem ? "changed" : "added",
      product,
      quantity,
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: "deleted",
      productId,
    });
  };

  const clearCart = () => {
    dispatch({ type: "cleared" });
  };

  return (
    <CartContext
      value={{ cart, addToCart, removeFromCart, clearCart, totalQuantity }}
    >
      {children}
    </CartContext>
  );
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "added": {
      return [...state, { ...action.product, quantity: action.quantity }];
    }
    case "changed": {
      return state.map((item) =>
        item.productId === action.product.productId
          ? { ...item, quantity: item.quantity + action.quantity }
          : item,
      );
    }
    case "deleted": {
      return state.filter((item) => item.productId !== action.productId);
    }
    case "cleared": {
      return [];
    }
    default: {
      throw Error("Unknmown action: " + action.type);
    }
  }
};
