import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaWallet, FaTag, FaDollarSign } from "react-icons/fa";
import AxiosConifg from "../../../utils/api/AxiosConifg";
import contextMaker from "../../../context/contextMaker";

function BudgetMaker({ setbudgat, setreload, dataprofile, setOpen }) {
  const { Budget } = dataprofile;
  const { data } = useContext(contextMaker);
  const email = data.email;
  const { reset, handleSubmit, register } = useForm();
  const [erroe, seterror] = useState(false);
  const transType = "Credit";

  const formSubmit = (data) => {
    const { amount } = data;
    const MainAmount = parseInt(amount);
    if (Budget - MainAmount >= 0) {
      AxiosConifg.post("/expense/create", { data, email, transType, Budget })
        .then((res) => {
          setbudgat(false);
          setreload(res.data);
          setOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
      reset();
    } else {
      seterror(true);
      setTimeout(() => {
        seterror(false);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full z-50 mt-80 h-screen absolute top-0 left-0 bg-black/50 backdrop-blur-sm flex justify-center items-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="md:w-[35vw] w-[90%] rounded-2xl bg-[#1A1F2E] border border-white/10 shadow-xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <FaWallet className="text-xl text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Create New Budget</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setbudgat(false)}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaTimes className="text-xl" />
            </motion.button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(formSubmit)} className="p-6 space-y-6">
          {/* Category Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Category</label>
            <select
              {...register("category")}
              className="w-full bg-[#2A3142] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            >
              <option value="Housing">Housing</option>
              <option value="Transportation">Transportation</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Personal_Care">Personal Care</option>
              <option value="Insurance">Insurance</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Food_&_Groceries">Food & Groceries</option>
            </select>
          </div>

          {/* Budget Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Budget Name</label>
            <div className="relative">
              <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. Home Decor"
                {...register("name")}
                className="w-full bg-[#2A3142] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Budget Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Budget Amount</label>
            <div className="relative">
              <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                placeholder="e.g. 500"
                {...register("amount")}
                className="w-full bg-[#2A3142] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {erroe && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full bg-red-500/10 border border-red-500/20 text-red-400 py-3 px-4 rounded-lg text-center"
              >
                Out of Budget
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
            Create Budget
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default BudgetMaker;
