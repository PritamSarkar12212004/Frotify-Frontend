import React, { useEffect, useState } from "react";
import contextMaker from "./contextMaker";
import AxiosConifg from "../utils/api/AxiosConifg";

const ContextProvider = ({ children }) => {
  const [data, setdata] = useState();
  const auth = localStorage.getItem("userAuth");
  useEffect(() => {
    AxiosConifg.post("/profile/cheker", auth)
      .then((res) => {
        setdata(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <contextMaker.Provider
      value={{
        data,
        setdata,
        auth
      }}
    >
      {children}
    </contextMaker.Provider>
  );
};

export default ContextProvider;
