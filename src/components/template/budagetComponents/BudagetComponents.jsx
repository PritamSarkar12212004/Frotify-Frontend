import React from "react";
import { NavLink } from "react-router-dom";

function BudagetComponents({ item }) {
  const { icon, name, amount, spend, remainAmount, category } = item;

  // Calculate the percentage of spending relative to the total amount
  const progressPercentage = (spend / amount) * 100;

  return (
    <NavLink to={`/expenses/${item._id}`}>
      <div className="w-80 h-44 border-[2px] border-zinc-300 rounded-xl bg-zinc-300 backdrop-blur-sm shadow-md flex flex-col justify-between cursor-pointer duration-300 px-4 py-4">
        <div className="w-full flex justify-between">
          <span className="flex flex-col  text-xl">
            {/* <span>{icon}</span> */} 
            <span className=" capitalize font-bold">{category}</span>
            <span className="text-sm opacity-70 lowercase  font-bold">{name}</span>
          </span>
          <span className="flex gap-3 text-2xl text-blue-600 font-bold">
            ${amount.toFixed(2)}
          </span>
        </div>
        <div className="mt-3">
          {/* Custom Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-red-600 h-3 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span className="text-red-500">Spent: {spend.toFixed(2)}</span>
            <span className="text-orange-500  font-bold">
              Re. Amo.: {remainAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default BudagetComponents;
