// Cart.js
import React, { useState } from "react";
import { useCart } from "./Context/CartContext"; 
import "./style.css";
import Data from "./Data";
import Wallet from "./wallet";

const Cart = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const { addItem, removeItem } = useCart(); 

  const handleCheckBox = (id) => {
    let newCheckedItems = { ...checkedItems };

    if (id >= 1 && id <= 4) {
      for (let i = 1; i <= 4; i++) {
        newCheckedItems[i] = i === id ? !newCheckedItems[i] : false;
      }
    } else if (id >= 5 && id <= 8) {
      for (let i = 5; i <= 8; i++) {
        newCheckedItems[i] = i === id ? !newCheckedItems[i] : false;
      }
    } else if (id >= 9 && id <= 12) {
      for (let i = 9; i <= 12; i++) {
        newCheckedItems[i] = i === id ? !newCheckedItems[i] : false;
      }
    }

    setCheckedItems(newCheckedItems);

    const selectedItem = Data.find((item) => item.id === id);
    if (newCheckedItems[id]) {
      addItem(selectedItem); 
    } else {
      removeItem(id); 
    }
  };

  return (
    <div>
      <h1 className="HeaderTag">Flexible Benefits Solution</h1>
      <div className="OuterBoxContainer">
        <div className="Container">
          <div className="BoxContainer">
            {Data.map((item) => (
              <div className="CartContainer" key={item.id}>
                <div
                  className="ItemsNames"
                  style={{
                    color: item.id
                      ? item.id > 8
                        ? "orange"
                        : item.id > 4
                        ? "green"
                        : "blue"
                      : "white",
                  }}
                >
                  {item.Name}
                </div>
                <div
                  className="CartBox"
                  style={{
                    background: checkedItems[item.id]
                      ? item.id > 8
                        ? "linear-gradient(to bottom, #fff9d6, #fff4a3)"
                        : item.id > 4
                        ? "linear-gradient(to bottom, #dfffdb, #90ee90)"
                        : "linear-gradient(to bottom, #e0f0ff, #a3c9f8)"
                      : "white",
                  }}
                >
                  <div className="innerBox">
                    <div className="Numbers">{item.Number}</div>
                  </div>
                  <div>
                    <div className="Text-Box">{item.value}</div>
                    {checkedItems[item.id] && (
                      <div className="Default-Text">(Default)</div>
                    )}
                  </div>

                  <div className="Check-Box">
                    <label>
                      <input
                        type="checkbox"
                        checked={checkedItems[item.id] || false}
                        onChange={() => handleCheckBox(item.id)}
                      />
                    </label>
                  </div>
                  <div className="Footer">
                    <div className="Details">Details</div>
                    <div className="XData">{item.data}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Wallet />
      </div>
    </div>
  );
};

export default Cart;
