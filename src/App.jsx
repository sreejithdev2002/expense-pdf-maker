// import React, { useState, useEffect } from "react";
// import { saveAs } from "file-saver";
// import { PDFDocument, rgb } from "pdf-lib";
// import { FaPlus, FaTrash } from "react-icons/fa";
// import "./App.css";

// const App = () => {
//   const [eventName, setEventName] = useState("");
//   const [eventDate, setEventDate] = useState("");
//   const [expenseName, setExpenseName] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [amount, setAmount] = useState("");
//   const [totalBudget, setTotalBudget] = useState("");
//   const [expenses, setExpenses] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
//     setExpenses(savedExpenses);
//     calculateTotal(savedExpenses);
//   }, []);

//   const calculateTotal = (expenses) => {
//     const totalAmount = expenses.reduce(
//       (acc, expense) => acc + parseFloat(expense.amount),
//       0
//     );
//     setTotal(totalAmount);
//   };

//   const addExpense = () => {
//     if (expenseName && amount) {
//       const newExpenses = [...expenses, { expenseName, quantity, amount }];
//       setExpenses(newExpenses);
//       localStorage.setItem("expenses", JSON.stringify(newExpenses));
//       setExpenseName("");
//       setQuantity("");
//       setAmount("");
//       calculateTotal(newExpenses);
//     }
//   };

//   const deleteExpense = (index) => {
//     const newExpenses = expenses.filter((_, i) => i !== index);
//     setExpenses(newExpenses);
//     localStorage.setItem("expenses", JSON.stringify(newExpenses));
//     calculateTotal(newExpenses);
//   };

//   const downloadPDF = async () => {
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 700]);
//     const { height } = page.getSize();

//     const tableStartY = height - 120;
//     let yPosition = tableStartY;

//     const formattedDate = new Date(eventDate).toLocaleDateString('en-GB', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//       weekday: 'long',
//     });

//     page.drawText(`${eventName}`, {
//       x: 50,
//       y: height - 50,
//       size: 20,
//       color: rgb(0, 0, 0),
//     });

//     page.drawText(formattedDate || "", {
//       x: 400,
//       y: height - 50,
//       size: 12,
//       color: rgb(0, 0, 0),
//     });

//     page.drawText("S.No.       Expense Name                    Quantity      Amount", {
//       x: 50,
//       y: yPosition,
//       size: 12,
//       color: rgb(0, 0, 0),
//     });

//     yPosition -= 20;

//     expenses.forEach((expense, index) => {
//       const xPositions = [50, 105, 255, 320];

//       page.drawText(`${index + 1}`, {
//         x: xPositions[0],
//         y: yPosition,
//         size: 12,
//         color: rgb(0, 0, 0),
//       });

//       page.drawText(`${expense.expenseName}`, {
//         x: xPositions[1],
//         y: yPosition,
//         size: 12,
//         color: rgb(0, 0, 0),
//       });

//       page.drawText(`${expense.quantity}`, {
//         x: xPositions[2],
//         y: yPosition,
//         size: 12,
//         color: rgb(0, 0, 0),
//       });

//       page.drawText(`${expense.amount}`, {
//         x: xPositions[3],
//         y: yPosition,
//         size: 12,
//         color: rgb(0, 0, 0),
//       });

//       yPosition -= 20;
//     });

//     const balance = totalBudget ? totalBudget - total : "N/A";

//     page.drawText(`Total Budget: ${totalBudget || "N/A"}`, {
//       x: 50,
//       y: yPosition - 20,
//       size: 14,
//       color: rgb(0, 0, 0),
//     });

//     page.drawText(`Total Amount Spent: ${total}`, {
//       x: 50,
//       y: yPosition - 40,
//       size: 14,
//       color: rgb(0, 0, 0),
//     });

//     page.drawText(`Balance Amount: ${balance}`, {
//       x: 50,
//       y: yPosition - 60,
//       size: 14,
//       color: rgb(0, 0, 0),
//     });

//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });
//     saveAs(blob, `${eventName || "expenses_report"}.pdf`);
//   };

//   return (
//     <div className="container">
//       <h1>Expense PDF Maker</h1>

//       <div className="input-container">
//         <input type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
//         <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
//         <input type="number" placeholder="Total Budget" value={totalBudget} onChange={(e) => setTotalBudget(e.target.value)} />
//         <input type="text" placeholder="Expense Name" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
//         <input type="text" placeholder="Quantity (e.g., 1kg, 4 nos)" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
//         <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
//         <button onClick={addExpense}><FaPlus /></button>
//       </div>

