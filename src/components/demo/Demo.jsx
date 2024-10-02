import React, { useContext, useEffect, useState } from "react";
import { FaWallet, FaMoneyBillWave, FaPiggyBank } from "react-icons/fa"; // 3D-style icons
import AxiosConifg from "../../utils/api/AxiosConifg";
import contextMaker from "../../context/contextMaker";
import MoneyAdder from "../template/moneyAdder/MoneyAdder";
function Money() {
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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loader]);
  return (
    <>
      {data ? (
        <div className="w-full h-[90vh] p-10 bg-gray-50 relative">
          {moneyAddercontrol ? (
            <MoneyAdder
              setmoneyAdderrcontrol={setmoneyAdderrcontrol}
              setloader={setloader}
            />
          ) : null}
          <div className=" w-full ">
            <h1 className="text-3xl font-bold tracking-wider ">
              Hello Dear{" "}
              <span className="font-bold capitalize font-mono underline text-red-600 ">
                {data.name}
              </span>
              ....
            </h1>
            <h1 className="text-3xl font-bold tracking-wider ">
              This Your Totoal Balance 
              <span className="font-bold capitalize font-mono ml-2 und text-red-600 erline">
                 {data.Budget}
              </span>
            </h1>
            <h1 className="text-3xl font-bold tracking-wider ">
            Our spending for the month is 
              <span className="font-bold capitalize font-mono ml-2  text-red-600 underline">
                 {data.spend}.
              </span>
            </h1>
          </div>

          {/* <div className="w-full flex justify-center mt-10">
            <div className="w-96 h-52 bg-zinc-200 rounded-xl border-[1px] border-zinc-300 flex  gap-2 flex-col items-center justify-center">
              <img src="/icon/wallatet.png" className="h-28 w-28" alt="" />
              <button
                className=" text-white rounded-xl px-5 py-2 bg-blue-500"
                onClick={() => moneyAdderContrller()}
              >
                Add Money
              </button>
            </div>
          </div> */}
        </div>
      ) : null}
    </>
  );
}

export default Money;
