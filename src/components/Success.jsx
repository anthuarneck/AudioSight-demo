import React from "react";

const Success = ({ artistData }) => {
  if (!artistData || !artistData.name) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Success Works!</h1>
      <p>{artistData.name}</p>
    </div>
  );
};

export default Success;


