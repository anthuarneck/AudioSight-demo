import React from "react";
import Search from "./Search";
import Playback from "./Playback";
import { useEffect, useState } from "react";
import VisualizerCont from "./VisualizerCont";

const Success = ({ token, setToken }) => {
  const [hasExchanged, setHasExchanged] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    document.body.style.backgroundImage = 'url("/adrien-olichon-RCAhiGJsUUE-unsplash.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (!hasExchanged) {
      fetch(
        "https://us-central1-audiosight-a265d.cloudfunctions.net/exchange",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: authCode,
          }),
        }
      )
        .then((response) =>
          response.json().then((data) => {
            if (response.ok) {
              return data;
            } else {
              throw data;
            }
          })
        )
        .then((data) => {
          if (data.access_token) {
            setHasExchanged(true);
            setToken(data.access_token);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  return (
    <div>
      <h1>AudioSight</h1>
      <Search
        token={token}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />
      <Playback token={token} selectedTrack={selectedTrack} />
      <VisualizerCont token={token} selectedTrack={selectedTrack} setSelectedTrack={setHasExchanged}/>
    </div>
  );
};

export default Success;
