import React, { useContext, useEffect, useState } from "react";
import BudgetMaker from "../template/budgetMaker/BudgetMaker";
import BudagetComponents from "../template/budagetComponents/BudagetComponents";
import { motion, AnimatePresence } from "framer-motion";
import AxiosConifg from "../../utils/api/AxiosConifg";
import MainLoading from "../extra/Loading/MainLoading";
import BudgetCreate from "../extra/alert/BudgetCreate";
import {
  FaChartPie,
  FaMoneyBillWave,
  FaPiggyBank,
  FaWallet,
  FaPlus,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0F152A]">
      <BudgetCreate open={open} setOpen={setOpen} />
      {data && dataprofile ? (
        <div className="w-full md:h-[90vh] h-[95vh] relative overflow-y-auto">
          {/* Stats Cards */}
          <motion.div 
            className="w-full grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4 mt-10 md:p-4 p-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Total Amount Card */}
            <motion.div 
              variants={itemVariants}
              className="h-40 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-white/80 text-sm font-medium">Total Amount</span>
                  <span className="text-white text-2xl font-bold mt-1">
                    $ {dataprofile.Budget}
                  </span>
                </div>
                <FaWallet size={40} className="text-white/90 transform group-hover:scale-110 transition-transform duration-300" />
              </div>
            </motion.div>

            {/* Spent Money Card */}
            <motion.div 
              variants={itemVariants}
              className="h-40 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-white/80 text-sm font-medium">Spent Money</span>
                  <span className="text-white text-2xl font-bold mt-1">
                    $ {dataprofile.spend}
                  </span>
                </div>
                <FaChartPie size={40} className="text-white/90 transform group-hover:scale-110 transition-transform duration-300" />
              </div>
            </motion.div>

            {/* Total Budget Card */}
            <motion.div 
              variants={itemVariants}
              className="h-40 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-white/80 text-sm font-medium">Total Budget</span>
                  <span className="text-white text-2xl font-bold mt-1">
                    $ {dataprofile.No_Of_Budget}
                  </span>
                </div>
                <FaPiggyBank size={40} className="text-white/90 transform group-hover:scale-110 transition-transform duration-300" />
              </div>
            </motion.div>
          </motion.div>

          {/* Budget Section */}
          <div className="h-[90vh] w-full py-20 md:px-12 md:block flex flex-col items-center overflow-y-auto">
            <AnimatePresence>
              {createbudgtem && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BudgetMaker
                    setbudgat={setbudgat}
                    dataprofile={dataprofile}
                    setreload={setreload}
                    setOpen={setOpen}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.h1 
              className="w-full text-4xl font-bold text-white md:block flex justify-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              My Budgets
            </motion.h1>

            <div className="w-full mt-5 flex flex-wrap gap-5 md:flex-row flex-col items-center">
              {/* Create New Budget Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="md:w-80 w-[90%] h-44 bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-purple-500/30 shadow-lg flex justify-center items-center cursor-pointer group"
                onClick={() => setbudgat(true)}
              >
                <div className="flex flex-col justify-center items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                    <FaPlus className="text-2xl text-purple-400" />
                  </div>
                  <span className="text-xl text-purple-200 font-medium">Create New Budget</span>
                </div>
              </motion.div>

              {/* Budget Items */}
              <AnimatePresence>
                {data.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BudagetComponents item={item} setreload={setreload} />
                  </motion.div>
                ))}
              </AnimatePresence>
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
