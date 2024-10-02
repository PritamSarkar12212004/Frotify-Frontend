import React, { useContext, useEffect, useState } from "react";
import BudgetMaker from "../template/budgetMaker/BudgetMaker";
import BudagetComponents from "../template/budagetComponents/BudagetComponents";
import { motion } from "framer-motion"; // Animation library

import AxiosConifg from "../../utils/api/AxiosConifg";
import {
  FaChartPie,
  FaMoneyBillWave,
  FaPiggyBank,
  FaWallet,
} from "react-icons/fa";
function Budaget() {
  document.title = "Budget";
  const [data, setdata] = useState([]);
  const [dataprofile, setprofiledata] = useState([]);
  const [createbudgtem, setbudgat] = useState(false);
  const auth = localStorage.getItem("userAuth");
  const [reload, setreload] = useState(false);

  const userProfileCkeker = () => {
    AxiosConifg.post("/profile/cheker", auth)
      .then((res) => {
        setprofiledata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ExpenseCheker = () => {
    AxiosConifg.post("/expense/cheker", auth)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    userProfileCkeker();
    ExpenseCheker();
  }, [reload]);
  return (
    <div className="w-full h-[90vh] overflow-y-auto">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 p-4">
        {/* Total Money Card */}

        {/* Total Budget Card */}
        <motion.div className="h-40 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl shadow-lg flex justify-between items-center p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="flex flex-col text-center">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-2xl font-bold mt-1">$ {dataprofile.Budget}</span>
          </div>
          <FaWallet size={50} className="text-white opacity-90" />
        </motion.div>

        {/* Spent Money Card */}
        <motion.div className="h-40 bg-gradient-to-br from-red-400 to-red-600 text-white rounded-xl shadow-lg flex justify-between items-center p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="flex flex-col text-center">
            <span className="text-lg font-semibold">Spend Money</span>
            <span className="text-2xl font-bold mt-1">$ {dataprofile.spend}</span>
          </div>
          <FaChartPie size={50} className="text-white opacity-90" />
        </motion.div>

        {/* Remaining Money Card */}
        <motion.div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl shadow-lg flex justify-between items-center p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="flex flex-col text-center">
            <span className="text-lg font-semibold">Total Budget</span>
            <span className="text-2xl font-bold mt-1">
              $ {dataprofile.No_Of_Budget}
            </span>
          </div>
          <FaPiggyBank size={50} className="text-white opacity-90" />
        </motion.div>
      </div>
      {data ? (
        <div className="h-[90vh] w-full py-20 px-12  overflow-y-auto">
          {createbudgtem ? (
            <BudgetMaker
              setbudgat={setbudgat}
              dataprofile={dataprofile}
              setreload={setreload}
            />
          ) : null}
          <div className="w-full text-4xl font-bold font-mono"> My Budgets</div>
          <div className="w-full mt-5 flex flex-wrap gap-5">
            <div
              className="w-80 h-44 border-[2px] border-dotted border-zinc-300 rounded-xl bg-zinc-100 backdrop-blur-sm shadow-md flex justify-center items-center cursor-pointer hover:bg-slate-300 duration-300"
              onClick={() => setbudgat(true)}
            >
              <span className="flex flex-col justify-center items-center gap-1">
                <span className="text-2xl ">
                  {" "}
                  <i class="ri-add-large-fill"></i>
                </span>
                <span className="text-xl">Create New Budget</span>
              </span>
            </div>
            {data.map((item, index) => {
              return <BudagetComponents item={item} setreload={setreload} />;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Budaget;
