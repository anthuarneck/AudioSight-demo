import React, { useEffect } from "react";

const Playback = ({ token }) => {
  useEffect(() => {
    if (window.Spotify) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: "Web Playback SDK Quick Start Player",
          getOAuthToken: (cb) => {
            cb(token);
          },
        });

        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("playback_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("player_state_changed", (state) => {
          console.log(state);
        });
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
        });

        player.connect();
      };
    }
  }, []);
  const togglePlayback = () => {
    if (player) {
      player.togglePlay();
    }
  };

  return (
    <div>
      <button id="togglePlay" onClick={togglePlayback}>
        Toggle Play
      </button>
    </div>
  );
};

export default Playback;
