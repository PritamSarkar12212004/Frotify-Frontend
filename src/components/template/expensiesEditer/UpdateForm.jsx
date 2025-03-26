import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaExclamationTriangle } from "react-icons/fa";
import AxiosConifg from "../../../utils/api/AxiosConifg";

function UpdateForm({ item, setreload, remain }) {
  const { register, handleSubmit, reset } = useForm();
  const [erroe, seterror] = useState(false);

  const formControoler = (data) => {
    if (remain - data.amount < 0) {
      seterror(true);
      setTimeout(() => {
        seterror(false);
      }, 1000);
    } else {
      AxiosConifg.post("/history/create", { data, item })
        .then((res) => {
          setreload(res.data);
          reset();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-auto bg-[#1A1F2E] rounded-xl border border-white/10 shadow-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <FaPlus className="text-xl text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Add Expense</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(formControoler)} className="space-y-4">
        {/* Expense Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Expense Name</label>
          <input
            type="text"
            placeholder="e.g. Party"
            className="w-full bg-[#2A3142] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            required
            {...register("name")}
          />
        </div>

        {/* Expense Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Expense Amount</label>
          <input
            type="number"
            placeholder="e.g. 500"
            className="w-full bg-[#2A3142] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            required
            {...register("amount")}
          />
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {erroe && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full bg-red-500/10 border border-red-500/20 text-red-400 py-3 px-4 rounded-lg flex items-center gap-2"
            >
              <FaExclamationTriangle className="text-xl" />
              <span>Out of Budget</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
        >
          Add Expense
        </motion.button>
      </form>
    </motion.div>
  );
}

export default UpdateForm;
