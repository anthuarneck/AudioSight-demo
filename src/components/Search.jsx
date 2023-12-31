import { useEffect, useState } from "react";

const Search = ({ token, selectedTrack, setSelectedTrack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch(
      `https://api.spotify.com/v1/search?q=%5${searchQuery}&type=album%2Ctrack%2Cartist&limit=10`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.tracks.items);
        setSearchQuery("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleTrackClick = (track) => {
    setSelectedTrack(track);
  };

  return (
    <div>
      <h2>Search for a Song</h2>
      <div>
        <input
          type="text"
          placeholder="Enter song title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /><br></br>
        <button onClick={handleSearch}><span>Search</span></button>
      </div>
      <div>
        <ul>
          {searchResults.map((track, index) => (
            <li key={index} onClick={() => handleTrackClick(track)}>
              {track.name} by {track.artists[0].name}
            </li>
          ))}
        </ul>
      </div>
      {selectedTrack && (
        <div>
          <h3>Selected Track</h3>
          <p>
            {selectedTrack.name} by {selectedTrack.artists[0].name}
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
