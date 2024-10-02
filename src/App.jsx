import React from "react";
import Sidebar from "./components/template/sidebar/Sidebar";
import Page from "./components/page/Page";

function App() {
  return (
    <div className="w-full h-screen flex select-none ">
      <Sidebar />
      <Page />
    </div>
  );
}

export default App;
