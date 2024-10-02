import React from "react";
import Expenses from "../template/expense/Expenses";

function ExpensesPage() {
  document.title = "Expenses";
  return (
    <div className="w-full h-[90vh] ">
      <Expenses />
    </div>
  );
}

export default ExpensesPage;
