import React from "react";
import Nav from "../template/nav/Nav";
import RoutesPath from "../../routes/RoutesPath";
function Page() {
  return (
    <div className="flex-auto h-screen relative overflow-y-auto">
      <Nav />
      <RoutesPath />
    </div>
  );
}

export default Page;
