import React from "react";
import "./style.css";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const { selectedItems } = useCart();
  const navigate = useNavigate();
  const WALLET_AMOUNT = 1400;

  const generateTableData = () => {
    if (!selectedItems.length) {
      return { tableRows: [["", "", "0"]], totalRowSum: 0 };
    }

    const tableRows = selectedItems.map((item) => {
      const multiplierString = item.data ? item.data.toUpperCase() : "X1";
      const multiplier = parseInt(multiplierString.replace("X", ""), 10) || 1;
      const total = item.Number * multiplier;
      return [item.Number, multiplier, total];
    });

    const totalRowSum = tableRows.reduce((acc, row) => acc + row[2], 0);
    return { tableRows, totalRowSum };
  };

  const { tableRows, totalRowSum } = generateTableData();
  const available = totalRowSum < WALLET_AMOUNT ? WALLET_AMOUNT - totalRowSum : 0;
  const youPay = totalRowSum > WALLET_AMOUNT ? totalRowSum - WALLET_AMOUNT : 0;

  const handleCheckout = () => {
    navigate("/invoice", { state: { data: selectedItems } });
  };

  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    border: "1.5px solid black",
  };

  const cellStyle = {
    border: "1.5px solid black",
    padding: "8px",
    textAlign: "left",
  };

  return (
    <div className="Container">
      <div className="WalletContainer">
        <div className="WalletText">Wallet Allocation: {WALLET_AMOUNT}</div>
      </div>

      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <table style={tableStyle}>
          <tbody>
            {[["Point", "Multiplier", "Total"], ...tableRows, ["", "Total", totalRowSum]].map(
              (row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} style={cellStyle}>
                      {cell}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="WalletAmount">
        <div className="Amount">
          <h5>Wallet Amount</h5>
          <h5>{WALLET_AMOUNT}</h5>
        </div>
        <div className="Amount">
          <h5>Used</h5>
          <h5>{totalRowSum}</h5>
        </div>
        <div className="Amount">
          <h5>Available</h5>
          <h5>{available}</h5>
        </div>
        <div className="Amount">
          <h5>You Pay</h5>
          <h5>{youPay}</h5>
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
