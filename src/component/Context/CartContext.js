import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const addItem = (item) => setSelectedItems(prev => [...prev, item]);

  const removeItem = (id) => setSelectedItems(prev => prev.filter(item => item.id !== id));

  const value = { selectedItems, addItem, removeItem };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
