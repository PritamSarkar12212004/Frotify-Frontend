import React from "react";

function Budaget({ item }) {
  const { icon, name, amount, spend, remainAmount, category } = item;
  const progressPercentage = (spend / amount) * 100;

  return (
    <div className="w-full h-32 border-[2px] border-zinc-400 rounded-xl bg-zinc-200 backdrop-blur-sm shadow-md flex flex-col justify-between cursor-pointer duration-300 sm:px-4 py-4">
      <div className="w-full flex justify-between">
        <span className="flex flex-col  text-xl">
          {/* <span>{icon}</span> */}
          <span className=" capitalize font-bold">{category}</span>
          <span className="text-sm opacity-70 lowercase  font-bold">
            {name}
          </span>
        </span>
        <span className="flex gap-3 text-2xl text-blue-600 font-bold">
          ${amount.toFixed(2)}
        </span>
      </div>
      <div className="mt-3">
        {/* Custom Progress Bar */}
        <div className="w-full bg-gray-400 rounded-full h-3">
          <div
            className="bg-red-600 h-3 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span className="text-red-500 font-bold">
            Spent: {spend.toFixed(2)}
          </span>
          <span className="text-orange-500 font-bold">
            Remain Amount: {remainAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Budaget;
