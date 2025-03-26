import { motion, AnimatePresence } from "framer-motion";
import { FaHistory, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";

function HIstoryExpense({ history }) {
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <FaHistory className="text-xl text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Expense History</h2>
      </div>

      {/* Table */}
      <div className="bg-[#1A1F2E] rounded-xl border border-white/10 shadow-xl overflow-hidden">
        {/* Table Header */}
        <div className="p-4 border-b border-white/10">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-400">
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-gray-500" />
              <span>Name</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-gray-500" />
              <span>Amount</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <span>Date</span>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/10">
          <AnimatePresence>
            {history.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -100 }}
                className="grid grid-cols-3 gap-4 p-4 items-center hover:bg-white/5 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <FaMoneyBillWave className="text-xl text-blue-400" />
                  </div>
                  <span className="text-white">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <FaMoneyBillWave className="text-xl text-green-400" />
                  </div>
                  <span className="text-white">₹{item.amount}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <FaCalendarAlt className="text-xl text-yellow-400" />
                  </div>
                  <span className="text-white whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default HIstoryExpense;
