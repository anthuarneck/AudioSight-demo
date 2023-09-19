import { Visualizer } from "./Visualizer";
import { useEffect, useState } from "react";
export default function VisualizerCont({ token }) {
  let [song, setSong] = useState({});
  const updateSong = () => {
    fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    })
      .then((response) => response.json)
      .then((json) => {
        current = json;
        return fetch(
          `https://api.spotify.com/v1/audio-analysis/${current.item.id}`
        );
      })
      .then((response) => response.json)
      .then((json) => {
        setSong({ ...song, analysis: { ...json } });
        return fetch(`https://api.spotify.com/v1/tracks/${current.item.id}`);
      })
      .then((response) => response.json)
      .then((json) => {
        setSong({ ...song, track: { ...json } });
        return fetch(
          `https://api.spotify.com/v1/audio-features/${current.item.id}`
        );
      })
      .then((response) => response.json)
      .then((json) => {
        setSong({ ...song, features: { ...json } });
      });
  };
  let current;
  useEffect(() => {
    updateSong();
  }, []);

  return Object.entries(song).length ? (
    <>
      <Visualizer song={song} updateSong={updateSong}></Visualizer>
    </>
  ) : (
    <></>
  );
}
