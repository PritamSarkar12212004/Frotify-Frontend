import React from "react";

import { GiReceiveMoney } from "react-icons/gi";

function HIstoryExpense({ history }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US");
  };
  return (
    <div className="w-full flex justify-center">
      <div className=" w-full bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-600 uppercase tracking-wide p-4 border-b">
          <div>Name</div>
          <div>Money</div>
          <div>Date</div>
        </div>

        <div>
          {history.map((item) => (
            <div
              key={item.id}
              className={`grid grid-cols-5 gap-4 p-3 mb-2 rounded-lg shadow-md transform transition duration-500   hover:shadow-lg `}
            >
              <div className="flex items-center">
                <span>{item.name}</span>
              </div>
              <div className="flex items-center">
                <GiReceiveMoney className="text-xl mr-2 text-blue-500" />
                <span>${item.amount}</span>
              </div>
              <div className="whitespace-nowrap">
                {formatDate(item.createdAt)}
              </div>

            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HIstoryExpense;
