import { useEffect, useState } from "react";
import HistoryLog from "../history/HistoryLog";
import Budaget from "../budaget/Budaget";
import AxiosConifg from "../../../utils/api/AxiosConifg";
import { motion, AnimatePresence } from "framer-motion";
import { FaHistory, FaChartPie } from "react-icons/fa";

function HotoryBadaget() {
  const [data, setdata] = useState([]);
  const auth = localStorage.getItem("userAuth");

  useEffect(() => {
    AxiosConifg.post("/expense/cheker", auth)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 w-full"
    >
      {/* History Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#1A1F2E]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-[600px] overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-xl">
            <FaHistory className="text-blue-400 text-xl" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Transaction History
          </h2>
        </div>
        <div className="h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar">
          <HistoryLog />
        </div>
      </motion.div>

      {/* Budget Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#1A1F2E]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-[600px] overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-xl">
            <FaChartPie className="text-purple-400 text-xl" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Budget Overview
          </h2>
        </div>
        <div className="h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar">
          <AnimatePresence>
            {data.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <Budaget item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default HotoryBadaget;
