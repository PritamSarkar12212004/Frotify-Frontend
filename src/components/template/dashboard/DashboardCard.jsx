import React, { useEffect, useState } from "react";
import { FaWallet, FaChartPie, FaPiggyBank, FaArrowUp, FaArrowDown, FaEquals } from "react-icons/fa"; // Modern icons
import { motion } from "framer-motion"; // Animation library

function DashboardCard({data}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8"
    >
      {/* Total Amount Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="relative bg-[#1A1F2E]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <FaWallet className="text-green-400 text-2xl" />
            </div>
            <div className="flex items-center text-green-400">
              <FaArrowUp className="mr-1" />
              <span className="text-sm font-medium">Total Amount</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-white">₹{data.Budget}</p>
            <p className="text-gray-400 text-sm mt-1">Available balance</p>
          </div>
        </div>
      </motion.div>

      {/* Spent Money Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="relative bg-[#1A1F2E]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <FaChartPie className="text-red-400 text-2xl" />
            </div>
            <div className="flex items-center text-red-400">
              <FaArrowDown className="mr-1" />
              <span className="text-sm font-medium">Spent Money</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-white">₹{data.spend}</p>
            <p className="text-gray-400 text-sm mt-1">Total expenses</p>
          </div>
        </div>
      </motion.div>

      {/* Total Budget Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="relative bg-[#1A1F2E]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FaPiggyBank className="text-blue-400 text-2xl" />
            </div>
            <div className="flex items-center text-blue-400">
              <FaEquals className="mr-1" />
              <span className="text-sm font-medium">Total Budget</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-white">₹{data.No_Of_Budget}</p>
            <p className="text-gray-400 text-sm mt-1">Monthly limit</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DashboardCard;
