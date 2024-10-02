import React, { useEffect, useState } from "react";
import AxiosConifg from "../../../utils/api/AxiosConifg";

const HistoryLog = () => {
  const [history, setHistory] = useState([
    {
      id: 1,
      name: "Groceries",
      money: "$50",
      date: "2024-09-28",
      type: "Debit",
    },
    {
      id: 2,
      name: "Transport",
      money: "$20",
      date: "2024-09-29",
      type: "Debit",
    },
    {
      id: 3,
      name: "Salary",
      money: "$1000",
      date: "2024-09-30",
      type: "Credit",
    },
  ]);

  const [data, setData] = useState([]);
  const auth = localStorage.getItem("userAuth");
  const [moneydata, setMoneydata] = useState([]);

  const handleDelete = (id) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  const expensive = () => {
    AxiosConifg.post("/expense/cheker", auth)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const moneyHistory = () => {
    AxiosConifg.post("/money/cheker", auth)
      .then((res) => {
        setMoneydata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    expensive();
    moneyHistory();
  }, []);

  // Function to format date as MM/DD/YYYY
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US");
  };

  return (
    <>
      {data ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white relative">
            <thead className="sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Money
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className={
                    item.transType === "Credit" ? "bg-red-200" : "bg-green-200"
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm">{formatDate(item.createdAt)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.transType}
                  </td>
                </tr>
              ))}
              {moneydata.map((item) => (
                <tr
                  key={item.id}
                  className={
                    item.transType === "Credit" ? "bg-red-200" : "bg-green-200"
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm">{formatDate(item.createdAt)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.transType}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

export default HistoryLog;
