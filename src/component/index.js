import React, { useState } from "react";
import { useCart } from "./Context/CartContext";
import "./style.css";
import Data from "./Data";
import Wallet from "./wallet";

const Cart = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const { addItem, removeItem } = useCart();

  const getItemColor = (id) => {
    if (id >= 9 && id <= 12) return "orange";
    if (id >= 5 && id <= 8) return "green";
    return "blue";
  };

  const getBackgroundStyle = (id, isChecked) => {
    if (!isChecked) return "white";
    if (id >= 9 && id <= 12) return "linear-gradient(to bottom, #fff9d6, #fff4a3)";
    if (id >= 5 && id <= 8) return "linear-gradient(to bottom, #dfffdb, #90ee90)";
    return "linear-gradient(to bottom, #e0f0ff, #a3c9f8)";
  };

  const handleCheckBox = (id) => {
    const selectedItem = Data.find((item) => item.id === id);
    if (!selectedItem) return;

    const newCheckedItems = { ...checkedItems };
    const startId = id <= 4 ? 1 : id <= 8 ? 5 : 9;
    const endId = id <= 4 ? 4 : id <= 8 ? 8 : 12;

    // Update checked items in the same group
    for (let i = startId; i <= endId; i++) {
      newCheckedItems[i] = i === id ? !checkedItems[i] : false;
    }

    setCheckedItems(newCheckedItems);

    // Remove unchecked items
    Object.keys(checkedItems).forEach((key) => {
      if (!newCheckedItems[key]) {
        removeItem(Number(key));
      }
    });

    // Add newly checked item
    if (newCheckedItems[id]) {
      addItem(selectedItem);
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
                  style={{ color: getItemColor(item.id) }}
                >
                  {item.Name}
                </div>
                <div
                  className="CartBox"
                  style={{
                    background: getBackgroundStyle(item.id, checkedItems[item.id]),
                  }}
                >
                  <div className="innerBox">
                    <div className="Numbers">{item.Number}</div>
                  </div>
                  <div>
                    <div className="Text-Box">{item.value}</div>
                    {checkedItems[item.id] && <div className="Default-Text">(Default)</div>}
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
        <Wallet selectedItems={Object.keys(checkedItems).filter((id) => checkedItems[id])} />
      </div>
    </div>
  );
};

export default Cart;