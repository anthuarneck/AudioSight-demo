import { Visualizer } from "./Visualizer";
import { useEffect, useState } from "react";
export default function VisualizerCont({
  token,
  selectedTrack,
  setSelectedTrack,
}) {
  let [song, setSong] = useState({});
  let temp;
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
        temp = { ...temp, analysis: json };
        console.log(temp);
        return fetch(`https://api.spotify.com/v1/tracks/${c.id}`, {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        });
      })
      .then((response) => response.json)
      .then((json) => {
        let temp = { ...temp, track: json };
        console.log(temp);
        return fetch(`https://api.spotify.com/v1/audio-features/${c.id}`, {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        });
      })
      .then((response) => response.json)
      .then((json) => {
        let temp = { ...temp, features: json };
        console.log(temp);
        setSong(temp);
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
