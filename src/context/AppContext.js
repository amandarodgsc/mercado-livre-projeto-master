import React, { createContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      if (existingProduct) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setIsCartVisible(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider value={{ cartItems, setCartItems, isCartVisible, setIsCartVisible, addToCart, removeFromCart }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
