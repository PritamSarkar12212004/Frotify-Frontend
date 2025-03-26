import { motion } from "framer-motion";
import { FaWallet, FaChartLine, FaMoneyBillWave } from "react-icons/fa";

function Cart({ item }) {
  if (!item) {
    return null; // Early return if item is not provided
  }

  const { icon, name, amount, spend, remainAmount, category } = item;

  // Ensure amount and spend are valid numbers
  const validAmount = typeof amount === "number" ? amount : 0;
  const validSpend = typeof spend === "number" ? spend : 0;
  const validRemainAmount = typeof remainAmount === "number" ? remainAmount : 0;

  // Calculate the   progress percentage safely
  const progressPercentage =
    validAmount > 0 ? (validSpend / validAmount) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="md:w-1/2 w-full md:h-44 h-56 bg-[#1A1F2E] rounded-xl border border-white/10 shadow-xl backdrop-blur-sm flex flex-col justify-between cursor-pointer p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FaWallet className="text-xl text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white capitalize">{category}</h3>
              <p className="text-sm text-gray-400 lowercase">{name}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Total Budget</p>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ₹{validAmount.toFixed(2)}
          </h3>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
          <div className="absolute -top-6 right-0">
            <span className="text-sm text-gray-400">{progressPercentage.toFixed(1)}%</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-red-400" />
              <div>
                <p className="text-sm text-gray-400">Spent</p>
                <p className="text-lg font-semibold text-red-400">₹{validSpend.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2">
              <FaChartLine className="text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Remaining</p>
                <p className="text-lg font-semibold text-green-400">₹{validRemainAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Cart;
