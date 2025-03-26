import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillDelete } from "react-icons/ai";
import { FaMoneyBillWave, FaRegCreditCard, FaCalendarAlt } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import AxiosConifg from "../../../utils/api/AxiosConifg";
import MainLoading from '../../extra/Loading/MainLoading';

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0F152A] p-4 md:p-8">
      {data && moneydata ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              My Expenses
            </h1>
            <p className="text-gray-400 mt-2">Track your spending and income</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              variants={itemVariants}
              className="bg-[#1A1F2E] p-6 rounded-xl border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Expenses</p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    ${data.reduce((acc, item) => acc + item.amount, 0)}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <BsArrowUpRight className="text-xl text-red-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-[#1A1F2E] p-6 rounded-xl border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Income</p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    ${moneydata.reduce((acc, item) => acc + item.amount, 0)}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <BsArrowDownRight className="text-xl text-green-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-[#1A1F2E] p-6 rounded-xl border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Transactions</p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {data.length + moneydata.length}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <FaRegCreditCard className="text-xl text-purple-400" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Transactions Table */}
          <motion.div
            variants={itemVariants}
            className="bg-[#1A1F2E] rounded-xl border border-white/10 overflow-hidden"
          >
            <div className="p-4 border-b border-white/10">
              <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-400">
                <div>Name</div>
                <div>Amount</div>
                <div>Date</div>
                <div>Type</div>
                <div>Action</div>
              </div>
            </div>

            <div ref={expensesRef} className="divide-y divide-white/10">
              <AnimatePresence>
                {moneydata.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -100 }}
                    className={`grid grid-cols-5 gap-4 p-4 items-center hover:bg-white/5 transition-colors duration-300 ${
                      item.transType === "Credit" ? "bg-red-500/10" : "bg-green-500/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <FaMoneyBillWave className="text-xl text-purple-400" />
                      </div>
                      <span className="text-white">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <GiReceiveMoney className="text-xl text-blue-400" />
                      </div>
                      <span className="text-white">${item.amount}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                        <FaCalendarAlt className="text-xl text-yellow-400" />
                      </div>
                      <span className="text-white whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <FaRegCreditCard className="text-xl text-indigo-400" />
                      </div>
                      <span className="text-white">{item.transType}</span>
                    </div>
                    <div className="flex items-center justify-end">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteControl(item.id)}
                        className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors duration-300"
                      >
                        <AiFillDelete className="text-xl" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}

                {data.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -100 }}
                    className={`grid grid-cols-5 gap-4 p-4 items-center hover:bg-white/5 transition-colors duration-300 ${
                      item.transType === "Debit" ? "bg-green-500/10" : "bg-red-500/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <FaMoneyBillWave className="text-xl text-purple-400" />
                      </div>
                      <span className="text-white">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <GiReceiveMoney className="text-xl text-blue-400" />
                      </div>
                      <span className="text-white">${item.amount}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                        <FaCalendarAlt className="text-xl text-yellow-400" />
                      </div>
                      <span className="text-white whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <FaRegCreditCard className="text-xl text-indigo-400" />
                      </div>
                      <span className="text-white">{item.transType}</span>
                    </div>
                    <div className="flex items-center justify-end">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteControl(item.id)}
                        className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors duration-300"
                      >
                        <AiFillDelete className="text-xl" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <MainLoading />
      )}
    </div>
  );
}

export default Expenses;
