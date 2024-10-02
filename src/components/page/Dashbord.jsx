import React from "react";
import DashboardCard from "../template/dashboard/DashboardCard";
import HotoryBadaget from "../template/Hotory&Badaget/HotoryBadaget";

function Dashbord() {
  document.title = "Dashboard";
  return (
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
        <DashboardCard />
        <HotoryBadaget />
      </div>
    </div>
  );
}

export default Dashbord;
