import React from "react";
import Expenses from "../template/expense/Expenses";

function ExpensesPage() {
  document.title = "Expenses";
  return (
    <div className="w-full md:h-[90vh] h-[95vh] ">
      <Expenses />
    </div>
  );
}

export default ExpensesPage;
