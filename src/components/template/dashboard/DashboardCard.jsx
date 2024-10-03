import React, { useEffect, useState } from "react";
import { FaWallet, FaChartPie, FaPiggyBank } from "react-icons/fa"; // Modern icons
import { motion } from "framer-motion"; // Animation library

function DashboardCard({data}) {


  return (
    <>
      {data ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 sm:gap-8 gap-2 mt-10 sm:p-4 p-2">
          {/* Total Budget Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="h-40 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl shadow-lg flex justify-between items-center p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex flex-col text-center">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-2xl font-bold mt-1">$ {data.Budget}</span>
            </div>
            <FaWallet size={50} className="text-white opacity-90" />
          </motion.div>

          {/* Spent Money Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-40 bg-gradient-to-br from-red-400 to-red-600 text-white rounded-xl shadow-lg flex justify-between items-center p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex flex-col text-center">
              <span className="text-lg font-semibold">Spend Money</span>
              <span className="text-2xl font-bold mt-1">$ {data.spend}</span>
            </div>
            <FaChartPie size={50} className="text-white opacity-90" />
          </motion.div>

          {/* Remaining Money Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl shadow-lg flex justify-between items-center p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex flex-col text-center">
              <span className="text-lg font-semibold">Total Budget</span>
              <span className="text-2xl font-bold mt-1">
                $ {data.No_Of_Budget}
              </span>
            </div>
            <FaPiggyBank size={50} className="text-white opacity-90" />
          </motion.div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </>
  );
}

export default DashboardCard;
