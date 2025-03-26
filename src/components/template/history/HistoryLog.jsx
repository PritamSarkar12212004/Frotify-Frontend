import { useEffect, useState } from "react";
import AxiosConifg from "../../../utils/api/AxiosConifg";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaCalendarAlt, FaWallet } from "react-icons/fa";

const HistoryLog = () => {
  const [data, setData] = useState([]);
  const [moneydata, setMoneydata] = useState([]);
  const auth = localStorage.getItem("userAuth");

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1A1F2E]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Transaction History
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-green-400">
              <FaArrowUp />
              <span className="text-sm">Income</span>
            </div>
            <div className="flex items-center gap-2 text-red-400">
              <FaArrowDown />
              <span className="text-sm">Expense</span>
            </div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence>
              {data.map((item) => (
              <motion.div
                  key={item.id}
                variants={itemVariants}
                className={`relative group ${
                  item.transType === "Credit" ? "bg-red-500/10" : "bg-green-500/10"
                } rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      item.transType === "Credit" ? "bg-red-500/20" : "bg-green-500/20"
                    }`}>
                      <FaWallet className={`text-xl ${
                        item.transType === "Credit" ? "text-red-400" : "text-green-400"
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{item.category}</h3>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <FaCalendarAlt />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
                      item.transType === "Credit" ? "text-red-400" : "text-green-400"
                    }`}>
                      ₹{item.amount}
                    </p>
                    <p className="text-sm text-gray-400">
                    {item.transType}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
              {moneydata.map((item) => (
              <motion.div
                  key={item.id}
                variants={itemVariants}
                className={`relative group ${
                  item.transType === "Credit" ? "bg-red-500/10" : "bg-green-500/10"
                } rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      item.transType === "Credit" ? "bg-red-500/20" : "bg-green-500/20"
                    }`}>
                      <FaWallet className={`text-xl ${
                        item.transType === "Credit" ? "text-red-400" : "text-green-400"
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{item.category}</h3>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <FaCalendarAlt />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
                      item.transType === "Credit" ? "text-red-400" : "text-green-400"
                    }`}>
                      ₹{item.amount}
                    </p>
                    <p className="text-sm text-gray-400">
                    {item.transType}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
        </div>
  );
};

export default HistoryLog;
