import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const auth = localStorage.getItem("userAuth");
  const [isOpen, setIsOpen] = useState(false); // For toggling on mobile

  const logOut = () => {
    localStorage.removeItem("userAuth");
    window.location.reload();
  };

  return (
    <>
      {auth ? (
        <div className="relative md:h-[90vh] h-[95vh] ">
          {/* Hamburger menu for mobile */}
          <button
            className="md:hidden absolute top-1 left-3 z-50 text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <i class="ri-close-large-line"></i>
            ) : (
              <i className="ri-menu-line"></i>
            )}
          </button>

          {/* Sidebar */}
          <div
            className={`h-screen  md:w-[20vw] lg:w-[13vw] border-r-[1px] border-gray-400 px-3 py-3 flex flex-col gap-16 transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            } fixed md:relative bg-white/80 backdrop-blur-md z-40`}
          >
            <div className="w-full px-4 cursor-pointer relative">
              <img src="/Logo/logo.png" alt="" className="w-full" />
            </div>

            <div className="w-full flex flex-col items-center gap-10">
              {[
                {
                  name: "Dashboard",
                  icon: <i className="ri-home-3-line"></i>,
                  link: "/",
                },
                {
                  name: "Budgets",
                  icon: <i className="ri-wallet-3-line"></i>,
                  link: "/wallet",
                },
                {
                  name: "Money",
                  icon: <i className="ri-money-rupee-circle-fill"></i>,
                  link: "/money",
                },
                {
                  name: "Expenses",
                  icon: <i className="ri-bubble-chart-line"></i>,
                  link: "/expenses",
                },
              ].map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    to={item.link}
                    className={(e) =>
                      e.isActive
                        ? "px-4 py-3 gap-4 flex text-xl justify-center w-full bg-blue-300 text-blue-800 backdrop-blur-sm rounded-xl duration-300"
                        : "px-4 flex gap-4 py-3 w-full text-xl hover:bg-blue-300 hover:text-blue-800 rounded-xl duration-300 justify-center"
                    }
                  >
                    <span className="text-xl flex font-bold">{item.icon}</span>{" "}
                    {item.name}
                  </NavLink>
                );
              })}
            </div>

            <div className="absolute bottom-4 ">
              <button
                className=" md:px-7 lg-px-10 py-5 px-10 gap-2 flex text-xl justify-center w-full bg-red-300 text-red-800 backdrop-blur-sm rounded-xl duration-300"
                onClick={() => logOut()}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;
