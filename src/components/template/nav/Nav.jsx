import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AxiosConifg from "../../../utils/api/AxiosConifg";
import Profile from "../profile/Profile";
function Nav() {
  const location = useLocation();
  const auth = localStorage.getItem("userAuth");
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState(false);
  useEffect(() => {
    AxiosConifg.post("/profile/cheker", auth)
      .then((res) => {
        setUserName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {auth ? (
        <div className="px-4 py-2 flex h-[10vh]   md:justify-between justify-end items-center border-b-[1px] relative border-gray-300">
          <div className="md:flex flex-col hidden gap-2 bg-white backdrop-blur-sm sticky top-0 ">
            <div className="text-lg font-bold">Atro{location.pathname}</div>
            <span className="text-xl font-mono font-bold">
              Hello {userName.name}
            </span>
          </div>
          <div
            className="h-full md:block  absolute right-0 "
            onMouseEnter={() => setProfile(true)}
            onMouseLeave={() => setProfile(false)}
            onClick={() => setProfile(!profile)}
          >
            <img
              src="/Profile/profile.png"
              className="h-full cursor-pointer"
              alt=""
            />
            {profile ? <Profile item={userName} /> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Nav;
