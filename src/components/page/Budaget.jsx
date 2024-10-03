import React, { useContext, useEffect, useState } from "react";
import BudgetMaker from "../template/budgetMaker/BudgetMaker";
import BudagetComponents from "../template/budagetComponents/BudagetComponents";
import { motion } from "framer-motion"; // Animation library
import AxiosConifg from "../../utils/api/AxiosConifg";
import MainLoading from "../extra/Loading/MainLoading";
import BudgetCreate from "../extra/alert/BudgetCreate";
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
  const [reload, setreload] = useState([]);
  const [open, setOpen] = useState(false);

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
    <div>
      <BudgetCreate open={open} setOpen={setOpen} />
      {data && dataprofile ? (
        <div className="w-full md:h-[90vh] h-[95vh] relative overflow-y-auto">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-2 mt-10 md:p-4 p-2">
            {/* Total Money Card */}

            {/* Total Budget Card */}
            <motion.div className="h-40 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl shadow-lg flex justify-between items-center p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="flex flex-col text-center">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold mt-1">
                  $ {dataprofile.Budget}
                </span>
              </div>
              <FaWallet size={50} className="text-white opacity-90" />
            </motion.div>

            {/* Spent Money Card */}
            <motion.div className="h-40 bg-gradient-to-br from-red-400 to-red-600 text-white rounded-xl shadow-lg flex justify-between items-center p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="flex flex-col text-center">
                <span className="text-lg font-semibold">Spend Money</span>
                <span className="text-2xl font-bold mt-1">
                  $ {dataprofile.spend}
                </span>
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

          <div className="h-[90vh] w-full py-20 md:px-12 md:block flex flex-col items-center    overflow-y-auto">
            {createbudgtem ? (
              <BudgetMaker
                setbudgat={setbudgat}
                dataprofile={dataprofile}
                setreload={setreload}
                setOpen={setOpen}
              />
            ) : null}
            <div className="w-full text-4xl font-bold font-mono md:block flex  justify-center">
              {" "}
              My Budgets
            </div>
            <div className="w-full mt-5 flex flex-wrap gap-5 md:flex-row flex-col items-center ">
              <div
                className=" md:w-80 w-[90%] h-44 border-[2px] border-dotted border-zinc-300 rounded-xl bg-zinc-100 backdrop-blur-sm shadow-md flex justify-center items-center cursor-pointer hover:bg-slate-300 duration-300"
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
        </div>
      ) : (
        <MainLoading />
      )}
    </div>
  );
}

export default Budaget;
