import React, { useEffect, useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaMoneyBillWave, FaRegCreditCard } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import AxiosConifg from "../../../utils/api/AxiosConifg";
import MainLoading from '../../extra/Loading/MainLoading'

function Expenses() {
  const [data, setData] = useState([]);
  const [moneydata, setMoneydata] = useState([]);
  const [reload, setReload] = useState("");
  const auth = localStorage.getItem("userAuth");
  const expensesRef = useRef();

  const deleteControl = (id) => {
    AxiosConifg.post("/expense/delete", id)
      .then((res) => {
        setReload(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const expenseHistory = () => {
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
    expenseHistory();
    moneyHistory();
  }, [reload]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US");
  };

  return (
    <div>
      {
        data  && moneydata? (
          <div className="flex flex-col items-center w-full md:p-4 px-2 md:h-[90vh] h-[95vh] overflow-y-auto">
          <h1 className="text-4xl font-bold text-blue-800 mb-6 animate-pulse">
            My Expenses
          </h1>
          <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg">
            <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-600 uppercase tracking-wide p-4 border-b">
              <div>Name</div>
              <div>Money</div>
              <div>Date</div>
              <div>Type</div>
            </div>
    
            <div ref={expensesRef}>
              {moneydata.map((item) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-5 gap-4 p-3 mb-2 rounded-lg shadow-md transform transition duration-500   hover:shadow-lg ${
                    item.transType === "Credit" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-xl mr-2 text-green-600" />
                    <span>{item.category}</span>
                  </div>
                  <div className="flex items-center">
                    <GiReceiveMoney className="text-xl mr-2 text-blue-500" />
                    <span>${item.amount}</span>
                  </div>
                  <div className="whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <FaRegCreditCard className="text-xl mr-2 text-purple-500" />
                    <span>{item.transType}</span>
                  </div>
                 
                </div>
              ))}
    
              {data.map((item) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-5 gap-4 p-3 mb-2 rounded-lg shadow-md transform transition duration-500   hover:shadow-lg ${
                    item.transType === "Debit" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-xl mr-2 text-green-600" />
                    <span>{item.category}</span>
                  </div>
                  <div className="flex items-center">
                    <GiReceiveMoney className="text-xl mr-2 text-blue-500" />
                    <span>${item.amount}</span>
                  </div>
                  <div className="whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <FaRegCreditCard className="text-xl mr-2 text-purple-500" />
                    <span>{item.transType}</span>
                  </div>
               
                </div>
              ))}
            </div>
          </div>
        </div>
        ):<MainLoading/>
      }
   </div>
  );
}

export default Expenses;
