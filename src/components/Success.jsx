import React from "react";
import { useState, useEffect } from "react";
import Search from "./Search";

const Success = ({ token, setToken }) => {

  // const [artistData, setArtistData] = useState(null);

  // console.log(token) 

  // useEffect(() => {
  //   fetch("https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setArtistData(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  // if (!artistData || !artistData.name) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  return (
    <div>
      <h1>Select a Song</h1>
      <Search token={token} />
    </div>
  );
};

export default Success;


