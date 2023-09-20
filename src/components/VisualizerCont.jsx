import { Visualizer } from "./Visualizer";
import { useEffect, useState } from "react";
export default function VisualizerCont({ token }) {
  let [song, setSong] = useState({});
  let c;
  const updateSong = () => {
    fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      method:"GET",
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    })
      .then((response) => response.json)
      .then((json) => {
        c = json;
        
        return fetch(
          `https://api.spotify.com/v1/audio-analysis/${c.item.id}`
        );
      })
      .then((response) => response.json)
      .then((json) => {
        setSong({ ...song, analysis: { ...json } });
        return fetch(`https://api.spotify.com/v1/tracks/${c.item.id}`);
      })
      .then((response) => response.json)
      .then((json) => {
        setSong({ ...song, track: { ...json } });
        return fetch(
          `https://api.spotify.com/v1/audio-features/${c.item.id}`
        );
      })
      .then((response) => response.json)
      .then((json) => {
        setSong({ ...song, features: { ...json } });
      });
  };

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
