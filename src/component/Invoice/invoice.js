import React from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./style.css";

const Invoice = () => {
  const location = useLocation();
  const selectedItems = location.state?.data || [];

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

  const totalPoints = selectedItems.reduce(
    (total, item) => total + Number(item.Number),
    0
  );
  const totalAmount = selectedItems.reduce(
    (total, item) =>
      total +
      Number(item.Number) * (parseInt(item.data.replace("X", ""), 10) || 1),
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
          {selectedItems.map((item, index) => {
            const multiplier = parseInt(item.data.replace("X", ""), 10) || 1;
            const total = item.Number * multiplier;

            return (
              <tr key={index}>
                <td>{`Benefit ${index + 1}`}</td>
                <td>Details</td>
                <td>{item.Number}</td>
                <td>{multiplier}</td>
                <td>{total}</td>
              </tr>
            );
          })}
          <tr className="total-row">
            <td colSpan="2" className="total-label">
              Total
            </td>
            <td className="total-points">{totalPoints}</td>
            <td></td>
            <td className="total-amount">{totalAmount}</td>
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
