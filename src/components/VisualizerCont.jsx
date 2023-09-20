import { Visualizer } from "./Visualizer";
import { useEffect, useState } from "react";
export default function VisualizerCont({
  token,
  selectedTrack,
  setSelectedTrack,
}) {
  let [song, setSong] = useState({});
  const updateSong = () => {
    let c = selectedTrack;
    console.log(c);
    fetch(`https://api.spotify.com/v1/audio-analysis/${c.id}`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    })
      .then((response) => response.json)
      .then((json) => {
        setSong((previous) => ({ ...previous, analysis: json }));
        return fetch(`https://api.spotify.com/v1/tracks/${c.id}`, {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        });
      })
      .then((response) => response.json)
      .then((json) => {
        setSong((previous) => ({ ...previous, track: json }));
        return fetch(`https://api.spotify.com/v1/audio-features/${c.id}`, {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        });
      })
      .then((response) => response.json)
      .then((json) => {
        setSong((previous) => ({ ...previous, features: json }));
      });
  };

  useEffect(() => {
    console.log(selectedTrack);
    if (selectedTrack) {
      updateSong();
      console.log(song);
    }
  }, [selectedTrack]);

  return selectedTrack ? (
    <>
      <Visualizer song={song} updateSong={updateSong} />
    </>
  ) : (
    <></>
  );
}
