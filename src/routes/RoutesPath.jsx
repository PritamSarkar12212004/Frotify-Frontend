import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashbord from "../components/page/Dashbord";
import Budaget from "../components/page/Budaget";
import ExpensesPage from "../components/page/ExpensesPage";
import Private from "./private/Private";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Money from "../components/page/Money";
import ExpenseEdit from "../components/page/ExpenseEdit";

function RoutesPath() {
  return (
    <Routes>
      <Route element={<Private />}>
        <Route path="/" element={<Dashbord />} />
        <Route path="/wallet" element={<Budaget />} />
        <Route path="/money" element={<Money />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/expenses/:id" element={<ExpenseEdit />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default RoutesPath;
