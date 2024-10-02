import React, { useContext, useEffect, useState } from "react";
import AxiosConifg from "../../utils/api/AxiosConifg";
import contextMaker from "../../context/contextMaker";
import MoneyAdder from "../template/moneyAdder/MoneyAdder";

const Money = () => {
  document.title = "Wallet";
  const { auth } = useContext(contextMaker);
  const [data, setdata] = useState();
  const [loader, setloader] = useState([]);
  const [moneyAddercontrol, setmoneyAdderrcontrol] = useState(false);
  const moneyAdderContrller = () => {
    setmoneyAdderrcontrol(!moneyAddercontrol);
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

  return (
    <>
      {data ? (
        <div className="min-h-screen bg-white p-6 flex flex-col items-center">
          {moneyAddercontrol ? (
            <MoneyAdder
              setmoneyAdderrcontrol={setmoneyAdderrcontrol}
              setloader={setloader}
            />
          ) : null}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Money Dashboard
          </h1>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full max-w-6xl">
            {/* Card for Total Balance */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-semibold text-gray-700">
                Total Balance
              </h2>
              <p className="text-4xl font-bold text-blue-500">₹{data.Budget}</p>
            </div>

            {/* Card for Spending This Month */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-semibold text-gray-700">
                Spending This Month
              </h2>
              <p className="text-4xl font-bold text-red-500">₹{data.spend}</p>
            </div>

            {/* Card for Total Budget */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-semibold text-gray-700">
                Total Budget
              </h2>
              <p className="text-4xl font-bold text-green-500">
                {data.No_Of_Budget}
              </p>
            </div>
          </div>

          {/* Money Add Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-md w-full transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Add Money
            </h3>
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-md shadow hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => moneyAdderContrller()}
            >
              Add Money
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Money;
