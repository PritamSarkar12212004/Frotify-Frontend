import { useEffect, useState } from "react";
import DashboardCard from "../template/dashboard/DashboardCard";
import HotoryBadaget from "../template/Hotory&Badaget/HotoryBadaget";
import AxiosConifg from "../../utils/api/AxiosConifg";
import MainLoading from '../extra/Loading/MainLoading';
import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaWallet, FaHandHoldingUsd } from "react-icons/fa";

function Dashbord() {
  document.title = "Dashboard";
  const [data, setData] = useState(null);
  const auth = localStorage.getItem("userAuth");

  useEffect(() => {
    AxiosConifg.post("/profile/cheker", auth)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);

  return (
    <div className="min-h-screen bg-[#0F152A] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        ></motion.div>
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        ></motion.div>

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: ["0%", "100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
          ></motion.div>
        </div>
      </div>

      <AnimatePresence>
        {data ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 h-[90vh] w-full px-4 sm:px-7 overflow-y-auto"
          >
            {/* Header Section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-col gap-3 sm:px-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
                  >
                    Hi, {data.name}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-lg mt-2"
                  >
                    Let's manage your finances together
                  </motion.p>
                </div>
                
                {/* Quick Stats */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4 flex-wrap"
                >
                  <div className="bg-[#1A1F2E]/80 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                    <FaChartLine className="text-blue-400 text-2xl mb-2" />
                    <p className="text-gray-300 text-sm">Total Balance</p>
                    <p className="text-white text-xl font-semibold">₹{data.balance}</p>
                  </div>
                  <div className="bg-[#1A1F2E]/80 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                    <FaWallet className="text-purple-400 text-2xl mb-2" />
                    <p className="text-gray-300 text-sm">Monthly Budget</p>
                    <p className="text-white text-xl font-semibold">₹{data.budget}</p>
                  </div>
                  <div className="bg-[#1A1F2E]/80 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                    <FaHandHoldingUsd className="text-green-400 text-2xl mb-2" />
                    <p className="text-gray-300 text-sm">Total Savings</p>
                    <p className="text-white text-xl font-semibold">₹{data.savings}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full mt-8 space-y-8"
            >
              <DashboardCard data={data} />
              <HotoryBadaget />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <MainLoading />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashbord;
