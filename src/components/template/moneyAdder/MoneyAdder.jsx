import { useContext } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaWallet, FaTag, FaMoneyBillWave } from "react-icons/fa";
import AxiosConifg from "../../../utils/api/AxiosConifg";
import contextMaker from "../../../context/contextMaker";

function MoneyAdder({ setmoneyAdderrcontrol, setloader, setOpen }) {
  const transType = "Debit";
  const { auth } = useContext(contextMaker);
  const { register, handleSubmit, reset } = useForm();

  const formSubmit = (data) => {
    AxiosConifg.post("/money/add", { data, transType, auth })
      .then((res) => {
        setmoneyAdderrcontrol(false);
        setloader(res.data);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute w-full h-full bg-black/50 backdrop-blur-sm top-0 left-0 z-50 flex justify-center items-center"
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
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <FaWallet className="text-xl text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Increase Your Budget</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setmoneyAdderrcontrol(false)}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaTimes className="text-xl" />
            </motion.button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(formSubmit)} className="p-6 space-y-6">
          {/* Budget Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Budget Amount</label>
            <div className="relative">
              <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                placeholder="e.g. 500"
                required
                className="w-full bg-[#2A3142] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                {...register("amount")}
              />
            </div>
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Category</label>
            <select
              {...register("category")}
              className="w-full bg-[#2A3142] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            >
              <option value="Salary">Salary</option>
              <option value="Rental">Rental</option>
              <option value="Investments">Investments</option>
              <option value="Gifts">Gifts</option>
              <option value="Business">Business</option>
              <option value="Passive">Passive</option>
            </select>
          </div>

          {/* Budget Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Budget Name</label>
            <div className="relative">
              <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. OverTime"
                required
                className="w-full bg-[#2A3142] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                {...register("name")}
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-green-500/20 transition-all duration-300"
          >
            Add Budget
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default MoneyAdder;
