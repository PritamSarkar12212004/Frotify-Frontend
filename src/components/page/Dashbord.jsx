import React, { useEffect, useState } from "react";
import DashboardCard from "../template/dashboard/DashboardCard";
import HotoryBadaget from "../template/Hotory&Badaget/HotoryBadaget";
import AxiosConifg from "../../utils/api/AxiosConifg";
import MainLoading from '../extra/Loading/MainLoading'

function Dashbord() {
  document.title = "Dashboard";
  const [data, setData] = useState(null);
  const auth = localStorage.getItem("userAuth");

  useEffect(() => {
    AxiosConifg.post("/profile/cheker", auth)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);
  return (
    <div>
      {
        data ? (
          <div className="h-[90vh] w-full sm:px-7   overflow-y-auto">
          <div className="mt-10 flex flex-col gap-1 sm:px-0 px-2 ">
            <span className="flex  text-4xl font-bold">
              {" "}
              Hi, Game Play <br />
            </span>
            <span className="flex  opacity-75">
              Here' what happenning with your money, Lets Manage your expense
            </span>
          </div>
          <div className="w-full ">
            <DashboardCard  data={data}/>
            <HotoryBadaget />
          </div>
        </div>
        ):<MainLoading/>
      }
   </div>
  );
}

export default Dashbord;
