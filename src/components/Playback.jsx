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
        player._options.id = device_id;
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

  const playSpecificTrack = (uri) => {
    if (playerInstance) {
        console.log("Player options:", playerInstance._options);
      playerInstance._options.getOAuthToken((token) => {
        fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${playerInstance._options.id}`,
          {
            method: "PUT",
            body: JSON.stringify({ uris: [uri] }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              return response.json().then((err) => {
                throw new Error(err.error.message);
              });
            }
            return response.json();
          })
          .catch((error) => {
            console.error("Error playing the track:", error);
          });
      });
    }
  };


  return (
    <div>
      <button id="togglePlay" onClick={togglePlayback}>
        Toggle Play
      </button>
      <button
        onClick={() => playSpecificTrack(`spotify:track:${selectedTrack.id}`)}
      >
        Play Selected Track
      </button>
    </div>
  );
};

export default Playback;
