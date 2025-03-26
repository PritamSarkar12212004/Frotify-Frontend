import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AxiosConifg from "../../utils/api/AxiosConifg";
import contextMaker from "../../context/contextMaker";
import MoneyAdder from "../template/moneyAdder/MoneyAdder";
import MainLoading from "../extra/Loading/MainLoading";
import MoneyAdded from "../extra/alert/MoneyAdded";
import { FaWallet, FaChartLine, FaPiggyBank, FaPlus } from "react-icons/fa";

const Money = () => {
  document.title = "Wallet";
  const { auth } = useContext(contextMaker);
  const [data, setdata] = useState();
  const [loader, setloader] = useState([]);
  const [open, setOpen] = useState(false);
  const [moneyAddercontrol, setmoneyAdderrcontrol] = useState(false);

  const moneyAdderContrller = () => {
    setmoneyAdderrcontrol(true);
  };

  useEffect(() => {
    AxiosConifg.post("/profile/cheker", auth)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loader]);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0F152A]">
      {data ? (
        <div className="w-full min-h-screen p-4 md:p-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Money Dashboard
            </h1>
            <p className="text-gray-400">Manage your finances efficiently</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full max-w-6xl mx-auto"
          >
            {/* Total Balance Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <FaWallet className="text-2xl text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Total Balance</h2>
                </div>
                <p className="text-4xl font-bold text-white">₹{data.Budget}</p>
              </div>
            </motion.div>

            {/* Spending Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 shadow-lg overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <FaChartLine className="text-2xl text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Monthly Spending</h2>
                </div>
                <p className="text-4xl font-bold text-white">₹{data.spend}</p>
              </div>
            </motion.div>

            {/* Budget Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-lg overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <FaPiggyBank className="text-2xl text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Total Budget</h2>
                </div>
                <p className="text-4xl font-bold text-white">₹{data.No_Of_Budget}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Money Adder Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 shadow-lg">
              <h3 className="text-2xl font-semibold text-white mb-4">Add Money</h3>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={moneyAdderContrller}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaPlus className="text-xl" />
                <span>Add Money</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Money Adder Modal */}
          <AnimatePresence>
            {moneyAddercontrol && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MoneyAdder
                  setOpen={setOpen}
                  setmoneyAdderrcontrol={setmoneyAdderrcontrol}
                  setloader={setloader}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Money Added Alert */}
          <MoneyAdded setOpen={setOpen} open={open} />
        </div>
      ) : (
        <MainLoading />
      )}
    </div>
  );
};

export default Money;