//       <ul>
//         {expenses.map((expense, index) => (
//           <li key={index}>{expense.expenseName} ({expense.quantity}): ₹{expense.amount} <button onClick={() => deleteExpense(index)}><FaTrash /></button></li>
//         ))}
//       </ul>

//       <div>Total Amount Spent: ₹{total}</div>
//       <div>Balance Amount: ₹{totalBudget ? totalBudget - total : "N/A"}</div>

//       <button onClick={downloadPDF}>Download PDF</button>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { PDFDocument, rgb } from "pdf-lib";
import * as fontkit from "fontkit";
import { FaPlus, FaTrash, FaDownload } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
    calculateTotal(savedExpenses);
  }, []);

  const calculateTotal = (expenses) => {
    const totalAmount = expenses.reduce(
      (acc, expense) => acc + parseFloat(expense.amount),
      0
    );
    setTotal(totalAmount);
  };

  const addExpense = () => {
    if (expenseName && amount) {
      const newExpenses = [...expenses, { expenseName, quantity, amount }];
      setExpenses(newExpenses);
      localStorage.setItem("expenses", JSON.stringify(newExpenses));
      setExpenseName("");
      setQuantity("");
      setAmount("");
      calculateTotal(newExpenses);
    }
  };

  const deleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
    calculateTotal(newExpenses);
  };

  const downloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit); // Register fontkit

    const fontBytes = await fetch("/NotoSans-Regular.ttf").then((res) =>
      res.arrayBuffer()
    );
    const customFont = await pdfDoc.embedFont(fontBytes);

    const page = pdfDoc.addPage([600, 700]);
    const { height } = page.getSize();

    const tableStartY = height - 120;
    let yPosition = tableStartY;

    const formattedDate = new Date(eventDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    });

    page.drawText(`${eventName}`, {
      x: 50,
      y: height - 50,
      size: 20,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(formattedDate || "", {
      x: 400,
      y: height - 50,
      size: 12,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(
      "S.No.       Expense Name                    Quantity      Amount",
      {
        x: 50,
        y: yPosition,
        size: 12,
        font: customFont,
        color: rgb(0, 0, 0),
      }
    );

    yPosition -= 20;

    expenses.forEach((expense, index) => {
      const xPositions = [50, 105, 255, 320];

      page.drawText(`${index + 1}`, {
        x: xPositions[0],
        y: yPosition,
        size: 12,
        font: customFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(`${expense.expenseName}`, {
        x: xPositions[1],
        y: yPosition,
        size: 12,
        font: customFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(`${expense.quantity}`, {
        x: xPositions[2],
        y: yPosition,
        size: 12,
        font: customFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(`₹${expense.amount}/-`, {
        // Rupee symbol added
        x: xPositions[3],
        y: yPosition,
        size: 12,
        font: customFont,
        color: rgb(0, 0, 0),
      });

      yPosition -= 20;
    });

    const balance = totalBudget ? totalBudget - total : "N/A";

    page.drawText(`Total Budget: ₹${totalBudget || "N/A"}/-`, {
      x: 50,
      y: yPosition - 20,
      size: 14,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Total Amount Spent: ₹${total}/-`, {
      x: 50,
      y: yPosition - 40,
      size: 14,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Balance Amount: ₹${balance}/-`, {
      x: 50,
      y: yPosition - 60,
      size: 14,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, `${eventName || "expenses_report"}.pdf`);

    localStorage.removeItem("expenses");
    setExpenses([]);
    setTotal(0);
    setTotalBudget("");
    setEventName("");
    setEventDate("");
  };

  return (
    <div className="container">
      <h1>Expense PDF Maker</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total Budget"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
        />
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quantity (e.g., 1kg, 4 nos)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>
          <FaPlus />
        </button>
      </div>

      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.expenseName} ({expense.quantity}): ₹{expense.amount}{" "}
            <button onClick={() => deleteExpense(index)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      <br />
      <div>Total Amount Spent: ₹{total}</div>
      <div>Balance Amount: ₹{totalBudget ? totalBudget - total : "N/A"}</div>
      <br />
      <button onClick={downloadPDF}>
        Download PDF <FaDownload />
      </button>

      <div className="footer">
        <div className="footer-content">
          Made by <span className="owner-name">Sreejith Dev</span>
        </div>
      </div>
    </div>
  );
};

export default App;
