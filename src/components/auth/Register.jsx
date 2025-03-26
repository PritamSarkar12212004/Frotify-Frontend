import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AxiosConifg from "../../utils/api/AxiosConifg";
import RegisterFaild from "../extra/alert/RegisterFaild";
import AuthLoading from "../extra/Loading/AuthLoading";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaUserTie, FaSignInAlt } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [opensss, setOpensss] = useState(false);
  const { reset, handleSubmit, register } = useForm();

  const controllForm = (data) => {
    setOpensss(true);
    AxiosConifg.post("/auth/register", data)
      .then((res) => {
        if (res.status === 202) {
          localStorage.setItem("userAuth", res.data.email);
          reset();
          setOpensss(false);
          navigate("/");
          window.location.reload();
        } else {
          setOpen(true);
          setOpensss(false);
        }
      })
      .catch((err) => {
        setOpen(true);
        setOpensss(false);
        reset();
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Main Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/finance-team.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0F152A]/90 backdrop-blur-sm"></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        ></motion.div>
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        ></motion.div>

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: ["0%", "100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
          ></motion.div>
        </div>
      </div>

      <AnimatePresence>
        {opensss ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <AuthLoading />
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-[#1A1F2E]/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-6 border border-white/10 relative z-10"
          >
            {/* Header */}
            <div className="text-center space-y-2">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
              >
                Create Account
              </motion.h2>
              <p className="text-gray-300 text-sm">Join our finance management platform</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit(controllForm)}>
              {/* Name Input */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <label className="text-sm font-medium text-gray-300 mb-2 block">Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                    className="w-full bg-gray-800/50 backdrop-blur-sm border border-white/10 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Enter your name"
                {...register("name")}
                required
              />
            </div>
              </motion.div>

              {/* Email Input */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <label className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                    className="w-full bg-gray-800/50 backdrop-blur-sm border border-white/10 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Enter your email"
                {...register("email")}
                required
              />
            </div>
              </motion.div>

              {/* Password Input */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <label className="text-sm font-medium text-gray-300 mb-2 block">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                    className="w-full bg-gray-800/50 backdrop-blur-sm border border-white/10 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Enter your password"
                {...register("password")}
                required
              />
            </div>
              </motion.div>

              {/* Role Input */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <label className="text-sm font-medium text-gray-300 mb-2 block">Role</label>
                <div className="relative">
                  <FaUserTie className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                    className="w-full bg-gray-800/50 backdrop-blur-sm border border-white/10 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                placeholder="e.g. Student"
                {...register("role")}
                required
              />
            </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                <FaSignInAlt />
                Sign Up
              </motion.button>
            </form>
            
            {/* Login Link */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center text-gray-300"
            >
              <p className="text-sm">
                Already have an account? {" "}
                <Link className="text-blue-400 hover:text-blue-300 transition-colors duration-300" to="/login">
                Sign In
              </Link>
            </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <RegisterFaild open={open} setOpen={setOpen} />
    </div>
  );
};

export default Register;
