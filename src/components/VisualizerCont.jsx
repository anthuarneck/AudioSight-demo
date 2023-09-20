import { Visualizer } from "./Visualizer";
import { useEffect, useState } from "react";
export default function VisualizerCont({
  token,
  selectedTrack,
  setSelectedTrack,
}) {
  let [song, setSong] = useState({});
  let c = selectedTrack;
  const updateSong = () => {
    debugger;
    fetch(`https://api.spotify.com/v1/audio-analysis/${c.id}`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    })
      .then((response) => response.json)
      .then((json) => {
        setSong({ ...song, analysis: { ...json } });
        return fetch(`https://api.spotify.com/v1/tracks/${c.id}`, {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        });
      })
      .then((response) => response.json)
      .then((json) => {
        setSong({ ...song, track: { ...json } });
        return fetch(`https://api.spotify.com/v1/audio-features/${c.id}`, {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        });
      })
      .then((response) => response.json)
      .then((json) => {
        setSong({ ...song, features: { ...json } });
      });
  };

  useEffect(() => {
    console.log(selectedTrack);
    updateSong();
  }, [selectedTrack]);

  return (
    <>
      <Visualizer song={song} updateSong={updateSong}></Visualizer>
    </>
  );
}
