import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./component/Context/CartContext";  
import Cart from "./component/index";
import Invoice from "./component/Invoice/invoice";

const App = () => {
  return (
    <CartProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Cart />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
