import { Visualizer } from "./Visualizer";
import { useEffect, useState } from "react";
export default function VisualizerCont({ id }) {
  let token;
  let [song, setSong] = useState({});
  // useEffect(() => {
  //   fetch("https://accounts.spotify.com/api/token", {
  //     method: "POST",
  //     body: new URLSearchParams({
  //       grant_type: "client_credentials",
  //       client_id: "067513abdb1046dbb2f48158bc855c57",
  //       client_secret: "1eb5d6b1e5f140c9b7e3300b12d93fb2",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       token = json;
  //       console.log(token);
  //     });
  // }, []);
  useEffect(() => {
    fetch("https://api.spotify.com/v1/audio-analysis/0LEac9zwe3qkQ5CfwYBY0T", {
      headers: {
        Authorization:
          "Bearer  BQCeBRH5swAEtEDU1GBluvdRf1suIdYHeld4CKeVC-zntak0Fl_zgIa-kNCMDhaR7HX_ma4X3X61bBx4VNyGJVtcOflrlkgcOpr6XLg3eLBlu24x9Qk",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setSong(json);
      });
  }, []);
  return Object.entries(song).length ? (
    <>
      <Visualizer song={song}></Visualizer>
    </>
  ) : (
    <></>
  );
}
