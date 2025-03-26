import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaSignOutAlt } from "react-icons/fa";

function Profile({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-3 top-[120%] w-64 bg-[#1A1F2E] rounded-xl border border-white/10 shadow-xl backdrop-blur-sm z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <FaUser className="text-xl text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">Profile Details</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <FaUser className="text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Name</p>
            <p className="text-white font-medium">{item.name.toUpperCase()}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
            <FaEnvelope className="text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-white font-medium truncate">{item.email}</p>
          </div>
        </div>

        {/* Password */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
            <FaLock className="text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Password</p>
            <p className="text-white font-medium">••••••••</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 py-2 rounded-lg hover:bg-red-500/20 transition-colors duration-300"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Sign Out</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Profile;
