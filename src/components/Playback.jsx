import React, { useEffect, useState } from "react";

const Playback = ({ token, selectedTrack }) => {
  const [playerInstance, setPlayerInstance] = useState(null);

  useEffect(() => {
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

      setPlayerInstance(player);
    };

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);

    return () => {
      delete window.onSpotifyWebPlaybackSDKReady;
      document.body.removeChild(script);
    };
  }, [token]);

  const togglePlayback = () => {
    if (playerInstance) {
      playerInstance.togglePlay();
    }
  };

  return (
    <div>
        <button id="togglePlay" onClick={togglePlayback}>
            Toggle Play
        </button>
        <button onClick={() => playSpecificTrack(`spotify:track:${selectedTrack.id}`)}>
            Play Specific Track
        </button>
        <button onClick={skipToNext}>
            Skip to Next
        </button>
        <button onClick={skipToPrevious}>
            Skip to Previous
        </button>
        <button onClick={pausePlayback}>
            Pause
        </button>
    </div>
);
};

export default Playback;
