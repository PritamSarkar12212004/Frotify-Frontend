import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AxiosConifg from "../../utils/api/AxiosConifg";
import Cart from "../template/expensiesEditer/Cart";
import UpdateForm from "../template/expensiesEditer/UpdateForm";
import HIstoryExpense from "../template/expensiesEditer/HIstoryExpense";
import { FaArrowLeft, FaReceipt } from "react-icons/fa";

function ExpenseEdit() {
  const param = useParams();
  const [reload, setreload] = useState([]);
  const [data, setdata] = useState([]);
  const [history, sethistory] = useState([]);
  const navigate = useNavigate();

  const DataLoad = () => {
    AxiosConifg.post("/expense/child/cheker", param)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HistoryLoad = () => {
    AxiosConifg.post("/history/cheker", param)
      .then((res) => {
        sethistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    DataLoad();
    HistoryLoad();
  }, [reload]);

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
      <AnimatePresence>
        {data && history && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen p-4 md:p-8"
          >
            {/* Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex items-center justify-start mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors duration-300"
              >
                <FaArrowLeft className="text-2xl" />
                <span className="text-xl font-semibold">My Expenses</span>
              </motion.button>
            </motion.nav>

            {/* Main Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col md:flex-row gap-6"
            >
              {/* Cart Section */}
              <motion.div
                variants={itemVariants}
                className="md:w-1/2"
              >
                <Cart item={data} />
              </motion.div>

              {/* Update Form Section */}
              <motion.div
                variants={itemVariants}
                className="md:w-1/2"
              >
                <UpdateForm
                  item={data._id}
                  setreload={setreload}
                  remain={data.remainAmount}
                />
              </motion.div>
            </motion.div>

            {/* History Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <FaReceipt className="text-xl text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Transaction History</h2>
              </div>
              <HIstoryExpense history={history} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ExpenseEdit;
