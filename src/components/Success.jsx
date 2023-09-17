import React from "react";
import Search from "./Search";

const Success = ({ token, setToken }) => {

  return (
    <div>
      <h1>Select a Song</h1>
      <Search token={token} />
    </div>
  );
};

export default Success;


