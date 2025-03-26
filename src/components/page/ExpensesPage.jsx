import { motion } from "framer-motion";
import Expenses from "../template/expense/Expenses";
import { FaReceipt } from "react-icons/fa";

function ExpensesPage() {
  document.title = "Expenses";

  return (
    <div className="min-h-screen bg-[#0F152A]">
      <div className="w-full md:h-[90vh] h-[95vh] relative overflow-y-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full py-8 px-4 md:px-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <FaReceipt className="text-2xl text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Expenses</h1>
              <p className="text-gray-400">Track and manage your expenses</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full px-4 md:px-8"
        >
          <Expenses />
        </motion.div>
      </div>
    </div>
  );
}

export default ExpensesPage;
