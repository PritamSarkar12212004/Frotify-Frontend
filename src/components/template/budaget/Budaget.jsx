import { motion } from "framer-motion";
import { FaWallet, FaChartLine, FaPiggyBank } from "react-icons/fa";

function Budaget({ item }) {
  const { icon, name, amount, spend, remainAmount, category } = item;
  const progressPercentage = (spend / amount) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full h-32 bg-gradient-to-br from-[#1A1F2E] to-[#2A3142] rounded-xl border border-white/10 backdrop-blur-sm shadow-lg flex flex-col justify-between p-4 group"
    >
      {/* Header Section */}
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FaWallet className="text-purple-400" />
            </div>
            <span className="text-white font-semibold capitalize">{category}</span>
          </div>
          <span className="text-gray-400 text-sm font-medium">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white text-xl font-bold">${amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-3">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
          />
        </div>

        {/* Stats */}
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaChartLine className="text-red-400" />
            <span className="text-gray-400 text-sm">Spent: <span className="text-red-400 font-semibold">${spend.toFixed(2)}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <FaPiggyBank className="text-green-400" />
            <span className="text-gray-400 text-sm">Left: <span className="text-green-400 font-semibold">${remainAmount.toFixed(2)}</span></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Budaget;
