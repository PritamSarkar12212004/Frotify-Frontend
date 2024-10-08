import React from "react";

function Profile({ item }) {
  return (
    <div className="absolute right-3  text-wrap flex flex-col flex-wrap top-[120%] rounded-xl w-52 h-40 bg-zinc-300/60 p-2 backdrop-blur-sm z-50">
      <h2>
        <span className="font-bold">Name</span>:{" "}
        <span className="uppercase">{item.name}</span>
      </h2>
      <h2>
        <span className="font-bold">Email</span>: {item.email}
      </h2>
      <h2>
        <span className="font-bold">Pass</span>: {item.password}
      </h2>
    </div>
  );
}

export default Profile;
