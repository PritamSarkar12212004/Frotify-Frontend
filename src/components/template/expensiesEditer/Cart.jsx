import React from "react";

function Cart({ item }) {
  if (!item) {
    return null; // Early return if item is not provided
  }

  const { icon, name, amount, spend, remainAmount, category } = item;

  // Ensure amount and spend are valid numbers
  const validAmount = typeof amount === "number" ? amount : 0;
  const validSpend = typeof spend === "number" ? spend : 0;
  const validRemainAmount = typeof remainAmount === "number" ? remainAmount : 0;

  // Calculate the   progress percentage safely
  const progressPercentage =
    validAmount > 0 ? (validSpend / validAmount) * 100 : 0;

  return (
    <div className="w-1/2 h-44 border-[2px] border-zinc-300 rounded-xl bg-zinc-100 backdrop-blur-sm shadow-md flex flex-col justify-between cursor-pointer duration-300 px-4 py-4">
      <div className="w-full flex justify-between">
        <span className="flex flex-col text-xl">
          {/* <span>{icon}</span> */}
          <span className="capitalize">{category}</span>
          <span className="text-sm opacity-70 lowercase">{name}</span>
        </span>
        <span className="flex gap-3 text-2xl text-blue-600 font-bold">
          ${validAmount.toFixed(2)}
        </span>
      </div>
      <div className="mt-3">
        {/* Custom Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span className="text-red-500">Spent: ${validSpend.toFixed(2)}</span>
          <span className="text-green-500">
            Remain Amount: ${validRemainAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Cart;
