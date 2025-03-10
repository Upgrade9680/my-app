import React from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./style.css";

const Invoice = () => {
  const location = useLocation();
  const selectedItems = location.state?.data || [];
  
  console.log('Received data:', location.state);
  console.log('Selected items:', selectedItems);

  // Remove the filter since we're already receiving selected items
  const filteredItems = selectedItems;

  const generatePDF = async () => {
    const invoiceElement = document.querySelector(".invoice-container");

    if (!invoiceElement) {
      console.error("Invoice element not found");
      return;
    }

    const canvas = await html2canvas(invoiceElement, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  const calculateXValue = (data) => {
    return data === 'X0.5' ? 0.5 : (data.includes('X') ? parseFloat(data.replace("X", "")) : 0.5);
  };

  const totalPoints = filteredItems.reduce(
    (total, item) => total + Number(item.Number),
    0
  );
  const totalAmount = filteredItems.reduce(
    (total, item) => {
      console.log('Item data:', item.data);
      const xValue = calculateXValue(item.data);
      console.log('Calculated X value:', xValue);
      return total + (Number(item.Number) * xValue);
    },
    0
  );

  return (
    <div className="invoice-container">
      <h3>Invoice Summary</h3>
      <div className="table-header">Flexible Benefits Solution - Invoice</div>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Benefit</th>
            <th>Description</th>
            <th>Points</th>
            <th>Multiplier</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => {
            console.log('Processing item:', item);
            const xValue = calculateXValue(item.data);
            const total = Number(item.Number) * xValue;
            console.log('Row calculation:', { points: item.Number, xValue, total });

            return (
              <tr key={index}>
                <td>{item.value}</td>
                <td>Details</td>
                <td>{item.Number}</td>
                <td>{xValue}</td>
                <td>{total.toFixed(2)}</td>
              </tr>
            );
          })}
          <tr className="total-row">
            <td colSpan="2" className="total-label">
              Total
            </td>
            <td className="total-points">{totalPoints}</td>
            <td></td>
            <td className="total-amount">{totalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <button className="print-btn" onClick={generatePDF}>
        Print PDF
      </button>
    </div>
  );
};

export default Invoice;
