import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const auth = localStorage.getItem("userAuth");
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle

  const logOut = () => {
    localStorage.removeItem("userAuth");
    window.location.reload();
  };

  return (
    <>
      {auth ? (
        <div className="relative md:h-[100vh] h-[100vh]">
          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden fixed top-5 left-4 z-50 text-3xl text-white bg-gray-800 p-2 rounded-lg shadow-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <i className="ri-close-large-line"></i> : <i className="ri-menu-line"></i>}
          </button>

          {/* Sidebar */}
          <div
            className={`h-full md:w-[18vw] lg:w-[15vw] w-[70vw] border-r border-gray-700 px-5 py-6 flex flex-col gap-12 transition-transform duration-500 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
            fixed md:relative bg-[#0f172a] text-white shadow-xl z-40`}
          >
            {/* Logo */}
            <div className="w-full flex justify-center">
           <text className="text-2xl font-bold tracking-wide">Fortify</text>
            </div>

            {/* Navigation Links */}
            <div className="w-full flex flex-col gap-5">
              {[
                { name: "Dashboard", icon: <i className="ri-home-3-line"></i>, link: "/" },
                { name: "Budgets", icon: <i className="ri-wallet-3-line"></i>, link: "/wallet" },
                { name: "Money", icon: <i className="ri-money-rupee-circle-fill"></i>, link: "/money" },
                { name: "Expenses", icon: <i className="ri-bubble-chart-line"></i>, link: "/expenses" },
              ].map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className={(e) =>
                    e.isActive
                      ? "flex items-center gap-4 px-5 py-3 text-lg bg-blue-500 text-white rounded-lg shadow-md transition duration-300 transform scale-105"
                      : "flex items-center gap-4 px-5 py-3 text-lg text-gray-300 hover:bg-blue-500 hover:text-white rounded-lg transition duration-300 transform hover:scale-105"
                  }
                >
                  <span className="text-2xl">{item.icon}</span> {item.name}
                </NavLink>
              ))}
            </div>

            {/* Logout Button */}
            <div className="w-full mt-auto flex justify-center">
              <button
                className="flex items-center gap-3 px-6 py-3 text-lg bg-red-600 text-white rounded-lg shadow-md transition duration-300 hover:bg-red-700 transform hover:scale-105"
                onClick={logOut}
              >
                <i className="ri-logout-box-line text-xl"></i> Log Out
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;
