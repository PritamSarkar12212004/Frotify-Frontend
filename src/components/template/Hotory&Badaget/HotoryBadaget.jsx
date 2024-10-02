import React, { useEffect, useState } from "react";
import HistoryLog from "../history/HistoryLog";
import Budaget from "../budaget/Budaget";
import AxiosConifg from "../../../utils/api/AxiosConifg";

function HotoryBadaget() {
  const [data, setdata] = useState([]);
  const auth=localStorage.getItem("userAuth");
  useEffect(() => {
    AxiosConifg.post("/expense/cheker", auth)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className=" grid grid-cols-2 gap-4 mt-3 w-full">
      <div className="h-80 sm:block hidden bg-gray-200 border-[1px] border-zinc-300 overflow-y-auto">
        <HistoryLog />
      </div>
      <div className="h-80 w-full hidden sm:flex flex-col gap-5 overflow-y-auto">
        {data.map((item, index) => {
          return <Budaget key={index} item={item} />;
        })}
      </div>
    </div>
  );
}

export default HotoryBadaget;
