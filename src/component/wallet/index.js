import React from "react";
import "./style.css";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const { selectedItems } = useCart();
  const navigate = useNavigate();

  const totalAmountUsed = selectedItems.length
    ? selectedItems.reduce((total, item) => total + Number(item.Number), 0)
    : 0;

  const generateTableData = () => {
    if (!selectedItems.length) {
      return {
        tableRows: [["", "", "0"]],
        totalRowSum: 0,
      };
    }

    const tableRows = selectedItems.map((item) => {
      const multiplierString = item.data ? item.data.toUpperCase() : "X1";

      const multiplier = parseInt(multiplierString.replace("X", ""), 10) || 1;

      const total = item.Number * multiplier;

      return [item.Number, multiplier, total];
    });

    const totalRowSum = tableRows.reduce((acc, row) => acc + row[2], 0);

    return {
      tableRows,
      totalRowSum,
    };
  };

  const { tableRows, totalRowSum } = generateTableData();

  const handleCheckout = () => {
    navigate("/invoice", { state: { data: selectedItems } });
  };

  return (
    <div className="Container">
      <div className="WalletContainer">
        <div className="WalletText">Wallet Allocation: {totalRowSum}</div>
      </div>

      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            border: "1.5px solid black",
          }}
        >
          <tbody>
            {[
              ["Point", "Multiplier", "Total"],
              ...tableRows,
              ["", "Total", totalRowSum],
            ].map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      border: "1.5px solid black",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="WalletAmount">
        <div className="Amount">
          <h5>Wallet Amount</h5>
          <h5>{totalRowSum}</h5>
        </div>
        <div className="Amount">
          <h5>Used</h5>
          <h5>{totalRowSum}</h5>
        </div>
        <div className="Amount">
          <h5>Available</h5>
          <h5>0</h5>
        </div>
        <div className="Amount">
          <h5>You Pay</h5>
          <h5>0</h5>
        </div>
      </div>

      <div className="ButtonContainer">
        <button className="ButtonCheck" onClick={handleCheckout}>
          CheckOut
        </button>
      </div>
    </div>
  );
};

export default Wallet;
