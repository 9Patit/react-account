import Transaction from "./component/Transaction";
import "./App.css";
import FormComponent from "./component/FormComponent";
import { useState, useEffect } from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./component/ReportComponent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const design = { color: "black", textAlign: "center" };

  const initData = [
    { id: 1, title: "เงินเดือน", amount: 30000 },
    { id: 2, title: "ค่าเช่าบ้าน", amount: -1200 },
  ];

  const [items, setItem] = useState(initData);
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  const onAddNewItem = (newItem) => {
    setItem((prevItem) => {
      return [newItem, ...prevItem];
    });
  };

  useEffect(() => {
    const amouts = items.map((items) => items.amount);
    const income = amouts
      .filter((element) => element > 0)
      .reduce((total, element) => (total += element), 0);
    const expense =
      amouts
        .filter((element) => element < 0)
        .reduce((total, element) => (total += element), 0) * -1;

    setReportIncome(income.toFixed(2));
    setReportExpense(expense.toFixed(2));
  }, [items, reportIncome, reportExpense]);

  return (
    <DataContext.Provider
      value={{ income: reportIncome, expense: reportExpense }}
    >
      <div className="container">
        <h1 style={design}>บัญชีรายรับรายจ่าย</h1>
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            
            <Routes>
              <Route path="/"  element={<ReportComponent />} />
              <Route
                path="/insert"
                element={
                  <>
                    <FormComponent onAddItem={onAddNewItem} />
                    <Transaction item={items} />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default App;
